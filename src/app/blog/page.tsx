import Link from "next/link";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getAllPosts, getAllTags } from "@/lib/blog";

export const metadata: Metadata = {
  title: "PedalRig Blog — Guitar Pedal Tips, Guides & News",
  description:
    "Expert articles on guitar pedals, tone tips, signal chain advice, pedalboard builds, and gear reviews. Updated weekly.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <div className="max-w-4xl mx-auto px-4 py-10 sm:py-14">
        {/* Breadcrumb */}
        <nav className="text-sm text-zinc-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-zinc-900 dark:text-zinc-100 font-medium">
              Blog
            </li>
          </ol>
        </nav>

        <header className="mb-10">
          <Badge className="mb-3 bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs">
            {posts.length} Articles
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            PedalRig Blog
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
            Tips, guides, and deep dives into guitar pedals, signal chains,
            and tone. From beginner advice to advanced rig breakdowns.
          </p>
        </header>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {tags.map(({ tag, count }) => (
              <Link key={tag} href={`/blog/tag/${tag.toLowerCase()}`}>
                <Badge
                  variant="outline"
                  className="border-zinc-300 dark:border-zinc-700 hover:border-orange-500/40 transition-colors cursor-pointer"
                >
                  {tag} ({count})
                </Badge>
              </Link>
            ))}
          </div>
        )}

        {/* Posts */}
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-zinc-500 text-lg mb-2">No articles yet.</p>
            <p className="text-zinc-400 text-sm">
              Check back soon — we&apos;re working on some great content.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
                <Card className="bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 transition-all group-hover:border-orange-500/40">
                  <CardContent className="py-5 px-5 sm:px-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2 flex-1 min-w-0">
                        <h2 className="text-lg font-bold group-hover:text-orange-500 transition-colors leading-tight">
                          {post.title}
                        </h2>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2">
                          {post.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400">
                          <time dateTime={post.date}>
                            {new Date(post.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </time>
                          <span>·</span>
                          <span>{post.readingTime}</span>
                          {post.tags.length > 0 && (
                            <>
                              <span>·</span>
                              <div className="flex gap-1.5">
                                {post.tags.slice(0, 3).map((tag) => (
                                  <Badge
                                    key={tag}
                                    className="bg-orange-500/10 text-orange-500 border-orange-500/20 text-[10px] px-1.5 py-0"
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-14 rounded-xl bg-gradient-to-br from-orange-500/10 to-zinc-50 dark:to-zinc-900 border border-orange-500/20 p-8 text-center">
          <h2 className="text-xl font-bold mb-2">
            Explore Our Tools
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 mb-6 max-w-lg mx-auto">
            Compare pedals side-by-side, build your dream pedalboard, or
            learn the perfect signal chain order.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/compare"
              className="inline-flex items-center px-5 py-2.5 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors text-sm"
            >
              Compare Pedals →
            </Link>
            <Link
              href="/pedal-order"
              className="inline-flex items-center px-5 py-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors text-sm border border-zinc-200 dark:border-zinc-700"
            >
              Signal Chain Guide
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
