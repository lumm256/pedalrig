import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import signalChainData from "@/data/signal-chain.json";
import pedalsData from "@/data/pedals.json";

export const metadata: Metadata = {
  title: "Guitar Pedal Order Guide — The Right Signal Chain for Your Rig",
  description:
    "Learn the correct guitar pedal order for your signal chain. See exactly where to place each effects pedal type for the best tone.",
};

type ChainItem = {
  position: number;
  type: string;
  label: string;
  icon: string;
  reason: string;
};

type Pedal = {
  id: string;
  name: string;
  type: string;
  price: number;
  amazonUrl?: string;
};

const VARIANT_TIPS: Record<string, string> = {
  tuner: "Some players use a mute switch instead of a tuner pedal — same position.",
  wah: "Try wah after fuzz for a more aggressive, synth-like sound.",
  compressor: "Some players put compressor after overdrive to tighten up the gain.",
  overdrive: "Stack two overdrives — a light one boosting a heavier one — for huge tones.",
  distortion: "High-gain players often skip overdrive and go straight to distortion.",
  fuzz: "Fuzz before wah is the classic Hendrix setup. Try both positions.",
  eq: "A second EQ at the very end of the chain gives you a master tone control.",
  phaser: "Phaser before gain gives a more subtle, integrated effect.",
  chorus: "Stereo chorus into two amps is one of the best sounds in guitar.",
  tremolo: "Tremolo before reverb creates a pulsing, ambient wash.",
  delay: "Tap tempo delay synced to your drummer changes everything live.",
  reverb: "Some players put reverb in the effects loop for a cleaner sound.",
  looper: "A looper before reverb lets you add ambient space to your loops.",
};

const FAQS = [
  {
    q: "Does pedal order really matter that much?",
    a: "Yes — significantly. Putting reverb before distortion creates a muddy, uncontrollable wash. The standard order exists because it sounds best in most situations.",
  },
  {
    q: "Where does a volume pedal go?",
    a: "It depends on what you want. Early in the chain (before gain) acts like your guitar's volume knob. Late in the chain (after gain) controls overall output without affecting your gain tone.",
  },
  {
    q: "Should I put delay or reverb first?",
    a: "Delay before reverb is standard — the reverb then adds space to the delay repeats. Reversing them can sound interesting but is less common.",
  },
  {
    q: "What about effects loops on my amp?",
    a: "Put time-based effects (delay, reverb, chorus) in the effects loop. They'll sound cleaner because they're placed after the amp's preamp gain stage.",
  },
  {
    q: "Can I break these rules?",
    a: "Absolutely. Fuzz before wah, reverb into distortion, delay into fuzz — all of these can sound great. The 'rules' are a starting point, not a law.",
  },
];

export default function PedalOrderPage() {
  const chain = signalChainData.order as ChainItem[];
  const pedals = pedalsData as Pedal[];

  const getPedalForType = (type: string) => pedals.find((p) => p.type === type);

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero */}
        <div className="mb-12">
          <Badge className="mb-4 bg-orange-500/20 text-orange-400 border-orange-500/30">
            Signal Chain Guide
          </Badge>
          <h1 className="text-4xl font-bold mb-4 text-white">
            Guitar Pedal Order — How to Arrange Your Signal Chain
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed">
            The order you connect your pedals shapes your tone as much as the pedals themselves.
            Put reverb before distortion and you get a muddy mess. Get the order right and
            everything clicks into place. Here&apos;s the standard signal chain — and why it works.
          </p>
        </div>

        <Separator className="mb-12 bg-zinc-800" />

        {/* Visual Signal Chain */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-white">The Complete Signal Chain</h2>
          <div className="overflow-x-auto pb-4">
            <div className="flex items-center gap-2 min-w-max">
              {/* Guitar */}
              <div className="flex flex-col items-center gap-1">
                <div className="w-14 h-14 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-2xl">
                  🎸
                </div>
                <span className="text-xs text-zinc-500">Guitar</span>
              </div>
              <span className="text-zinc-600 text-lg">→</span>

              {chain.map((item, i) => (
                <div key={item.type} className="flex items-center gap-2">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-14 h-14 rounded-lg bg-zinc-900 border border-orange-500/30 flex items-center justify-center text-xl hover:border-orange-500/60 transition-colors">
                      {item.icon}
                    </div>
                    <span className="text-xs text-zinc-400 text-center w-14 leading-tight">
                      {item.label}
                    </span>
                  </div>
                  {i < chain.length - 1 && (
                    <span className="text-zinc-600 text-lg">→</span>
                  )}
                </div>
              ))}

              <span className="text-zinc-600 text-lg">→</span>
              {/* Amp */}
              <div className="flex flex-col items-center gap-1">
                <div className="w-14 h-14 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-2xl">
                  🔊
                </div>
                <span className="text-xs text-zinc-500">Amp</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-zinc-500 mt-3">Scroll horizontally to see the full chain</p>
        </section>

        {/* Detailed Sections */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-white">Position-by-Position Breakdown</h2>
          <div className="space-y-6">
            {chain.map((item) => {
              const pedal = getPedalForType(item.type);
              const variantTip = VARIANT_TIPS[item.type];
              return (
                <Card key={item.type} className="bg-zinc-900 border-zinc-800">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-xl shrink-0">
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge
                            variant="outline"
                            className="text-xs border-orange-500/30 text-orange-400"
                          >
                            Position {item.position}
                          </Badge>
                          <CardTitle className="text-base text-white">{item.label}</CardTitle>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-zinc-300">{item.reason}</p>

                    {pedal && (
                      <div className="flex items-center gap-3 p-3 rounded-md bg-zinc-800/50 flex-wrap">
                        <span className="text-xs text-zinc-500">Recommended:</span>
                        <span className="text-sm font-medium text-orange-400">{pedal.name}</span>
                        <span className="text-sm text-zinc-500">${pedal.price}</span>
                        {pedal.amazonUrl && (
                          <a
                            href={pedal.amazonUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20 hover:bg-orange-500/20 transition-colors ml-auto"
                          >
                            View →
                          </a>
                        )}
                      </div>
                    )}

                    {variantTip && (
                      <div className="flex gap-2 text-xs text-zinc-500">
                        <span className="shrink-0">💡</span>
                        <span>{variantTip}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Rules You Can Break */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-2 text-white">Rules You Can Break</h2>
          <p className="text-zinc-400 mb-6">
            These are guidelines, not laws. Some of the best tones come from breaking them.
          </p>
          <div className="space-y-3">
            {signalChainData.tips.map((tip, i) => (
              <div
                key={i}
                className="flex gap-3 p-4 rounded-lg bg-zinc-900 border border-zinc-800"
              >
                <span className="text-orange-400 font-bold shrink-0">{i + 1}.</span>
                <p className="text-sm text-zinc-300">{tip}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-white">FAQ</h2>
          <div className="space-y-6">
            {FAQS.map((faq) => (
              <div key={faq.q}>
                <p className="font-semibold text-white mb-2">{faq.q}</p>
                <p className="text-zinc-400 text-sm leading-relaxed">{faq.a}</p>
                <Separator className="mt-6 bg-zinc-800" />
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-xl bg-gradient-to-br from-orange-500/10 to-zinc-900 border border-orange-500/20 p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Put your signal chain together
          </h2>
          <p className="text-zinc-400 mb-6">
            Use the Board Builder to arrange your pedals in the right order, check power
            requirements, and plan your pedalboard layout.
          </p>
          <Link
            href="/pedalboard/builder"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors"
          >
            Open Board Builder →
          </Link>
        </section>
      </div>
    </main>
  );
}
