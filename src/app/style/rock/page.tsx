import Link from 'next/link'
import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import pedalsData from '@/data/pedals.json'

export const metadata: Metadata = {
  title: 'Best Guitar Pedals for Rock 2026 — Essential Effects',
  description: 'Build the ultimate rock pedalboard. From distortion and delay to chorus and wah — the essential guitar pedals for every rock style.',
  alternates: { canonical: '/style/rock' },
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
const rockPedals = allPedals.filter((p) =>
  p.bestFor.some((b) => b.toLowerCase() === 'rock')
)

const faqs = [
  {
    q: 'What pedals do rock guitarists need?',
    a: 'The essential rock pedalboard starts with a distortion or overdrive, a delay, and a tuner. From there, chorus, wah, and phaser add character and variety.',
  },
  {
    q: 'Distortion vs overdrive for rock?',
    a: 'Overdrive works best for classic rock and blues-rock — it responds to your dynamics and sounds amp-like. Distortion is better for hard rock and punk where you want consistent, aggressive gain.',
  },
  {
    q: 'What delay pedal is best for rock?',
    a: 'The Boss DD-8 and MXR Carbon Copy are both excellent. For classic rock, an analog delay like the Carbon Copy adds warmth. For modern rock, the DD-8 offers more versatility.',
  },
  {
    q: 'Do I need a noise gate for rock?',
    a: 'If you use high-gain distortion, a noise gate helps eliminate hum and hiss between notes. The Boss NS-2 is the industry standard for live use.',
  },
]

export default function RockPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <div className="max-w-5xl mx-auto px-4 py-10">

        <nav className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-orange-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/style" className="hover:text-orange-400 transition-colors">Style</Link>
          <span>/</span>
          <span>Rock</span>
        </nav>

        <div className="mb-10">
          <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs uppercase tracking-wider mb-4">
            Style Guide
          </Badge>
          <h1 className="text-4xl font-bold mb-4">Best Guitar Pedals for Rock</h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed max-w-3xl">
            Rock guitar is built on gain, attitude, and power. Whether you play classic rock,
            indie, grunge, or hard rock, the right pedals define your sound. Here is the
            essential guide to building a rock pedalboard.
          </p>
        </div>

        <section className="mb-12 bg-gray-50 dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
          <h2 className="text-2xl font-bold mb-4">The Rock Pedalboard Blueprint</h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-6">
            Rock tone is about controlled aggression. Start with your gain stage, add time-based effects for depth, and use modulation to add character.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-zinc-800 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700">
              <div className="text-2xl mb-2">⚡</div>
              <h3 className="font-semibold mb-1">Distortion</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm">The foundation of rock tone. A good distortion pedal gives you consistent, powerful gain that cuts through any mix. The Boss DS-1 and ProCo RAT are classics.</p>
            </div>
            <div className="bg-white dark:bg-zinc-800 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700">
              <div className="text-2xl mb-2">🔁</div>
              <h3 className="font-semibold mb-1">Delay</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm">Delay adds depth and space to your solos and riffs. A slapback delay thickens rhythm parts; longer repeats create epic lead tones.</p>
            </div>
            <div className="bg-white dark:bg-zinc-800 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700">
              <div className="text-2xl mb-2">🌊</div>
              <h3 className="font-semibold mb-1">Chorus</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm">Chorus thickens your clean and lightly driven tones. Essential for 80s rock, grunge, and alternative — think Nirvana and The Police.</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">
            Rock Pedals ({rockPedals.length} pedals)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {rockPedals.map((pedal) => (
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
          <h2 className="text-xl font-bold mb-4">Explore More</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/style/blues" className="bg-gray-100 dark:bg-zinc-800 hover:bg-orange-500/20 hover:text-orange-400 text-zinc-700 dark:text-zinc-300 text-sm px-4 py-2 rounded-lg transition-colors border border-zinc-200 dark:border-zinc-700">
              Blues Pedals
            </Link>
            <Link href="/style/metal" className="bg-gray-100 dark:bg-zinc-800 hover:bg-orange-500/20 hover:text-orange-400 text-zinc-700 dark:text-zinc-300 text-sm px-4 py-2 rounded-lg transition-colors border border-zinc-200 dark:border-zinc-700">
              Metal Pedals
            </Link>
            <Link href="/distortion" className="bg-gray-100 dark:bg-zinc-800 hover:bg-orange-500/20 hover:text-orange-400 text-zinc-700 dark:text-zinc-300 text-sm px-4 py-2 rounded-lg transition-colors border border-zinc-200 dark:border-zinc-700">
              Distortion Pedals
            </Link>
            <Link href="/delay" className="bg-gray-100 dark:bg-zinc-800 hover:bg-orange-500/20 hover:text-orange-400 text-zinc-700 dark:text-zinc-300 text-sm px-4 py-2 rounded-lg transition-colors border border-zinc-200 dark:border-zinc-700">
              Delay Pedals
            </Link>
          </div>
        </section>

      </div>
    </main>
  )
}
