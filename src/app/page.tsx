import Link from "next/link";
import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import pedalTypesData from "@/data/pedal-types.json";
import pedalsData from "@/data/pedals.json";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  title: "Guitar Pedals Guide 2026 — Find Your Perfect Tone | PedalRig",
  description:
    "Complete guide to guitar pedals. Compare the best overdrive, distortion, delay, fuzz, and compressor pedals. Build your pedalboard with our free visual tool.",
};
import signalChainData from "@/data/signal-chain.json";

type PedalType = {
  id: string;
  name: string;
  slug: string;
  icon: string;
  shortDescription: string;
};

type Pedal = {
  id: string;
  name: string;
  brand: string;
  type: string;
  price: number;
  rating: number;
  amazonUrl: string;
  description: string;
};

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <span className="text-orange-400 text-sm" aria-label={`${rating} out of 5 stars`}>
      {"★".repeat(full)}
      {half ? "½" : ""}
      {"☆".repeat(empty)}
      <span className="ml-1 text-gray-500 dark:text-gray-400">{rating}</span>
    </span>
  );
}

export default function HomePage() {
  const pedalTypes: PedalType[] = pedalTypesData.types;
  const topPedals: Pedal[] = [...pedalsData]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);
  const signalChain = signalChainData.order;

  return (
    <main>
      {/* Hero */}
      <section className="relative px-6 py-28 text-center bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Find Your Perfect{" "}
            <span className="text-orange-500">Guitar Pedals</span>
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 mb-10 max-w-xl mx-auto">
            Explore every effect type, discover top-rated pedals, and build
            your dream pedalboard — all in one place.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/types"
              className="inline-flex items-center justify-center rounded-md bg-orange-500 px-6 py-3 text-base font-semibold text-white hover:bg-orange-600 transition-colors"
            >
              Explore Pedal Types
            </Link>
            <Link
              href="/pedalboard/builder"
              className="inline-flex items-center justify-center rounded-md border border-gray-300 dark:border-gray-600 px-6 py-3 text-base text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Build Your Board
            </Link>
          </div>
        </div>
      </section>

      {/* Pedal Types Grid */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-2">Guitar Pedal Types</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-10">Every effect explained — from overdrive to reverb.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {pedalTypes.map((type) => (
            <Link key={type.id} href={`/${type.slug}`} className="group">
              <Card className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:border-orange-500 transition-colors h-full cursor-pointer">
                <CardContent className="p-5">
                  <div className="text-3xl mb-3">{type.icon}</div>
                  <h3 className="font-semibold group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors mb-1">
                    {type.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-snug">{type.shortDescription}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Top Rated Pedals */}
      <section className="px-6 py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-2">Top Rated Guitar Pedals</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-10">Highest-rated pedals trusted by guitarists worldwide.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topPedals.map((pedal) => (
              <Card key={pedal.id} className="bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 flex flex-col">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base font-semibold leading-tight">
                      {pedal.name}
                    </CardTitle>
                    <Badge className="bg-orange-500/10 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 border-orange-500/20 dark:border-orange-500/30 shrink-0 capitalize">
                      {pedal.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500">{pedal.brand}</p>
                </CardHeader>
                <CardContent className="flex flex-col gap-3 flex-1">
                  <StarRating rating={pedal.rating} />
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed flex-1">
                    {pedal.description.slice(0, 100)}…
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-2">
                    <span className="text-lg font-bold">${pedal.price}</span>
                    <a
                      href={pedal.amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-md bg-orange-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-orange-600 transition-colors"
                    >
                      View on Amazon
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Signal Chain Preview */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-2">Signal Chain Order</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-10">
          The right pedal order makes all the difference. Here&apos;s the standard signal chain for guitar pedals.
        </p>
        <div className="overflow-x-auto pb-4">
          <div className="flex items-center gap-1 min-w-max">
            <div className="flex flex-col items-center gap-1 px-2">
              <span className="text-2xl">🎸</span>
              <span className="text-xs text-gray-500">Guitar</span>
            </div>
            <span className="text-orange-500 text-lg">→</span>
            {signalChain.map((step, i) => (
              <div key={step.type} className="flex items-center gap-1">
                <div className="flex flex-col items-center gap-1 px-2">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-lg">
                    {step.icon}
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 text-center w-14 leading-tight">{step.label}</span>
                </div>
                {i < signalChain.length - 1 && (
                  <span className="text-orange-500/50 text-sm">→</span>
                )}
              </div>
            ))}
            <span className="text-orange-500 text-lg">→</span>
            <div className="flex flex-col items-center gap-1 px-2">
              <span className="text-2xl">🔊</span>
              <span className="text-xs text-gray-500">Amp</span>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <Link
            href="/pedal-order"
            className="inline-flex items-center justify-center rounded-md border border-orange-500 px-4 py-2 text-sm text-orange-600 dark:text-orange-400 hover:bg-orange-500/10 transition-colors"
          >
            Learn Signal Chain Order →
          </Link>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 py-24 bg-gradient-to-t from-gray-100 to-white dark:from-gray-900 dark:to-gray-950 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Build Your Pedalboard?
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            Use our interactive builder to plan your perfect guitar pedal setup — drag, drop, and dial in your tone.
          </p>
          <Link
            href="/pedalboard/builder"
            className="inline-flex items-center justify-center rounded-md bg-orange-500 px-8 py-3 text-base font-semibold text-white hover:bg-orange-600 transition-colors"
          >
            Start Building →
          </Link>
        </div>
      </section>
    </main>
  );
}
