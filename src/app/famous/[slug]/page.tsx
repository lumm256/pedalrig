import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TypeIcon } from "@/components/type-icon";
import famousBoards from "@/data/famous-boards.json";
import pedals from "@/data/pedals.json";
import pedalTypes from "@/data/pedal-types.json";

type Pedal = (typeof pedals)[number];

const typeIconMap: Record<string, string> = Object.fromEntries(
  pedalTypes.types.map((t) => [t.id, t.icon])
);

export async function generateStaticParams() {
  return famousBoards.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const artist = famousBoards.find((a) => a.slug === slug);
  if (!artist) return {};
  return {
    title: `${artist.name} Pedalboard & Gear — Every Pedal Explained (2026)`,
    description: `Complete breakdown of ${artist.name}'s pedalboard. See every pedal, understand the signal chain, and get affordable alternatives. ${artist.pedals.length} pedals analyzed.`,
    alternates: { canonical: `/famous/${slug}` },
    keywords: [
      `${artist.name} pedalboard`,
      `${artist.name} pedals`,
      `${artist.name} gear`,
      `${artist.name} signal chain`,
      `${artist.name} tone`,
    ],
  };
}

function jsonLd(artist: (typeof famousBoards)[number], totalCost: number) {
  const faq = [
    {
      q: `What pedals does ${artist.name} use?`,
      a: `${artist.name} uses ${artist.pedals.map((p) => p.name).join(", ")}. See our full breakdown above with affordable alternatives for each pedal.`,
    },
    {
      q: `How much does it cost to recreate ${artist.name}'s pedalboard?`,
      a: `You can recreate ${artist.name}'s rig with affordable alternatives for around $${totalCost}. The original pedals may cost significantly more.`,
    },
    {
      q: `What is ${artist.name}'s signature guitar tone?`,
      a: (artist as Record<string, unknown>).signatureSound as string || artist.description,
    },
  ];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: `${artist.name}'s Pedalboard — Every Pedal Explained`,
        description: artist.description,
        author: { "@type": "Organization", name: "PedalRig" },
        publisher: {
          "@type": "Organization",
          name: "PedalRig",
          url: "https://pedalrig.com",
        },
        datePublished: "2026-03-22",
        dateModified: "2026-03-22",
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}

