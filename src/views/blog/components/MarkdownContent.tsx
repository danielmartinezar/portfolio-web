import Markdown from "markdown-to-jsx";

interface MarkdownContentProps {
  content: string;
}

const markdownOverrides = {
  h1: { props: { className: "text-3xl font-bold text-fg-primary mt-8 mb-4" } },
  h2: { props: { className: "text-2xl font-bold text-fg-primary mt-6 mb-3" } },
  h3: { props: { className: "text-xl font-semibold text-fg-primary mt-5 mb-2" } },
  h4: { props: { className: "text-lg font-semibold text-fg-primary mt-4 mb-2" } },
  p: { props: { className: "text-fg-secondary mb-4 leading-relaxed" } },
  ul: { props: { className: "list-disc list-inside text-fg-secondary mb-4 space-y-1" } },
  ol: { props: { className: "list-decimal list-inside text-fg-secondary mb-4 space-y-1" } },
  li: { props: { className: "text-fg-secondary" } },
  a: { props: { className: "text-primary hover:underline" } },
  strong: { props: { className: "font-bold text-fg-primary" } },
  em: { props: { className: "italic" } },
  blockquote: { props: { className: "border-l-4 border-primary pl-4 my-4 text-fg-secondary italic" } },
  code: { props: { className: "bg-bg-secondary px-1.5 py-0.5 rounded text-sm text-primary" } },
  pre: { props: { className: "bg-bg-secondary p-4 rounded-lg overflow-x-auto mb-4 text-sm" } },
};

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <Markdown options={{ overrides: markdownOverrides }}>
      {content}
    </Markdown>
  );
}
