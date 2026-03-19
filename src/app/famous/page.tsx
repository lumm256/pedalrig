import Link from "next/link";
import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import famousBoards from "@/data/famous-boards.json";

export const metadata: Metadata = {
  title: "Famous Guitar Pedalboards — See What the Pros Use",
  description:
    "Explore the pedalboards of legendary guitarists. See what pedals John Mayer, Jimi Hendrix, David Gilmour, The Edge, and more use on stage.",
  alternates: { canonical: "/famous" },
};

export default function FamousPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2">
          <li><Link href="/" className="hover:underline">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-foreground font-medium">Famous Pedalboards</li>
        </ol>
      </nav>

      <h1 className="text-3xl font-bold mb-3">Famous Guitar Pedalboards — What the Pros Use</h1>
      <p className="text-muted-foreground mb-10 max-w-2xl">
        Ever wondered what pedals your favorite guitarists actually use? We've broken down the
        rigs of legendary players — from Hendrix's fuzz to The Edge's delays — so you can
        understand their tone and find affordable alternatives.
      </p>

      {/* Artist grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
        {famousBoards.map((artist) => (
          <Link key={artist.slug} href={`/famous/${artist.slug}`} className="group">
            <Card className="h-full transition-shadow group-hover:shadow-md dark:group-hover:shadow-none dark:group-hover:border-primary">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg leading-tight">{artist.name}</CardTitle>
                  <Badge variant="secondary" className="shrink-0">{artist.pedals.length} pedals</Badge>
                </div>
                <Badge variant="outline" className="w-fit text-xs">{artist.genre}</Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  {artist.description.slice(0, 80)}…
                </p>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Famous songs</p>
                  <ul className="text-sm space-y-0.5">
                    {artist.famousSongs.slice(0, 3).map((song) => (
                      <li key={song} className="text-foreground">• {song}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* CTA */}
      <div className="rounded-xl border bg-muted/40 dark:bg-muted/20 p-8 text-center">
        <h2 className="text-xl font-semibold mb-2">Inspired by the pros?</h2>
        <p className="text-muted-foreground mb-5">
          Load any rig into our builder and customize it to fit your style and budget.
        </p>
        <Link
          href="/pedalboard/builder"
          className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-6 py-2.5 text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          Build your own version
        </Link>
      </div>
    </main>
  );
}
