/**
 * FOUC 방지용 inline 스크립트.
 * <html data-theme="..."> 를 React hydration 전에 설정.
 */
export function ThemeScript() {
  const code = `
    (function () {
      try {
        var stored = localStorage.getItem('nxtgen-theme');
        var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        var theme = stored || (prefersDark ? 'dark' : 'light');
        document.documentElement.dataset.theme = theme;
      } catch (e) {
        document.documentElement.dataset.theme = 'light';
      }
    })();
  `;
  // biome-ignore lint/security/noDangerouslySetInnerHtml: FOUC 방지를 위한 의도된 인라인 스크립트
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
