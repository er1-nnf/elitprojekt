/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: import.meta.dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "diplan-strapi-aws-s3-images-bucket.s3.eu-north-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "elit-projekt-strapi-aws.s3.eu-north-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "exuberant-charity-7a1a3f0618.media.strapiapp.com",
      },
    ],
  },
};

export default nextConfig;
