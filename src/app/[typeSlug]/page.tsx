import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
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
  description: string
  pros: string[]
  cons: string[]
  bestFor: string[]
  level: string
}

const types = pedalTypesData.types as PedalType[]
const pedals = pedalsData as Pedal[]

export async function generateStaticParams() {
  return types.map((t) => ({ typeSlug: t.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ typeSlug: string }>
}): Promise<Metadata> {
  const { typeSlug } = await params
  const type = types.find((t) => t.slug === typeSlug)
  if (!type) return {}
  return {
    title: `Best ${type.name} Pedals 2026 — Reviews & Buyer's Guide`,
    description: `Find the best ${type.name.toLowerCase()} guitar pedals in 2026. Compare top ${type.name.toLowerCase()} pedals with reviews, prices, and sound demos. ${type.shortDescription}`,
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

const FAQ_TEMPLATES = (typeName: string) => [
  {
    q: `What is the best ${typeName} pedal for beginners?`,
    a: `For beginners, look for a ${typeName.toLowerCase()} pedal that's affordable, durable, and easy to dial in. The pedals listed above are all excellent starting points — check the ones marked "beginner" for the most approachable options.`,
  },
  {
    q: `Where does a ${typeName} pedal go in the signal chain?`,
    a: `${typeName} pedals are typically placed in a specific position in your signal chain to get the best tone. Check the Signal Chain Position card above for the recommended placement.`,
  },
  {
    q: `Can I use a ${typeName} pedal with any guitar and amp?`,
    a: `Yes — ${typeName.toLowerCase()} pedals work with any electric guitar and amp combination. That said, the results will vary depending on your gear. Tube amps tend to respond especially well to most effects.`,
  },
  {
    q: `Do I need to use true bypass ${typeName} pedals?`,
    a: `True bypass preserves your tone when the pedal is off, but buffered bypass can actually help maintain signal integrity in long pedal chains. Both are valid — it depends on your rig and preferences.`,
  },
  {
    q: `How much should I spend on a ${typeName} pedal?`,
    a: `You can get a great ${typeName.toLowerCase()} pedal for $50–$150. Boutique options go higher, but the law of diminishing returns kicks in fast. The pedals in our comparison table represent the best value at each price point.`,
  },
]

export default async function TypePage({
  params,
}: {
  params: Promise<{ typeSlug: string }>
}) {
  const { typeSlug } = await params
  const type = types.find((t) => t.slug === typeSlug)
  if (!type) notFound()

  const typePedals = pedals.filter((p) => p.type === type.id)
  const relatedTypes = types.filter((t) => t.id !== type.id).slice(0, 3)
  const faqs = FAQ_TEMPLATES(type.name)

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <div className="max-w-5xl mx-auto px-4 py-10">

        {/* Breadcrumb */}
        <nav className="text-sm text-zinc-500 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-orange-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/types" className="hover:text-orange-400 transition-colors">Pedal Types</Link>
          <span>/</span>
          <span className="text-zinc-700 dark:text-zinc-300">{type.name}</span>
        </nav>

        {/* Hero */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">{type.icon}</span>
            <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs uppercase tracking-wider">
              {type.name}
            </Badge>
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Best {type.name} Pedals in 2026
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed max-w-3xl">
            {type.description}
          </p>
        </div>

        <Separator className="bg-zinc-200 dark:bg-zinc-800 mb-8" />

        {/* Key Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <Card className="bg-gray-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs uppercase tracking-wider text-zinc-500">Signal Chain Position</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-orange-400">#{type.signalChainPosition}</p>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">in the chain</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs uppercase tracking-wider text-zinc-500">Best For</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1 mt-1">
                {type.bestFor.map((genre) => (
                  <Badge key={genre} variant="outline" className="text-xs border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300">
                    {genre}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs uppercase tracking-wider text-zinc-500">Famous Users</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-zinc-700 dark:text-zinc-300 text-sm space-y-1 mt-1">
                {type.famousUsers.map((user) => (
                  <li key={user} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 inline-block" />
                    {user}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Comparison Table */}
        {typePedals.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Quick Comparison</h2>
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-zinc-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/80">
                    <TableHead className="text-zinc-500 dark:text-zinc-400">Pedal</TableHead>
                    <TableHead className="text-zinc-500 dark:text-zinc-400">Brand</TableHead>
                    <TableHead className="text-zinc-500 dark:text-zinc-400">Price</TableHead>
                    <TableHead className="text-zinc-500 dark:text-zinc-400">Rating</TableHead>
                    <TableHead className="text-zinc-500 dark:text-zinc-400"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {typePedals.map((pedal) => (
                    <TableRow key={pedal.id} className="border-zinc-200 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-900/50 transition-colors">
                      <TableCell className="font-medium">{pedal.name}</TableCell>
                      <TableCell className="text-zinc-500 dark:text-zinc-400">{pedal.brand}</TableCell>
                      <TableCell className="text-orange-400 font-semibold">${pedal.price}</TableCell>
                      <TableCell><StarRating rating={pedal.rating} /></TableCell>
                      <TableCell>
                        <a
                          href={pedal.amazonUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center rounded-md bg-orange-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-orange-600 transition-colors"
                        >
                          Amazon →
                        </a>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </section>
        )}

        {/* Product Detail Cards */}
        {typePedals.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">In-Depth Reviews</h2>
            <div className="space-y-6">
              {typePedals.map((pedal, i) => (
                <Card key={pedal.id} className="bg-gray-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 overflow-hidden">
                  <div className="flex flex-col sm:flex-row">
                    {/* Image placeholder */}
                    <div className="sm:w-48 sm:shrink-0 bg-gray-100 dark:bg-zinc-800 flex items-center justify-center min-h-[160px]">
                      <div className="text-center p-4">
                        <span className="text-4xl">{type.icon}</span>
                        <p className="text-zinc-600 text-xs mt-2">{pedal.brand}</p>
                      </div>
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            {i === 0 && (
                              <Badge className="bg-orange-500 text-white text-xs">Editor's Pick</Badge>
                            )}
                            <Badge variant="outline" className="text-xs border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 capitalize">
                              {pedal.level}
                            </Badge>
                          </div>
                          <h3 className="text-xl font-bold">{pedal.name}</h3>
                          <div className="flex items-center gap-3 mt-1">
                            <StarRating rating={pedal.rating} />
                            <span className="text-zinc-500 text-sm">({pedal.reviewCount.toLocaleString()} reviews)</span>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-2xl font-bold text-orange-400">${pedal.price}</p>
                        </div>
                      </div>

                      <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-4">{pedal.description}</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-xs uppercase tracking-wider text-zinc-500 mb-2">Pros</p>
                          <ul className="space-y-1">
                            {pedal.pros.map((pro) => (
                              <li key={pro} className="text-sm text-zinc-700 dark:text-zinc-300 flex items-start gap-2">
                                <span className="text-green-400 mt-0.5">✓</span>
                                {pro}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-wider text-zinc-500 mb-2">Cons</p>
                          <ul className="space-y-1">
                            {pedal.cons.map((con) => (
                              <li key={con} className="text-sm text-zinc-700 dark:text-zinc-300 flex items-start gap-2">
                                <span className="text-red-400 mt-0.5">✗</span>
                                {con}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <a
                        href={pedal.amazonUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600 transition-colors"
                      >
                        Buy on Amazon →
                      </a>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        <Separator className="bg-zinc-200 dark:bg-zinc-800 mb-10" />

        {/* FAQ */}
        <section className="mb-12">
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

        {/* Related Types */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Explore Other Pedal Types</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedTypes.map((related) => {
              const count = pedals.filter((p) => p.type === related.id).length
              return (
                <Link key={related.id} href={`/${related.slug}`}>
                  <Card className={cn(
                    'bg-gray-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-orange-500/50 transition-all duration-200 cursor-pointer group h-full'
                  )}>
                    <CardContent className="p-5">
                      <span className="text-3xl mb-3 block">{related.icon}</span>
                      <h3 className="font-bold group-hover:text-orange-400 transition-colors mb-1">
                        {related.name}
                      </h3>
                      <p className="text-zinc-500 text-sm leading-relaxed mb-3">{related.shortDescription}</p>
                      <Badge variant="outline" className="text-xs border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400">
                        {count} pedals
                      </Badge>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </section>

      </div>
    </main>
  )
}
