/** @format */

import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    domains: ["www.nipstec.com"], // Replace 'example.com' with your image domain
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.nipstec.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "nipstec.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname:
          "https://nipstec-alpha-service-fbeue3c0edgyarap.canadacentral-01.azurewebsites.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "https://nipstecstorage.blob.core.windows.net",
        pathname: "/**",
      },
    ],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
