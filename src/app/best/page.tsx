import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TypeIcon } from "@/components/type-icon";
import pedalsData from "@/data/pedals.json";
import pedalTypesData from "@/data/pedal-types.json";

export const metadata: Metadata = {
  title: "Best Guitar Pedals 2026 — Top Picks Across Every Category",
  description:
    "Our top guitar pedal picks for 2026. Best overdrive, distortion, delay, fuzz, reverb, and more — tested and compared.",
  alternates: { canonical: "/best" },
};

type Pedal = (typeof pedalsData)[0];

function getTopByType(type: string, count = 2): Pedal[] {
  return pedalsData
    .filter((p) => p.type === type)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, count);
}

const FEATURED_TYPES = [
  "overdrive",
  "distortion",
  "fuzz",
  "delay",
  "reverb",
  "compressor",
  "chorus",
  "phaser",
  "tremolo",
  "wah",
];

const budgetPedal = pedalsData
  .filter((p) => p.rating > 4.3)
  .sort((a, b) => a.price - b.price)[0];

const premiumPedal = pedalsData
  .filter((p) => p.rating > 4.8)
  .sort((a, b) => b.price - a.price)[0];

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="text-orange-500 font-semibold text-sm">
      {"★".repeat(Math.floor(rating))}
      {"☆".repeat(5 - Math.floor(rating))} {rating.toFixed(1)}
    </span>
  );
}

function PedalCard({ pedal, badge }: { pedal: Pedal; badge?: string }) {
  return (
    <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            {badge && (
              <span className="inline-block text-xs font-bold text-orange-500 uppercase tracking-wide mb-1">
                {badge}
              </span>
            )}
            <CardTitle className="text-base leading-snug">
                <Link href={`/pedals/${pedal.id}`} className="hover:text-orange-400 transition-colors hover:underline underline-offset-2">
                  {pedal.name}
                </Link>
              </CardTitle>
            <p className="text-sm text-zinc-400 dark:text-zinc-500">{pedal.brand}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-xl font-bold text-orange-500">${pedal.price}</p>
            <StarRating rating={pedal.rating} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{pedal.description}</p>
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <p className="text-xs font-semibold text-green-500 uppercase tracking-wide mb-1">Pros</p>
            <ul className="space-y-1">
              {pedal.pros.slice(0, 3).map((pro) => (
                <li key={pro} className="text-xs text-zinc-500 dark:text-zinc-400 flex items-start gap-1.5">
                  <span className="text-green-500 flex-shrink-0">+</span> {pro}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-red-400 uppercase tracking-wide mb-1">Cons</p>
            <ul className="space-y-1">
              {pedal.cons.slice(0, 2).map((con) => (
                <li key={con} className="text-xs text-zinc-500 dark:text-zinc-400 flex items-start gap-1.5">
                  <span className="text-red-400 flex-shrink-0">−</span> {con}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <a
          href={pedal.amazonUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition-colors"
        >
          View on Amazon →
        </a>
      </CardContent>
    </Card>
  );
}

export default function BestPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-12">

        {/* Breadcrumb */}
        <nav className="text-sm text-zinc-500 dark:text-zinc-400 mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-orange-500 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-zinc-700 dark:text-zinc-300">Best Pedals 2026</span>
        </nav>

        {/* H1 */}
        <h1 className="text-4xl font-bold mb-4">Best Guitar Pedals 2026 — Our Top Picks</h1>
        <p className="text-lg text-zinc-500 dark:text-zinc-400 mb-4 leading-relaxed">
          We went through every major pedal category and picked the best option at each price point.
          These are the pedals that consistently earn top marks from players, hold their value, and
          actually deliver on their promises.
        </p>
        <p className="text-zinc-500 dark:text-zinc-400 mb-12 leading-relaxed">
          Rankings are based on rating, real-world playability, build quality, and value. Updated for 2026.
        </p>

        <Separator className="mb-12 bg-zinc-200 dark:bg-zinc-800" />

        {/* Per-type sections */}
        {FEATURED_TYPES.map((typeId) => {
          const typeInfo = pedalTypesData.types.find((t) => t.id === typeId);
          if (!typeInfo) return null;
          const [best, runnerUp] = getTopByType(typeId);
          if (!best) return null;
          return (
            <section key={typeId} className="mb-16">
              <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <TypeIcon icon={typeInfo.icon} name={typeInfo.name} size={32} />
                  Best {typeInfo.name} Pedal
                </h2>
                <Link
                  href={`/${typeId}`}
                  className="text-sm text-orange-500 hover:text-orange-400 transition-colors"
                >
                  See all {typeInfo.name} pedals →
                </Link>
              </div>
              <PedalCard pedal={best} badge={`🏆 Best ${typeInfo.name} 2026`} />
              {runnerUp && (
                <div className="mt-3 px-4 py-3 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-4 flex-wrap">
                  <div>
                    <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">Runner Up</span>
                    <p className="text-sm font-medium mt-0.5">
                      <Link href={`/pedals/${runnerUp.id}`} className="hover:text-orange-400 transition-colors hover:underline underline-offset-2">
                        {runnerUp.name}
                      </Link>
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <StarRating rating={runnerUp.rating} />
                    <span className="font-bold text-orange-500">${runnerUp.price}</span>
                    <a
                      href={runnerUp.amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs px-3 py-1.5 rounded-lg border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors"
                    >
                      View →
                    </a>
                  </div>
                </div>
              )}
              <Separator className="mt-10 bg-zinc-200 dark:bg-zinc-800" />
            </section>
          );
        })}

        {/* Best Budget */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
            💰 Best Budget Pedal
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 mb-6">
            Highest-rated pedal under the lowest price point with a rating above 4.3.
          </p>
          {budgetPedal && <PedalCard pedal={budgetPedal} badge="Best Budget Pick" />}
          <Separator className="mt-10 bg-zinc-200 dark:bg-zinc-800" />
        </section>

        {/* Best Premium */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
            👑 Best Premium Pedal
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 mb-6">
            The highest-priced pedal with a rating above 4.8 — for players who want the absolute best.
          </p>
          {premiumPedal && <PedalCard pedal={premiumPedal} badge="Best Premium Pick" />}
        </section>

        {/* CTA */}
        <section className="rounded-xl bg-gradient-to-br from-orange-500/10 to-zinc-100 dark:to-zinc-900 border border-orange-500/20 p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Build your perfect board</h2>
          <p className="text-zinc-500 dark:text-zinc-400 mb-6">
            Use our Pedalboard Builder to plan your setup, check power requirements, and see how
            everything fits together.
          </p>
          <Link
            href="/pedalboard/builder"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors"
          >
            Try the Board Builder →
          </Link>
        </section>

      </div>
    </main>
  );
}
