"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";

type Props = React.ComponentProps<typeof Link> & {
  prefetch?: boolean;
};

const prefetched = new Set<string>();

export default function HoverPrefetchLink({ href, prefetch = true, onMouseEnter, onMouseLeave, onFocus, ...props }: Props) {
  const router = useRouter();
  const timeoutRef = useRef<number | null>(null);

  const hrefString = typeof href === "string" ? href : href?.toString?.() ?? "";
  const isExternal = hrefString.startsWith("http://") || hrefString.startsWith("https://") || hrefString.startsWith("mailto:");
  const isHash = hrefString.startsWith("#");
  const shouldPrefetch = prefetch && !isExternal && !isHash && hrefString.length > 0;

  const doPrefetch = () => {
    if (!shouldPrefetch) return;
    if (prefetched.has(hrefString)) return;
    try {
      router.prefetch(hrefString);
      prefetched.add(hrefString);
    } catch (e) {
      // ignore
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onMouseEnter) onMouseEnter(e);
    if (!shouldPrefetch) return;
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      doPrefetch();
      timeoutRef.current = null;
    }, 50) as unknown as number;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onMouseLeave) onMouseLeave(e);
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLAnchorElement>) => {
    if (onFocus) onFocus(e);
    doPrefetch();
  };

  return (
    <Link
      href={href}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      {...props}
    />
  );
}
