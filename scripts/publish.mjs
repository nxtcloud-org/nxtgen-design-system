#!/usr/bin/env bun
import { execSync } from "node:child_process";
/**
 * Workspace-aware publish for public npm.
 *
 * Why custom: `changeset publish` invokes `npm publish`, which only substitutes
 * `workspace:*` deps when a `package-lock.json` exists. Our CI uses bun.lock, so
 * npm leaves workspace specifiers in published metadata — broken for consumers.
 * `bun publish` should substitute via lockfile but reads workspace version from
 * the lockfile, not the source package.json — and lockfile entries can lag a
 * version bump (we hit this on 0.1.1: lockfile still showed 0.1.0).
 *
 * So we substitute manually: read every workspace package's source version,
 * rewrite workspace:* → ^version in dependencies/peerDependencies/devDependencies
 * for the package being published, run `bun publish`, then restore the original
 * package.json.
 *
 * Run via `bun run release` from the repo root.
 */
import { readFile, readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const PACKAGES_DIR = "packages";
const TOOLING_DIR = "tooling";
const DEP_KEYS = ["dependencies", "peerDependencies", "devDependencies"];

// 1) Build a name → version map from all workspace package.json sources.
async function readWorkspaceVersions() {
  const map = new Map();
  for (const root of [PACKAGES_DIR, TOOLING_DIR]) {
    let entries;
    try {
      entries = await readdir(root, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      try {
        const raw = await readFile(join(root, entry.name, "package.json"), "utf8");
        const pkg = JSON.parse(raw);
        if (pkg.name && pkg.version) map.set(pkg.name, pkg.version);
      } catch {
        // skip non-package dirs
      }
    }
  }
  return map;
}

// 2) For one package, substitute workspace:* → ^version using the version map.
function substituteWorkspaceDeps(pkg, versions) {
  const next = structuredClone(pkg);
  for (const key of DEP_KEYS) {
    const deps = next[key];
    if (!deps) continue;
    for (const [name, range] of Object.entries(deps)) {
      if (typeof range !== "string" || !range.startsWith("workspace:")) continue;
      const concrete = versions.get(name);
      if (!concrete) {
        throw new Error(`${pkg.name}.${key}.${name} is workspace:* but no source version found`);
      }
      deps[name] = `^${concrete}`;
    }
  }
  return next;
}

// 3) Skip if this version is already on the registry.
async function isAlreadyPublished(name, version) {
  const url = `https://registry.npmjs.org/${encodeURIComponent(name)}/${version}`;
  try {
    const res = await fetch(url);
    return res.ok;
  } catch {
    return false;
  }
}

const versions = await readWorkspaceVersions();
const dirs = await readdir(PACKAGES_DIR, { withFileTypes: true });

let published = 0;
let skipped = 0;
const failures = [];

for (const entry of dirs) {
  if (!entry.isDirectory()) continue;
  const pkgPath = join(PACKAGES_DIR, entry.name, "package.json");

  let originalRaw;
  let pkg;
  try {
    originalRaw = await readFile(pkgPath, "utf8");
    pkg = JSON.parse(originalRaw);
  } catch {
    continue;
  }
  if (pkg.private) continue;
  if (!pkg.name || !pkg.version) continue;

  if (await isAlreadyPublished(pkg.name, pkg.version)) {
    console.log(`✓ ${pkg.name}@${pkg.version} already on registry, skipping`);
    skipped += 1;
    continue;
  }

  // Substitute workspace:* deps to concrete ^versions and write to disk.
  const substituted = substituteWorkspaceDeps(pkg, versions);
  await writeFile(pkgPath, `${JSON.stringify(substituted, null, 2)}\n`);

  console.log(`📦 publishing ${pkg.name}@${pkg.version}`);
  try {
    execSync("bun publish --access public", {
      cwd: join(process.cwd(), PACKAGES_DIR, entry.name),
      stdio: "inherit",
      env: process.env,
    });
    published += 1;
  } catch (err) {
    failures.push(`${pkg.name}@${pkg.version}: ${err.message}`);
  } finally {
    // Restore original package.json so the workspace stays consistent
    // (subsequent installs/builds keep using workspace:* locally).
    await writeFile(pkgPath, originalRaw);
  }
}

console.log(`\n📦 ${published} published · ⏭ ${skipped} skipped · ❌ ${failures.length} failed`);
if (failures.length > 0) {
  for (const f of failures) console.error(`  ${f}`);
  process.exit(1);
}
