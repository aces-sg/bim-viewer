const CopyPlugin = require("copy-webpack-plugin");
/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['openbim-components', '@popperjs', 'bim-fragment', 'openbim-clay'],
  webpack: function (config, options) {
    config.plugins.push(new CopyPlugin({
      patterns: [
        { from: "src/wasm", to: "./static/chunks/pages/" },
      ],
    }))
    return config;
  }
}

module.exports = nextConfig
