import Link from 'next/link'
import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import pedalsData from '@/data/pedals.json'

export const metadata: Metadata = {
  title: 'Boss Guitar Pedals — Complete Brand Guide 2026',
  description: 'The complete guide to Boss guitar pedals. Explore every Boss effect from the iconic DS-1 to the DD-8 delay. Built tough, priced right, trusted worldwide.',
  alternates: { canonical: '/boss' },
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
const bossPedals = allPedals.filter((p) => p.brand === 'Boss')

const faqs = [
  {
    q: 'Are Boss pedals true bypass?',
    a: "Most Boss pedals use buffered bypass, not true bypass. This is actually a feature — Boss buffers are high quality and help maintain signal integrity over long cable runs.",
  },
  {
    q: 'What is the best Boss pedal for beginners?',
    a: "The Boss DS-1 and SD-1 are both excellent starting points. They're affordable, durable, and cover the most essential gain tones.",
  },
  {
    q: 'How long do Boss pedals last?',
    a: 'Boss pedals are legendary for durability. Many players use pedals from the 1980s that still work perfectly. The die-cast zinc enclosure handles decades of gigging.',
  },
  {
    q: 'Do Boss pedals need a power supply?',
    a: "Boss pedals run on 9V DC (center negative) or a 9V battery. Compatible with any standard guitar pedal power supply.",
  },
]

export default function BossPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <div className="max-w-5xl mx-auto px-4 py-10">

        <nav className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-orange-400 transition-colors">Home</Link>
          <span>/</span>
          <span>Boss</span>
        </nav>

        <div className="mb-10">
          <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs uppercase tracking-wider mb-4">
            Brand Guide
          </Badge>
          <h1 className="text-4xl font-bold mb-4">
            Boss Guitar Pedals — The Industry Standard
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed max-w-3xl">
            Since 1976, Boss has been the most trusted name in guitar effects. Their compact,
            indestructible pedals have appeared on more pedalboards — from bedroom players to
            stadium headliners — than any other brand in history.
          </p>
        </div>

        <section className="mb-12 bg-gray-50 dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
          <h2 className="text-2xl font-bold mb-4">Why Boss Dominates the Pedalboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-zinc-600 dark:text-zinc-400">
            <div>
              <div className="text-2xl mb-2">🏗️</div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">Built to Last</h3>
              <p>Die-cast zinc enclosures survive decades of touring. Boss pedals from the 1980s still work perfectly today.</p>
            </div>
            <div>
              <div className="text-2xl mb-2">💰</div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">Unbeatable Value</h3>
              <p>Professional-quality effects at accessible prices. The DS-1 costs $62 and has been used on countless hit records.</p>
            </div>
            <div>
              <div className="text-2xl mb-2">🎸</div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">Proven by Legends</h3>
              <p>Kurt Cobain, Steve Vai, John Frusciante, and thousands of touring pros trust Boss on stage every night.</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">
            Boss Pedals — Full Lineup ({bossPedals.length} pedals)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {bossPedals.map((pedal) => (
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

        <section className="mb-12 bg-gray-50 dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
          <h2 className="text-2xl font-bold mb-4">Boss Brand History</h2>
          <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            <p>Boss was founded in 1976 as a division of Roland Corporation in Japan. Their first pedal, the CE-1 Chorus Ensemble, set the standard for chorus effects and is still sought after today.</p>
            <p>The iconic compact pedal format — the same size used today — was introduced in 1977 with the OD-1 OverDrive. This design became the template for the entire industry.</p>
            <p>Through the 1980s and 90s, Boss released some of the most influential pedals ever made: the DS-1 Distortion (1978), the DD-2 Digital Delay (1983, the world's first digital delay pedal), and the MT-2 Metal Zone (1991).</p>
            <p>Today Boss continues to innovate with digital multi-effects, the Waza Craft premium line, and modern takes on their classic designs — while maintaining the same bulletproof build quality that made them famous.</p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-gray-50 dark:bg-zinc-900 rounded-xl p-5 border border-zinc-200 dark:border-zinc-800">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">{faq.q}</h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">Related</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/behringer" className="bg-gray-100 dark:bg-zinc-800 hover:bg-orange-500/20 hover:text-orange-400 text-zinc-600 dark:text-zinc-400 text-sm px-4 py-2 rounded-lg transition-colors border border-zinc-200 dark:border-zinc-700">
              Behringer Pedals
            </Link>
            <Link href="/overdrive" className="bg-gray-100 dark:bg-zinc-800 hover:bg-orange-500/20 hover:text-orange-400 text-zinc-600 dark:text-zinc-400 text-sm px-4 py-2 rounded-lg transition-colors border border-zinc-200 dark:border-zinc-700">
              Best Overdrive Pedals
            </Link>
            <Link href="/distortion" className="bg-gray-100 dark:bg-zinc-800 hover:bg-orange-500/20 hover:text-orange-400 text-zinc-600 dark:text-zinc-400 text-sm px-4 py-2 rounded-lg transition-colors border border-zinc-200 dark:border-zinc-700">
              Best Distortion Pedals
            </Link>
            <Link href="/delay" className="bg-gray-100 dark:bg-zinc-800 hover:bg-orange-500/20 hover:text-orange-400 text-zinc-600 dark:text-zinc-400 text-sm px-4 py-2 rounded-lg transition-colors border border-zinc-200 dark:border-zinc-700">
              Best Delay Pedals
            </Link>
          </div>
        </section>

      </div>
    </main>
  )
}
