/** @format */

import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    domains: ["www.nipstec.com"], // Replace 'example.com' with your image domain
    remotePatterns: [
      {
        protocol: "https",
        hostname:
          "spring-boot-dev-app-nipstec-h4gpf9e4fjfebta4.australiacentral-01.azurewebsites.net",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
