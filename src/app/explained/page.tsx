import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Guitar Pedals Explained — How Effects Work (Simple Guide)",
  description:
    "Understand how guitar pedals work. From analog circuits to digital processing, learn the science behind overdrive, delay, reverb, and every effect type.",
  alternates: { canonical: "/explained" },
};

const EFFECTS = [
  {
    icon: "🔥",
    name: "Overdrive / Distortion",
    how: "Clips the audio waveform — overdrive uses soft clipping (rounded peaks) for a warm, amp-like breakup; distortion uses hard clipping (flattened peaks) for a more aggressive, compressed tone.",
    sounds: "From light crunch to full saturation. Think blues leads, rock rhythm, punk power chords.",
  },
  {
    icon: "💥",
    name: "Fuzz",
    how: "Extreme hard clipping that squares off the waveform almost completely. Early fuzz pedals used germanium transistors biased near cutoff, creating a sputtery, unpredictable character.",
    sounds: "Thick, woolly, buzzy. Jimi Hendrix, early Rolling Stones, shoegaze walls of sound.",
  },
  {
    icon: "🔁",
    name: "Delay",
    how: "Stores your signal in a buffer and plays it back after a set time interval. Analog delays use a bucket-brigade device (BBD) chip; digital delays use DSP to capture and replay a pristine copy.",
    sounds: "Slapback echo, rhythmic repeats, ambient washes. From rockabilly to post-rock.",
  },
  {
    icon: "🏔️",
    name: "Reverb",
    how: "Simulates acoustic reflections in a space. Spring reverb uses a physical spring; plate reverb uses a metal sheet; digital reverb models room impulse responses via convolution.",
    sounds: "Small room ambience to vast cathedral. Essential for almost every style of playing.",
  },
  {
    icon: "🌊",
    name: "Chorus",
    how: "Splits your signal, applies a short delay (5–30ms) to one copy, then modulates that delay time with an LFO. The slight pitch variation between the two signals creates a shimmering, doubled effect.",
    sounds: "Lush, shimmering clean tones. 80s pop, clean funk, Nirvana's clean passages.",
  },
  {
    icon: "📊",
    name: "Compressor",
    how: "Reduces dynamic range by attenuating signals above a threshold. A VCA or optical element controls gain reduction; attack and release settings determine how fast it responds.",
    sounds: "Punchy, even, sustained. Country chicken-picking, funk, studio-polished clean tones.",
  },
  {
    icon: "👣",
    name: "Wah",
    how: "A bandpass filter whose center frequency sweeps up and down as you rock the pedal. The filter emphasizes a narrow frequency band, creating the characteristic vowel-like sweep.",
    sounds: "Funky rhythm parts, expressive leads. Hendrix, Clapton, Slash solos.",
  },
  {
    icon: "🌀",
    name: "Phaser",
    how: "Uses all-pass filters to create phase-shifted copies of your signal. When mixed back with the dry signal, certain frequencies cancel out, creating notches that sweep up and down via an LFO.",
    sounds: "Swirling, spacey modulation. Van Halen's 'Eruption', Pink Floyd, funk rhythm.",
  },
  {
    icon: "〰️",
    name: "Tremolo",
    how: "Modulates the amplitude (volume) of your signal with an LFO. One of the simplest effects electronically — just a voltage-controlled amplifier driven by a low-frequency oscillator.",
    sounds: "Pulsing, rhythmic volume swells. Surf rock, country, vintage amp character.",
  },
  {
    icon: "🎚️",
    name: "EQ",
    how: "Boosts or cuts specific frequency bands using shelving or parametric filters. Passive EQs use inductors and capacitors; active EQs use op-amps for boost capability.",
    sounds: "Tone shaping, cutting mud, boosting presence. Works at any point in the signal chain.",
  },
];

