// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "loremflickr.com",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "via.placeholder.com",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "picsum.photos",
                pathname: "/**",
            },
        ],
    },
    experimental: {
        optimizePackageImports: ["@nextui-org/*", "tailwind-variants"],
        webVitalsAttribution: ["CLS", "LCP", "FCP", "FID"],
    },
};

// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//     enabled: process.env.ANALYZE === "true",
// });

// module.exports = withBundleAnalyzer(nextConfig);

module.exports = nextConfig;
