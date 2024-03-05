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
                hostname:  "agenciadebolso.com",
                pathname: "/wp-content/uploads/2020/12/1214-instagram-reels-fb.png"
            },
        ]
    }
};


export default nextConfig;
