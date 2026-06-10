// IndexNow 提交脚本 —— 主动通知 Bing/Yandex(及 DDG/Yahoo/Ecosia 等 Bing 系)新增/更新的页面。
// pedalrig 流量大头是 Bing 系,IndexNow 能让这些引擎几小时内来爬,不必干等自然抓取。
// （Google 不参与 IndexNow,但这正好补的是 Bing 系的快速收录。）
//
// 用法:
//   node scripts/indexnow.mjs                      # 提交 sitemap.xml 里的全部 URL
//   node scripts/indexnow.mjs https://pedalrig.com/best/reverb https://pedalrig.com/best/delay
//                                                  # 只提交指定 URL（新页/改页时用)
//
// 前提:public/<KEY>.txt 已随站点部署(IndexNow 通过抓取该文件验证归属)。

const HOST = "pedalrig.com";
const KEY = "3a1a5cb699c7df64d70d197a703dbd49";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

async function urlsFromSitemap() {
  const res = await fetch(`https://${HOST}/sitemap.xml`);
  if (!res.ok) throw new Error(`fetch sitemap failed: ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

async function submit(urlList) {
  // IndexNow 单次最多 10000 条,这里分批 1000。
  for (let i = 0; i < urlList.length; i += 1000) {
    const batch = urlList.slice(i, i + 1000);
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: batch }),
    });
    // 200/202 = 接受;其它打印出来排查(403=key 文件没验证过,422=URL 不属于本站)。
    console.log(`batch ${i / 1000 + 1}: ${batch.length} urls -> HTTP ${res.status} ${res.statusText}`);
    if (!res.ok) console.log("  body:", (await res.text()).slice(0, 300));
  }
}

const args = process.argv.slice(2);
const urls = args.length > 0 ? args : await urlsFromSitemap();
console.log(`Submitting ${urls.length} URLs to IndexNow (key ${KEY.slice(0, 8)}…)`);
await submit(urls);
console.log("Done.");
