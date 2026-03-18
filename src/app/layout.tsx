import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://pedalrig.com"),
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
    <html lang="en">
      <body className="bg-gray-950 text-gray-100 antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-800 bg-gray-950/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <a href="/" className="flex items-center gap-2 text-xl font-bold">
          <span className="text-orange-500">⚡</span>
          <span>
            Pedal<span className="text-orange-500">Rig</span>
          </span>
        </a>
        <div className="hidden items-center gap-6 text-sm md:flex">
          <a href="/types" className="hover:text-orange-400 transition-colors">
            Pedal Types
          </a>
          <a href="/pedal-order" className="hover:text-orange-400 transition-colors">
            Signal Chain
          </a>
          <a href="/pedalboard" className="hover:text-orange-400 transition-colors">
            Pedalboard
          </a>
          <a href="/beginners" className="hover:text-orange-400 transition-colors">
            Beginners
          </a>
          <a
            href="/pedalboard/builder"
            className="rounded-lg bg-orange-600 px-4 py-2 font-medium text-white hover:bg-orange-500 transition-colors"
          >
            Board Builder
          </a>
        </div>
        <MobileMenuButton />
      </nav>
    </header>
  );
}

function MobileMenuButton() {
  return (
    <div className="md:hidden">
      <a
        href="/types"
        className="rounded-lg bg-orange-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-orange-500 transition-colors"
      >
        Menu
      </a>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-950 px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <p className="text-lg font-bold">
              <span className="text-orange-500">⚡</span> Pedal
              <span className="text-orange-500">Rig</span>
            </p>
            <p className="mt-2 text-sm text-gray-400">
              Your guide to finding the perfect guitar pedals and building your
              dream pedalboard.
            </p>
          </div>
          <div>
            <p className="font-semibold text-gray-300">Pedal Types</p>
            <ul className="mt-2 space-y-1 text-sm text-gray-400">
              <li><a href="/overdrive" className="hover:text-orange-400">Overdrive</a></li>
              <li><a href="/distortion" className="hover:text-orange-400">Distortion</a></li>
              <li><a href="/delay" className="hover:text-orange-400">Delay</a></li>
              <li><a href="/fuzz" className="hover:text-orange-400">Fuzz</a></li>
              <li><a href="/compressor" className="hover:text-orange-400">Compressor</a></li>
              <li><a href="/chorus" className="hover:text-orange-400">Chorus</a></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-gray-300">Tools & Guides</p>
            <ul className="mt-2 space-y-1 text-sm text-gray-400">
              <li><a href="/pedalboard/builder" className="hover:text-orange-400">Board Builder</a></li>
              <li><a href="/pedal-order" className="hover:text-orange-400">Signal Chain Guide</a></li>
              <li><a href="/power-supply" className="hover:text-orange-400">Power Supply Guide</a></li>
              <li><a href="/beginners" className="hover:text-orange-400">Beginner Guide</a></li>
              <li><a href="/types" className="hover:text-orange-400">All Pedal Types</a></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-gray-300">Info</p>
            <ul className="mt-2 space-y-1 text-sm text-gray-400">
              <li><a href="/about" className="hover:text-orange-400">About</a></li>
              <li><a href="/disclaimer" className="hover:text-orange-400">Affiliate Disclosure</a></li>
              <li><a href="/privacy" className="hover:text-orange-400">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-xs text-gray-500">
          <p>
            © {new Date().getFullYear()} PedalRig. As an Amazon Associate, we
            earn from qualifying purchases.
          </p>
        </div>
      </div>
    </footer>
  );
}
