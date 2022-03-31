/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return {
      fallback: [
        {
          source: "/api/:path*",
          destination: "http://127.0.0.1:8080/projetappliweb/api/:path*",
        },
      ],
    };
  },
};

module.exports = nextConfig;
