import Link from 'next/link'
import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import pedalsData from '@/data/pedals.json'

export const metadata: Metadata = {
  title: 'Behringer Guitar Pedals — Best Budget Effects 2026',
  description: 'Behringer guitar pedals deliver great tone at unbeatable prices. Explore the full lineup of budget-friendly effects that punch way above their weight.',
  alternates: { canonical: '/behringer' },
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
const behringerPedals = allPedals.filter((p) => p.brand === 'Behringer')

const faqs = [
  {
    q: 'Are Behringer pedals any good?',
    a: 'Yes — Behringer pedals are surprisingly capable for the price. They are ideal for beginners, practice rigs, and backup boards. Many are based on classic circuits that have been proven for decades.',
  },
  {
    q: 'How do Behringer pedals compare to Boss?',
    a: 'Boss pedals have better build quality and reliability for gigging. Behringer pedals cost significantly less and are great for home use, practice, and experimenting with new effects.',
  },
  {
    q: 'Do Behringer pedals use true bypass?',
    a: 'Most Behringer pedals use true bypass switching, which is actually better than many pricier alternatives for preserving your tone when the effect is off.',
  },
  {
    q: 'Are Behringer pedals good for beginners?',
    a: 'Absolutely. Behringer pedals let beginners explore a wide range of effects without a large investment. Once you know what you like, you can upgrade to premium versions.',
  },
]

export default function BehringerPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <div className="max-w-5xl mx-auto px-4 py-10">

        <nav className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-orange-400 transition-colors">Home</Link>
          <span>/</span>
          <span>Behringer</span>
        </nav>

        <div className="mb-10">
          <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs uppercase tracking-wider mb-4">
            Brand Guide
          </Badge>
          <h1 className="text-4xl font-bold mb-4">
            Behringer Guitar Pedals — Great Tone on a Budget
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed max-w-3xl">
            Behringer has made professional-grade effects accessible to every guitarist. Their pedals
            deliver classic tones at a fraction of the cost, making them the go-to choice for
            beginners, students, and budget-conscious players worldwide.
          </p>
        </div>

        <section className="mb-12 bg-gray-50 dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
          <h2 className="text-2xl font-bold mb-4">Why Behringer is Worth Your Attention</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-zinc-600 dark:text-zinc-400">
            <div>
              <div className="text-2xl mb-2">💵</div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">Lowest Prices</h3>
              <p>Most Behringer pedals cost under $30. You can build a complete pedalboard for less than the price of a single boutique pedal.</p>
            </div>
            <div>
              <div className="text-2xl mb-2">🎛️</div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">Classic Circuits</h3>
              <p>Many Behringer pedals are based on legendary circuits — the TO800 mirrors the Tube Screamer, the SF300 channels the Big Muff.</p>
            </div>
            <div>
              <div className="text-2xl mb-2">✅</div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">True Bypass</h3>
              <p>Most Behringer pedals feature true bypass switching, preserving your tone when the effect is disengaged.</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-2">Behringer Pedals</h2>
          {behringerPedals.length === 0 ? (
            <p className="text-zinc-500 dark:text-zinc-400">No Behringer pedals in the database yet. Check back soon.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {behringerPedals.map((pedal) => (
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
          )}
        </section>

        <section className="mb-12 bg-gray-50 dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
          <h2 className="text-2xl font-bold mb-4">Popular Behringer Pedals to Know</h2>
          <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
            <li><span className="font-semibold text-zinc-900 dark:text-zinc-100">TO800 Vintage Tube Overdrive</span> — A Tube Screamer-inspired overdrive for under $25. Warm, mid-focused tone at a fraction of the cost.</li>
            <li><span className="font-semibold text-zinc-900 dark:text-zinc-100">SF300 Super Fuzz</span> — Three fuzz modes covering everything from vintage Big Muff tones to modern fuzz textures.</li>
            <li><span className="font-semibold text-zinc-900 dark:text-zinc-100">DR600 Digital Reverb</span> — Six reverb modes including spring, hall, and plate. Excellent value for ambient players.</li>
            <li><span className="font-semibold text-zinc-900 dark:text-zinc-100">CS400 Compressor/Sustainer</span> — Studio-style compression at a beginner-friendly price. Great for country and clean tones.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-gray-50 dark:bg-zinc-900 rounded-xl p-5 border border-zinc-200 dark:border-zinc-800">
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">Related</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/boss" className="text-sm bg-gray-100 dark:bg-zinc-800 hover:bg-orange-500/20 hover:text-orange-400 text-zinc-600 dark:text-zinc-400 px-4 py-2 rounded-lg transition-colors">
              Boss Pedals
            </Link>
            <Link href="/types" className="text-sm bg-gray-100 dark:bg-zinc-800 hover:bg-orange-500/20 hover:text-orange-400 text-zinc-600 dark:text-zinc-400 px-4 py-2 rounded-lg transition-colors">
              All Pedal Types
            </Link>
            <Link href="/beginners" className="text-sm bg-gray-100 dark:bg-zinc-800 hover:bg-orange-500/20 hover:text-orange-400 text-zinc-600 dark:text-zinc-400 px-4 py-2 rounded-lg transition-colors">
              Beginner Guide
            </Link>
          </div>
        </section>

      </div>
    </main>
  )
}
