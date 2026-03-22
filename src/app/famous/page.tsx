import Link from "next/link";
import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import famousBoards from "@/data/famous-boards.json";

export const metadata: Metadata = {
  title: "Famous Guitar Pedalboards — See What 20 Legendary Guitarists Use (2026)",
  description:
    "Explore the pedalboards of 20 legendary guitarists including Hendrix, Gilmour, Slash, The Edge, Cobain, and more. See every pedal and get affordable alternatives.",
  alternates: { canonical: "/famous" },
  keywords: [
    "famous pedalboards",
    "celebrity guitar pedals",
    "guitarist pedalboard",
    "famous guitarist gear",
    "guitar rig rundown",
  ],
};

export default function FamousPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <div className="max-w-6xl mx-auto px-4 py-10 sm:py-14">
        {/* Breadcrumb */}
        <nav
          className="text-sm text-zinc-500 mb-6"
          aria-label="Breadcrumb"
        >
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-zinc-900 dark:text-zinc-100 font-medium">
              Famous Pedalboards
            </li>
          </ol>
        </nav>

        <header className="mb-10">
          <Badge className="mb-3 bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs">
            {famousBoards.length} Artists
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            Famous Guitar Pedalboards — What the Pros Use
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
            Ever wondered what pedals your favorite guitarists actually use?
            We&apos;ve broken down the rigs of {famousBoards.length} legendary
            players — from Hendrix&apos;s fuzz to The Edge&apos;s delays — so
            you can understand their tone and find affordable alternatives.
          </p>
        </header>

        {/* Artist grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-14">
          {famousBoards.map((artist) => (
            <Link
              key={artist.slug}
              href={`/famous/${artist.slug}`}
              className="group"
            >
              <Card className="h-full bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 transition-all group-hover:border-orange-500/40 group-hover:shadow-md dark:group-hover:shadow-none">
                <CardContent className="pt-5 pb-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="font-bold text-base leading-tight group-hover:text-orange-500 transition-colors">
                      {artist.name}
                    </h2>
                    <Badge
                      variant="outline"
                      className="shrink-0 text-[10px] border-zinc-300 dark:border-zinc-700"
                    >
                      {artist.pedals.length}
                    </Badge>
                  </div>
                  <Badge className="bg-orange-500/10 text-orange-500 border-orange-500/20 text-[10px]">
                    {artist.genre}
                  </Badge>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
                    {artist.description.slice(0, 100)}…
                  </p>
                  <div>
                    <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-1">
                      Top Songs
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {artist.famousSongs.slice(0, 2).map((song) => (
                        <span
                          key={song}
                          className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                        >
                          {song}
                        </span>
                      ))}
                      {artist.famousSongs.length > 2 && (
                        <span className="text-[10px] text-zinc-400">
                          +{artist.famousSongs.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* CTA section */}
        <div className="rounded-xl bg-gradient-to-br from-orange-500/10 to-zinc-50 dark:to-zinc-900 border border-orange-500/20 p-8 text-center">
          <h2 className="text-xl font-bold mb-2">Inspired by the pros?</h2>
          <p className="text-zinc-500 dark:text-zinc-400 mb-6 max-w-lg mx-auto">
            Load any rig into our builder and customize it to fit your style
            and budget. Or learn why pedal order matters.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/pedalboard/builder"
              className="inline-flex items-center px-6 py-2.5 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors text-sm"
            >
              Open Board Builder →
            </Link>
            <Link
              href="/pedal-order"
              className="inline-flex items-center px-6 py-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors text-sm border border-zinc-200 dark:border-zinc-700"
            >
              Signal Chain Guide
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
