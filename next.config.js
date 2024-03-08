/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['storage.cloud.google.com'],
    },
    async headers() {
        return [
          {
            source: '/api/cards/create/template',
            headers: [
              {
                key: 'Cache-Control',
                value: 'no-store, max-age=0',
              },
            ],
          },
        ];
    },
}



module.exports = nextConfig
