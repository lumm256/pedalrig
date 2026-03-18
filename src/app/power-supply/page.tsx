import type { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export const metadata: Metadata = {
  title: 'Best Guitar Pedal Power Supplies 2026 — Isolated vs Daisy Chain',
  description:
    'Find the best power supply for your guitar pedals. Compare isolated vs daisy chain, calculate your power needs, and avoid noise issues.',
}

const powerSupplies = [
  {
    name: 'Voodoo Lab Pedal Power 2 Plus',
    price: '$189',
    outputs: 8,
    type: 'Isolated',
    typeBadge: 'Isolated',
    pros: ['Rock-solid isolated outputs', 'SAG control for vintage pedal feel', 'Industry standard for touring pros'],
    cons: ['Expensive', 'Bulky for small boards'],
    amazonUrl: 'https://www.amazon.com/s?k=Voodoo+Lab+Pedal+Power+2+Plus&tag=pedalrig-20',
  },
  {
    name: 'Truetone 1 Spot Pro CS7',
    price: '$130',
    outputs: 7,
    type: 'Isolated',
    typeBadge: 'Isolated',
    pros: ['Compact form factor', 'Handles high-current digital pedals', 'Great value for isolated power'],
    cons: ['Fewer outputs than competitors', 'No SAG control'],
    amazonUrl: 'https://www.amazon.com/s?k=Truetone+1+Spot+Pro+CS7&tag=pedalrig-20',
  },
  {
    name: 'MXR DC Brick',
    price: '$99',
    outputs: 10,
    type: 'Daisy Chain',
    typeBadge: 'Daisy Chain',
    pros: ['10 outputs at a fair price', 'Solid build quality', 'Good for all-analog setups'],
    cons: ['Shared ground = potential noise', 'Not ideal with digital pedals'],
    amazonUrl: 'https://www.amazon.com/s?k=MXR+DC+Brick+Power+Supply&tag=pedalrig-20',
  },
  {
    name: 'Donner DP-1',
    price: '$36',
    outputs: 10,
    type: 'Daisy Chain',
    typeBadge: 'Daisy Chain',
    pros: ['Budget-friendly entry point', '10 outputs', 'Good for beginners'],
    cons: ['Shared ground noise risk', 'Build quality reflects the price'],
    amazonUrl: 'https://www.amazon.com/s?k=Donner+DP-1+Guitar+Pedal+Power+Supply&tag=pedalrig-20',
  },
]

const faqs = [
  {
    q: 'What happens if I use the wrong power supply?',
    a: 'Wrong voltage can damage or destroy pedals. Always match the voltage (usually 9V DC) and polarity (center-negative for most pedals). Current (mA) can be higher than required — that\'s fine.',
  },
  {
    q: 'Why does my pedalboard hum?',
    a: 'Hum is usually a ground loop caused by shared power between pedals. Switch to an isolated power supply and the hum typically disappears immediately.',
  },
  {
    q: 'Can I power a 12V or 18V pedal from a 9V supply?',
    a: 'No — you need a supply with the correct voltage output. Many isolated supplies include 12V and 18V outputs for this reason.',
  },
  {
    q: 'How much current (mA) do I need?',
    a: 'Add up the mA draw of all your pedals (listed in the manual or on the pedal). Add 20% headroom. A typical 10-pedal board needs 500–1000mA total.',
  },
  {
    q: 'Is one power supply enough for a large board?',
    a: 'Usually yes, but large boards with many digital pedals may need two supplies. Check total current draw against your supply\'s capacity.',
  },
]

export default function PowerSupplyPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <div className="max-w-4xl mx-auto px-4 py-12">

        {/* Hero */}
        <h1 className="text-4xl font-bold mb-4">
          Best Guitar Pedal Power Supplies in 2026
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-lg mb-10 max-w-2xl">
          Your power supply is the foundation of your tone. Get it wrong and you get hum, noise,
          and headaches. Get it right and your pedals sing.
        </p>

        <Separator className="bg-zinc-200 dark:bg-zinc-800 mb-10" />

        {/* Why Power Matters */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-3">Why Power Supply Matters</h2>
          <p className="text-zinc-500 dark:text-zinc-400 mb-3">
            Every pedal on your board needs clean, stable DC power. When pedals share a power source
            without isolation, their ground connections interact — creating ground loops that produce
            audible hum and buzz.
          </p>
          <p className="text-zinc-500 dark:text-zinc-400">
            Digital pedals (loopers, multi-effects, modelers) are especially prone to injecting noise
            into analog pedals when sharing power. An isolated supply gives each pedal its own
            electrically separate output, eliminating the problem entirely.
          </p>
        </section>

        {/* Comparison Table */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Isolated vs Daisy Chain</h2>
          <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-zinc-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900">
                  <TableHead className="text-zinc-700 dark:text-zinc-300">Feature</TableHead>
                  <TableHead className="text-orange-500">Isolated</TableHead>
                  <TableHead className="text-zinc-300">Daisy Chain</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  ['Noise / Hum', 'None (each output isolated)', 'Possible ground loops'],
                  ['Digital Pedal Support', 'Excellent', 'Often causes noise'],
                  ['Price Range', '$80–$200+', '$10–$50'],
                  ['Best For', 'Any serious rig', 'Simple all-analog setups'],
                  ['Outputs', '6–10 typically', '8–10 typically'],
                  ['Recommended', 'Yes', 'Budget only'],
                ].map(([feature, isolated, daisy]) => (
                  <TableRow key={feature} className="border-zinc-200 dark:border-zinc-800">
                    <TableCell className="text-zinc-700 dark:text-zinc-300 font-medium">{feature}</TableCell>
                    <TableCell className="text-zinc-700 dark:text-zinc-300">{isolated}</TableCell>
                    <TableCell className="text-zinc-500 dark:text-zinc-400">{daisy}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        {/* Product Cards */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Recommended Power Supplies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {powerSupplies.map((ps) => (
              <Card key={ps.name} className="bg-gray-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base leading-snug">{ps.name}</CardTitle>
                    <Badge
                      className={
                        ps.type === 'Isolated'
                          ? 'bg-orange-500 text-white shrink-0'
                          : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 shrink-0'
                      }
                    >
                      {ps.typeBadge}
                    </Badge>
                  </div>
                  <div className="flex gap-3 text-sm mt-1">
                    <span className="text-orange-500 font-bold">{ps.price}</span>
                    <span className="text-zinc-500">{ps.outputs} outputs</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div>
                    <p className="text-zinc-500 text-xs uppercase tracking-wide mb-1">Pros</p>
                    <ul className="space-y-0.5">
                      {ps.pros.map((pro) => (
                        <li key={pro} className="text-zinc-700 dark:text-zinc-300">✓ {pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-zinc-500 text-xs uppercase tracking-wide mb-1">Cons</p>
                    <ul className="space-y-0.5">
                      {ps.cons.map((con) => (
                        <li key={con} className="text-zinc-500 dark:text-zinc-400">✗ {con}</li>
                      ))}
                    </ul>
                  </div>
                  <a
                    href={ps.amazonUrl}
                    className="inline-block mt-2 text-orange-500 hover:text-orange-400 text-xs font-medium underline underline-offset-4"
                  >
                    Check price on Amazon →
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Current Calculation */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-3">How to Calculate Your Power Needs</h2>
          <p className="text-zinc-500 dark:text-zinc-400 mb-4">
            Every pedal lists its current draw in milliamps (mA) — usually on the bottom or in the manual.
            Add them all up, then add 20% headroom.
          </p>
          <div className="bg-gray-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 font-mono text-sm">
            <p className="text-zinc-500 mb-2"># Example: 8-pedal board</p>
            <p className="text-zinc-700 dark:text-zinc-300">Tuner: 100mA</p>
            <p className="text-zinc-700 dark:text-zinc-300">Compressor: 50mA</p>
            <p className="text-zinc-700 dark:text-zinc-300">Overdrive × 2: 20mA each</p>
            <p className="text-zinc-700 dark:text-zinc-300">Chorus: 40mA</p>
            <p className="text-zinc-700 dark:text-zinc-300">Delay: 150mA</p>
            <p className="text-zinc-700 dark:text-zinc-300">Reverb: 120mA</p>
            <p className="text-zinc-700 dark:text-zinc-300">Looper: 200mA</p>
            <Separator className="bg-zinc-200 dark:bg-zinc-700 my-2" />
            <p className="text-zinc-700 dark:text-zinc-300">Total: 700mA</p>
            <p className="text-orange-500 font-semibold">Required supply: 700 × 1.2 = 840mA minimum</p>
          </div>
        </section>

        {/* CTA */}
        <section className="mb-12 bg-gray-50 dark:bg-zinc-900 border border-orange-500/30 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Plan Your Full Rig</h2>
          <p className="text-zinc-500 dark:text-zinc-400 mb-6">Use our free visual builder to arrange your pedals and plan your power needs.</p>
          <a
            href="/pedalboard/builder"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Open Pedalboard Builder
          </a>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map(({ q, a }, i) => (
              <div key={i}>
                <h3 className="font-semibold mb-1">{q}</h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm">{a}</p>
                {i < faqs.length - 1 && <Separator className="bg-zinc-200 dark:bg-zinc-800 mt-6" />}
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  )
}
