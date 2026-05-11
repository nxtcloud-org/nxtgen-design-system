# @nxtgen-org/tokens

## 0.1.4

### Patch Changes

- fix: dark border tokens use solid gray scale instead of alpha-white

  `border.default` / `subtle` / `strong` 가 `#FFFFFF12 / 0A / 1F` (alpha-white)
  로 정의되어 검정 배경 위에서 발광 인상을 주던 회귀를 정정. light 의 border
  토큰 (gray.200/100/300) 과 대칭되도록 dark 도 `{color.gray.800 / 900 / 700}`
  primitive 참조로 통일.
