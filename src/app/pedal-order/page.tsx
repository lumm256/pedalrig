import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TypeIcon } from "@/components/type-icon";
import { SignalChainDiagram } from "@/components/signal-chain-diagram";
import pedalsData from "@/data/pedals.json";

export const metadata: Metadata = {
  alternates: { canonical: "/pedal-order" },
  title:
    "Guitar Pedal Order Guide: The Perfect Signal Chain Explained (2026)",
  description:
    "Learn the correct guitar pedal order for your signal chain. Step-by-step guide covering where to place every pedal type — and why — with an interactive diagram.",
  keywords: [
    "guitar pedal order",
    "signal chain",
    "pedal order diagram",
    "effects chain order",
    "pedalboard order",
    "guitar effects order",
    "pedal signal chain guide",
  ],
};

/* ---------- data helpers ---------- */

type Pedal = {
  id: string;
  name: string;
  type: string;
  price: number;
  amazonUrl?: string;
};

const pedals = pedalsData as Pedal[];
const byType = (t: string) => pedals.filter((p) => p.type === t);
const pick = (t: string, n = 2) => byType(t).slice(0, n);

/* ---------- section data ---------- */

const SECTIONS: {
  position: number;
  title: string;
  type: string;
  icon: string;
  slug: string;
  why: string;
  detail: string;
  proTip?: string;
  controversy?: string;
}[] = [
  {
    position: 1,
    title: "Tuner",
    type: "tuner",
    icon: "/images/type-icons/tuner.svg",
    slug: "tuner",
    why: "Your tuner needs the cleanest, most unprocessed signal possible. Any effects before it — compression, modulation, gain — will confuse the pitch detection algorithm. The result? Inaccurate tuning and frustrating flicker on the display.",
    detail:
      "Most tuner pedals also double as a mute switch. When engaged, they cut your signal to the amp so you can tune silently between songs. This is why the first position is non-negotiable: you want to cut the signal before it hits any other pedal.",
    proTip:
      "If your tuner has a bypass output (like the Boss TU-3's bypass jack), you can run it in parallel so it never touches your main signal path at all.",
  },
  {
    position: 2,
    title: "Wah & Filter Pedals",
    type: "wah",
    icon: "/images/type-icons/wah.svg",
    slug: "wah",
    why: "Wah pedals are essentially a sweepable bandpass filter. When they receive a clean, dynamic signal, the sweep sounds vocal, expressive, and responsive to your picking. Put a wah after distortion and the filter sweep becomes harsher and more extreme — which some players actually prefer.",
    detail:
      "The classic position is wah before dirt. This is the Hendrix sound, the Clapton sound, the Kirk Hammett sound. The wah shapes your clean tone, then the gain stage amplifies it. If you flip the order (gain → wah), you get a more aggressive, almost synth-like tone. Neither is wrong — but the traditional position is first.",
    controversy:
      "Wah before or after distortion is one of the most debated pedal order questions on Reddit. Try both. Jerry Cantrell runs his wah after his distortion for that nasal, cutting lead tone. Hendrix ran his before fuzz for a smoother, more vocal quality.",
    proTip:
      "Auto-wah and envelope filter pedals follow the same rule. They respond to your pick dynamics, so clean signal in = better tracking.",
  },
  {
    position: 3,
    title: "Compressor",
    type: "compressor",
    icon: "/images/type-icons/compressor.svg",
    slug: "compressor",
    why: "A compressor evens out the volume differences between your softest and loudest notes. Placed early in the chain, it ensures that everything hitting your gain pedals has a more consistent level — which means tighter, more controlled overdrive and distortion.",
    detail:
      "Think of the compressor as a dynamics gatekeeper. Quiet notes get boosted, loud peaks get tamed. For country chicken-picking and clean funk, this is essential. For high-gain players, the compressor adds sustain and a polished feel without the noise that comes from cranking your gain higher.",
    proTip:
      "Some players run the compressor after their gain pedals to 'squash' their distorted tone for a more even, studio-ready sound. This works great for recording but can feel less dynamic live.",
  },
  {
    position: 4,
    title: "Overdrive",
    type: "overdrive",
    icon: "/images/type-icons/overdrive.svg",
    slug: "overdrive",
    why: "Overdrive before distortion is the secret to great gain stacking. A light overdrive hitting a heavier distortion pedal produces a thicker, more harmonically complex tone than either pedal alone. The overdrive acts as a 'boost' that pushes the distortion harder.",
    detail:
      "The classic example: a Tube Screamer into a Marshall-style distortion. The Tube Screamer's mid-hump tightens the low end and adds clarity to the distortion. This is the foundation of countless rock and metal tones. Stevie Ray Vaughan ran a Tube Screamer into a cranked Fender amp — same principle, just using the amp's natural overdrive instead of a pedal.",
    proTip:
      "Want three gain levels? Set your overdrive low, distortion medium, and stack them for high gain. That gives you clean (both off), crunch (overdrive on), rhythm (distortion on), and lead (both on).",
  },
  {
    position: 5,
    title: "Distortion",
    type: "distortion",
    icon: "/images/type-icons/distortion.svg",
    slug: "distortion",
    why: "Distortion is your main gain stage — the pedal that defines your core driven tone. Placed after overdrive, it receives a slightly boosted signal that results in tighter, more focused saturation.",
    detail:
      "Unlike overdrive (which clips softly for a warm, amp-like sound), distortion uses hard clipping for a more aggressive, consistent tone. The gain level stays roughly the same regardless of how hard you pick. This makes it ideal for palm-muted riffs and high-gain rhythm playing.",
    proTip:
      "Running a noise gate right after your distortion can tame the hiss and hum that comes with high-gain settings. More on that below.",
  },
  {
    position: 6,
    title: "Fuzz",
    type: "fuzz",
    icon: "/images/type-icons/fuzz.svg",
    slug: "fuzz",
    why: "Fuzz is the most placement-sensitive pedal type. Many classic fuzz designs — especially germanium-based circuits like the Fuzz Face — need to see your guitar's pickups directly. Put a buffer, tuner, or wah before them and they lose their character entirely.",
    detail:
      "This is because vintage fuzz circuits interact with your guitar's volume and tone controls in a unique way. They rely on the impedance of your pickups to function correctly. A buffer changes that impedance, and suddenly your warm, dynamic fuzz becomes thin and harsh. Modern silicon fuzz pedals are generally less picky about placement, but it's always worth testing.",
    controversy:
      "The 'fuzz first' vs 'fuzz after other dirt' debate has been running since the 1960s. If your fuzz needs to be first but you also need a tuner, look for a true-bypass tuner (no buffer) or use a tuner with a separate output before the fuzz.",
    proTip:
      "Hendrix ran his Fuzz Face before his wah for that iconic thick, aggressive sound. Running fuzz after wah gives a cleaner, more defined sweep. Both are valid — experiment.",
  },
  {
    position: 7,
    title: "EQ",
    type: "eq",
    icon: "/images/type-icons/eq.svg",
    slug: "eq",
    why: "An EQ pedal after your gain stages lets you sculpt your distorted tone precisely. Boost the mids for lead passages that cut through a band mix. Cut harsh high frequencies. Add low-end thump for heavier riffs.",
    detail:
      "The EQ is one of the most underrated pedals on any board. Dimebag Darrell's scooped metal tone? Boss GE-7 with the mids pulled down and the highs and lows boosted. Josh Homme's thick, mid-forward Queens of the Stone Age tone? EQ with boosted mids. A single EQ pedal can transform a cheap distortion into something that sounds professional.",
    proTip:
      "Run a second EQ at the very end of your chain (before the looper) as a master tone control. Useful for compensating for different venues and amp settings.",
  },
  {
    position: 8,
    title: "Modulation: Phaser, Chorus, Flanger, Tremolo",
    type: "phaser",
    icon: "/images/type-icons/phaser.svg",
    slug: "phaser",
    why: "Modulation effects work best after your gain stages. The reason is simple: if you put a chorus or phaser before distortion, the gain stage amplifies and distorts the modulation effect itself, creating a muddy, indistinct sound. After distortion, the modulation sits cleanly on top of your gain tone.",
    detail:
      "The standard order within modulation is: phaser → flanger → chorus → tremolo. Phasers and flangers create pitch-based movement, chorus creates width, and tremolo creates volume-based pulsing. But honestly, the order between modulation pedals matters much less than their position relative to gain and time-based effects.",
    proTip:
      "Exception: phaser or chorus before a light overdrive can sound beautiful for vintage tones. Eddie Van Halen ran his MXR Phase 90 before his distortion. As always, trust your ears.",
  },
  {
    position: 9,
    title: "Delay",
    type: "delay",
    icon: "/images/type-icons/delay.svg",
    slug: "delay",
    why: "Delay creates echo repeats of your signal. You want those repeats to be clean copies of your fully processed tone — including your gain, EQ, and modulation. If delay comes before distortion, the distortion processes each repeat, turning them into a muddy, compressed mess.",
    detail:
      "There are three main delay types: analog (warm, dark repeats that degrade naturally), digital (pristine, exact copies), and tape (vintage-style with subtle pitch wobble). Each sounds different, but they all belong near the end of the chain. The Edge's signature sound? Multiple delays creating rhythmic patterns from a clean or lightly overdriven signal.",
    proTip:
      "For players using an effects loop, delay in the loop sounds cleaner because it's placed after the amp's preamp gain stage. This is especially important for high-gain amp players.",
  },
  {
    position: 10,
    title: "Reverb",
    type: "reverb",
    icon: "/images/type-icons/reverb.svg",
    slug: "reverb",
    why: "Reverb simulates the natural reflections of a physical space. It should be the last 'effect' in your chain (before the looper) because you want it to add space to your complete, processed signal — just like a real room adds ambience to whatever sound enters it.",
    detail:
      "Types range from spring reverb (the classic surf/country sound built into Fender amps), plate reverb (bright, studio-quality), hall reverb (large, dramatic), to shimmer reverb (adds octave-shifted reflections for ambient and worship music). Each creates a different sense of space, but they all belong at the end.",
    controversy:
      "Reverb before distortion is deliberately used in shoegaze and ambient music to create a washy, otherworldly sound. Kevin Shields (My Bloody Valentine) and many shoegaze artists intentionally break this rule. If you're going for that sound, go for it.",
    proTip:
      "If your amp has built-in spring reverb, you effectively have two reverb options: the amp's reverb (after the preamp) and a pedal reverb (before the amp). Stacking them subtly can sound incredible.",
  },
  {
    position: 11,
    title: "Looper",
    type: "looper",
    icon: "/images/type-icons/looper.svg",
    slug: "looper",
    why: "The looper records whatever signal it receives and plays it back. If it's last in the chain, it captures your complete processed tone — all effects included. This means your loops sound exactly like your live playing.",
    detail:
      "If you put the looper earlier, your loops would be affected by any pedals after it. Turn on a delay after recording a loop and suddenly the loop has delay on it too. By keeping the looper last, your loops are locked in and unaffected by pedal changes.",
    proTip:
      "Some players intentionally put the looper before their effects so they can apply different effects to the loop in real time. This is an advanced technique used in ambient and experimental music — but for most players, last is best.",
  },
];

