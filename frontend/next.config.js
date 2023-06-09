const { PHASE_DEVELOPMENT_SERVER } = require("next/dist/shared/lib/constants");

/** @type {import('next').NextConfig} */
const nextConfig = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      reactStrictMode: false,
      env: {
        NEXT_PUBLIC_ENV_API_URL: "http://localhost:3000/api",
        NEXT_PUBLIC_ENV_DOMAIN: "http://localhost:3000",
        NEXT_PUBLIC_ENV_IMAGE_URL: "http://localhost:3000",
      },
      async rewrites() {
        return [
          {
            source: "/api/:path*",
            destination: "http://localhost:8000/api/:path*",
          },
        ];
      },
    };
  }

  // docker-compose 로 환경변수 전달
  return {
    reactStrictMode: false,
    output: "standalone",
    images: {
      loader: "custom",
      loaderFile: "./src/util/localImageLoader.ts",
    },
    async rewrites() {
      return [
        {
          source: "/api/:path*",
          destination: "http://localhost:8000/api/:path*",
        },
      ];
    },
  };
};

module.exports = nextConfig;
