/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "loremflickr.com",
                pathname: "/**"
            },
            {
                protocol: "https",
                hostname: "via.placeholder.com",
                pathname: "/**"
            },
            {
                protocol: "https",
                hostname: "picsum.photos",
                pathname: "/**"
            }
        ]
    }
}

module.exports = nextConfig
