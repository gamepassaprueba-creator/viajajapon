"use client";

import { trackEvent } from "@/lib/analytics";

interface TrackedAffiliateLinkProps {
  href: string;
  partner: string;
  label: string;
  monetized: boolean;
  className?: string;
  placement?: string;
  ctaVariant?: string;
}

export function TrackedAffiliateLink({
  href,
  partner,
  label,
  monetized,
  className,
  placement = "affiliate_link",
  ctaVariant = "default",
}: TrackedAffiliateLinkProps) {
  const onClick = () => {
    const pathname = window.location.pathname;
    const contentSlug = pathname.split("/").filter(Boolean).at(-1) || "home";

    trackEvent("affiliate_click", {
      provider: partner,
      link_url: href,
      link_text: label,
      page_path: `${pathname}${window.location.search}`,
      content_slug: contentSlug,
      placement,
      cta_variant: ctaVariant,
      monetized: monetized ? 1 : 0,
    });
  };

  return (
    <a
      href={href}
      rel={monetized ? "sponsored nofollow noopener noreferrer" : "noopener noreferrer"}
      target="_blank"
      className={className}
      onClick={onClick}
    >
      {label}
      <span aria-hidden="true">→</span>
    </a>
  );
}
