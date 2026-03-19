import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/feedback" },
  title: "Feedback — Help Us Improve PedalRig",
  description:
    "Share your feedback and feature requests. Help us build a better guitar pedal resource for everyone.",
};

export default function FeedbackPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <nav className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        <a href="/" className="hover:text-orange-500">Home</a>
        <span className="mx-2">›</span>
        <span>Feedback</span>
      </nav>

      <h1 className="text-3xl font-bold mb-2">
        Share Your <span className="text-orange-500">Feedback</span>
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        Help us build a better guitar pedal resource. Your input directly shapes what we build next.
      </p>

      <div className="rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <iframe
          src="https://tally.so/r/vG2WKg?transparentBackground=1"
          width="100%"
          height="1200"
          frameBorder={0}
          title="PedalRig Feedback Form"
          className="w-full"
        />
      </div>
    </div>
  );
}