const COMMON_MISTAKES = [
  {
    mistake: "Buffer-sensitive fuzz after a buffered tuner",
    fix: "Use a true-bypass tuner, or put your fuzz first and use a clip-on tuner.",
    icon: "⚠️",
  },
  {
    mistake: "Reverb before distortion (unintentionally)",
    fix: "Unless you're going for a shoegaze wash, always put reverb after gain pedals.",
    icon: "⚠️",
  },
  {
    mistake: "Delay before modulation",
    fix: "Delay repeats with chorus on top can sound messy. Standard order: modulation → delay → reverb.",
    icon: "⚠️",
  },
  {
    mistake: "Using all pedals in front of the amp instead of the effects loop",
    fix: "Time-based effects (delay, reverb, chorus) sound cleaner in your amp's effects loop, especially with high-gain amps.",
    icon: "⚠️",
  },
  {
    mistake: "Too many gain pedals stacked at once",
    fix: "Stacking 2 gain stages sounds great. Stacking 4 usually just adds noise. Be intentional about which combinations you use.",
    icon: "⚠️",
  },
];

const EFFECTS_LOOP_PEDALS = [
  "Delay",
  "Reverb",
  "Chorus",
  "Tremolo",
  "Phaser (optional)",
  "Flanger (optional)",
];

