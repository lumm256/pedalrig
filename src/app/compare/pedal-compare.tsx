"use client";

import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TypeIcon } from "@/components/type-icon";
import pedalsData from "@/data/pedals.json";
import pedalTypesData from "@/data/pedal-types.json";

type Pedal = (typeof pedalsData)[number];

const typeNames: Record<string, string> = {};
for (const t of pedalTypesData.types) {
  typeNames[t.id] = t.name;
}

const pedalsByType: Record<string, Pedal[]> = {};
for (const p of pedalsData) {
  if (!pedalsByType[p.type]) pedalsByType[p.type] = [];
  pedalsByType[p.type].push(p);
}

function WinBadge() {
  return (
    <span className="ml-1.5 inline-block rounded bg-green-100 px-1.5 py-0.5 text-xs font-semibold text-green-700 dark:bg-green-900/40 dark:text-green-400">
      ✓ Better
    </span>
  );
}

function CompareRow({
  label,
  valA,
  valB,
  winner,
  unit,
}: {
  label: string;
  valA: string | number;
  valB: string | number;
  winner?: "a" | "b" | "tie";
  unit?: string;
}) {
  return (
    <div className="grid grid-cols-3 items-center border-b border-gray-100 py-3 text-sm dark:border-gray-800">
      <div className="text-center font-medium">
        {valA}
        {unit && <span className="text-gray-400"> {unit}</span>}
        {winner === "a" && <WinBadge />}
      </div>
      <div className="text-center text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
        {label}
      </div>
      <div className="text-center font-medium">
        {valB}
        {unit && <span className="text-gray-400"> {unit}</span>}
        {winner === "b" && <WinBadge />}
      </div>
    </div>
  );
}

