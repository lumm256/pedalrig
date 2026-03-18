import type { Metadata } from 'next'
import { Separator } from '@/components/ui/separator'

export const metadata: Metadata = {
  title: 'Privacy Policy — PedalRig',
  description: 'PedalRig privacy policy. Learn how we collect and use data on our guitar pedal guide website.',
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-zinc-500 text-sm mb-8">Last updated: March 2026</p>

        <Separator className="bg-zinc-200 dark:bg-zinc-800 mb-8" />

        <div className="space-y-8 text-zinc-300 leading-relaxed text-sm">

          <section>
            <h2 className="font-semibold text-base mb-3">1. Information We Collect</h2>
            <p className="text-zinc-500 dark:text-zinc-400 mb-3">
              PedalRig does not collect personal information directly. We use third-party analytics
              tools that may collect the following data automatically:
            </p>
            <ul className="space-y-1 text-zinc-500 dark:text-zinc-400">
              <li>→ Pages visited and time spent on each page</li>
              <li>→ Browser type and operating system</li>
              <li>→ Referring website or search query</li>
              <li>→ Approximate geographic location (country/city level)</li>
              <li>→ Device type (desktop, mobile, tablet)</li>
            </ul>
          </section>

          <Separator className="bg-zinc-200 dark:bg-zinc-800" />

          <section>
            <h2 className="font-semibold text-base mb-3">2. Google Analytics</h2>
            <p className="text-zinc-500 dark:text-zinc-400 mb-3">
              We use Google Analytics to understand how visitors use PedalRig. Google Analytics
              collects anonymized usage data via cookies. This data is processed by Google in
              accordance with their privacy policy.
            </p>
            <p className="text-zinc-500 dark:text-zinc-400">
              You can opt out of Google Analytics tracking by installing the{' '}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-500 hover:text-orange-400 underline underline-offset-4"
              >
                Google Analytics Opt-out Browser Add-on
              </a>
              .
            </p>
          </section>

          <Separator className="bg-zinc-200 dark:bg-zinc-800" />

          <section>
            <h2 className="font-semibold text-base mb-3">3. Cookies</h2>
            <p className="text-zinc-500 dark:text-zinc-400 mb-3">
              PedalRig uses cookies for the following purposes:
            </p>
            <ul className="space-y-1 text-zinc-500 dark:text-zinc-400">
              <li>→ <strong className="text-zinc-700 dark:text-zinc-300">Analytics cookies</strong> — Google Analytics tracking (can be disabled)</li>
              <li>→ <strong className="text-zinc-700 dark:text-zinc-300">Preference cookies</strong> — Remembering your settings (e.g., pedalboard builder state)</li>
            </ul>
            <p className="text-zinc-500 dark:text-zinc-400 mt-3">
              You can control cookies through your browser settings. Disabling cookies may affect
              some site functionality.
            </p>
          </section>

          <Separator className="bg-zinc-200 dark:bg-zinc-800" />

          <section>
            <h2 className="font-semibold text-base mb-3">4. Third-Party Links (Amazon)</h2>
            <p className="text-zinc-500 dark:text-zinc-400">
              PedalRig contains links to Amazon.com through our affiliate program. When you click
              these links, you leave PedalRig and are subject to Amazon's privacy policy. We do not
              control Amazon's data collection practices. See our{' '}
              <a href="/disclaimer" className="text-orange-500 hover:text-orange-400 underline underline-offset-4">
                affiliate disclosure
              </a>{' '}
              for more information.
            </p>
          </section>

          <Separator className="bg-zinc-200 dark:bg-zinc-800" />

          <section>
            <h2 className="font-semibold text-base mb-3">5. Data Retention</h2>
            <p className="text-zinc-500 dark:text-zinc-400">
              We do not store personal data on our servers. Analytics data is retained by Google
              Analytics for 26 months by default, after which it is automatically deleted.
            </p>
          </section>

          <Separator className="bg-zinc-200 dark:bg-zinc-800" />

          <section>
            <h2 className="font-semibold text-base mb-3">6. Your Rights</h2>
            <p className="text-zinc-500 dark:text-zinc-400 mb-3">
              Depending on your location, you may have rights under GDPR, CCPA, or other privacy
              laws, including:
            </p>
            <ul className="space-y-1 text-zinc-500 dark:text-zinc-400">
              <li>→ The right to access data collected about you</li>
              <li>→ The right to request deletion of your data</li>
              <li>→ The right to opt out of analytics tracking</li>
            </ul>
          </section>

          <Separator className="bg-zinc-200 dark:bg-zinc-800" />

          <section>
            <h2 className="font-semibold text-base mb-3">7. Contact</h2>
            <p className="text-zinc-500 dark:text-zinc-400">
              For privacy-related questions or requests, contact us at{' '}
              <span className="text-orange-500">[contact@pedalrig.com]</span>.
            </p>
          </section>

          <Separator className="bg-zinc-200 dark:bg-zinc-800" />

          <p className="text-zinc-400 text-xs">
            This privacy policy may be updated periodically. Continued use of PedalRig after
            changes constitutes acceptance of the updated policy.
          </p>

        </div>
      </div>
    </main>
  )
}
