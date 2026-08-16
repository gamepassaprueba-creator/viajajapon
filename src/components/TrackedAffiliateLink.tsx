"use client";

import { trackEvent } from "@/lib/analytics";

interface TrackedAffiliateLinkProps {
  href: string;
  partner: string;
  label: string;
  monetized: boolean;
  className?: string;
}

export function TrackedAffiliateLink({
  href,
  partner,
  label,
  monetized,
  className,
}: TrackedAffiliateLinkProps) {
  const onClick = () => {
    trackEvent("affiliate_click", {
      provider: partner,
      link_url: href,
      link_text: label,
      page_path: `${window.location.pathname}${window.location.search}`,
      monetized: monetized ? 1 : 0,
    });
  };

  return (
    <a
      href={href}
      rel="sponsored nofollow noopener noreferrer"
      target="_blank"
      className={className}
      onClick={onClick}
    >
      {label}
      <span aria-hidden="true">→</span>
    </a>
  );
}
