import type { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

export const metadata: Metadata = {
  title: 'How to Build a Pedalboard — Complete Setup Guide 2026',
  description:
    'Everything you need to build your guitar pedalboard. Board sizes, power supply guide, cable management, and our free pedalboard builder tool.',
}

const boardSizes = [
  {
    name: 'Nano',
    dimensions: '12" × 6"',
    pedals: '3–5',
    bestFor: 'Bedroom players, minimalists, fly gigs',
    recommended: 'Pedaltrain Nano, Holeyboard Mini',
    badge: 'Compact',
  },
  {
    name: 'Classic',
    dimensions: '24" × 12"',
    pedals: '8–12',
    bestFor: 'Gigging musicians, home studio players',
    recommended: 'Pedaltrain Classic 1, Temple Audio Duo 17',
    badge: 'Most Popular',
  },
  {
    name: 'Large',
    dimensions: '32" × 16"',
    pedals: '15–25',
    bestFor: 'Touring pros, tone chasers, full rigs',
    recommended: 'Pedaltrain Pro, Holeyboard 24',
    badge: 'Pro Rig',
  },
]

const wiringTips = [
  'Use the shortest cables possible — every extra inch adds capacitance and potential noise.',
  'Route power cables away from signal cables to avoid electromagnetic interference.',
  'Label both ends of every cable before you zip-tie anything down.',
  'Leave a little slack at each pedal so you can swap without rewiring the whole board.',
  'Test the full signal chain before permanently mounting anything with velcro.',
]

const buildSteps = [
  { step: 1, title: 'Choose Your Board', desc: 'Pick a size that fits your current pedal count plus 2–3 slots for future additions.' },
  { step: 2, title: 'Select a Power Supply', desc: 'Isolated power for noise-sensitive pedals; daisy chain only for simple, low-current setups.' },
  { step: 3, title: 'Arrange Your Pedals', desc: 'Lay them out dry first. Follow signal chain order: tuner → dynamics → drive → modulation → delay → reverb.' },
  { step: 4, title: 'Run Your Cables', desc: 'Use patch cables cut to length. Keep signal and power cables separated.' },
  { step: 5, title: 'Mount Everything', desc: 'Velcro the pedals, zip-tie the cables, secure the power supply underneath if possible.' },
  { step: 6, title: 'Test & Tweak', desc: 'Play through the full chain. Check for noise, hum, or signal loss before the gig.' },
]

const faqs = [
  {
    q: 'How many pedals can I fit on a pedalboard?',
    a: 'It depends on pedal size. A Nano fits 3–5 mini pedals, a Classic fits 8–12 standard pedals, and a Large board can hold 15–25 depending on layout.',
  },
  {
    q: 'Do I need an isolated power supply?',
    a: 'For most setups, yes. Isolated power eliminates ground loops and noise between pedals. Daisy chains work fine for simple setups with all-digital pedals.',
  },
  {
    q: 'What order should pedals go in?',
    a: 'Standard order: tuner → wah → compressor → overdrive/distortion → modulation (chorus/flanger) → delay → reverb. Rules are made to be broken, but this is a solid starting point.',
  },
  {
    q: 'How do I reduce noise on my pedalboard?',
    a: 'Use isolated power, quality patch cables, and a noise gate if needed. Keep power cables away from signal cables and check that all pedals share a common ground.',
  },
  {
    q: 'Can I use a power strip instead of a dedicated pedal power supply?',
    a: 'Technically yes, but it introduces significant noise risk. A dedicated pedal power supply with regulated outputs is always the better choice.',
  },
]

export default function PedalboardPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <div className="max-w-4xl mx-auto px-4 py-12">

        {/* Hero */}
        <h1 className="text-4xl font-bold mb-4">
          How to Build Your Perfect Pedalboard
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-lg mb-10 max-w-2xl">
          A pedalboard turns a pile of pedals into a reliable, gig-ready rig. Get the size right,
          power it properly, and wire it clean — and your tone will thank you.
        </p>

        <Separator className="bg-zinc-200 dark:bg-zinc-800 mb-10" />

        {/* Board Sizes */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-2">Pedalboard Size Guide</h2>
          <p className="text-zinc-500 dark:text-zinc-400 mb-6">Pick the right size from the start — it's cheaper than buying twice.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {boardSizes.map((size) => (
              <Card key={size.name} className="bg-gray-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{size.name}</CardTitle>
                    <Badge className="bg-orange-500 text-white text-xs">{size.badge}</Badge>
                  </div>
                  <p className="text-zinc-500 text-sm">{size.dimensions}</p>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div><span className="text-zinc-500 dark:text-zinc-400">Pedals: </span><span>{size.pedals}</span></div>
                  <div><span className="text-zinc-500 dark:text-zinc-400">Best for: </span><span>{size.bestFor}</span></div>
                  <div><span className="text-zinc-500 dark:text-zinc-400">Recommended: </span><span className="text-zinc-700 dark:text-zinc-300">{size.recommended}</span></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Power */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-2">Power Supply Options</h2>
          <p className="text-zinc-500 dark:text-zinc-400 mb-4">
            Bad power is the #1 cause of pedalboard noise. Get this right and half your problems disappear.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4">
              <h3 className="text-orange-500 font-semibold mb-2">Isolated Power ✓</h3>
              <ul className="text-sm text-zinc-700 dark:text-zinc-300 space-y-1">
                <li>✓ Each output is electrically isolated</li>
                <li>✓ Eliminates ground loops and hum</li>
                <li>✓ Works with digital and analog pedals</li>
                <li>✗ More expensive ($80–$200+)</li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4">
              <h3 className="text-zinc-700 dark:text-zinc-300 font-semibold mb-2">Daisy Chain</h3>
              <ul className="text-sm text-zinc-700 dark:text-zinc-300 space-y-1">
                <li>✓ Cheap and simple ($10–$30)</li>
                <li>✓ Fine for all-analog, low-current setups</li>
                <li>✗ Shared ground = potential noise</li>
                <li>✗ Digital pedals often cause hum</li>
              </ul>
            </div>
          </div>
          <a
            href="/power-supply"
            className="inline-block text-orange-500 hover:text-orange-400 text-sm font-medium underline underline-offset-4"
          >
            Full power supply guide →
          </a>
        </section>

        {/* Wiring Tips */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Cable Management Tips</h2>
          <ol className="space-y-3">
            {wiringTips.map((tip, i) => (
              <li key={i} className="flex gap-3 text-zinc-700 dark:text-zinc-300">
                <span className="text-orange-500 font-bold shrink-0">{i + 1}.</span>
                <span>{tip}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Build Steps */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">How to Build Your Pedalboard: 6 Steps</h2>
          <div className="space-y-4">
            {buildSteps.map(({ step, title, desc }) => (
              <div key={step} className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-sm shrink-0">
                  {step}
                </div>
                <div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mb-12 bg-gray-50 dark:bg-zinc-900 border border-orange-500/30 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Ready to Plan Your Rig?</h2>
          <p className="text-zinc-500 dark:text-zinc-400 mb-6">Drag, drop, and arrange your pedals visually before you buy a single cable.</p>
          <a
            href="/pedalboard/builder"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Use our free visual builder
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