function PedalSelector({
  side,
  selected,
  other,
  onChange,
}: {
  side: "A" | "B";
  selected: string;
  other: string;
  onChange: (id: string) => void;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-gray-400">
        Pedal {side}
      </label>
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium shadow-sm transition-colors focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
      >
        <option value="">Select a pedal…</option>
        {Object.entries(pedalsByType).map(([type, pedals]) => (
          <optgroup key={type} label={typeNames[type] || type}>
            {pedals.map((p) => (
              <option key={p.id} value={p.id} disabled={p.id === other}>
                {p.name} — ${p.price}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  );
}

function ratingWinner(a: number, b: number): "a" | "b" | "tie" {
  if (a > b) return "a";
  if (b > a) return "b";
  return "tie";
}

function lowerWins(a: number, b: number): "a" | "b" | "tie" {
  if (a < b) return "a";
  if (b < a) return "b";
  return "tie";
}

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <span className="text-orange-400" aria-label={`${rating} out of 5 stars`}>
      {"★".repeat(full)}
      {half ? "½" : ""}
      {"☆".repeat(empty)}
      <span className="ml-1 text-gray-500 dark:text-gray-400">{rating}</span>
    </span>
  );
}

export function PedalCompare() {
  const [idA, setIdA] = useState("");
  const [idB, setIdB] = useState("");

  const pedalA = useMemo(() => pedalsData.find((p) => p.id === idA), [idA]);
  const pedalB = useMemo(() => pedalsData.find((p) => p.id === idB), [idB]);

  const bothSelected = pedalA && pedalB;
  const sameType = bothSelected && pedalA.type === pedalB.type;

  return (
    <div className="space-y-8">
      {/* Selectors */}
      <div className="grid gap-4 md:grid-cols-2">
        <PedalSelector side="A" selected={idA} other={idB} onChange={setIdA} />
        <PedalSelector side="B" selected={idA ? idB : ""} other={idA} onChange={setIdB} />
      </div>

      {/* Quick swap */}
      {bothSelected && (
        <div className="flex justify-center">
          <button
            onClick={() => { setIdA(idB); setIdB(idA); }}
            className="rounded-full border border-gray-200 px-4 py-1.5 text-xs font-medium text-gray-500 transition-colors hover:border-orange-400 hover:text-orange-500 dark:border-gray-700 dark:text-gray-400"
          >
            ⇄ Swap
          </button>
        </div>
      )}

      {/* Empty state */}
      {!bothSelected && (
        <div className="rounded-xl border-2 border-dashed border-gray-200 py-16 text-center dark:border-gray-800">
          <p className="text-4xl">⚡ vs ⚡</p>
          <p className="mt-3 text-gray-500 dark:text-gray-400">
            Pick two pedals above to see a head-to-head comparison
          </p>
        </div>
      )}

      {/* Comparison */}
      {bothSelected && (
        <div className="space-y-8">
          {/* Header cards */}
          <div className="grid gap-4 md:grid-cols-2">
            <PedalCard pedal={pedalA} />
            <PedalCard pedal={pedalB} />
          </div>

          {!sameType && (
            <div className="rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-700 dark:bg-amber-900/20 dark:text-amber-400">
              These are different pedal types ({typeNames[pedalA.type]} vs {typeNames[pedalB.type]}). Comparison still works, but keep in mind they serve different purposes.
            </div>
          )}

          {/* Specs comparison */}
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4 text-center text-lg font-bold">Specs Comparison</h2>
              <CompareRow label="Price" valA={`$${pedalA.price}`} valB={`$${pedalB.price}`} winner={lowerWins(pedalA.price, pedalB.price)} />
              <CompareRow label="Rating" valA={pedalA.rating} valB={pedalB.rating} winner={ratingWinner(pedalA.rating, pedalB.rating)} />
              <CompareRow label="Reviews" valA={pedalA.reviewCount.toLocaleString()} valB={pedalB.reviewCount.toLocaleString()} winner={ratingWinner(pedalA.reviewCount, pedalB.reviewCount)} />
              <CompareRow label="Power" valA={pedalA.powerMa} valB={pedalB.powerMa} unit="mA" winner={lowerWins(pedalA.powerMa, pedalB.powerMa)} />
              <CompareRow label="Voltage" valA={pedalA.voltage} valB={pedalB.voltage} unit="V" />
              <CompareRow label="Width" valA={pedalA.widthMm} valB={pedalB.widthMm} unit="mm" winner={lowerWins(pedalA.widthMm, pedalB.widthMm)} />
              <CompareRow label="Height" valA={pedalA.heightMm} valB={pedalB.heightMm} unit="mm" winner={lowerWins(pedalA.heightMm, pedalB.heightMm)} />
              <CompareRow label="Bypass" valA={pedalA.bypass} valB={pedalB.bypass} />
              <CompareRow label="Level" valA={pedalA.level} valB={pedalB.level} />
            </CardContent>
          </Card>

          {/* Controls */}
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4 text-center text-lg font-bold">Controls</h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-wrap justify-center gap-2">
                  {pedalA.controls.map((c) => (
                    <Badge key={c} variant="secondary">{c}</Badge>
                  ))}
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {pedalB.controls.map((c) => (
                    <Badge key={c} variant="secondary">{c}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pros & Cons */}
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4 text-center text-lg font-bold">Pros & Cons</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <ProsCons pedal={pedalA} />
                <ProsCons pedal={pedalB} />
              </div>
            </CardContent>
          </Card>

          {/* Best For */}
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4 text-center text-lg font-bold">Best For</h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-wrap justify-center gap-2">
                  {pedalA.bestFor.map((b) => (
                    <Badge key={b} className="bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
                      {b}
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {pedalB.bestFor.map((b) => (
                    <Badge key={b} className="bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
                      {b}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Verdict */}
          <Verdict pedalA={pedalA} pedalB={pedalB} />

          {/* Buy buttons */}
          <div className="grid gap-4 md:grid-cols-2">
            <a
              href={pedalA.amazonUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="block rounded-xl bg-orange-600 py-4 text-center font-bold text-white transition-colors hover:bg-orange-500"
            >
              Buy {pedalA.name} — ${pedalA.price}
            </a>
            <a
              href={pedalB.amazonUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="block rounded-xl bg-orange-600 py-4 text-center font-bold text-white transition-colors hover:bg-orange-500"
            >
              Buy {pedalB.name} — ${pedalB.price}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

function PedalCard({ pedal }: { pedal: Pedal }) {
  return (
    <Card className="text-center">
      <CardContent className="p-6">
        {pedal.imageUrl ? (
          <div className="mb-3 flex justify-center h-32">
            <img src={pedal.imageUrl} alt={pedal.name} className="max-h-full object-contain" loading="lazy" />
          </div>
        ) : (
          <div className="mb-3 flex justify-center">
            <TypeIcon icon={pedalTypesData.types.find((t) => t.id === pedal.type)?.icon || "🎸"} name={pedal.name} size={48} />
          </div>
        )}
        <h3 className="text-lg font-bold">{pedal.name}</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {pedal.brand} · {typeNames[pedal.type]}
        </p>
        <div className="mt-2">
          <StarRating rating={pedal.rating} />
        </div>
        <p className="mt-2 text-2xl font-bold text-orange-500">${pedal.price}</p>
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
          {pedal.description}
        </p>
      </CardContent>
    </Card>
  );
}

function ProsCons({ pedal }: { pedal: Pedal }) {
  return (
    <div>
      <p className="mb-2 text-center text-sm font-semibold text-gray-500 dark:text-gray-400">
        {pedal.name}
      </p>
      <ul className="space-y-1 text-sm">
        {pedal.pros.map((p) => (
          <li key={p} className="flex items-start gap-2">
            <span className="mt-0.5 text-green-500">✓</span>
            <span>{p}</span>
          </li>
        ))}
        {pedal.cons.map((c) => (
          <li key={c} className="flex items-start gap-2">
            <span className="mt-0.5 text-red-400">✗</span>
            <span>{c}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Verdict({ pedalA, pedalB }: { pedalA: Pedal; pedalB: Pedal }) {
  let scoreA = 0;
  let scoreB = 0;

  // Rating
  if (pedalA.rating > pedalB.rating) scoreA++;
  else if (pedalB.rating > pedalA.rating) scoreB++;

  // Price (lower wins)
  if (pedalA.price < pedalB.price) scoreA++;
  else if (pedalB.price < pedalA.price) scoreB++;

  // Reviews (more wins)
  if (pedalA.reviewCount > pedalB.reviewCount) scoreA++;
  else if (pedalB.reviewCount > pedalA.reviewCount) scoreB++;

  // Pros count
  if (pedalA.pros.length > pedalB.pros.length) scoreA++;
  else if (pedalB.pros.length > pedalA.pros.length) scoreB++;

  // Versatility (bestFor count)
  if (pedalA.bestFor.length > pedalB.bestFor.length) scoreA++;
  else if (pedalB.bestFor.length > pedalA.bestFor.length) scoreB++;

  let verdictText: string;
  if (scoreA > scoreB) {
    verdictText = `${pedalA.name} edges ahead with a stronger overall profile — better value, ratings, or versatility. But tone is personal — try both if you can.`;
  } else if (scoreB > scoreA) {
    verdictText = `${pedalB.name} edges ahead with a stronger overall profile — better value, ratings, or versatility. But tone is personal — try both if you can.`;
  } else {
    verdictText = `It's a tie! Both pedals are excellent choices. Your decision should come down to which tone and feature set fits your playing style.`;
  }

  return (
    <Card className="border-orange-200 dark:border-orange-800">
      <CardContent className="p-6 text-center">
        <h2 className="mb-2 text-lg font-bold">
          ⚡ Quick Verdict
        </h2>
        <p className="mx-auto max-w-xl text-sm text-gray-600 dark:text-gray-400">
          {verdictText}
        </p>
        <div className="mt-4 flex justify-center gap-8 text-sm font-semibold">
          <span className={scoreA >= scoreB ? "text-orange-500" : "text-gray-400"}>
            {pedalA.name}: {scoreA} pts
          </span>
          <span className="text-gray-300 dark:text-gray-600">vs</span>
          <span className={scoreB >= scoreA ? "text-orange-500" : "text-gray-400"}>
            {pedalB.name}: {scoreB} pts
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
