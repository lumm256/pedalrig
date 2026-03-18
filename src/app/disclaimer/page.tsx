import type { Metadata } from 'next'
import { Separator } from '@/components/ui/separator'

export const metadata: Metadata = {
  alternates: { canonical: "/disclaimer" },
  title: 'Amazon Affiliate Disclosure — PedalRig',
  description: 'PedalRig affiliate disclosure and Amazon Associates program statement.',
}

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2">Affiliate Disclosure</h1>
        <p className="text-zinc-500 text-sm mb-8">Last updated: March 2026</p>

        <Separator className="bg-zinc-200 dark:bg-zinc-800 mb-8" />

        <div className="space-y-6 text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm">
          <p>
            PedalRig is a participant in the Amazon Services LLC Associates Program, an affiliate
            advertising program designed to provide a means for sites to earn advertising fees by
            advertising and linking to Amazon.com.
          </p>

          <p>
            This means that when you click on certain links on PedalRig and make a purchase on
            Amazon, we may earn a small commission at no additional cost to you. These commissions
            help support the site and allow us to continue creating free content and tools for
            guitarists.
          </p>

          <Separator className="bg-zinc-200 dark:bg-zinc-800" />

          <div>
            <h2 className="font-semibold text-base mb-3">What This Means for You</h2>
            <ul className="space-y-2 text-zinc-500 dark:text-zinc-400">
              <li>→ You pay the same price whether you use our links or go directly to Amazon.</li>
              <li>→ Our editorial opinions are not influenced by affiliate relationships.</li>
              <li>→ We only recommend products we believe are genuinely useful.</li>
              <li>→ Affiliate links are used alongside non-affiliate links throughout the site.</li>
            </ul>
          </div>

          <Separator className="bg-zinc-200 dark:bg-zinc-800" />

          <div>
            <h2 className="font-semibold text-base mb-3">FTC Compliance</h2>
            <p className="text-zinc-500 dark:text-zinc-400">
              In accordance with the Federal Trade Commission's guidelines on endorsements and
              testimonials (16 CFR Part 255), PedalRig discloses its material connections to
              advertisers and affiliate programs. Any page containing affiliate links will include
              a disclosure notice.
            </p>
          </div>

          <Separator className="bg-zinc-200 dark:bg-zinc-800" />

          <p className="text-zinc-500">
            If you have questions about this disclosure, contact us at{' '}
            <span className="text-orange-500">[contact@pedalrig.com]</span>.
          </p>
        </div>
      </div>
    </main>
  )
}
