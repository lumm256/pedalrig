import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — PedalRig Blog`,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated || post.date,
      authors: [post.author],
      tags: post.tags,
    },
  };
}

function jsonLd(post: NonNullable<ReturnType<typeof getPostBySlug>>) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    author: {
      "@type": "Organization",
      name: post.author,
      url: "https://pedalrig.com",
    },
    publisher: {
      "@type": "Organization",
      name: "PedalRig",
      url: "https://pedalrig.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://pedalrig.com/blog/${post.slug}`,
    },
    keywords: post.tags.join(", "),
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  // Related posts: same tags, exclude self
  const related = allPosts
    .filter(
      (p) =>
        p.slug !== slug &&
        p.tags.some((t) => post.tags.includes(t))
    )
    .slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(post)) }}
      />
      <main className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
        <article className="max-w-3xl mx-auto px-4 py-10 sm:py-14">
          {/* Breadcrumb */}
          <nav
            className="text-sm text-zinc-500 mb-6"
            aria-label="Breadcrumb"
          >
            <ol className="flex items-center gap-2 flex-wrap">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/blog" className="hover:underline">
                  Blog
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-zinc-900 dark:text-zinc-100 font-medium truncate max-w-[200px]">
                {post.title}
              </li>
            </ol>
          </nav>

          {/* Header */}
          <header className="mb-10">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <Link key={tag} href={`/blog/tag/${tag.toLowerCase()}`}>
                  <Badge className="bg-orange-500/10 text-orange-500 border-orange-500/20 text-xs hover:bg-orange-500/20 transition-colors">
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
              {post.title}
            </h1>
            <p className="text-lg text-zinc-500 dark:text-zinc-400 mb-4">
              {post.description}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span>·</span>
              <span>{post.readingTime}</span>
              <span>·</span>
              <span>By {post.author}</span>
            </div>
          </header>

          <Separator className="mb-10 bg-zinc-200 dark:bg-zinc-800" />

          {/* Content */}
          <MarkdownRenderer content={post.content} />

          <Separator className="my-12 bg-zinc-200 dark:bg-zinc-800" />

          {/* Prev / Next navigation */}
          <nav className="flex flex-col sm:flex-row gap-4 mb-12">
            {prevPost ? (
              <Link
                href={`/blog/${prevPost.slug}`}
                className="flex-1 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-orange-500/40 transition-colors"
              >
                <p className="text-xs text-zinc-500 mb-1">← Previous</p>
                <p className="font-medium text-sm">{prevPost.title}</p>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
            {nextPost ? (
              <Link
                href={`/blog/${nextPost.slug}`}
                className="flex-1 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-orange-500/40 transition-colors text-right"
              >
                <p className="text-xs text-zinc-500 mb-1">Next →</p>
                <p className="font-medium text-sm">{nextPost.title}</p>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
          </nav>

          {/* Related posts */}
          {related.length > 0 && (
            <section className="mb-12">
              <h2 className="text-lg font-bold mb-4">Related Articles</h2>
              <div className="space-y-3">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    className="block p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-orange-500/40 transition-colors"
                  >
                    <p className="font-medium text-sm hover:text-orange-500 transition-colors">
                      {r.title}
                    </p>
                    <p className="text-xs text-zinc-500 mt-1">
                      {r.readingTime} · {new Date(r.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Back to blog */}
          <div className="text-center">
            <Link
              href="/blog"
              className="inline-flex items-center px-5 py-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors text-sm border border-zinc-200 dark:border-zinc-700"
            >
              ← All Articles
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}
