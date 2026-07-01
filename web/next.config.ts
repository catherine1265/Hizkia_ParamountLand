import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Folder ini punya lockfile sendiri; kunci root ke sini agar tak salah deteksi.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
