import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { TypeIcon } from '@/components/type-icon'
import pedalTypesData from '@/data/pedal-types.json'
import pedalsData from '@/data/pedals.json'

type PedalType = {
  id: string
  name: string
  slug: string
  icon: string
  shortDescription: string
  description: string
  signalChainPosition: number
  famousUsers: string[]
  keyFeatures: string[]
  bestFor: string[]
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

const types = pedalTypesData.types as PedalType[]
const pedals = pedalsData as Pedal[]

export async function generateStaticParams() {
  return pedals.map((p) => ({ slug: p.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const pedal = pedals.find((p) => p.id === slug)
  if (!pedal) return {}
  const type = types.find((t) => t.id === pedal.type)
  return {
    title: `${pedal.name} Review 2026 — Price, Specs & Verdict`,
    description: `Full review of the ${pedal.name}. ${pedal.description.slice(0, 120)}... Best for ${pedal.bestFor.join(', ')}.`,
    alternates: { canonical: `/pedals/${slug}` },
    openGraph: {
      title: `${pedal.name} Review 2026`,
      description: pedal.description,
      images: pedal.imageUrl ? [{ url: pedal.imageUrl }] : [],
      type: 'article',
    },
  }
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="text-orange-400 font-semibold">
      {'★'.repeat(Math.round(rating))}{'☆'.repeat(5 - Math.round(rating))}
      <span className="text-zinc-400 text-sm ml-1">{rating}</span>
    </span>
  )
}

function LevelBadge({ level }: { level: string }) {
  const colors: Record<string, string> = {
    beginner: 'bg-green-500/20 text-green-400 border-green-500/30',
    intermediate: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    advanced: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  }
  return (
    <Badge className={`text-xs uppercase tracking-wider border ${colors[level] ?? 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30'}`}>
      {level}
    </Badge>
  )
}

function getBypassLabel(bypass: string) {
  const map: Record<string, string> = {
    true: 'True Bypass',
    buffered: 'Buffered Bypass',
    passive: 'Passive (No Buffer)',
  }
  return map[bypass] ?? bypass
}

function getFAQs(pedal: Pedal, typeName: string) {
  return [
    {
      q: `Is the ${pedal.name} worth the price?`,
      a: `At $${pedal.price}, the ${pedal.name} offers excellent value. With a ${pedal.rating}/5 rating from over ${pedal.reviewCount.toLocaleString()} reviews, it consistently earns praise for its ${pedal.pros[0]?.toLowerCase() ?? 'tone and build quality'}. It's especially well-suited to ${pedal.bestFor.slice(0, 2).join(' and ')} players.`,
    },
    {
      q: `What bypass type does the ${pedal.name} use?`,
      a: `The ${pedal.name} uses ${getBypassLabel(pedal.bypass)}. ${
        pedal.bypass === 'true'
          ? 'True bypass means your signal passes directly through the pedal when it\'s switched off, preserving your tone.'
          : pedal.bypass === 'buffered'
          ? 'Buffered bypass keeps your signal strong even in long pedal chains, which can be beneficial for maintaining high-frequency content.'
          : 'This pedal is passive and requires no power when in use.'
      }`,
    },
    {
      q: `Where does the ${pedal.name} go in the signal chain?`,
      a: `As a ${typeName} pedal, the ${pedal.name} typically sits ${
        ['overdrive', 'distortion', 'fuzz'].includes(pedal.type)
          ? 'in the gain section, after any wah or compressor pedals and before modulation effects like chorus or delay'
          : pedal.type === 'compressor'
          ? 'near the beginning of your chain, right after your tuner, to even out your dynamics before any gain pedals'
          : pedal.type === 'delay' || pedal.type === 'reverb'
          ? 'near the end of your signal chain, after all your gain and modulation effects, to let the echoes and reverb breathe'
          : 'in the appropriate position for its effect type'
      }.`,
    },
    {
      q: `Can beginners use the ${pedal.name}?`,
      a: `${
        pedal.level === 'beginner'
          ? `Absolutely — the ${pedal.name} is an excellent choice for beginners. It's easy to dial in great tones right out of the box with its ${pedal.controls.slice(0, 3).join(', ')} controls.`
          : pedal.level === 'intermediate'
          ? `The ${pedal.name} is best suited to intermediate players who already have some experience with effects pedals. Its ${pedal.controls.length} controls give you a lot of tonal flexibility, which is great once you know what you're after.`
          : `The ${pedal.name} is an advanced pedal with significant depth and complexity. Beginners can certainly use it, but getting the most from it takes experience.`
      }`,
    },
    {
      q: `How much power does the ${pedal.name} need?`,
      a: `The ${pedal.name} runs on ${pedal.voltage}V DC${pedal.powerMa > 0 ? ` and draws ${pedal.powerMa}mA of current` : ''}. ${
        pedal.powerMa === 0
          ? 'It\'s a passive pedal that requires no power supply at all.'
          : pedal.powerMa <= 30
          ? 'It has low power consumption and will work fine on any standard pedalboard power supply.'
          : pedal.powerMa <= 100
          ? 'Make sure your power supply has a dedicated output with enough current capacity.'
          : 'This is a high-current pedal — check your power supply\'s specs carefully before connecting.'
      }`,
    },
  ]
}

export default async function PedalPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const pedal = pedals.find((p) => p.id === slug)
  if (!pedal) notFound()

  const type = types.find((t) => t.id === pedal.type)
  const similarPedals = pedals
    .filter((p) => p.type === pedal.type && p.id !== pedal.id)
    .slice(0, 4)

  const faqs = getFAQs(pedal, type?.name ?? pedal.type)

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: pedal.name,
    brand: { '@type': 'Brand', name: pedal.brand },
    description: pedal.description,
    image: pedal.imageUrl ?? pedal.image,
    url: `https://pedalrig.com/pedals/${pedal.id}`,
    offers: {
      '@type': 'Offer',
      price: pedal.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: pedal.amazonUrl,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: pedal.rating,
      reviewCount: pedal.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-5xl mx-auto px-4 py-10">

        {/* Breadcrumb */}
        <nav className="text-sm text-zinc-500 mb-6 flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-orange-400 transition-colors">Home</Link>
          <span>/</span>
          {type && (
            <>
              <Link href={`/${type.slug}`} className="hover:text-orange-400 transition-colors capitalize">
                {type.name}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-zinc-700 dark:text-zinc-300">{pedal.name}</span>
        </nav>

        {/* Hero */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Image */}
          <div className="bg-gray-100 dark:bg-zinc-900 rounded-2xl flex items-center justify-center min-h-[280px] p-6 border border-zinc-200 dark:border-zinc-800">
            {pedal.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={pedal.imageUrl}
                alt={pedal.name}
                className="max-h-64 max-w-full object-contain rounded-lg"
                loading="eager"
              />
            ) : type ? (
              <div className="text-center">
                <TypeIcon icon={type.icon} name={type.name} size={80} />
                <p className="text-zinc-500 text-sm mt-3">{pedal.brand}</p>
              </div>
            ) : null}
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs uppercase tracking-wider">
                {pedal.brand}
              </Badge>
              {type && (
                <Badge variant="outline" className="text-xs border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400">
                  {type.name}
                </Badge>
              )}
              <LevelBadge level={pedal.level} />
            </div>

            <h1 className="text-3xl font-bold mb-3 leading-tight">{pedal.name}</h1>

            <div className="flex items-center gap-3 mb-4">
              <StarRating rating={pedal.rating} />
              <span className="text-zinc-500 text-sm">({pedal.reviewCount.toLocaleString()} reviews)</span>
            </div>

            <p className="text-4xl font-bold text-orange-400 mb-6">${pedal.price}</p>

            <a
              href={pedal.amazonUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-8 py-4 text-base font-semibold text-white hover:bg-orange-600 active:bg-orange-700 transition-colors shadow-lg shadow-orange-500/20 w-full sm:w-auto"
            >
              🛒 Buy on Amazon →
            </a>
            <p className="text-xs text-zinc-500 mt-2">Via Amazon. As an Amazon Associate we earn from qualifying purchases.</p>
          </div>
        </div>

        <Separator className="bg-zinc-200 dark:bg-zinc-800 mb-10" />

        {/* Description */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Overview</h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-base leading-relaxed">{pedal.description}</p>
        </section>

        {/* Specs */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Specifications</h2>
          <Card className="bg-gray-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-zinc-200 dark:divide-zinc-800">
                <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  <div className="flex justify-between px-5 py-3">
                    <span className="text-sm text-zinc-500">Voltage</span>
                    <span className="text-sm font-medium">{pedal.voltage > 0 ? `${pedal.voltage}V DC` : 'Passive'}</span>
                  </div>
                  <div className="flex justify-between px-5 py-3">
                    <span className="text-sm text-zinc-500">Current Draw</span>
                    <span className="text-sm font-medium">{pedal.powerMa > 0 ? `${pedal.powerMa}mA` : 'No power needed'}</span>
                  </div>
                  <div className="flex justify-between px-5 py-3">
                    <span className="text-sm text-zinc-500">Bypass</span>
                    <span className="text-sm font-medium">{getBypassLabel(pedal.bypass)}</span>
                  </div>
                </div>
                <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  <div className="flex justify-between px-5 py-3">
                    <span className="text-sm text-zinc-500">Dimensions</span>
                    <span className="text-sm font-medium">{pedal.widthMm} × {pedal.heightMm} × {pedal.depthMm} mm</span>
                  </div>
                  <div className="flex justify-between px-5 py-3">
                    <span className="text-sm text-zinc-500">Controls</span>
                    <span className="text-sm font-medium text-right max-w-[180px]">{pedal.controls.join(', ')}</span>
                  </div>
                  <div className="flex justify-between px-5 py-3">
                    <span className="text-sm text-zinc-500">Level</span>
                    <span className="text-sm font-medium capitalize">{pedal.level}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Pros & Cons */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Pros & Cons</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="bg-gray-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
              <CardHeader className="pb-2">
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
              <CardHeader className="pb-2">
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
        </section>

        {/* Best For */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Best For</h2>
          <div className="flex flex-wrap gap-2">
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
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-r from-orange-500/10 to-orange-500/5 border border-orange-500/20 rounded-2xl p-6 mb-10 text-center">
          <p className="text-lg font-semibold mb-2">Ready to add the {pedal.name} to your board?</p>
          <p className="text-zinc-500 text-sm mb-4">Check the current price on Amazon and read customer reviews.</p>
          <a
            href={pedal.amazonUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-8 py-3 text-base font-semibold text-white hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20"
          >
            Check Price on Amazon →
          </a>
        </div>

        <Separator className="bg-zinc-200 dark:bg-zinc-800 mb-10" />

        {/* Similar Pedals */}
        {similarPedals.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-6">Similar {type?.name ?? ''} Pedals</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {similarPedals.map((similar) => (
                <Link key={similar.id} href={`/pedals/${similar.id}`}>
                  <Card className="bg-gray-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-orange-500/50 transition-all duration-200 cursor-pointer group h-full">
                    <div className="h-32 bg-gray-100 dark:bg-zinc-800 rounded-t-lg flex items-center justify-center overflow-hidden">
                      {similar.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={similar.imageUrl}
                          alt={similar.name}
                          className="max-h-28 max-w-full object-contain p-2"
                          loading="lazy"
                        />
                      ) : type ? (
                        <TypeIcon icon={type.icon} name={type.name} size={40} />
                      ) : null}
                    </div>
                    <CardContent className="p-4">
                      <p className="text-xs text-zinc-500 mb-1">{similar.brand}</p>
                      <h3 className="font-semibold text-sm group-hover:text-orange-400 transition-colors leading-snug mb-2">
                        {similar.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-orange-400 font-bold text-sm">${similar.price}</span>
                        <StarRating rating={similar.rating} />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        <Separator className="bg-zinc-200 dark:bg-zinc-800 mb-10" />

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-gray-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5">
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <Separator className="bg-zinc-200 dark:bg-zinc-800 mb-10" />

        {/* Back to type */}
        {type && (
          <div className="text-center">
            <p className="text-zinc-500 mb-4 text-sm">Explore all {type.name} pedals</p>
            <Link
              href={`/${type.slug}`}
              className="inline-flex items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-700 px-6 py-2.5 text-sm font-medium hover:border-orange-500/50 hover:text-orange-400 transition-colors"
            >
              ← All {type.name} Pedals
            </Link>
          </div>
        )}

      </div>
    </main>
  )
}
