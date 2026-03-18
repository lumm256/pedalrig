import type { Metadata } from 'next'
import { Separator } from '@/components/ui/separator'

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: 'About PedalRig — Guitar Pedal Guide & Pedalboard Builder',
  description:
    'PedalRig helps guitarists choose the right pedals and build better pedalboards. Learn about our mission and how we can help your tone.',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2">About PedalRig</h1>
        <p className="text-orange-500 text-sm mb-8">Your guitar pedal guide</p>

        <Separator className="bg-zinc-200 dark:bg-zinc-800 mb-8" />

        <div className="space-y-6 text-zinc-700 dark:text-zinc-300 leading-relaxed">
          <p>
            PedalRig is a guide website for guitarists who want to make smarter decisions about
            effects pedals and pedalboard setups. We cut through the noise — literally and
            figuratively — to help you find the right gear for your playing style and budget.
          </p>

          <p>
            Whether you're building your first pedalboard or dialing in a touring rig, PedalRig
            covers the essentials: pedal types, signal chain order, power supply options, and
            cable management. We also offer a free visual pedalboard builder so you can plan
            your layout before you buy.
          </p>

          <p>
            We don't sell pedals. We don't have a preferred brand. Our goal is straightforward:
            give guitarists the information they need to make confident gear decisions.
          </p>

          <Separator className="bg-zinc-200 dark:bg-zinc-800" />

          <div>
            <h2 className="font-semibold text-lg mb-2">What We Cover</h2>
            <ul className="space-y-1 text-zinc-500 dark:text-zinc-400">
              <li>→ Pedal type guides (overdrive, delay, reverb, modulation, and more)</li>
              <li>→ Signal chain order and best practices</li>
              <li>→ Pedalboard sizing and setup guides</li>
              <li>→ Power supply comparisons</li>
              <li>→ Free visual pedalboard builder tool</li>
            </ul>
          </div>

          <Separator className="bg-zinc-200 dark:bg-zinc-800" />

          <p className="text-zinc-500 text-sm">
            PedalRig participates in the Amazon Associates program. Some links on this site are
            affiliate links — see our{' '}
            <a href="/disclaimer" className="text-orange-500 hover:text-orange-400 underline underline-offset-4">
              affiliate disclosure
            </a>{' '}
            for details.
          </p>
        </div>
      </div>
    </main>
  )
}
