import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { TypeIcon } from "@/components/type-icon";
import { PedalCard, type Pedal } from "@/components/pedal-card";
import pedalsData from "@/data/pedals.json";
import pedalTypesData from "@/data/pedal-types.json";
import { getBestTypeSlugs } from "@/lib/best-types";
import { clampDesc } from "@/lib/seo";

const YEAR = 2026;

// 只静态生成够格类型；其余 /best/<slug> 一律 404，不在请求期兜底渲染薄页。
export const dynamicParams = false;

type PedalType = (typeof pedalTypesData.types)[number];

function getType(slug: string): PedalType | undefined {
  return pedalTypesData.types.find((t) => t.slug === slug);
}

function getRankedPedals(typeId: string): Pedal[] {
  return pedalsData
    .filter((p) => p.type === typeId)
    .sort((a, b) => b.rating - a.rating);
}

export function generateStaticParams() {
  return getBestTypeSlugs().map((type) => ({ type }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>;
}): Promise<Metadata> {
  const { type } = await params;
  const t = getType(type);
  if (!t) return {};
  const n = getRankedPedals(t.id).length;
  const lower = t.name.toLowerCase();
  return {
    title: { absolute: `Best ${t.name} Pedals (${YEAR}): Top ${n} Picks` },
    description: clampDesc(
      `The best ${lower} pedals for ${YEAR}, ranked by tone, build, and value — our top ${n} picks with specs, prices, pros & cons. ${t.shortDescription}`,
    ),
    alternates: { canonical: `/best/${t.slug}` },
  };
}

function rankBadge(index: number, typeName: string): string | undefined {
  if (index === 0) return `🏆 Best ${typeName} ${YEAR}`;
  if (index === 1) return "Runner-Up";
  if (index === 2) return "Also Great";
  return undefined;
}

export default async function BestTypePage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  const t = getType(type);
  if (!t) notFound();

  const pedals = getRankedPedals(t.id);
  if (pedals.length === 0) notFound();

  const lower = t.name.toLowerCase();
  const top = pedals[0];
  const cheapest = [...pedals].sort((a, b) => a.price - b.price)[0];
  const prices = pedals.map((p) => p.price);
  const priceMin = Math.min(...prices);
  const priceMax = Math.max(...prices);

  const faqs = [
    {
      q: `What is the best ${lower} pedal in ${YEAR}?`,
      a: `Our top pick is the ${top.name} by ${top.brand}, which earns a ${top.rating.toFixed(
        1,
      )}/5 rating for its balance of tone, build quality, and value. It leads a field of ${pedals.length} ${lower} pedals we compared for this guide.`,
    },
    {
      q: `How much does a good ${lower} pedal cost?`,
      a: `The ${lower} pedals in this guide range from $${priceMin} to $${priceMax}. You do not need to spend the most to get a great pedal — the ${cheapest.name} comes in at $${cheapest.price} and still rates ${cheapest.rating.toFixed(
        1,
      )}/5, making it the best value pick here.`,
    },
    {
      q: `Where does a ${lower} pedal go in the signal chain?`,
      a: `In the standard guitar signal chain, ${lower} sits around position ${t.signalChainPosition}. ${t.description} See our pedal order guide for the full layout and the reasoning behind it.`,
    },
    {
      q: `What is a ${lower} pedal used for?`,
      a: `${t.description} It is especially popular for ${t.bestFor
        .slice(0, 3)
        .join(", ")} styles.`,
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://pedalrig.com" },
            { "@type": "ListItem", position: 2, name: "Best Pedals", item: "https://pedalrig.com/best" },
            {
              "@type": "ListItem",
              position: 3,
              name: `Best ${t.name} Pedals`,
              item: `https://pedalrig.com/best/${t.slug}`,
            },
          ],
        },
        {
          "@type": "ItemList",
          name: `Best ${t.name} Pedals ${YEAR}`,
          itemListElement: pedals.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `https://pedalrig.com/pedals/${p.id}`,
            name: `${p.brand} ${p.name}`,
          })),
        },
        {
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        },
      ],
  };

  const siblingTypes = getBestTypeSlugs()
    .filter((s) => s !== t.slug)
    .slice(0, 6)
    .map((s) => getType(s))
    .filter((x): x is PedalType => Boolean(x));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
            <Link href="/" className="transition-colors hover:text-orange-500">Home</Link>
            <span>/</span>
            <Link href="/best" className="transition-colors hover:text-orange-500">Best Pedals</Link>
            <span>/</span>
            <span className="text-zinc-700 dark:text-zinc-300">Best {t.name} Pedals</span>
          </nav>

          {/* Hero */}
          <h1 className="mb-4 flex items-center gap-3 text-3xl font-bold sm:text-4xl">
            <TypeIcon icon={t.icon} name={t.name} size={40} />
            Best {t.name} Pedals ({YEAR})
          </h1>
          <p className="mb-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            {t.shortDescription} We compared {pedals.length} {lower} pedals and ranked them by
            rating, real-world playability, build quality, and value. Here are the ones worth your
            money in {YEAR}.
          </p>
          <p className="mb-10 text-sm text-zinc-500 dark:text-zinc-500">
            Top pick: <span className="font-semibold text-zinc-700 dark:text-zinc-300">{top.name}</span>{" "}
            · {pedals.length} options compared · ${priceMin}–${priceMax}
          </p>

          <Separator className="mb-10 bg-zinc-200 dark:bg-zinc-800" />

          {/* Ranked list */}
          <div className="space-y-5">
            {pedals.map((pedal, i) => (
              <div key={pedal.id} className="flex flex-col gap-3 sm:flex-row sm:items-start">
                <span
                  aria-hidden
                  className="hidden h-9 w-9 flex-none items-center justify-center rounded-full bg-orange-500/15 text-sm font-bold text-orange-500 sm:flex"
                >
                  {i + 1}
                </span>
                <div className="flex-1">
                  <PedalCard pedal={pedal} badge={rankBadge(i, t.name)} />
                </div>
              </div>
            ))}
          </div>

          <Separator className="my-12 bg-zinc-200 dark:bg-zinc-800" />

          {/* Buying guide */}
          <section className="scroll-mt-20">
            <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
              How to choose a {lower} pedal
            </h2>
            <p className="mb-6 leading-relaxed text-zinc-600 dark:text-zinc-400">
              {t.description}
            </p>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              What to look for
            </p>
            <ul className="mb-6 grid gap-2 sm:grid-cols-2">
              {t.keyFeatures.map((feat) => (
                <li
                  key={feat}
                  className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400"
                >
                  <span className="flex-none text-orange-500">▸</span> {feat}
                </li>
              ))}
            </ul>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Great for
            </p>
            <div className="mb-6 flex flex-wrap gap-2">
              {t.bestFor.map((genre) => (
                <span
                  key={genre}
                  className="rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-xs text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400"
                >
                  {genre}
                </span>
              ))}
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Not sure where {lower} sits in your rig? Our{" "}
              <Link href="/pedal-order" className="text-orange-500 hover:text-orange-400">
                signal chain order guide
              </Link>{" "}
              shows the full layout, and the{" "}
              <Link href="/pedalboard/builder" className="text-orange-500 hover:text-orange-400">
                Board Builder
              </Link>{" "}
              lets you plan power and budget around it.
            </p>
          </section>

          <Separator className="my-12 bg-zinc-200 dark:bg-zinc-800" />

          {/* FAQ */}
          <section className="scroll-mt-20">
            <h2 className="mb-8 text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqs.map((faq) => (
                <div key={faq.q}>
                  <h3 className="mb-2 text-base font-semibold">{faq.q}</h3>
                  <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{faq.a}</p>
                  <Separator className="mt-6 bg-zinc-200 dark:bg-zinc-800" />
                </div>
              ))}
            </div>
          </section>

          {/* Internal links */}
          <div className="mt-12 border-t border-zinc-200 pt-8 dark:border-zinc-800">
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              See all {t.name.toLowerCase()} pedals & related guides
            </p>
            <div className="mb-6 flex flex-wrap gap-2">
              <Link
                href={`/${t.slug}`}
                className="rounded-md border border-orange-500/40 bg-orange-500/10 px-3 py-1.5 text-xs font-medium text-orange-500 transition-colors hover:bg-orange-500/20"
              >
                All {t.name} Pedals →
              </Link>
              {[
                { href: "/best", label: "Best by Category" },
                { href: "/compare", label: "Compare Pedals" },
                { href: "/pedalboard/builder", label: "Board Builder" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-xs text-zinc-600 transition-colors hover:border-orange-500/40 hover:text-orange-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Best pedals by type
            </p>
            <div className="flex flex-wrap gap-2">
              {siblingTypes.map((st) => (
                <Link
                  key={st.slug}
                  href={`/best/${st.slug}`}
                  className="rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-xs text-zinc-600 transition-colors hover:border-orange-500/40 hover:text-orange-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400"
                >
                  Best {st.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
