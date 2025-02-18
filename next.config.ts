import type { NextConfig } from "next";
import Google from "next-auth/providers/google";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // swcPlugins: [["next-super-json-plugin", {}]],
  },
  images: {
    domains: [
      "res.cloudinary.com",
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
    ],
  },
};

export default nextConfig;
