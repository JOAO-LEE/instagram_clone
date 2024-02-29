/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                port: "",
                hostname:  "upload.wikimedia.org",
                pathname: "/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png"
            },
            {
                protocol: "https",
                port: "",
                hostname:  "echoinnovateit.com",
                pathname: "/wp-content/uploads/2023/07/instagram-like-app-development.png"
            },
        ]
    }
};


export default nextConfig;
