# Changesets

`@nxtgen-org/*` 패키지의 버전 관리.

## 사용

변경사항 추가:
```bash
bun run changeset
```
대화형으로 영향 패키지 + bump 종류(patch/minor/major) + 변경 노트 입력. `.changeset/<slug>.md` 파일 생성됨 → 커밋.

릴리즈:
```bash
bun run version
```
누적된 changeset들을 모아 패키지 version 일괄 bump + CHANGELOG.md 갱신 + lockfile 업데이트.

## 설정

- **fixed: `@nxtgen-org/*`** — 모든 nxtgen 패키지가 같은 버전으로 동기 bump (depencency hell 방지)
- **ignore: `demo`** — 데모 앱은 버전 관리 제외
- **commit: false** — git commit은 수동 (CI에서 수행 권장)
- **access: restricted** — 사내용, npm public 공개 안 함
