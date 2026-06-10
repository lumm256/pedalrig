// 单一来源：哪些效果器类型够格生成 /best/[type] 落地页。
// generateStaticParams 与 sitemap 共用此逻辑，避免两处阈值漂移。
import pedalsData from "@/data/pedals.json";
import pedalTypesData from "@/data/pedal-types.json";

// 至少这么多款产品才值得做 "Best X Pedals" 落地页（否则是薄内容，交给 /[typeSlug] 类型页即可）。
const MIN_PEDALS_FOR_BEST_PAGE = 3;

function countByType(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const p of pedalsData) counts[p.type] = (counts[p.type] || 0) + 1;
  return counts;
}

/** 够格生成 best 落地页的类型对象（按产品数降序）。 */
export function getBestTypes() {
  const counts = countByType();
  return pedalTypesData.types
    .filter((t) => (counts[t.id] ?? 0) >= MIN_PEDALS_FOR_BEST_PAGE)
    .sort((a, b) => (counts[b.id] ?? 0) - (counts[a.id] ?? 0));
}

/** 够格类型的 slug 列表（供 sitemap / generateStaticParams 使用）。 */
export function getBestTypeSlugs(): string[] {
  return getBestTypes().map((t) => t.slug);
}
