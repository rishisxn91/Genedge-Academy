const withNextIntl = require('next-intl/plugin')()

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'www.genedgeacademy.com', 'genedgeacademy.com'],
  },
}

module.exports = withNextIntl(nextConfig)
