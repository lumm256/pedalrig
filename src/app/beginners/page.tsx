import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import pedalsData from "@/data/pedals.json";

export const metadata: Metadata = {
  alternates: { canonical: "/beginners" },
  title: "Guitar Pedals for Beginners — Your First Pedalboard Guide 2026",
  description:
    "New to guitar pedals? Learn which effects pedals to buy first, how to set up your signal chain, and build your first pedalboard on any budget.",
};

const FIRST_5_TYPES = [
  {
    type: "tuner",
    icon: "🎯",
    label: "Tuner",
    why: "Always first on your board. You can't sound good if you're out of tune.",
  },
  {
    type: "overdrive",
    icon: "🔥",
    label: "Overdrive",
    why: "The most versatile gain pedal. From light crunch to screaming leads.",
  },
  {
    type: "delay",
    icon: "🔁",
    label: "Delay",
    why: "Adds depth and space. Even a subtle slap-back transforms your tone.",
  },
  {
    type: "reverb",
    icon: "🏔️",
    label: "Reverb",
    why: "Makes everything sound bigger. Essential for any style of playing.",
  },
  {
    type: "looper",
    icon: "⏺️",
    label: "Looper",
    why: "Practice tool and performance weapon. Record a loop and solo over it.",
  },
];

const BUDGET_PLANS = [
  {
    tier: "$100 Budget",
    badge: "Starter",
    badgeColor: "secondary" as const,
    description: "The essentials to get started without breaking the bank.",
    pedals: [
      { name: "Boss SD-1 Super Overdrive", price: 62 },
      { name: "TC Electronic Ditto Looper", price: 99 },
    ],
    note: "Borrow a tuner app on your phone. Add reverb from your amp's built-in.",
    total: 161,
  },
  {
    tier: "$300 Mid-Range",
    badge: "Most Popular",
    badgeColor: "default" as const,
    description: "A solid foundation that covers all the bases.",
    pedals: [
      { name: "Boss TU-3 Chromatic Tuner", price: 99 },
      { name: "Ibanez TS9 Tube Screamer", price: 99 },
      { name: "MXR Carbon Copy Analog Delay", price: 149 },
    ],
    note: "Use your amp's reverb. Upgrade to a dedicated reverb pedal next.",
    total: 347,
  },
  {
    tier: "$500 Premium",
    badge: "Best Value",
    badgeColor: "outline" as const,
    description: "A complete rig that'll serve you for years.",
    pedals: [
      { name: "Boss TU-3 Chromatic Tuner", price: 99 },
      { name: "Ibanez TS9 Tube Screamer", price: 99 },
      { name: "Boss CS-3 Compressor", price: 99 },
      { name: "MXR Carbon Copy Analog Delay", price: 149 },
      { name: "TC Electronic Ditto Looper", price: 99 },
    ],
    note: "Add a reverb pedal (~$100) to complete the setup.",
    total: 545,
  },
];

const MISTAKES = [
  {
    icon: "🛒",
    title: "Buying too many pedals at once",
    desc: "Start with 2–3 pedals. Learn them deeply before adding more. GAS (Gear Acquisition Syndrome) is real.",
  },
  {
    icon: "🔌",
    title: "Ignoring power supply",
    desc: "Daisy-chaining cheap adapters causes hum and noise. A quality isolated power supply is worth every penny.",
  },
  {
    icon: "🎛️",
    title: "Never tweaking the knobs",
    desc: "Spend 20 minutes dialing in each pedal. The default settings are rarely the best settings.",
  },
  {
    icon: "📦",
    title: "Wrong pedal order",
    desc: "Putting reverb before distortion sounds terrible. Learn the signal chain basics — it makes a huge difference.",
  },
  {
    icon: "💸",
    title: "Chasing expensive gear",
    desc: "A $60 Boss pedal played well beats a $400 boutique pedal played poorly. Tone is in the fingers first.",
  },
];

const FAQS = [
  {
    q: "How many pedals do I need to start?",
    a: "Honestly? Zero. But if you want to experiment, start with just one — an overdrive or a delay. Add more as you understand what each one does.",
  },
  {
    q: "Do I need a pedalboard?",
    a: "Not immediately. A few pedals on the floor works fine. Once you have 4+ pedals, a board makes setup and teardown much faster.",
  },
  {
    q: "What power supply should I use?",
    a: "Most pedals run on 9V DC. A quality isolated power supply like the Truetone 1 Spot Pro or Strymon Zuma eliminates noise from cheap adapters.",
  },
  {
    q: "True bypass vs buffered bypass — does it matter?",
    a: "For beginners, not really. True bypass is cleaner when the pedal is off; buffered helps maintain signal over long cable runs. Don't overthink it.",
  },
  {
    q: "Can I use guitar pedals with bass?",
    a: "Yes! Many pedals work great with bass. Look for bass-specific versions of popular pedals (like the Boss ODB-3) for better low-end response.",
  },
];

