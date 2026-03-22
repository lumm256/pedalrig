"use client";

import { useState } from "react";
import { TypeIcon } from "@/components/type-icon";

type ChainNode = {
  id: string;
  label: string;
  icon: string;
  position: number;
  description: string;
};

const CHAIN_NODES: ChainNode[] = [
  {
    id: "tuner",
    label: "Tuner",
    icon: "/images/type-icons/tuner.svg",
    position: 1,
    description:
      "First in line. Clean, unprocessed signal means accurate pitch detection.",
  },
  {
    id: "wah",
    label: "Wah / Filter",
    icon: "/images/type-icons/wah.svg",
    position: 2,
    description:
      "Before gain for a classic vocal sweep. After gain for a more aggressive, synthy tone.",
  },
  {
    id: "compressor",
    label: "Compressor",
    icon: "/images/type-icons/compressor.svg",
    position: 3,
    description:
      "Tightens dynamics before the gain stage. Gives overdrive a more consistent feel.",
  },
  {
    id: "overdrive",
    label: "Overdrive",
    icon: "/images/type-icons/overdrive.svg",
    position: 4,
    description:
      "Light gain first. Stacks into distortion for a thicker sound without losing clarity.",
  },
  {
    id: "distortion",
    label: "Distortion",
    icon: "/images/type-icons/distortion.svg",
    position: 5,
    description:
      "Main gain stage. More saturation and sustain than overdrive.",
  },
  {
    id: "fuzz",
    label: "Fuzz",
    icon: "/images/type-icons/fuzz.svg",
    position: 6,
    description:
      "Some fuzz pedals need to see your guitar directly. Germanium fuzzes especially hate buffers.",
  },
  {
    id: "eq",
    label: "EQ",
    icon: "/images/type-icons/eq.svg",
    position: 7,
    description:
      "After gain to sculpt distorted tone. Boost mids here for solos that cut through the mix.",
  },
  {
    id: "phaser",
    label: "Phaser",
    icon: "/images/type-icons/phaser.svg",
    position: 8,
    description:
      "Modulation after dirt produces cleaner, more defined sweeps.",
  },
  {
    id: "chorus",
    label: "Chorus",
    icon: "/images/type-icons/chorus.svg",
    position: 9,
    description:
      "After gain for lush, shimmering width. Before gain for a subtler, vintage vibe.",
  },
  {
    id: "tremolo",
    label: "Tremolo",
    icon: "/images/type-icons/tremolo.svg",
    position: 10,
    description:
      "Volume-based modulation works best after gain and pitch-based effects.",
  },
  {
    id: "delay",
    label: "Delay",
    icon: "/images/type-icons/delay.svg",
    position: 11,
    description:
      "Near the end so repeats are clean copies of your full tone.",
  },
  {
    id: "reverb",
    label: "Reverb",
    icon: "/images/type-icons/reverb.svg",
    position: 12,
    description:
      "Last effect. Adds natural-sounding space to your entire signal.",
  },
  {
    id: "looper",
    label: "Looper",
    icon: "/images/type-icons/looper.svg",
    position: 13,
    description:
      "Very last. Captures your complete processed signal for looping.",
  },
];

export function SignalChainDiagram() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const active = CHAIN_NODES.find((n) => n.id === activeNode);

  return (
    <div className="space-y-4">
      {/* Desktop: horizontal flow */}
      <div className="overflow-x-auto pb-2">
        <div className="flex items-center gap-1 min-w-max px-2 py-4">
          {/* Guitar */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-12 h-12 rounded-lg bg-zinc-100 dark:bg-zinc-800 border-2 border-zinc-300 dark:border-zinc-600 flex items-center justify-center text-lg font-bold text-zinc-500">
              🎸
            </div>
            <span className="text-[10px] text-zinc-500 font-medium">
              Guitar
            </span>
          </div>

          <svg
            width="20"
            height="12"
            className="text-zinc-400 dark:text-zinc-600 shrink-0"
          >
            <line x1="0" y1="6" x2="14" y2="6" stroke="currentColor" strokeWidth="2" />
            <polygon points="14,2 20,6 14,10" fill="currentColor" />
          </svg>

          {CHAIN_NODES.map((node, i) => (
            <div key={node.id} className="flex items-center gap-1">
              <button
                onClick={() =>
                  setActiveNode(activeNode === node.id ? null : node.id)
                }
                className={`flex flex-col items-center gap-1.5 group cursor-pointer transition-all duration-200 ${
                  activeNode === node.id ? "scale-110" : "hover:scale-105"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-200 ${
                    activeNode === node.id
                      ? "bg-orange-500/20 border-2 border-orange-500 ring-2 ring-orange-500/30"
                      : "bg-zinc-50 dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-700 group-hover:border-orange-500/50"
                  }`}
                >
                  <TypeIcon
                    icon={node.icon}
                    name={node.label}
                    size={24}
                    className="opacity-80 group-hover:opacity-100"
                  />
                </div>
                <span
                  className={`text-[10px] font-medium text-center w-14 leading-tight transition-colors ${
                    activeNode === node.id
                      ? "text-orange-500"
                      : "text-zinc-500 dark:text-zinc-400"
                  }`}
                >
                  {node.label}
                </span>
              </button>

              {i < CHAIN_NODES.length - 1 && (
                <svg
                  width="20"
                  height="12"
                  className="text-zinc-400 dark:text-zinc-600 shrink-0"
                >
                  <line
                    x1="0"
                    y1="6"
                    x2="14"
                    y2="6"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <polygon points="14,2 20,6 14,10" fill="currentColor" />
                </svg>
              )}
            </div>
          ))}

          <svg
            width="20"
            height="12"
            className="text-zinc-400 dark:text-zinc-600 shrink-0"
          >
            <line x1="0" y1="6" x2="14" y2="6" stroke="currentColor" strokeWidth="2" />
            <polygon points="14,2 20,6 14,10" fill="currentColor" />
          </svg>

          {/* Amp */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-12 h-12 rounded-lg bg-zinc-100 dark:bg-zinc-800 border-2 border-zinc-300 dark:border-zinc-600 flex items-center justify-center text-lg font-bold text-zinc-500">
              🔊
            </div>
            <span className="text-[10px] text-zinc-500 font-medium">Amp</span>
          </div>
        </div>
      </div>

      {/* Info panel */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          active ? "max-h-32 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {active && (
          <div className="flex items-start gap-3 p-4 rounded-lg bg-orange-500/5 border border-orange-500/20">
            <div className="w-8 h-8 rounded bg-orange-500/10 flex items-center justify-center shrink-0">
              <TypeIcon icon={active.icon} name={active.label} size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-orange-500 mb-1">
                Position {active.position}: {active.label}
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {active.description}
              </p>
            </div>
          </div>
        )}
      </div>

      <p className="text-xs text-zinc-500 italic">
        Click any pedal to see why it goes there. Scroll horizontally to see the full chain.
      </p>
    </div>
  );
}
