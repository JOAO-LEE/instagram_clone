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
                hostname:  "static.wixstatic.com",
                pathname: "/media/fd63ed_44d6fed781e94f88adeb3152a7a247fb~mv2.png/v1/fill/w_588,h_588,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/mockup-of-two-black-iphones-xr-floating-.png"
            },
        ]
    }
};


export default nextConfig;