export default function BeginnersPage() {
  const getPedal = (type: string) =>
    (pedalsData as Array<{ type: string; name: string; price: number; id: string; amazonUrl?: string }>)
      .find((p) => p.type === type);

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero */}
        <div className="mb-12">
          <Badge className="mb-4 bg-orange-500/20 text-orange-400 border-orange-500/30">
            Beginner Guide
          </Badge>
          <h1 className="text-4xl font-bold mb-4">
            Guitar Pedals for Beginners — Where to Start
          </h1>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Getting into guitar pedals doesn&apos;t have to be overwhelming. You don&apos;t need a
            massive board or boutique gear to sound great. This guide cuts through the noise and
            tells you exactly what to buy first, in what order, and how to avoid the mistakes most
            beginners make.
          </p>
        </div>

        <Separator className="mb-12 bg-zinc-200 dark:bg-zinc-800" />

        {/* Your First 5 Pedals */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-2">Your First 5 Pedals</h2>
          <p className="text-zinc-500 dark:text-zinc-400 mb-8">
            These five types cover 90% of what you&apos;ll ever need. Here&apos;s one solid pick for each.
          </p>
          <div className="space-y-4">
            {FIRST_5_TYPES.map((item) => {
              const pedal = getPedal(item.type);
              return (
                <div
                  key={item.type}
                  className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
                >
                  <span className="text-2xl mt-0.5">{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-semibold">{item.label}</span>
                      <Badge variant="outline" className="text-xs border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400">
                        #{FIRST_5_TYPES.indexOf(item) + 1}
                      </Badge>
                    </div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">{item.why}</p>
                    {pedal ? (
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-sm font-medium text-orange-400">{pedal.name}</span>
                        <span className="text-sm text-zinc-500">${pedal.price}</span>
                        {pedal.amazonUrl && (
                          <a
                            href={pedal.amazonUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20 hover:bg-orange-500/20 transition-colors"
                          >
                            View on Amazon →
                          </a>
                        )}
                      </div>
                    ) : (
                      <span className="text-sm text-zinc-500">
                        {item.type === "reverb"
                          ? "Boss RV-6 Reverb — $149 (or use your amp's built-in reverb)"
                          : "See our pedal finder"}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Budget Plans */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-2">Budget Plans</h2>
          <p className="text-zinc-500 dark:text-zinc-400 mb-8">
            Pick the plan that fits your wallet. All three will get you playing with real effects.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {BUDGET_PLANS.map((plan) => (
              <Card key={plan.tier} className="bg-gray-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <CardTitle className="text-lg">{plan.tier}</CardTitle>
                    <Badge
                      variant={plan.badgeColor}
                      className={
                        plan.badgeColor === "default"
                          ? "bg-orange-500 text-white border-0"
                          : plan.badgeColor === "secondary"
                          ? "bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 border-0"
                          : "border-zinc-300 dark:border-zinc-600 text-zinc-500 dark:text-zinc-400"
                      }
                    >
                      {plan.badge}
                    </Badge>
                  </div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">{plan.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    {plan.pedals.map((p) => (
                      <li key={p.name} className="flex justify-between text-sm">
                        <span className="text-zinc-700 dark:text-zinc-300">{p.name}</span>
                        <span className="text-zinc-500 ml-2 shrink-0">${p.price}</span>
                      </li>
                    ))}
                  </ul>
                  <Separator className="mb-3 bg-zinc-200 dark:bg-zinc-800" />
                  <div className="flex justify-between text-sm font-semibold mb-3">
                    <span className="text-zinc-700 dark:text-zinc-300">Total</span>
                    <span className="text-orange-400">${plan.total}</span>
                  </div>
                  <p className="text-xs text-zinc-500">{plan.note}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Signal Chain Basics */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-2">Signal Chain Basics</h2>
          <p className="text-zinc-500 dark:text-zinc-400 mb-6">
            The order you connect your pedals matters — a lot. Putting reverb before distortion
            sounds muddy. Putting your tuner last means you&apos;re tuning a distorted signal.
          </p>
          <div className="p-5 rounded-lg bg-gray-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 mb-4">
            <p className="text-sm text-zinc-700 dark:text-zinc-300 font-mono">
              🎸 Guitar → Tuner → Overdrive → Delay → Reverb → Looper → 🔊 Amp
            </p>
          </div>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-4">
            That&apos;s the simplified version. The full guide covers all 13 pedal positions with
            reasons for each placement.
          </p>
          <Link
            href="/pedal-order"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/20 hover:bg-orange-500/20 transition-colors text-sm font-medium"
          >
            Full Signal Chain Guide →
          </Link>
        </section>

        {/* Common Mistakes */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-2">Common Beginner Mistakes</h2>
          <p className="text-zinc-500 dark:text-zinc-400 mb-8">
            These trip up almost everyone. Knowing them upfront saves you money and frustration.
          </p>
          <div className="space-y-4">
            {MISTAKES.map((m) => (
              <div key={m.title} className="flex gap-4 p-4 rounded-lg bg-gray-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <span className="text-xl shrink-0">{m.icon}</span>
                <div>
                  <p className="font-semibold mb-1">{m.title}</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">FAQ</h2>
          <div className="space-y-6">
            {FAQS.map((faq) => (
              <div key={faq.q}>
                <p className="font-semibold mb-2">{faq.q}</p>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">{faq.a}</p>
                <Separator className="mt-6 bg-zinc-200 dark:bg-zinc-800" />
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-xl bg-gradient-to-br from-orange-500/10 to-zinc-100 dark:to-zinc-900 border border-orange-500/20 p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Ready to build your first board?</h2>
          <p className="text-zinc-500 dark:text-zinc-400 mb-6">
            Use our Board Builder to plan your pedalboard, check power requirements, and see how
            everything fits together.
          </p>
          <Link
            href="/pedalboard/builder"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors"
          >
            Try the Board Builder →
          </Link>
        </section>
      </div>
    </main>
  );
}
