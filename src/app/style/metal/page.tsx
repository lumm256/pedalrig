import Link from 'next/link'
import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import pedalsData from '@/data/pedals.json'

export const metadata: Metadata = {
  title: 'Best Guitar Pedals for Metal 2026 — High Gain Guide',
  description: 'The ultimate guide to guitar pedals for metal. High gain distortion, noise gates, EQ, and more — build the perfect metal pedalboard.',
  alternates: { canonical: '/style/metal' },
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
const metalPedals = allPedals.filter((p) =>
  p.bestFor.some((b) => b.toLowerCase() === 'metal')
)

const faqs = [
  {
    q: 'What distortion pedal is best for metal?',
    a: 'The Boss MT-2 Metal Zone is the most popular budget metal distortion. For tighter, more modern tones, the ProCo RAT and MXR Distortion+ are excellent choices. High-end options include the Friedman BE-OD and Wampler Sovereign.',
  },
  {
    q: 'Do I need a noise gate for metal?',
    a: 'Yes — high gain metal tones produce significant noise and hum. A noise gate like the Boss NS-2 is essential for tight, silent rests between heavy riffs.',
  },
  {
    q: 'Should I use a distortion pedal or rely on amp gain?',
    a: 'Both approaches work. Many metal players use a clean or slightly driven amp with a high-gain distortion pedal for consistency. Others prefer amp gain with an overdrive pedal as a boost.',
  },
  {
    q: 'What is the best EQ pedal for metal?',
    a: 'The Boss GE-7 Graphic EQ is the standard choice. Use it to scoop the mids for a classic metal tone, or boost the mids to cut through a dense mix.',
  },
]

export default function MetalPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <div className="max-w-5xl mx-auto px-4 py-10">

        <nav className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-orange-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/style" className="hover:text-orange-400 transition-colors">Style</Link>
          <span>/</span>
          <span>Metal</span>
        </nav>

        <div className="mb-10">
          <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs uppercase tracking-wider mb-4">
            Style Guide
          </Badge>
          <h1 className="text-4xl font-bold mb-4">Best Guitar Pedals for Metal</h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed max-w-3xl">
            Metal tone demands precision, power, and clarity under extreme gain. The right
            pedals give you tight low end, aggressive mids, and the sustain to hold notes
            through the heaviest riffs. Here is your complete metal pedalboard guide.
          </p>
        </div>

        <section className="mb-12 bg-gray-50 dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
          <h2 className="text-2xl font-bold mb-4">The Metal Pedalboard Blueprint</h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-6">
            Metal tone is built on high gain, tight low end, and silence between notes. Every pedal in your chain needs to serve the heaviness.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-zinc-800 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700">
              <div className="text-2xl mb-2">💀</div>
              <h3 className="font-semibold mb-1">High Gain Distortion</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm">The core of your metal tone. Look for tight low end, aggressive mids, and enough gain for palm-muted chug and screaming leads.</p>
            </div>
            <div className="bg-white dark:bg-zinc-800 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700">
              <div className="text-2xl mb-2">🔇</div>
              <h3 className="font-semibold mb-1">Noise Gate</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm">High gain creates noise. A noise gate eliminates hum and hiss between notes, keeping your riffs tight and your silences silent.</p>
            </div>
            <div className="bg-white dark:bg-zinc-800 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700">
              <div className="text-2xl mb-2">📈</div>
              <h3 className="font-semibold mb-1">EQ</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm">An EQ pedal lets you sculpt your distortion tone precisely — scoop the mids for classic metal, or boost them to cut through a dense mix.</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">
            Metal Pedals ({metalPedals.length} pedals)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {metalPedals.map((pedal) => (
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
            <Link href="/style/rock" className="bg-gray-100 dark:bg-zinc-800 hover:bg-orange-500/20 hover:text-orange-400 text-zinc-700 dark:text-zinc-300 text-sm px-4 py-2 rounded-lg transition-colors border border-zinc-200 dark:border-zinc-700">
              Rock Pedals
            </Link>
            <Link href="/distortion" className="bg-gray-100 dark:bg-zinc-800 hover:bg-orange-500/20 hover:text-orange-400 text-zinc-700 dark:text-zinc-300 text-sm px-4 py-2 rounded-lg transition-colors border border-zinc-200 dark:border-zinc-700">
              Distortion Pedals
            </Link>
            <Link href="/eq" className="bg-gray-100 dark:bg-zinc-800 hover:bg-orange-500/20 hover:text-orange-400 text-zinc-700 dark:text-zinc-300 text-sm px-4 py-2 rounded-lg transition-colors border border-zinc-200 dark:border-zinc-700">
              EQ Pedals
            </Link>
            <Link href="/boss" className="bg-gray-100 dark:bg-zinc-800 hover:bg-orange-500/20 hover:text-orange-400 text-zinc-700 dark:text-zinc-300 text-sm px-4 py-2 rounded-lg transition-colors border border-zinc-200 dark:border-zinc-700">
              Boss Pedals
            </Link>
          </div>
        </section>

      </div>
    </main>
  )
}
