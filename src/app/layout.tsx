import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileMenu } from "@/components/mobile-menu";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://pedalrig.com"),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "PedalRig — Guitar Pedals Guide & Pedalboard Builder",
    template: "%s | PedalRig",
  },
  description:
    "Complete guide to guitar pedals. Compare overdrive, distortion, delay, fuzz pedals and more. Build your pedalboard with our free visual tool.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "PedalRig",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#f97316",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script defer data-domain="pedalrig.com" src="https://click.pageview.click/js/script.js" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-GHMPSRSZSQ" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-GHMPSRSZSQ');
            `,
          }}
        />
      </head>
      <body className="bg-white text-gray-900 antialiased dark:bg-gray-950 dark:text-gray-100">
        <ThemeProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur dark:border-gray-800 dark:bg-gray-950/90">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <a href="/" className="flex items-center gap-2 text-xl font-bold">
          <span className="text-orange-500">⚡</span>
          <span>
            Pedal<span className="text-orange-500">Rig</span>
          </span>
        </a>
        <div className="hidden items-center gap-6 text-sm md:flex">
          <a href="/types" className="text-gray-600 hover:text-orange-500 dark:text-gray-300 dark:hover:text-orange-400 transition-colors">
            Pedal Types
          </a>
          <a href="/pedal-order" className="text-gray-600 hover:text-orange-500 dark:text-gray-300 dark:hover:text-orange-400 transition-colors">
            Signal Chain
          </a>
          <a href="/pedalboard" className="text-gray-600 hover:text-orange-500 dark:text-gray-300 dark:hover:text-orange-400 transition-colors">
            Pedalboard
          </a>
          <a href="/beginners" className="text-gray-600 hover:text-orange-500 dark:text-gray-300 dark:hover:text-orange-400 transition-colors">
            Beginners
          </a>
          <a
            href="/pedalboard/builder"
            className="rounded-lg bg-orange-600 px-4 py-2 font-medium text-white hover:bg-orange-500 transition-colors"
          >
            Board Builder
          </a>
          <ThemeToggle />
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 px-4 py-12 dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <p className="text-lg font-bold">
              <span className="text-orange-500">⚡</span> Pedal
              <span className="text-orange-500">Rig</span>
            </p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Your guide to finding the perfect guitar pedals and building your
              dream pedalboard.
            </p>
          </div>
          <div>
            <p className="font-semibold text-gray-700 dark:text-gray-300">Pedal Types</p>
            <ul className="mt-2 space-y-1 text-sm text-gray-500 dark:text-gray-400">
              <li><a href="/overdrive" className="hover:text-orange-500 dark:hover:text-orange-400">Overdrive</a></li>
              <li><a href="/distortion" className="hover:text-orange-500 dark:hover:text-orange-400">Distortion</a></li>
              <li><a href="/delay" className="hover:text-orange-500 dark:hover:text-orange-400">Delay</a></li>
              <li><a href="/fuzz" className="hover:text-orange-500 dark:hover:text-orange-400">Fuzz</a></li>
              <li><a href="/compressor" className="hover:text-orange-500 dark:hover:text-orange-400">Compressor</a></li>
              <li><a href="/chorus" className="hover:text-orange-500 dark:hover:text-orange-400">Chorus</a></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-gray-700 dark:text-gray-300">Tools & Guides</p>
            <ul className="mt-2 space-y-1 text-sm text-gray-500 dark:text-gray-400">
              <li><a href="/pedalboard/builder" className="hover:text-orange-500 dark:hover:text-orange-400">Board Builder</a></li>
              <li><a href="/pedal-order" className="hover:text-orange-500 dark:hover:text-orange-400">Signal Chain Guide</a></li>
              <li><a href="/power-supply" className="hover:text-orange-500 dark:hover:text-orange-400">Power Supply Guide</a></li>
              <li><a href="/beginners" className="hover:text-orange-500 dark:hover:text-orange-400">Beginner Guide</a></li>
              <li><a href="/types" className="hover:text-orange-500 dark:hover:text-orange-400">All Pedal Types</a></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-gray-700 dark:text-gray-300">Info</p>
            <ul className="mt-2 space-y-1 text-sm text-gray-500 dark:text-gray-400">
              <li><a href="/about" className="hover:text-orange-500 dark:hover:text-orange-400">About</a></li>
              <li><a href="/disclaimer" className="hover:text-orange-500 dark:hover:text-orange-400">Affiliate Disclosure</a></li>
              <li><a href="/privacy" className="hover:text-orange-500 dark:hover:text-orange-400">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-xs text-gray-400 dark:border-gray-800 dark:text-gray-500">
          <p>
            © {new Date().getFullYear()} PedalRig. As an Amazon Associate, we
            earn from qualifying purchases.
          </p>
        </div>
      </div>
    </footer>
  );
}
