import Link from 'next/link'
import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import pedalsData from '@/data/pedals.json'

export const metadata: Metadata = {
  title: 'Best Guitar Pedals for Blues 2026 — Tone Guide',
  description: 'Find the best guitar pedals for blues tone. From overdrive and compressor to reverb and delay — build the perfect blues pedalboard.',
  alternates: { canonical: '/style/blues' },
}

type Pedal = {
  id: string
  name: string
  brand: string
  type: string
  price: number
  rating: number
  reviewCount: number
  amazonUrl: string
  description: string
  bestFor: string[]
}

const allPedals = pedalsData as Pedal[]
const bluesPedals = allPedals.filter((p) =>
  p.bestFor.some((b) => b.toLowerCase() === 'blues')
)

const faqs = [
  {
    q: 'What pedals do blues guitarists use?',
    a: 'The core blues pedalboard is overdrive (Tube Screamer or SD-1), compressor, and reverb. Many blues players also use a wah and a clean boost for solos.',
  },
  {
    q: 'Do I need pedals for blues?',
    a: 'Not necessarily — a good amp and guitar are the foundation. But an overdrive pedal and reverb can dramatically enhance your blues tone, especially at lower volumes.',
  },
  {
    q: 'What overdrive is best for blues?',
    a: 'The Ibanez TS9 Tube Screamer and Boss SD-1 are the two most iconic blues overdrives. Both push your amp into natural breakup and respond beautifully to picking dynamics.',
  },
  {
    q: 'What did Stevie Ray Vaughan use?',
    a: 'SRV famously used a Tube Screamer (TS808) into a cranked Dumble amp, with a Dallas Arbiter Fuzz Face and an Ibanez Analog Delay. His tone came mostly from his hands and amp.',
  },
]

export default function BluesPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <div className="max-w-5xl mx-auto px-4 py-10">

        <nav className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-orange-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/style" className="hover:text-orange-400 transition-colors">Style</Link>
          <span>/</span>
          <span>Blues</span>
        </nav>

        <div className="mb-10">
          <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs uppercase tracking-wider mb-4">
            Style Guide
          </Badge>
          <h1 className="text-4xl font-bold mb-4">Best Guitar Pedals for Blues</h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed max-w-3xl">
            Blues tone is all about feel — warm, dynamic, and expressive. The right pedals
            enhance your playing without getting in the way. Here is everything you need to
            build an authentic blues pedalboard.
          </p>
        </div>

        <section className="mb-12 bg-gray-50 dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
          <h2 className="text-2xl font-bold mb-4">The Blues Tone Formula</h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-6">
            Great blues tone starts with a good amp and guitar. Pedals add color and sustain — they should feel like an extension of your hands, not a wall between you and the music.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-zinc-800 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700">
              <div className="text-2xl mb-2">🔥</div>
              <h3 className="font-semibold mb-1">Overdrive</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm">A transparent overdrive like the Tube Screamer pushes your amp into natural breakup. Keep the gain low and let your picking dynamics do the work.</p>
            </div>
            <div className="bg-white dark:bg-zinc-800 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="font-semibold mb-1">Compressor</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm">A subtle compressor adds sustain to your notes and evens out your picking attack — essential for that smooth, singing blues lead tone.</p>
            </div>
            <div className="bg-white dark:bg-zinc-800 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700">
              <div className="text-2xl mb-2">🏔️</div>
              <h3 className="font-semibold mb-1">Reverb</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm">A touch of spring or room reverb adds depth and space. Think of the natural reverb of a small club — present but not overwhelming.</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-2">Classic Blues Guitarists and Their Pedals</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'Stevie Ray Vaughan', pedals: 'Ibanez TS808, Dallas Arbiter Fuzz Face, Ibanez Analog Delay' },
              { name: 'John Mayer', pedals: 'Klon Centaur, Tube Screamer, Fulltone OCD, Strymon Timeline' },
              { name: 'BB King', pedals: 'Minimal — mostly amp and guitar. Occasional treble booster.' },
              { name: 'Gary Clark Jr.', pedals: 'Fuzz Face, Tube Screamer, Whammy, various boutique overdrives' },
            ].map((artist) => (
              <div key={artist.name} className="bg-gray-50 dark:bg-zinc-900 rounded-lg p-4 border border-zinc-200 dark:border-zinc-800">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">{artist.name}</h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm">{artist.pedals}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">
            Recommended Blues Pedals ({bluesPedals.length} pedals)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {bluesPedals.map((pedal) => (
              <Card key={pedal.id} className="bg-gray-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-orange-500/50 transition-all duration-200">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base leading-tight">{pedal.name}</CardTitle>
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
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    View on Amazon
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-gray-50 dark:bg-zinc-900 rounded-xl p-5 border border-zinc-200 dark:border-zinc-800">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">{faq.q}</h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">Related Guides</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/style/rock" className="bg-gray-100 dark:bg-zinc-800 hover:bg-orange-500/20 hover:text-orange-400 text-zinc-600 dark:text-zinc-400 text-sm px-4 py-2 rounded-lg transition-colors border border-zinc-200 dark:border-zinc-700">
              Rock Pedals →
            </Link>
            <Link href="/overdrive" className="bg-gray-100 dark:bg-zinc-800 hover:bg-orange-500/20 hover:text-orange-400 text-zinc-600 dark:text-zinc-400 text-sm px-4 py-2 rounded-lg transition-colors border border-zinc-200 dark:border-zinc-700">
              Overdrive Guide →
            </Link>
            <Link href="/compressor" className="bg-gray-100 dark:bg-zinc-800 hover:bg-orange-500/20 hover:text-orange-400 text-zinc-600 dark:text-zinc-400 text-sm px-4 py-2 rounded-lg transition-colors border border-zinc-200 dark:border-zinc-700">
              Compressor Guide →
            </Link>
            <Link href="/beginners" className="bg-gray-100 dark:bg-zinc-800 hover:bg-orange-500/20 hover:text-orange-400 text-zinc-600 dark:text-zinc-400 text-sm px-4 py-2 rounded-lg transition-colors border border-zinc-200 dark:border-zinc-700">
              Beginner Guide →
            </Link>
          </div>
        </section>

      </div>
    </main>
  )
}
