// 共享 PedalCard / StarRating —— /best hub 与 /best/[type] 落地页复用，避免重复实现。
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import pedalsData from "@/data/pedals.json";

export type Pedal = (typeof pedalsData)[0];

export function StarRating({ rating }: { rating: number }) {
  return (
    <span className="text-orange-500 font-semibold text-sm">
      {"★".repeat(Math.floor(rating))}
      {"☆".repeat(5 - Math.floor(rating))} {rating.toFixed(1)}
    </span>
  );
}

export function PedalCard({ pedal, badge }: { pedal: Pedal; badge?: string }) {
  return (
    <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            {badge && (
              <span className="inline-block text-xs font-bold text-orange-500 uppercase tracking-wide mb-1">
                {badge}
              </span>
            )}
            <CardTitle className="text-base leading-snug">
              <Link href={`/pedals/${pedal.id}`} className="hover:text-orange-400 transition-colors hover:underline underline-offset-2">
                {pedal.name}
              </Link>
            </CardTitle>
            <p className="text-sm text-zinc-400 dark:text-zinc-500">{pedal.brand}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-xl font-bold text-orange-500">${pedal.price}</p>
            <StarRating rating={pedal.rating} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{pedal.description}</p>
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <p className="text-xs font-semibold text-green-500 uppercase tracking-wide mb-1">Pros</p>
            <ul className="space-y-1">
              {pedal.pros.slice(0, 3).map((pro) => (
                <li key={pro} className="text-xs text-zinc-500 dark:text-zinc-400 flex items-start gap-1.5">
                  <span className="text-green-500 flex-shrink-0">+</span> {pro}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-red-400 uppercase tracking-wide mb-1">Cons</p>
            <ul className="space-y-1">
              {pedal.cons.slice(0, 2).map((con) => (
                <li key={con} className="text-xs text-zinc-500 dark:text-zinc-400 flex items-start gap-1.5">
                  <span className="text-red-400 flex-shrink-0">−</span> {con}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <a
          href={pedal.amazonUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition-colors"
        >
          View on Amazon →
        </a>
      </CardContent>
    </Card>
  );
}
