/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['ws'], // Adicione 'ws' para suportar o pacote
  },
};

export default nextConfig;
