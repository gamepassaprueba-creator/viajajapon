import Link from "next/link";

export interface ArticleCardProps {
  href: string;
  kicker: string;
  title: string;
  excerpt: string;
  date: string;
}

export function ArticleCard({ href, kicker, title, excerpt, date }: ArticleCardProps) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-lg border border-border bg-surface p-5 transition-colors hover:border-primary"
    >
      <p className="kicker text-primary">{kicker}</p>
      <h3 className="mt-2 font-serif text-xl leading-tight text-fg">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-fg-muted">{excerpt}</p>
      <p className="nums mt-4 text-xs text-fg-muted">{date}</p>
    </Link>
  );
}
