import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import pedalsData from '@/data/pedals.json'
import vsPairsData from '@/data/vs-pairs.json'

type Pedal = {
  id: string
  name: string
  brand: string
  type: string
  price: number
  rating: number
  reviewCount: number
  amazonUrl: string
  image: string
  imageUrl?: string
  description: string
  pros: string[]
  cons: string[]
  bestFor: string[]
  level: string
  powerMa: number
  voltage: number
  widthMm: number
  heightMm: number
  depthMm: number
  bypass: string
  controls: string[]
}

type VsPair = {
  slug: string
  pedal1: string
  pedal2: string
}

const pedals = pedalsData as Pedal[]
const vsPairs = vsPairsData as VsPair[]

export async function generateStaticParams() {
  return vsPairs.map((pair) => ({ slug: pair.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const pair = vsPairs.find((p) => p.slug === slug)
  if (!pair) return {}
  const pedal1 = pedals.find((p) => p.id === pair.pedal1)
  const pedal2 = pedals.find((p) => p.id === pair.pedal2)
  if (!pedal1 || !pedal2) return {}
  return {
    title: `${pedal1.name} vs ${pedal2.name} — Which Is Better? (2026 Comparison)`,
    description: `${pedal1.name} vs ${pedal2.name}: side-by-side comparison of price, specs, pros & cons, and a quick verdict. Find out which ${pedal1.type} pedal is right for you.`,
    alternates: { canonical: `/vs/${slug}` },
    openGraph: {
      title: `${pedal1.name} vs ${pedal2.name} (2026)`,
      description: `Compare ${pedal1.name} and ${pedal2.name} head to head. Specs, price, pros & cons side by side.`,
      images: pedal1.imageUrl ? [{ url: pedal1.imageUrl }] : [],
      type: 'article',
    },
  }
}

function getBypassLabel(bypass: string) {
  const map: Record<string, string> = {
    true: 'True Bypass',
    buffered: 'Buffered Bypass',
    passive: 'Passive (No Buffer)',
  }
  return map[bypass] ?? bypass
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="text-orange-400 font-semibold">
      {'★'.repeat(Math.round(rating))}{'☆'.repeat(5 - Math.round(rating))}
      <span className="text-zinc-400 text-sm ml-1">{rating}</span>
    </span>
  )
}

function getQuickVerdict(p1: Pedal, p2: Pedal): string {
  const cheaperName = p1.price <= p2.price ? p1.name : p2.name
  const pricierName = p1.price <= p2.price ? p2.name : p1.name
  const betterRated = p1.rating >= p2.rating ? p1 : p2
  const otherPedal = betterRated.id === p1.id ? p2 : p1

  if (Math.abs(p1.price - p2.price) < 20 && Math.abs(p1.rating - p2.rating) < 0.2) {
    return `The ${p1.name} and ${p2.name} are closely matched — both are excellent choices. The ${p1.name} suits ${p1.bestFor.slice(0, 2).join(' and ')} players, while the ${p2.name} shines for ${p2.bestFor.slice(0, 2).join(' and ')}. Choose based on your genre and tone goals.`
  }

  if (p1.price <= p2.price) {
    return `The ${cheaperName} is the more affordable option at $${Math.min(p1.price, p2.price)}, making it ideal for players on a budget. The ${pricierName} at $${Math.max(p1.price, p2.price)} offers ${betterRated.id === otherPedal.id ? 'a higher rating and' : ''} more premium features. If you prioritize value, go with the ${cheaperName}; if you want the best tone regardless of price, the ${pricierName} delivers.`
  }

  return `The ${betterRated.name} edges out the ${otherPedal.name} in overall ratings (${betterRated.rating} vs ${otherPedal.rating}). Both are great pedals — the ${p1.name} is best for ${p1.bestFor.slice(0, 2).join(' and ')}, while the ${p2.name} excels at ${p2.bestFor.slice(0, 2).join(' and ')}.`
}

export default async function VsPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const pair = vsPairs.find((p) => p.slug === slug)
  if (!pair) notFound()

  const pedal1 = pedals.find((p) => p.id === pair.pedal1)
  const pedal2 = pedals.find((p) => p.id === pair.pedal2)
  if (!pedal1 || !pedal2) notFound()

  const relatedPairs = vsPairs
    .filter(
      (p) =>
        p.slug !== slug &&
        (p.pedal1 === pair.pedal1 ||
          p.pedal2 === pair.pedal1 ||
          p.pedal1 === pair.pedal2 ||
          p.pedal2 === pair.pedal2)
    )
    .slice(0, 4)

  const verdict = getQuickVerdict(pedal1, pedal2)

  const comparisonSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${pedal1.name} vs ${pedal2.name}`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@type': 'Product',
          name: pedal1.name,
          brand: { '@type': 'Brand', name: pedal1.brand },
          description: pedal1.description,
          image: pedal1.imageUrl ?? pedal1.image,
          url: `https://pedalrig.com/pedals/${pedal1.id}`,
          offers: {
            '@type': 'Offer',
            price: pedal1.price,
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
            url: pedal1.amazonUrl,
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: pedal1.rating,
            reviewCount: pedal1.reviewCount,
            bestRating: 5,
            worstRating: 1,
          },
        },
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@type': 'Product',
          name: pedal2.name,
          brand: { '@type': 'Brand', name: pedal2.brand },
          description: pedal2.description,
          image: pedal2.imageUrl ?? pedal2.image,
          url: `https://pedalrig.com/pedals/${pedal2.id}`,
          offers: {
            '@type': 'Offer',
            price: pedal2.price,
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
            url: pedal2.amazonUrl,
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: pedal2.rating,
            reviewCount: pedal2.reviewCount,
            bestRating: 5,
            worstRating: 1,
          },
        },
      },
    ],
  }

  const specs = [
    {
      label: 'Price',
      v1: `$${pedal1.price}`,
      v2: `$${pedal2.price}`,
    },
    {
      label: 'Rating',
      v1: `${pedal1.rating} / 5 (${pedal1.reviewCount.toLocaleString()} reviews)`,
      v2: `${pedal2.rating} / 5 (${pedal2.reviewCount.toLocaleString()} reviews)`,
    },
    {
      label: 'Bypass',
      v1: getBypassLabel(pedal1.bypass),
      v2: getBypassLabel(pedal2.bypass),
    },
    {
      label: 'Voltage',
      v1: pedal1.voltage > 0 ? `${pedal1.voltage}V DC` : 'Passive',
      v2: pedal2.voltage > 0 ? `${pedal2.voltage}V DC` : 'Passive',
    },
    {
      label: 'Current Draw',
      v1: pedal1.powerMa > 0 ? `${pedal1.powerMa}mA` : 'No power needed',
      v2: pedal2.powerMa > 0 ? `${pedal2.powerMa}mA` : 'No power needed',
    },
    {
      label: 'Dimensions',
      v1: `${pedal1.widthMm} × ${pedal1.heightMm} × ${pedal1.depthMm} mm`,
      v2: `${pedal2.widthMm} × ${pedal2.heightMm} × ${pedal2.depthMm} mm`,
    },
    {
      label: 'Controls',
      v1: pedal1.controls.join(', '),
      v2: pedal2.controls.join(', '),
    },
    {
      label: 'Skill Level',
      v1: pedal1.level.charAt(0).toUpperCase() + pedal1.level.slice(1),
      v2: pedal2.level.charAt(0).toUpperCase() + pedal2.level.slice(1),
    },
  ]

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(comparisonSchema) }}
      />

      <div className="max-w-5xl mx-auto px-4 py-10">

        {/* Breadcrumb */}
        <nav className="text-sm text-zinc-500 mb-6 flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-orange-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/compare" className="hover:text-orange-400 transition-colors">Compare</Link>
          <span>/</span>
          <span className="text-zinc-700 dark:text-zinc-300">{pedal1.name} vs {pedal2.name}</span>
        </nav>

        {/* Hero */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 leading-tight">
            <span className="text-orange-500">{pedal1.name}</span>
            <span className="mx-3 text-zinc-400">vs</span>
            <span className="text-orange-500">{pedal2.name}</span>
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mb-8">
            Which is the better {pedal1.type} pedal? Side-by-side comparison for 2026.
          </p>

          {/* Side-by-side product cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[pedal1, pedal2].map((pedal, idx) => (
              <div
                key={pedal.id}
                className="bg-gray-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 flex flex-col items-center text-center"
              >
                {idx === 0 && (
                  <div className="absolute -mt-3 -ml-3 hidden" />
                )}
                <div className="w-full h-44 bg-gray-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center mb-4 overflow-hidden">
                  {pedal.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={pedal.imageUrl}
                      alt={pedal.name}
                      className="max-h-40 max-w-full object-contain p-2"
                      loading={idx === 0 ? 'eager' : 'lazy'}
                    />
                  ) : (
                    <span className="text-5xl text-zinc-400">🎸</span>
                  )}
                </div>
                <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs uppercase tracking-wider mb-2">
                  {pedal.brand}
                </Badge>
                <h2 className="text-lg font-bold mb-1">{pedal.name}</h2>
                <StarRating rating={pedal.rating} />
                <p className="text-3xl font-bold text-orange-400 mt-2 mb-4">${pedal.price}</p>
                <a
                  href={pedal.amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="w-full inline-flex items-center justify-center rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-600 active:bg-orange-700 transition-colors shadow-lg shadow-orange-500/20"
                >
                  🛒 Buy on Amazon →
                </a>
                <Link
                  href={`/pedals/${pedal.id}`}
                  className="mt-2 text-xs text-zinc-500 hover:text-orange-400 transition-colors"
                >
                  Read full review →
                </Link>
              </div>
            ))}
          </div>

          {/* VS divider badge */}
          <div className="flex items-center justify-center -mt-3 mb-0 relative z-10 pointer-events-none select-none hidden sm:flex">
            <span className="bg-orange-500 text-white text-lg font-black rounded-full w-12 h-12 flex items-center justify-center shadow-lg -mt-52">
              VS
            </span>
          </div>
        </div>

        <Separator className="bg-zinc-200 dark:bg-zinc-800 mb-10" />

        {/* Quick Verdict */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">⚡ Quick Verdict</h2>
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-6">
            <p className="text-zinc-700 dark:text-zinc-300 text-base leading-relaxed">{verdict}</p>
          </div>
        </section>

        {/* Specs Table */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Side-by-Side Specs</h2>
          <Card className="bg-gray-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 overflow-hidden">
            <CardContent className="p-0">
              {/* Header row */}
              <div className="grid grid-cols-3 bg-zinc-100 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
                <div className="px-4 py-3 text-sm font-semibold text-zinc-500 uppercase tracking-wider"></div>
                <div className="px-4 py-3 text-sm font-semibold text-orange-400 uppercase tracking-wider border-l border-zinc-200 dark:border-zinc-700">
                  {pedal1.name.split(' ').slice(-2).join(' ')}
                </div>
                <div className="px-4 py-3 text-sm font-semibold text-orange-400 uppercase tracking-wider border-l border-zinc-200 dark:border-zinc-700">
                  {pedal2.name.split(' ').slice(-2).join(' ')}
                </div>
              </div>
              {/* Data rows */}
              {specs.map((spec, i) => (
                <div
                  key={spec.label}
                  className={`grid grid-cols-3 border-b border-zinc-200 dark:border-zinc-800 last:border-b-0 ${i % 2 === 0 ? '' : 'bg-zinc-50 dark:bg-zinc-900/50'}`}
                >
                  <div className="px-4 py-3 text-sm text-zinc-500 font-medium">{spec.label}</div>
                  <div className="px-4 py-3 text-sm font-medium border-l border-zinc-200 dark:border-zinc-800">
                    {spec.label === 'Price' ? (
                      <span className={pedal1.price <= pedal2.price ? 'text-green-500 font-bold' : ''}>
                        {spec.v1}
                      </span>
                    ) : spec.label === 'Rating' ? (
                      <span className={pedal1.rating >= pedal2.rating ? 'text-green-500 font-bold' : ''}>
                        {spec.v1}
                      </span>
                    ) : (
                      spec.v1
                    )}
                  </div>
                  <div className="px-4 py-3 text-sm font-medium border-l border-zinc-200 dark:border-zinc-800">
                    {spec.label === 'Price' ? (
                      <span className={pedal2.price <= pedal1.price ? 'text-green-500 font-bold' : ''}>
                        {spec.v2}
                      </span>
                    ) : spec.label === 'Rating' ? (
                      <span className={pedal2.rating >= pedal1.rating ? 'text-green-500 font-bold' : ''}>
                        {spec.v2}
                      </span>
                    ) : (
                      spec.v2
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        {/* Pros & Cons */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Pros &amp; Cons Compared</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[pedal1, pedal2].map((pedal) => (
              <div key={pedal.id} className="space-y-4">
                <h3 className="font-semibold text-lg text-center">{pedal.name}</h3>
                <Card className="bg-gray-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                  <CardHeader className="pb-2 pt-4">
                    <CardTitle className="text-sm uppercase tracking-wider text-green-500">Pros</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {pedal.pros.map((pro) => (
                        <li key={pro} className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                          <span className="text-green-400 mt-0.5 shrink-0">✓</span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card className="bg-gray-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                  <CardHeader className="pb-2 pt-4">
                    <CardTitle className="text-sm uppercase tracking-wider text-red-500">Cons</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {pedal.cons.map((con) => (
                        <li key={con} className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                          <span className="text-red-400 mt-0.5 shrink-0">✗</span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </section>

        {/* Best For */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Best For</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[pedal1, pedal2].map((pedal) => (
              <div key={pedal.id}>
                <h3 className="font-semibold mb-3 text-center">{pedal.name}</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {pedal.bestFor.map((style) => (
                    <Badge
                      key={style}
                      className="bg-orange-500/10 text-orange-400 border border-orange-500/30 capitalize text-sm px-3 py-1"
                    >
                      {style}
                    </Badge>
                  ))}
                  <Badge className="bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-sm px-3 py-1 capitalize">
                    {pedal.level} level
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator className="bg-zinc-200 dark:bg-zinc-800 mb-10" />

        {/* Buy Buttons */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Where to Buy</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[pedal1, pedal2].map((pedal) => (
              <div
                key={pedal.id}
                className="bg-gradient-to-r from-orange-500/10 to-orange-500/5 border border-orange-500/20 rounded-2xl p-6 text-center"
              >
                <p className="font-semibold mb-1">{pedal.name}</p>
                <p className="text-3xl font-bold text-orange-400 mb-4">${pedal.price}</p>
                <a
                  href={pedal.amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20 w-full mb-2"
                >
                  🛒 Buy on Amazon →
                </a>
                <Link
                  href={`/pedals/${pedal.id}`}
                  className="block text-sm text-zinc-500 hover:text-orange-400 transition-colors"
                >
                  Read full review →
                </Link>
              </div>
            ))}
          </div>
          <p className="text-xs text-zinc-500 mt-4 text-center">
            As an Amazon Associate we earn from qualifying purchases.
          </p>
        </section>

        {/* Related Comparisons */}
        {relatedPairs.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-6">Related Comparisons</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedPairs.map((rp) => {
                const rp1 = pedals.find((p) => p.id === rp.pedal1)
                const rp2 = pedals.find((p) => p.id === rp.pedal2)
                if (!rp1 || !rp2) return null
                return (
                  <Link
                    key={rp.slug}
                    href={`/vs/${rp.slug}`}
                    className="block bg-gray-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-orange-500/50 rounded-xl p-4 transition-all duration-200 group"
                  >
                    <p className="text-sm font-semibold group-hover:text-orange-400 transition-colors">
                      {rp1.name}
                      <span className="text-zinc-400 mx-2">vs</span>
                      {rp2.name}
                    </p>
                    <p className="text-xs text-zinc-500 mt-1 capitalize">{rp1.type} comparison</p>
                  </Link>
                )
              })}
            </div>
            <div className="mt-4 text-center">
              <Link
                href="/compare"
                className="inline-flex items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-700 px-6 py-2.5 text-sm font-medium hover:border-orange-500/50 hover:text-orange-400 transition-colors"
              >
                Compare any two pedals →
              </Link>
            </div>
          </section>
        )}

      </div>
    </main>
  )
}
