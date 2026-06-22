import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { clampDesc } from "@/lib/seo";
import {
  getBrandSlugs,
  getBrandsWithProducts,
  getBrandBySlug,
  getPedalsForBrand,
  type Brand,
} from "@/lib/brands";

export const dynamicParams = false;

const YEAR = new Date().getFullYear();

export function generateStaticParams() {
  return getBrandSlugs().map((slug) => ({ slug }));
}

// "JHS Pedals" 已含 "Pedals" → 不再追加，避免 "JHS Pedals Guitar Pedals"。
function titleName(brand: Brand): string {
  return /pedals?$/i.test(brand.name) ? brand.name : `${brand.name} Guitar Pedals`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) return {};
  return {
    title: { absolute: `${titleName(brand)} — Brand Guide (${YEAR})` },
    description: clampDesc(brand.intro ?? brand.description),
    alternates: { canonical: `/brands/${brand.id}` },
  };
}

type BrandPedal = ReturnType<typeof getPedalsForBrand>[number];

function BrandPedalCard({ pedal }: { pedal: BrandPedal }) {
  return (
    <Card className="bg-gray-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-orange-500/50 transition-all duration-200">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base leading-tight">
            <Link href={`/pedals/${pedal.id}`} className="hover:text-orange-400 transition-colors hover:underline underline-offset-2">
              {pedal.name}
            </Link>
          </CardTitle>
          <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs shrink-0 capitalize">
            {pedal.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-3 line-clamp-2">
          {pedal.description}
        </p>
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-bold text-orange-400">${pedal.price}</span>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            ⭐ {pedal.rating} ({pedal.reviewCount.toLocaleString()})
          </span>
        </div>
        <a
          href={pedal.amazonUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors"
        >
          View on Amazon
        </a>
      </CardContent>
    </Card>
  );
}

export default async function BrandPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) notFound();

  const pedals = getPedalsForBrand(brand.displayName);
  const heroTitle = brand.tagline
    ? `${titleName(brand)} — ${brand.tagline}`
    : `${titleName(brand)} — Brand Guide`;

  const related = getBrandsWithProducts()
    .filter((b) => b.id !== brand.id)
    .slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Brand",
        name: brand.name,
        description: brand.description,
        foundingDate: String(brand.founded),
        url: `https://pedalrig.com/brands/${brand.id}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://pedalrig.com" },
          { "@type": "ListItem", position: 2, name: brand.name, item: `https://pedalrig.com/brands/${brand.id}` },
        ],
      },
      ...(brand.faqs && brand.faqs.length > 0
        ? [
            {
              "@type": "FAQPage",
              mainEntity: brand.faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <nav className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-orange-400 transition-colors">Home</Link>
          <span>/</span>
          <span>{brand.name}</span>
        </nav>

        <div className="mb-10">
          <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs uppercase tracking-wider mb-4">
            Brand Guide
          </Badge>
          <h1 className="text-4xl font-bold mb-4">{heroTitle}</h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed max-w-3xl">
            {brand.intro ?? brand.description}
          </p>
          <p className="text-zinc-400 dark:text-zinc-500 text-sm mt-3">
            {brand.country} · Founded {brand.founded}
          </p>
        </div>

        {brand.highlights && brand.highlights.length > 0 && (
          <section className="mb-12 bg-gray-50 dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
            <h2 className="text-2xl font-bold mb-4">Why {brand.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-zinc-600 dark:text-zinc-400">
              {brand.highlights.map((h) => (
                <div key={h.title}>
                  <div className="text-2xl mb-2">{h.icon}</div>
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">{h.title}</h3>
                  <p>{h.text}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">
            {brand.name} Pedals — Full Lineup ({pedals.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pedals.map((pedal) => (
              <BrandPedalCard key={pedal.id} pedal={pedal} />
            ))}
          </div>
        </section>

        {brand.history && (
          <section className="mb-12 bg-gray-50 dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
            <h2 className="text-2xl font-bold mb-4">{brand.history.title}</h2>
            <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {brand.history.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
        )}

        {brand.notable && (
          <section className="mb-12 bg-gray-50 dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
            <h2 className="text-2xl font-bold mb-4">{brand.notable.title}</h2>
            <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
              {brand.notable.items.map((item) => (
                <li key={item.name}>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">{item.name}</span> — {item.text}
                </li>
              ))}
            </ul>
          </section>
        )}

        {brand.faqs && brand.faqs.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {brand.faqs.map((faq, i) => (
                <div key={i} className="bg-gray-50 dark:bg-zinc-900 rounded-xl p-5 border border-zinc-200 dark:border-zinc-800">
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">{faq.q}</h3>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="text-xl font-bold mb-4">Explore More</h2>
          <div className="flex flex-wrap gap-3">
            {related.map((b) => (
              <Link
                key={b.id}
                href={`/brands/${b.id}`}
                className="text-sm bg-gray-100 dark:bg-zinc-800 hover:bg-orange-500/20 hover:text-orange-400 text-zinc-600 dark:text-zinc-400 px-4 py-2 rounded-lg transition-colors border border-zinc-200 dark:border-zinc-700"
              >
                {b.name} Pedals
              </Link>
            ))}
            <Link href="/best" className="text-sm bg-gray-100 dark:bg-zinc-800 hover:bg-orange-500/20 hover:text-orange-400 text-zinc-600 dark:text-zinc-400 px-4 py-2 rounded-lg transition-colors border border-zinc-200 dark:border-zinc-700">
              Best Pedals by Category
            </Link>
            <Link href="/types" className="text-sm bg-gray-100 dark:bg-zinc-800 hover:bg-orange-500/20 hover:text-orange-400 text-zinc-600 dark:text-zinc-400 px-4 py-2 rounded-lg transition-colors border border-zinc-200 dark:border-zinc-700">
              All Pedal Types
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
