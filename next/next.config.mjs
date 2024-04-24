/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ready-set-go-fish.s3.us-west-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

// (https://cichlid-cartel.s3.us-west-1.amazonaws.com/cichlid-cartel/clqeem8js0000g7us2ln2cp5m/full/dragonblood1.png)

export default nextConfig;