const FAQS = [
  {
    q: "Why does my pedal sound different through different amps?",
    a: "Pedals interact with your amp's input impedance and frequency response. A bright amp will emphasize the high-end of a distortion pedal; a dark amp will smooth it out. The pedal isn't changing — the system is.",
  },
  {
    q: "What's the difference between analog and digital pedals?",
    a: "Analog pedals process your signal continuously using physical components (transistors, capacitors, op-amps). Digital pedals convert your signal to numbers, process it with a DSP chip, then convert back. Neither is inherently better — they have different characters.",
  },
  {
    q: "Why do some pedals hiss or hum?",
    a: "High-gain pedals amplify noise along with your signal. Single-coil pickups are especially susceptible. Poor power supplies introduce 60Hz hum. Cheap cables add capacitance that rolls off high frequencies and picks up interference.",
  },
  {
    q: "Does pedal order really matter?",
    a: "Yes. Running a wah after a distortion sounds completely different from running it before. The general rule: dynamics and filters first, gain in the middle, modulation and time-based effects last. But rules exist to be broken.",
  },
  {
    q: "What does 'true bypass' actually mean?",
    a: "When bypassed, a true bypass pedal connects your input directly to your output with a mechanical switch — the circuit is completely out of the signal path. This preserves your tone but can cause signal loss on long cable runs without a buffer.",
  },
];

