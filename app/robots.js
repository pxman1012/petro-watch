export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: 'https://pxman-petro-watch.vercel.app/sitemap.xml',
  }
}