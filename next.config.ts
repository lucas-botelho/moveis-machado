import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Metadata is local and fast; serve it in the initial head for all clients.
  htmlLimitedBots: /.*/,
};

export default nextConfig;