const FRONT_OF_AMP_PEDALS = [
  "Tuner",
  "Wah",
  "Compressor",
  "Overdrive",
  "Distortion",
  "Fuzz",
  "EQ",
];

const FAQS = [
  {
    q: "Does guitar pedal order really matter?",
    a: "Yes — significantly. The order affects how each pedal interacts with the others. Reverb before distortion creates a muddy, uncontrollable wash. Delay before gain means your repeats get distorted. The standard order exists because it produces the best results in most situations. That said, rules can be broken intentionally for creative effects.",
  },
  {
    q: "Where should a volume pedal go in my signal chain?",
    a: "It depends on what you want. Early in the chain (after tuner, before gain): it acts like your guitar's volume knob, reducing gain as you roll off. Late in the chain (after gain, before delay): it controls your overall output level without changing your gain character. Most players prefer the late position for volume swells.",
  },
  {
    q: "Should delay or reverb come first?",
    a: "Delay before reverb is the standard convention. The reverb adds natural space to your delay repeats, which sounds like an echo in a room — natural and musical. If you reverse them (reverb → delay), the delay creates echoes of the reverb tail, which can sound washy and unfocused. But for ambient and experimental music, reverb → delay can be intentionally beautiful.",
  },
  {
    q: "What is an effects loop and should I use one?",
    a: "An effects loop is a send/return circuit on your amp that lets you place pedals between the preamp (where gain happens) and the power amp (where volume happens). Time-based effects like delay, reverb, and chorus sound much cleaner in the loop because they process the signal after the amp's distortion stage. If you use a high-gain amp, an effects loop is almost essential.",
  },
  {
    q: "Why does my fuzz pedal sound terrible after my tuner?",
    a: "Many classic fuzz circuits (especially germanium designs like the Fuzz Face) are buffer-sensitive. They need to 'see' the high impedance of your guitar's pickups directly. A buffered tuner or buffered bypass pedal changes the impedance and kills the fuzz's character. Solution: put the fuzz first (before the tuner), use a true-bypass tuner, or use a modern fuzz designed to work after buffers.",
  },
  {
    q: "Can I break the standard pedal order rules?",
    a: "Absolutely. Some of the most iconic tones come from breaking the rules. Jimi Hendrix: fuzz before wah. Kevin Shields (My Bloody Valentine): reverb into distortion for shoegaze wash. Tom Morello: unconventional routing for unique textures. The standard order is a starting point that works for 90% of situations. Once you understand why each position works, you'll know when and how to break the rules effectively.",
  },
  {
    q: "How should I order multiple gain pedals (overdrive, distortion, fuzz)?",
    a: "The general rule is lower gain first, higher gain later: overdrive → distortion → fuzz. This way, lighter gain stages boost and tighten heavier ones. A Tube Screamer pushing a Big Muff is a classic example. But you can reverse this for different textures — heavy distortion into a light overdrive can create a compressed, saturated lead tone.",
  },
];

