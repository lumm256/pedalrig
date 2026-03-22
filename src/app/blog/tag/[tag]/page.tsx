import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getAllTags, getPostsByTag } from "@/lib/blog";

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map(({ tag }) => ({ tag: tag.toLowerCase() }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `Articles tagged "${tag}" — PedalRig Blog`,
    description: `All PedalRig blog articles about ${tag}. Guitar pedal tips, guides, and expert advice.`,
    alternates: { canonical: `/blog/tag/${tag}` },
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);

  if (posts.length === 0) notFound();

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <div className="max-w-4xl mx-auto px-4 py-10 sm:py-14">
        <nav className="text-sm text-zinc-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 flex-wrap">
            <li>
              <Link href="/" className="hover:underline">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/blog" className="hover:underline">Blog</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-zinc-900 dark:text-zinc-100 font-medium capitalize">
              {tag}
            </li>
          </ol>
        </nav>

        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2 capitalize">
            Articles about {tag}
          </h1>
          <p className="text-zinc-500">
            {posts.length} article{posts.length !== 1 ? "s" : ""}
          </p>
        </header>

        <div className="space-y-4">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
              <Card className="bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 transition-all group-hover:border-orange-500/40">
                <CardContent className="py-5 px-5 sm:px-6">
                  <h2 className="text-lg font-bold group-hover:text-orange-500 transition-colors leading-tight mb-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 mb-2">
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
                    <div className="flex gap-1.5">
                      {post.tags.map((t) => (
                        <Badge
                          key={t}
                          className={`text-[10px] px-1.5 py-0 ${
                            t.toLowerCase() === tag.toLowerCase()
                              ? "bg-orange-500/20 text-orange-500 border-orange-500/30"
                              : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 border-zinc-200 dark:border-zinc-700"
                          }`}
                        >
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center px-5 py-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors text-sm border border-zinc-200 dark:border-zinc-700"
          >
            ← All Articles
          </Link>
        </div>
      </div>
    </main>
  );
}
