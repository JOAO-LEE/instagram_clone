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
        ]
    }
};
// https://png.pngtree.com
export default nextConfig;