/* ---------- JSON-LD ---------- */

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HowTo",
        name: "How to Set Up Your Guitar Pedal Signal Chain",
        description:
          "Step-by-step guide to arranging guitar effects pedals in the correct signal chain order for the best tone.",
        step: SECTIONS.map((s) => ({
          "@type": "HowToStep",
          position: s.position,
          name: `Position ${s.position}: ${s.title}`,
          text: s.why,
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "Article",
        headline:
          "Guitar Pedal Order Guide: The Perfect Signal Chain Explained",
        description:
          "Complete guide to guitar pedal order and signal chain arrangement with interactive diagram, step-by-step explanations, and expert tips.",
        author: { "@type": "Organization", name: "PedalRig" },
        publisher: {
          "@type": "Organization",
          name: "PedalRig",
          url: "https://pedalrig.com",
        },
        datePublished: "2026-03-22",
        dateModified: "2026-03-22",
      },
    ],
  };
}

/* ---------- page ---------- */

export default function PedalOrderPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />
      <main className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
        <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
          {/* ───── Hero ───── */}
          <header className="mb-14">
            <Badge className="mb-4 bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs">
              Complete Signal Chain Guide
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 leading-tight">
              Guitar Pedal Order: The Complete Signal Chain Guide
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
              The order you connect your pedals matters as much as the pedals
              themselves. Put reverb before distortion and you get an
              uncontrollable wall of mud. Get the order right and everything
              sits together perfectly. This guide covers the standard signal
              chain, explains <em>why</em> each pedal goes where it does, and
              tells you when to break the rules.
            </p>
          </header>

          {/* ───── Table of Contents ───── */}
          <nav className="mb-14 p-5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <p className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-3">
              Contents
            </p>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
              <li>
                <a
                  href="#diagram"
                  className="text-orange-500 hover:underline"
                >
                  Interactive Signal Chain Diagram
                </a>
              </li>
              <li>
                <a href="#why" className="text-orange-500 hover:underline">
                  Why Does Pedal Order Matter?
                </a>
              </li>
              <li>
                <a
                  href="#breakdown"
                  className="text-orange-500 hover:underline"
                >
                  Position-by-Position Breakdown
                </a>
              </li>
              <li>
                <a
                  href="#effects-loop"
                  className="text-orange-500 hover:underline"
                >
                  Using an Effects Loop
                </a>
              </li>
              <li>
                <a
                  href="#mistakes"
                  className="text-orange-500 hover:underline"
                >
                  Common Mistakes to Avoid
                </a>
              </li>
              <li>
                <a
                  href="#breaking-rules"
                  className="text-orange-500 hover:underline"
                >
                  Breaking the Rules
                </a>
              </li>
              <li>
                <a href="#faq" className="text-orange-500 hover:underline">
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#builder"
                  className="text-orange-500 hover:underline"
                >
                  Build Your Signal Chain
                </a>
              </li>
            </ul>
          </nav>

          <Separator className="mb-14 bg-zinc-200 dark:bg-zinc-800" />

          {/* ───── Interactive Diagram ───── */}
          <section id="diagram" className="mb-16 scroll-mt-20">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
              The Standard Guitar Pedal Signal Chain
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 mb-6">
              Guitar → Tuner → Wah → Compressor → Gain → EQ → Modulation →
              Delay → Reverb → Looper → Amp. Click any pedal to learn more.
            </p>
            <SignalChainDiagram />
          </section>

          <Separator className="mb-14 bg-zinc-200 dark:bg-zinc-800" />

          {/* ───── Why It Matters ───── */}
          <section id="why" className="mb-16 scroll-mt-20">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Why Does Pedal Order Matter?
            </h2>
            <div className="prose prose-zinc dark:prose-invert max-w-none space-y-4 text-zinc-700 dark:text-zinc-300">
              <p>
                Every pedal in your signal chain processes whatever signal it
                receives and passes the result to the next pedal. This means
                the first pedal processes your raw guitar signal, the second
                pedal processes the output of the first, and so on. Change
                the order and you change what each pedal is working with —
                which changes your tone dramatically.
              </p>
              <p>
                Here&apos;s a simple example: put a{" "}
                <strong>delay before a distortion pedal</strong> and each
                echo repeat gets distorted, creating a compressed, muddy
                mess where individual repeats blur together. Put the{" "}
                <strong>delay after distortion</strong> and the repeats are
                clean copies of your distorted tone — clear, defined, and
                musical.
              </p>
              <p>
                The standard signal chain below has been refined over decades
                by professional guitarists and engineers. It works for 90% of
                situations. The remaining 10% is where creativity and rule-breaking
                come in — and we&apos;ll cover that too.
              </p>
            </div>
          </section>

          <Separator className="mb-14 bg-zinc-200 dark:bg-zinc-800" />

          {/* ───── Position-by-Position Breakdown ───── */}
          <section id="breakdown" className="mb-16 scroll-mt-20">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
              Position-by-Position Breakdown
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 mb-8">
              Each position explained in detail — the reasoning, the exceptions,
              and recommended pedals from our database.
            </p>

            <div className="space-y-8">
              {SECTIONS.map((section) => {
                const recs = pick(section.type);
                return (
                  <Card
                    key={section.type}
                    id={`pos-${section.position}`}
                    className="bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 scroll-mt-20 overflow-hidden"
                  >
                    <CardContent className="p-0">
                      {/* Header strip */}
                      <div className="flex items-center gap-3 px-5 py-4 bg-zinc-100/50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-800">
                        <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
                          <TypeIcon
                            icon={section.icon}
                            name={section.title}
                            size={24}
                          />
                        </div>
                        <div>
                          <Badge
                            variant="outline"
                            className="text-[10px] border-orange-500/30 text-orange-500 mr-2"
                          >
                            Position {section.position}
                          </Badge>
                          <span className="font-bold text-base">
                            {section.title}
                          </span>
                        </div>
                        <Link
                          href={`/${section.slug}`}
                          className="ml-auto text-xs text-orange-500 hover:underline hidden sm:block"
                        >
                          Browse {section.title} pedals →
                        </Link>
                      </div>

                      {/* Body */}
                      <div className="px-5 py-5 space-y-4">
                        <div>
                          <p className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">
                            Why here?
                          </p>
                          <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                            {section.why}
                          </p>
                        </div>

                        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                          {section.detail}
                        </p>

                        {section.controversy && (
                          <div className="flex gap-2 p-3 rounded-lg bg-amber-500/5 border border-amber-500/15 text-sm">
                            <span className="shrink-0">🔥</span>
                            <div>
                              <span className="font-semibold text-amber-500 text-xs uppercase tracking-wider">
                                The Debate
                              </span>
                              <p className="text-zinc-600 dark:text-zinc-400 mt-0.5">
                                {section.controversy}
                              </p>
                            </div>
                          </div>
                        )}

                        {section.proTip && (
                          <div className="flex gap-2 p-3 rounded-lg bg-orange-500/5 border border-orange-500/15 text-sm">
                            <span className="shrink-0">💡</span>
                            <div>
                              <span className="font-semibold text-orange-500 text-xs uppercase tracking-wider">
                                Pro Tip
                              </span>
                              <p className="text-zinc-600 dark:text-zinc-400 mt-0.5">
                                {section.proTip}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Recommended pedals */}
                        {recs.length > 0 && (
                          <div className="pt-2">
                            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                              Recommended
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {recs.map((p) => (
                                <Link
                                  key={p.id}
                                  href={`/pedals/${p.id}`}
                                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-orange-500/40 transition-colors text-sm"
                                >
                                  <span className="font-medium">
                                    {p.name}
                                  </span>
                                  <span className="text-zinc-500 text-xs">
                                    ${p.price}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          <Separator className="mb-14 bg-zinc-200 dark:bg-zinc-800" />

          {/* ───── Effects Loop ───── */}
          <section id="effects-loop" className="mb-16 scroll-mt-20">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Using an Effects Loop
            </h2>
            <div className="space-y-4 text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed">
              <p>
                Many guitar amps have an effects loop — a send/return circuit
                between the preamp and power amp. This lets you place certain
                pedals <em>after</em> the amp&apos;s gain stage but{" "}
                <em>before</em> the power amp. For high-gain players, this is
                a game-changer.
              </p>
              <p>
                When you run delay or reverb in front of a high-gain amp,
                the amp&apos;s distortion processes those effects, making them
                sound muddy and indistinct. In the effects loop, the delay and
                reverb process the already-distorted signal cleanly, preserving
                clarity and definition.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <p className="text-xs font-semibold text-orange-500 uppercase tracking-wider mb-3">
                  Front of Amp
                </p>
                <ul className="space-y-1.5">
                  {FRONT_OF_AMP_PEDALS.map((p) => (
                    <li
                      key={p}
                      className="text-sm text-zinc-600 dark:text-zinc-400 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <p className="text-xs font-semibold text-orange-500 uppercase tracking-wider mb-3">
                  Effects Loop
                </p>
                <ul className="space-y-1.5">
                  {EFFECTS_LOOP_PEDALS.map((p) => (
                    <li
                      key={p}
                      className="text-sm text-zinc-600 dark:text-zinc-400 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-orange-500/5 border border-orange-500/15 text-sm">
              <p className="font-semibold text-orange-500 text-xs uppercase tracking-wider mb-1">
                The 4-Cable Method
              </p>
              <p className="text-zinc-600 dark:text-zinc-400">
                For maximum flexibility, use the 4-cable method: Guitar → pedals
                (gain, wah, compressor) → Amp Input → Amp Send → pedals (delay,
                reverb, modulation) → Amp Return. This gives you the best of
                both worlds — gain pedals in front, time-based effects in the
                loop.
              </p>
            </div>
          </section>

          <Separator className="mb-14 bg-zinc-200 dark:bg-zinc-800" />

          {/* ───── Common Mistakes ───── */}
          <section id="mistakes" className="mb-16 scroll-mt-20">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
              5 Common Pedal Order Mistakes
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 mb-6 text-sm">
              These are the problems we see most often on forums and in
              pedalboard photos. Easy to make, easy to fix.
            </p>
            <div className="space-y-3">
              {COMMON_MISTAKES.map((item, i) => (
                <div
                  key={i}
                  className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
                >
                  <p className="font-semibold text-sm mb-1 flex items-center gap-2">
                    <span>{item.icon}</span>
                    {item.mistake}
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    <span className="text-green-500 font-medium">Fix:</span>{" "}
                    {item.fix}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <Separator className="mb-14 bg-zinc-200 dark:bg-zinc-800" />

          {/* ───── Breaking the Rules ───── */}
          <section id="breaking-rules" className="mb-16 scroll-mt-20">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              When to Break the Rules
            </h2>
            <div className="space-y-4 text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed">
              <p>
                Everything above is a guideline — not a law. Some of the most
                iconic guitar tones in history come from doing the
                &ldquo;wrong&rdquo; thing on purpose.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              {[
                {
                  artist: "Jimi Hendrix",
                  trick: "Fuzz Face → Wah",
                  desc: "Running fuzz before wah creates a thick, aggressive filter sweep that defines psychedelic rock.",
                },
                {
                  artist: "Kevin Shields",
                  trick: "Reverb → Distortion",
                  desc: "The My Bloody Valentine sound: washy, ethereal walls of sound from reversing the standard order.",
                },
                {
                  artist: "The Edge",
                  trick: "Multiple delays stacked",
                  desc: "Dotted-eighth delays creating rhythmic patterns that become part of the composition itself.",
                },
                {
                  artist: "Tom Morello",
                  trick: "Kill switch + unconventional routing",
                  desc: "Using a guitar's toggle switch as a rhythmic kill switch with delay for DJ-like stutters.",
                },
                {
                  artist: "Jerry Cantrell",
                  trick: "Wah after distortion",
                  desc: "A more aggressive, nasal wah tone that cuts through heavy riffs.",
                },
                {
                  artist: "Shoegaze artists",
                  trick: "Reverb → Fuzz → More Reverb",
                  desc: "Layering ambient effects around gain stages for massive, dreamy walls of sound.",
                },
              ].map((item) => (
                <div
                  key={item.artist}
                  className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
                >
                  <p className="font-semibold text-sm text-orange-500">
                    {item.artist}
                  </p>
                  <p className="text-xs text-zinc-500 mb-1.5">{item.trick}</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <Separator className="mb-14 bg-zinc-200 dark:bg-zinc-800" />

          {/* ───── FAQ ───── */}
          <section id="faq" className="mb-16 scroll-mt-20">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {FAQS.map((faq) => (
                <div key={faq.q}>
                  <h3 className="font-semibold mb-2 text-base">{faq.q}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                    {faq.a}
                  </p>
                  <Separator className="mt-6 bg-zinc-200 dark:bg-zinc-800" />
                </div>
              ))}
            </div>
          </section>

          {/* ───── CTA: Builder ───── */}
          <section
            id="builder"
            className="rounded-xl bg-gradient-to-br from-orange-500/10 to-zinc-50 dark:to-zinc-900 border border-orange-500/20 p-8 text-center scroll-mt-20"
          >
            <h2 className="text-2xl font-bold mb-3">
              Build Your Perfect Signal Chain
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 mb-6 max-w-lg mx-auto">
              Use our interactive Board Builder to arrange your pedals, check
              power requirements, and plan your pedalboard layout.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/pedalboard/builder"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors"
              >
                Open Board Builder →
              </Link>
              <Link
                href="/compare"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors border border-zinc-200 dark:border-zinc-700"
              >
                Compare Pedals
              </Link>
            </div>
          </section>

          {/* ───── Internal links footer ───── */}
          <div className="mt-14 pt-8 border-t border-zinc-200 dark:border-zinc-800">
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">
              Explore by Effect Type
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "overdrive",
                "distortion",
                "fuzz",
                "delay",
                "reverb",
                "compressor",
                "chorus",
                "phaser",
                "tremolo",
                "wah",
                "eq",
                "looper",
                "tuner",
              ].map((slug) => (
                <Link
                  key={slug}
                  href={`/${slug}`}
                  className="px-3 py-1.5 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400 hover:border-orange-500/40 hover:text-orange-500 transition-colors capitalize"
                >
                  {slug}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
