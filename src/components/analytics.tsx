// 站点统计：Google Analytics 4 + Microsoft Clarity（可选）+ pageview.click（Plausible 兼容）。
//
// 性能取舍（移动端 TBT）：
//   - GA 的 gtag 函数定义 + js/config 入栈用同步内联 <script>（随 HTML 解析即执行，~0ms）。
//   - 重的 vendor 库（gtag/js、clarity 录制器）改用 next/script strategy="lazyOnload"，
//     浏览器空闲时才下载执行，不与 hydration 抢主线程 → 降移动端 TBT；
//     加载后各自消费上面 stub 入栈的命令队列。
//   - pageview.click 无 cookie、轻量，afterInteractive 即可。
//
// consent 决策：pedalrig 是 US Amazon 联盟站，按本站决策【不做 consent gating】
//   （不设 default-denied、不加同意横幅），保持现有埋点照常上报。如未来有可观欧盟流量
//   再引入 CookieConsent + gtag('consent','default',{denied}) 方案。

import Script from "next/script";

const GA_ID = "G-GHMPSRSZSQ";

// pedalrig 自己的 Microsoft Clarity project ID（非 aquanerd 的 x4n1zu2auq）。
// 留空 → 不加载 Clarity（安全降级）。
const CLARITY_ID = "x4t9545ke7";

export function Analytics() {
  return (
    <>
      {/* GA4：同步定义 gtag + 入栈 js/config（便宜，~0ms）。重库 gtag/js 见下方 lazyOnload。 */}
      <script
        id="ga-init"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`,
        }}
      />
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="lazyOnload"
      />

      {/* Microsoft Clarity：仅在配置了本站 ID 时加载（队列 stub + 录制器 lazyOnload）。 */}
      {CLARITY_ID && (
        <>
          <script
            id="ms-clarity-stub"
            dangerouslySetInnerHTML={{
              __html: `window.clarity = window.clarity || function(){(window.clarity.q = window.clarity.q || []).push(arguments)};`,
            }}
          />
          <Script
            src={`https://www.clarity.ms/tag/${CLARITY_ID}`}
            strategy="lazyOnload"
          />
        </>
      )}

      {/* pageview.click（Plausible 兼容，无 cookie，隐私友好） */}
      <Script
        src="https://click.pageview.click/js/script.js"
        data-domain="pedalrig.com"
        strategy="afterInteractive"
      />
    </>
  );
}
