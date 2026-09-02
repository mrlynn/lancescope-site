import type { NextConfig } from "next";

/* Nothing to configure. The console's next.config.ts proxies /api to the Python
   server; this app has no backend of its own and talks to exactly one external
   host, GitHub's release API, from a server component. Cache Components is left
   off, so `fetch` follows the previous model — see app/lib/release.ts, where the
   revalidate window is set per request. */
const nextConfig: NextConfig = {};

export default nextConfig;
