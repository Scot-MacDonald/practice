import { withPayload } from "@payloadcms/next/withPayload";
import createNextIntlPlugin from "next-intl/plugin";
import redirects from "./redirects.js";

const withNextIntl = createNextIntlPlugin();

const NEXT_PUBLIC_SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
const url = new URL(NEXT_PUBLIC_SERVER_URL);

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: url.protocol.replace(":", ""),
        hostname: url.hostname,
      },
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: "https",
        hostname: "psttqwag20.ufs.sh",
        pathname: "/f/**", // Important: Allow all paths under `/f/` for UploadThing images
      },
      // If you have other UploadThing subdomains, add them similarly here
      // {
      //   protocol: "https",
      //   hostname: "another-subdomain.ufs.sh",
      //   pathname: "/f/**",
      // },
      {
        protocol: "https",
        hostname: "sslip.io",
      },
      {
        protocol: "https",
        hostname: "91.99.170.52",
      },
    ],
  },
  reactStrictMode: true,
  redirects,
};

export default withNextIntl(withPayload(nextConfig));
