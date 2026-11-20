// Simple abuse limit: each visitor (by IP address) may send 5 enquiries
// every 10 minutes.
//
// Limitation: the counts live in the memory of one server instance. On
// serverless hosting such as Netlify, different instances do not share memory,
// so this stops casual spam but is not a hard guarantee. The honeypot field,
// server-side validation and the secret between this site and Apps Script
// add further protection.

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

const hits = new Map<string, number[]>();

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < WINDOW_MS);

  if (recent.length >= MAX_REQUESTS) {
    hits.set(key, recent);
    return true;
  }

  recent.push(now);
  hits.set(key, recent);

  // Keep memory small by dropping visitors who have gone quiet
  if (hits.size > 1000) {
    for (const [otherKey, times] of hits) {
      if (times.every((time) => now - time >= WINDOW_MS)) hits.delete(otherKey);
    }
  }

  return false;
}

export function getClientIp(request: Request): string {
  // Netlify sets this header itself, so visitors cannot fake it
  const netlifyIp = request.headers.get("x-nf-client-connection-ip");
  if (netlifyIp) return netlifyIp;

  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();

  return "unknown";
}
