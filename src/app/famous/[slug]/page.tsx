import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import famousBoards from "@/data/famous-boards.json";
import pedals from "@/data/pedals.json";

type Pedal = (typeof pedals)[number];

const typeIcons: Record<string, string> = {
  overdrive: "🔥",
  distortion: "⚡",
  fuzz: "💥",
  delay: "🔁",
  reverb: "🌊",
  chorus: "🌀",
  phaser: "🌙",
  flanger: "🎛️",
  wah: "👄",
  compressor: "📦",
  tuner: "🎯",
  octave: "🎵",
  boost: "📈",
  tremolo: "〰️",
  looper: "🔄",
  eq: "🎚️",
};

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
    title: `${artist.name}'s Pedalboard — Guitar Pedals & Signal Chain`,
    description: `See every pedal on ${artist.name}'s pedalboard. Get affordable alternatives and load the entire rig into our free pedalboard builder.`,
    alternates: { canonical: `/famous/${slug}` },
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

  // Resolve each pedal against pedals.json
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

  const related = famousBoards.filter((a) => a.slug !== slug).slice(0, 3);

  const faq = [
    {
      q: `What pedals does ${artist.name} use?`,
      a: `${artist.name} is known for using ${resolvedPedals
        .slice(0, 3)
        .map((p) => p.name)
        .join(", ")}, among others. See the full list above.`,
    },
    {
      q: `How much does ${artist.name}'s pedalboard cost?`,
      a: `Recreating ${artist.name}'s rig with affordable alternatives costs around $${totalCost.toFixed(0)}. The originals can cost significantly more.`,
    },
    {
      q: `Can I get ${artist.name}'s tone on a budget?`,
      a: `Yes — each pedal above includes an affordable "Our Pick" alternative that captures the essential character of ${artist.name}'s sound without the vintage price tag.`,
    },
  ];

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 flex-wrap">
          <li><Link href="/" className="hover:underline">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/famous" className="hover:underline">Famous Pedalboards</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-foreground font-medium">{artist.name}</li>
        </ol>
      </nav>

      <h1 className="text-3xl font-bold mb-6">{artist.name}'s Pedalboard</h1>

      {/* Artist info card */}
      <Card className="mb-10">
        <CardContent className="pt-6 space-y-3">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xl font-semibold">{artist.name}</span>
            <Badge variant="secondary">{artist.genre}</Badge>
          </div>
          <p className="text-muted-foreground">{artist.description}</p>
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-1">Famous songs</p>
            <div className="flex flex-wrap gap-2">
              {artist.famousSongs.map((song) => (
                <Badge key={song} variant="outline">{song}</Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pedal list */}
      <h2 className="text-xl font-semibold mb-4">Pedals on the Board</h2>
      <div className="space-y-4 mb-8">
        {resolvedPedals.map((p, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-base">{typeIcons[p.type] ?? "🎸"}</span>
                <CardTitle className="text-base">{p.name}</CardTitle>
                <Badge variant="outline" className="text-xs capitalize">{p.type}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {p.match ? (
                <>
                  <div className="rounded-md bg-muted/50 dark:bg-muted/20 p-3 space-y-1">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Our Pick</p>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="font-medium">{p.match.name}</p>
                        <p className="text-sm text-muted-foreground">{p.match.brand}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${p.match.price}</p>
                        <p className="text-xs text-muted-foreground">★ {p.match.rating}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground italic">"{p.note}"</p>
                  <a
                    href={p.match.amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    Buy on Amazon →
                  </a>
                </>
              ) : (
                <p className="text-sm text-muted-foreground italic">Not in our database yet</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Total cost + Load rig */}
      <div className="rounded-xl border bg-muted/40 dark:bg-muted/20 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
        <div>
          <p className="text-sm text-muted-foreground">Total Rig Cost (alternatives)</p>
          <p className="text-2xl font-bold">${totalCost.toFixed(0)}</p>
        </div>
        <Link
          href={`/pedalboard/builder?pedals=${matchIds}`}
          className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-6 py-2.5 text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          Load This Rig →
        </Link>
      </div>

      <Separator className="mb-10" />

      {/* Related artists */}
      <h2 className="text-xl font-semibold mb-4">More Famous Pedalboards</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        {related.map((a) => (
          <Link key={a.slug} href={`/famous/${a.slug}`} className="group">
            <Card className="h-full transition-shadow group-hover:shadow-md dark:group-hover:border-primary">
              <CardContent className="pt-4 space-y-1">
                <p className="font-medium group-hover:underline">{a.name}</p>
                <Badge variant="outline" className="text-xs">{a.genre}</Badge>
                <p className="text-xs text-muted-foreground">{a.pedals.length} pedals</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Separator className="mb-10" />

      {/* FAQ */}
      <h2 className="text-xl font-semibold mb-6">Frequently Asked Questions</h2>
      <div className="space-y-6">
        {faq.map((item, i) => (
          <div key={i}>
            <h3 className="font-medium mb-1">{item.q}</h3>
            <p className="text-sm text-muted-foreground">{item.a}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
