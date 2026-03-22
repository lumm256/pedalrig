"use client";

import { useMemo } from "react";

/* ---------- Minimal Markdown → HTML ---------- */
function markdownToHtml(md: string): string {
  let html = md;

  // Code blocks (```lang ... ```)
  html = html.replace(
    /```(\w*)\n([\s\S]*?)```/g,
    '<pre class="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-4 overflow-x-auto my-4 text-sm"><code class="language-$1">$2</code></pre>'
  );

  // Inline code
  html = html.replace(
    /`([^`]+)`/g,
    '<code class="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-sm text-orange-500">$1</code>'
  );

  // Images
  html = html.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    '<img src="$2" alt="$1" class="rounded-lg my-6 w-full" loading="lazy" />'
  );

  // Links
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="text-orange-500 hover:underline">$1</a>'
  );

  // Bold
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");

  // Italic
  html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");

  // H3
  html = html.replace(
    /^### (.+)$/gm,
    '<h3 class="text-lg font-bold mt-8 mb-3">$1</h3>'
  );

  // H2
  html = html.replace(
    /^## (.+)$/gm,
    '<h2 class="text-xl sm:text-2xl font-bold mt-10 mb-4">$1</h2>'
  );

  // Blockquotes
  html = html.replace(
    /^> (.+)$/gm,
    '<blockquote class="border-l-4 border-orange-500 pl-4 my-4 text-zinc-600 dark:text-zinc-400 italic">$1</blockquote>'
  );

  // Unordered lists
  html = html.replace(
    /^- (.+)$/gm,
    '<li class="ml-4 list-disc text-zinc-700 dark:text-zinc-300">$1</li>'
  );
  html = html.replace(
    /(<li[^>]*>.*<\/li>\n?)+/g,
    '<ul class="space-y-1.5 my-4">$&</ul>'
  );

  // Ordered lists
  html = html.replace(
    /^\d+\. (.+)$/gm,
    '<li class="ml-4 list-decimal text-zinc-700 dark:text-zinc-300">$1</li>'
  );

  // Horizontal rules
  html = html.replace(
    /^---$/gm,
    '<hr class="my-8 border-zinc-200 dark:border-zinc-800" />'
  );

  // Paragraphs: wrap lines that aren't already HTML tags
  html = html
    .split("\n\n")
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      if (trimmed.startsWith("<")) return trimmed;
      return `<p class="text-zinc-700 dark:text-zinc-300 leading-relaxed my-4">${trimmed.replace(/\n/g, " ")}</p>`;
    })
    .join("\n");

  return html;
}

export function MarkdownRenderer({ content }: { content: string }) {
  const html = useMemo(() => markdownToHtml(content), [content]);
  return (
    <div
      className="prose-custom max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
