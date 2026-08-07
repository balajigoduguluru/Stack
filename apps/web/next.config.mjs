/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@stack/auth", "@stack/db", "@stack/ui"],
};

export default nextConfig;
