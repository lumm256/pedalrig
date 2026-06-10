// SEO meta 长度工具：把 description 兜到搜索引擎不截断的长度（Bing/Google ~155–160）。
// 数据驱动的 description 里产品名/艺人名长度不定，靠它保证不超标，按词边界截断 + 省略号。
export function clampDesc(text: string, max = 155): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > max - 30 ? cut.slice(0, lastSpace) : cut).replace(/[\s.,;:—-]+$/, "") + "…";
}
