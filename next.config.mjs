/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: import.meta.dirname,
  },
  // Inline the (small) CSS into the HTML instead of render-blocking
  // stylesheet requests.
  experimental: {
    inlineCss: true,
  },
  images: {
    // S3/Strapi send no Cache-Control, so without this Vercel re-optimizes
    // every image after a short TTL — that burned through the Hobby plan's
    // 5K transformations/month. Cache optimized images for 31 days.
    minimumCacheTTL: 2678400,
    // Fewer srcset widths = fewer unique transformations per image.
    deviceSizes: [640, 1080, 1920],
    imageSizes: [256, 384],
    qualities: [60, 75],
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