export default function ExplainedPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-12">

        {/* Breadcrumb */}
        <nav className="text-sm text-zinc-500 dark:text-zinc-400 mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-orange-500 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-zinc-700 dark:text-zinc-300">Pedals Explained</span>
        </nav>

        {/* H1 */}
        <h1 className="text-4xl font-bold mb-4">Guitar Pedals Explained — How Effects Actually Work</h1>

        {/* Intro */}
        <p className="text-lg text-zinc-500 dark:text-zinc-400 mb-4 leading-relaxed">
          Guitar pedals aren't magic. They're circuits — collections of resistors, capacitors,
          transistors, and chips that manipulate your audio signal in predictable, repeatable ways.
          Understanding how they work makes you a better player: you'll dial in tones faster, troubleshoot
          problems easier, and know exactly what to buy next.
        </p>
        <p className="text-zinc-500 dark:text-zinc-400 mb-12 leading-relaxed">
          You don't need an electronics degree. Here's everything you need to know, explained plainly.
        </p>

        <Separator className="mb-12 bg-zinc-200 dark:bg-zinc-800" />

        {/* The Basics */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">The Basics — Signal Flow</h2>
          <div className="p-6 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 mb-6">
            <div className="flex items-center justify-center gap-2 flex-wrap text-sm font-mono">
              <span className="px-3 py-1.5 rounded bg-zinc-100 dark:bg-zinc-800">🎸 Guitar</span>
              <span className="text-zinc-400">→</span>
              <span className="px-3 py-1.5 rounded bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400">Pedal 1</span>
              <span className="text-zinc-400">→</span>
              <span className="px-3 py-1.5 rounded bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400">Pedal 2</span>
              <span className="text-zinc-400">→</span>
              <span className="px-3 py-1.5 rounded bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400">Pedal N</span>
              <span className="text-zinc-400">→</span>
              <span className="px-3 py-1.5 rounded bg-zinc-100 dark:bg-zinc-800">🔊 Amp</span>
            </div>
          </div>
          <p className="text-zinc-500 dark:text-zinc-400 mb-4 leading-relaxed">
            Your guitar produces a small AC voltage — typically 100mV to 1V peak-to-peak depending on
            your pickups and how hard you play. That signal travels through your cable into the first
            pedal's input, gets processed, exits the output, and moves to the next pedal or your amp.
          </p>
          <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Each pedal in the chain receives the output of the previous one. This is why order matters —
            a distortion pedal after a wah processes an already-filtered signal, which sounds completely
            different from a wah after distortion.
          </p>
        </section>

        {/* How Each Effect Works */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-2">How Each Effect Type Works</h2>
          <p className="text-zinc-500 dark:text-zinc-400 mb-8">
            A plain-English breakdown of the circuit principle behind every major effect category.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {EFFECTS.map((effect) => (
              <Card key={effect.name} className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <span className="text-2xl">{effect.icon}</span>
                    {effect.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-orange-500 uppercase tracking-wide mb-1">How it works</p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{effect.how}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1">Sounds like</p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{effect.sounds}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Analog vs Digital */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Analog vs Digital</h2>
          <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-100 dark:bg-zinc-800">
                  <th className="text-left px-4 py-3 font-semibold"></th>
                  <th className="text-left px-4 py-3 font-semibold text-orange-500">Analog</th>
                  <th className="text-left px-4 py-3 font-semibold text-blue-500">Digital</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {[
                  ["Signal processing", "Continuous voltage manipulation", "ADC → DSP → DAC"],
                  ["Tone character", "Warm, organic, component-dependent", "Precise, consistent, programmable"],
                  ["Latency", "Zero (speed of electricity)", "1–3ms (A/D conversion)"],
                  ["Repeatability", "Varies with temperature/age", "Identical every time"],
                  ["Complexity", "Limited by circuit size", "Virtually unlimited"],
                  ["Repairability", "Straightforward with schematics", "Often requires chip replacement"],
                  ["Best for", "Overdrive, fuzz, compressor, wah", "Delay, reverb, multi-effects, pitch"],
                ].map(([aspect, analog, digital]) => (
                  <tr key={aspect} className="bg-white dark:bg-zinc-900">
                    <td className="px-4 py-3 font-medium text-zinc-700 dark:text-zinc-300">{aspect}</td>
                    <td className="px-4 py-3 text-zinc-500 dark:text-zinc-400">{analog}</td>
                    <td className="px-4 py-3 text-zinc-500 dark:text-zinc-400">{digital}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* True Bypass vs Buffered */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">True Bypass vs Buffered</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
              <CardHeader>
                <CardTitle className="text-base">True Bypass</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-zinc-500 dark:text-zinc-400">
                <p>
                  When bypassed, a mechanical switch connects your input jack directly to your output
                  jack. The pedal's circuit is completely removed from the signal path.
                </p>
                <p className="font-medium text-green-600 dark:text-green-400">✓ Zero coloration when off</p>
                <p className="font-medium text-green-600 dark:text-green-400">✓ Preferred by tone purists</p>
                <p className="font-medium text-red-500">✗ Long cable runs cause high-frequency loss</p>
                <p className="font-medium text-red-500">✗ Mechanical switches wear over time</p>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
              <CardHeader>
                <CardTitle className="text-base">Buffered Bypass</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-zinc-500 dark:text-zinc-400">
                <p>
                  When bypassed, the signal still passes through a buffer circuit — a unity-gain
                  amplifier that converts your high-impedance guitar signal to low impedance.
                </p>
                <p className="font-medium text-green-600 dark:text-green-400">✓ Preserves high frequencies on long runs</p>
                <p className="font-medium text-green-600 dark:text-green-400">✓ Drives long cable runs cleanly</p>
                <p className="font-medium text-red-500">✗ Slight coloration even when off</p>
                <p className="font-medium text-red-500">✗ Bad buffers can degrade tone</p>
              </CardContent>
            </Card>
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-4 leading-relaxed">
            The practical answer: one good buffer (like a Boss pedal or a dedicated buffer pedal) at the
            start of your chain is all you need. A board full of true bypass pedals with no buffer will
            sound worse than a board with a few buffered pedals.
          </p>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">FAQ</h2>
          <div className="space-y-6">
            {FAQS.map((faq) => (
              <div key={faq.q}>
                <p className="font-semibold mb-2">{faq.q}</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{faq.a}</p>
                <Separator className="mt-6 bg-zinc-200 dark:bg-zinc-800" />
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-xl bg-gradient-to-br from-orange-500/10 to-zinc-100 dark:to-zinc-900 border border-orange-500/20 p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Now that you know how they work</h2>
          <p className="text-zinc-500 dark:text-zinc-400 mb-6">
            Find the perfect pedal for your sound. Browse every effect type with our top picks.
          </p>
          <Link
            href="/types"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors"
          >
            Find Your Perfect Pedal →
          </Link>
        </section>

      </div>
    </main>
  );
}
