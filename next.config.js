/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['openbim-components', '@popperjs', 'bim-fragment', 'openbim-clay'],
}

module.exports = nextConfig
