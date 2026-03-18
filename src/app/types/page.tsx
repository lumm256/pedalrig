import Link from 'next/link'
import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import pedalTypesData from '@/data/pedal-types.json'
import pedalsData from '@/data/pedals.json'

export const metadata: Metadata = {
  title: 'Types of Guitar Pedals — Every Effect Explained',
  description:
    'A complete guide to every type of guitar pedal — from overdrive and distortion to delay, reverb, and beyond. Find the right effect for your sound.',
}

type PedalType = {
  id: string
  name: string
  slug: string
  icon: string
  shortDescription: string
  description: string
}

type Pedal = {
  type: string
}

const types = pedalTypesData.types as PedalType[]
const pedals = pedalsData as Pedal[]

export default function TypesPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <div className="max-w-5xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="mb-10">
          <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs uppercase tracking-wider mb-4">
            Reference Guide
          </Badge>
          <h1 className="text-4xl font-bold mb-4">
            Types of Guitar Pedals — Every Effect Explained
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed max-w-3xl">
            Whether you're building your first pedalboard or filling in the gaps, this guide covers
            every major effect type — what it does, where it goes in your chain, and who uses it.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {types.map((type) => {
            const count = pedals.filter((p) => p.type === type.id).length
            return (
              <Link key={type.id} href={`/${type.slug}`} className="group block">
                <Card className="bg-gray-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 h-full transition-all duration-200 group-hover:border-orange-500/50 group-hover:bg-gray-100 dark:group-hover:bg-zinc-800/80">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{type.icon}</span>
                        <CardTitle className="text-lg group-hover:text-orange-400 transition-colors">
                          {type.name}
                        </CardTitle>
                      </div>
                      {count > 0 && (
                        <Badge className="bg-gray-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700 text-xs shrink-0">
                          {count} pedal{count !== 1 ? 's' : ''}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                      {type.shortDescription}
                    </p>
                    <p className="text-orange-400 text-sm mt-3 font-medium group-hover:underline">
                      View all {type.name} pedals →
                    </p>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </main>
  )
}