export default async function FamousArtistPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const artist = famousBoards.find((a) => a.slug === slug);
  if (!artist) notFound();

  const resolvedPedals = artist.pedals.map((p) => ({
    ...p,
    match: (pedals as Pedal[]).find((d) => d.id === p.matchId) ?? null,
  }));

  const totalCost = resolvedPedals.reduce(
    (sum, p) => sum + (p.match?.price ?? 0),
    0
  );

  const matchIds = resolvedPedals
    .filter((p) => p.match)
    .map((p) => p.matchId)
    .join(",");

  // Show up to 5 related artists, prefer same genre, exclude self
  const related = famousBoards
    .filter((a) => a.slug !== slug)
    .sort((a, b) => {
      const aMatch = a.genre.split(/[\/,]/).some((g) =>
        artist.genre.includes(g.trim())
      ) ? 1 : 0;
      const bMatch = b.genre.split(/[\/,]/).some((g) =>
        artist.genre.includes(g.trim())
      ) ? 1 : 0;
      return bMatch - aMatch;
    })
    .slice(0, 5);

  const signatureSound = (artist as Record<string, unknown>).signatureSound as string | undefined;

  const faq = [
    {
      q: `What pedals does ${artist.name} use?`,
      a: `${artist.name} is known for using ${resolvedPedals
        .slice(0, 4)
        .map((p) => p.name)
        .join(", ")}, among others. See the full breakdown above with affordable alternatives.`,
    },
    {
      q: `How much does ${artist.name}'s pedalboard cost to recreate?`,
      a: `Recreating ${artist.name}'s rig with affordable alternatives costs around $${totalCost.toFixed(0)}. The original pedals — especially vintage or signature models — can cost significantly more.`,
    },
    {
      q: `Can I get ${artist.name}'s tone on a budget?`,
      a: `Yes — each pedal above includes an affordable "Our Pick" alternative that captures the essential character of ${artist.name}'s sound. Focus on the 2-3 most important pedals first.`,
    },
    {
      q: `What amp does ${artist.name} use?`,
      a: `${artist.name}'s amp is a crucial part of their tone. While we focus on pedals here, check our signal chain guide for how pedal order affects your amp interaction.`,
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd(artist, totalCost)),
        }}
      />
      <main className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
        <div className="max-w-4xl mx-auto px-4 py-10 sm:py-14">
          {/* Breadcrumb */}
          <nav
            className="text-sm text-zinc-500 mb-6"
            aria-label="Breadcrumb"
          >
            <ol className="flex items-center gap-2 flex-wrap">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/famous" className="hover:underline">
                  Famous Pedalboards
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-zinc-900 dark:text-zinc-100 font-medium">
                {artist.name}
              </li>
            </ol>
          </nav>

          {/* Hero */}
          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              {artist.name}&apos;s Pedalboard
            </h1>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                {artist.genre}
              </Badge>
              <Badge
                variant="outline"
                className="border-zinc-300 dark:border-zinc-700"
              >
                {artist.pedals.length} pedals
              </Badge>
              <Badge
                variant="outline"
                className="border-zinc-300 dark:border-zinc-700"
              >
                ~${totalCost.toFixed(0)} to recreate
              </Badge>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
              {artist.description}
            </p>
            {signatureSound && (
              <div className="mt-4 p-4 rounded-lg bg-orange-500/5 border border-orange-500/15">
                <p className="text-xs font-semibold text-orange-500 uppercase tracking-wider mb-1">
                  Signature Sound
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {signatureSound}
                </p>
              </div>
            )}
          </header>

          {/* Famous Songs */}
          <div className="mb-10">
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
              Famous Songs
            </p>
            <div className="flex flex-wrap gap-2">
              {artist.famousSongs.map((song) => (
                <Badge
                  key={song}
                  variant="outline"
                  className="border-zinc-300 dark:border-zinc-700"
                >
                  {song}
                </Badge>
              ))}
            </div>
          </div>

          <Separator className="mb-10 bg-zinc-200 dark:bg-zinc-800" />

          {/* Pedal list */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">
              Every Pedal on the Board
            </h2>
            <div className="space-y-4">
              {resolvedPedals.map((p, i) => {
                const icon = typeIconMap[p.type] || "";
                return (
                  <Card
                    key={i}
                    className="bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 overflow-hidden"
                  >
                    <CardHeader className="pb-2">
                      <div className="flex flex-wrap items-center gap-2">
                        {icon && (
                          <TypeIcon icon={icon} name={p.type} size={20} />
                        )}
                        <CardTitle className="text-base">{p.name}</CardTitle>
                        <Badge
                          variant="outline"
                          className="text-xs capitalize border-zinc-300 dark:border-zinc-700"
                        >
                          {p.type}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {p.match ? (
                        <>
                          <div className="rounded-md bg-zinc-100 dark:bg-zinc-800/50 p-3 space-y-2">
                            <p className="text-xs font-semibold text-orange-500 uppercase tracking-wide">
                              Our Pick — Affordable Alternative
                            </p>
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <Link
                                href={`/pedals/${p.match.id}`}
                                className="hover:underline"
                              >
                                <p className="font-medium">{p.match.name}</p>
                              </Link>
                              <p className="font-semibold text-orange-500">
                                ${p.match.price}
                              </p>
                            </div>
                          </div>
                          <p className="text-sm text-zinc-500 dark:text-zinc-400 italic">
                            &ldquo;{p.note}&rdquo;
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <Link
                              href={`/pedals/${p.match.id}`}
                              className="inline-flex items-center px-3 py-1.5 rounded-md border border-zinc-200 dark:border-zinc-700 text-sm hover:border-orange-500/40 transition-colors"
                            >
                              View Details
                            </Link>
                            {p.match.amazonUrl && (
                              <a
                                href={p.match.amazonUrl}
                                target="_blank"
                                rel="noopener noreferrer sponsored"
                                className="inline-flex items-center px-3 py-1.5 rounded-md bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 transition-colors"
                              >
                                Buy on Amazon →
                              </a>
                            )}
                          </div>
                        </>
                      ) : (
                        <p className="text-sm text-zinc-500 italic">
                          Not in our database yet
                        </p>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Total cost + Load rig CTA */}
          <div className="rounded-xl bg-gradient-to-br from-orange-500/10 to-zinc-50 dark:to-zinc-900 border border-orange-500/20 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
            <div>
              <p className="text-sm text-zinc-500">
                Total Rig Cost (affordable alternatives)
              </p>
              <p className="text-3xl font-bold text-orange-500">
                ${totalCost.toFixed(0)}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/pedalboard/builder?pedals=${matchIds}`}
                className="inline-flex items-center px-6 py-2.5 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors text-sm"
              >
                Load This Rig →
              </Link>
              <Link
                href="/pedal-order"
                className="inline-flex items-center px-6 py-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors text-sm border border-zinc-200 dark:border-zinc-700"
              >
                Signal Chain Guide
              </Link>
            </div>
          </div>

          <Separator className="mb-10 bg-zinc-200 dark:bg-zinc-800" />

          {/* Related artists */}
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-4">
              More Famous Pedalboards
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map((a) => (
                <Link
                  key={a.slug}
                  href={`/famous/${a.slug}`}
                  className="group"
                >
                  <Card className="h-full bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 transition-all group-hover:border-orange-500/40">
                    <CardContent className="pt-4 space-y-1.5">
                      <p className="font-medium group-hover:text-orange-500 transition-colors">
                        {a.name}
                      </p>
                      <Badge
                        variant="outline"
                        className="text-xs border-zinc-300 dark:border-zinc-700"
                      >
                        {a.genre}
                      </Badge>
                      <p className="text-xs text-zinc-500">
                        {a.pedals.length} pedals
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          <Separator className="mb-10 bg-zinc-200 dark:bg-zinc-800" />

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faq.map((item) => (
                <div key={item.q}>
                  <h3 className="font-semibold mb-1.5 text-base">{item.q}</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {item.a}
                  </p>
                  <Separator className="mt-6 bg-zinc-200 dark:bg-zinc-800" />
                </div>
              ))}
            </div>
          </section>

          {/* Internal links */}
          <div className="pt-4">
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
              Explore More
            </p>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/famous"
                className="px-3 py-1.5 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs hover:border-orange-500/40 transition-colors"
              >
                All Famous Pedalboards
              </Link>
              <Link
                href="/pedal-order"
                className="px-3 py-1.5 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs hover:border-orange-500/40 transition-colors"
              >
                Signal Chain Guide
              </Link>
              <Link
                href="/compare"
                className="px-3 py-1.5 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs hover:border-orange-500/40 transition-colors"
              >
                Compare Pedals
              </Link>
              <Link
                href="/pedalboard/builder"
                className="px-3 py-1.5 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs hover:border-orange-500/40 transition-colors"
              >
                Board Builder
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
