/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'firebasestorage.googleapis.com',
          },
          {
            protocol: 'https',
            hostname: 'img.freepik.com',
          },
          {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
          },
          {
            protocol: 'https',
            hostname: 'nextblogrohan499edbe39ed3438d9a79e99571e89036113359-dev.s3.ap-south-1.amazonaws.com',
          },
        ],
      },
}

module.exports = nextConfig
