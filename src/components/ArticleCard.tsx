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
      className="group panel-manga-sm flex h-full flex-col bg-surface p-5 transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
    >
      <p className="kicker text-primary">{kicker}</p>
      <h3 className="mt-2 text-lg font-black leading-tight text-fg">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-fg-muted">{excerpt}</p>
      <p className="nums mt-4 font-mono text-xs text-fg-muted">{date}</p>
    </Link>
  );
}
