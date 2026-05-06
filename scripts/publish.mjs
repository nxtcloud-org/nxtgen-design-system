#!/usr/bin/env bun
/**
 * Workspace-aware publish for public npm.
 *
 * Why custom: `changeset publish` invokes `npm publish`, which only substitutes
 * `workspace:*` deps when a `package-lock.json` exists. Our CI uses bun.lock, so
 * npm leaves workspace specifiers in published metadata — broken for consumers.
 *
 * `bun publish` substitutes workspace deps natively at publish time. We loop over
 * publishable packages, skip those whose version is already on the registry, and
 * publish the rest. Mirrors `changeset publish` semantics minus git-tag creation
 * (changesets/action handles tags after this).
 *
 * Run via `bun run release` from the repo root.
 */
import { readdir, readFile } from "node:fs/promises";
import { execSync } from "node:child_process";
import { join } from "node:path";

const PACKAGES_DIR = "packages";

const dirs = await readdir(PACKAGES_DIR, { withFileTypes: true });
let published = 0;
let skipped = 0;
const failures = [];

for (const entry of dirs) {
  if (!entry.isDirectory()) continue;
  const pkgPath = join(PACKAGES_DIR, entry.name, "package.json");
  let pkg;
  try {
    pkg = JSON.parse(await readFile(pkgPath, "utf8"));
  } catch {
    continue;
  }
  if (pkg.private) continue;
  if (!pkg.name || !pkg.version) continue;

  // Probe registry for current version.
  const probeUrl = `https://registry.npmjs.org/${encodeURIComponent(pkg.name)}/${pkg.version}`;
  let alreadyPublished = false;
  try {
    const res = await fetch(probeUrl);
    alreadyPublished = res.ok;
  } catch {
    // Network blip — let bun publish error out below if real.
  }

  if (alreadyPublished) {
    console.log(`✓ ${pkg.name}@${pkg.version} already on registry, skipping`);
    skipped += 1;
    continue;
  }

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
  }
}

console.log(`\n📦 ${published} published · ⏭ ${skipped} skipped · ❌ ${failures.length} failed`);
if (failures.length > 0) {
  for (const f of failures) console.error(`  ${f}`);
  process.exit(1);
}
