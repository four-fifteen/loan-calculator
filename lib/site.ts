export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  // Vercel provides the hostname without scheme.
  const vercelHost = process.env.VERCEL_URL;
  if (vercelHost) return `https://${vercelHost}`.replace(/\/$/, "");

  // Local/dev fallback: prevents sitemap/canonical from defaulting to example.com.
  return "http://localhost:3000";
}

export function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  if (!path.startsWith("/")) return `${base}/${path}`;
  return `${base}${path}`;
}
