/** @type {import('next').NextConfig} */

// GH Pages는 `<user>.github.io/<repo>/` 경로 아래로 호스팅돼서
// 빌드 시 basePath를 지정해야 자산/링크가 깨지지 않는다.
// 워크플로에서 NEXT_PUBLIC_BASE_PATH=/nxtgen-design-system 으로 주입.
// 로컬 dev에서는 비워두어 http://localhost:3001 그대로 동작.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  output: "export",
  basePath,
  // GH Pages는 디렉터리 인덱스 방식(`/foo/` → `/foo/index.html`)이라 trailingSlash 권장.
  trailingSlash: true,
  // 정적 export에서는 next/image 옵티마이저를 못 쓰므로 끄기 (현재 미사용이지만 방어).
  images: { unoptimized: true },
  transpilePackages: ["@nxtgen-org/react", "@nxtgen-org/react-headless", "@nxtgen-org/icons"],
  reactStrictMode: true,
};

export default nextConfig;
