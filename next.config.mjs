/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Tu configuración original de TypeScript
  typescript: {
    ignoreBuildErrors: true,
  },

  // 2. Tu configuración original de Imágenes (ImageKit)
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        port: "",
      },
    ],
  },

  async redirects() {
    return [
      {
        source: '/crm',
        destination: 'http://dockploy.inkstinctnyc.com:10000/app/my-app',
        permanent: false,
      },
    ]                                       
  },
}

export default nextConfig;
