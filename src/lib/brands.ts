// 单一来源：品牌页数据与“哪些品牌够格生成 /brands/[slug]”。
// generateStaticParams、generateMetadata 与 sitemap 共用，避免逻辑漂移。
// 品牌富内容（intro/highlights/history/notable/faqs）为可选——模板有则用、无则优雅降级。
import pedalsData from "@/data/pedals.json";
import brandsData from "@/data/brands.json";

export interface BrandHighlight {
  icon: string;
  title: string;
  text: string;
}

export interface Brand {
  id: string;
  name: string;
  /** 对接 pedals.json 里的 brand 显示名（两套数据的连接键）。 */
  displayName: string;
  country: string;
  description: string;
  founded: number;
  tagline?: string;
  intro?: string;
  highlights?: BrandHighlight[];
  history?: { title: string; paragraphs: string[] };
  notable?: { title: string; items: { name: string; text: string }[] };
  faqs?: { q: string; a: string }[];
}

const brands = brandsData as Brand[];

/** 该品牌在 pedals.json 里的产品（按显示名匹配，价格降序）。 */
export function getPedalsForBrand(displayName: string) {
  return pedalsData
    .filter((p) => p.brand === displayName)
    .sort((a, b) => b.price - a.price);
}

/** 有产品的品牌才生成页（避免空壳页）。 */
export function getBrandsWithProducts(): Brand[] {
  return brands
    .filter((b) => getPedalsForBrand(b.displayName).length > 0)
    .sort(
      (a, b) =>
        getPedalsForBrand(b.displayName).length -
        getPedalsForBrand(a.displayName).length,
    );
}

/** 够格品牌的 slug 列表（供 sitemap / generateStaticParams）。 */
export function getBrandSlugs(): string[] {
  return getBrandsWithProducts().map((b) => b.id);
}

export function getBrandBySlug(slug: string): Brand | undefined {
  return brands.find((b) => b.id === slug);
}
