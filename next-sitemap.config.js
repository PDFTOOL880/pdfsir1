/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.pdfsir.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  additionalPaths: async (config) => {
    const paths = [
      '',
      '/blog',
      '/documentation',
      '/features',
      '/help-center',
      '/legal',
      '/legal/cookie-policy',
      '/legal/privacy-policy',
      '/legal/terms-of-service',
      '/login',
      '/pricing',
      '/resources',
      '/security',
      '/tools',
      '/tools/compress-pdf',
      '/tools/excel-to-pdf',
      '/tools/jpg-to-pdf',
      '/tools/merge-images-to-pdf',
      '/tools/merge-pdf',
      '/tools/ocr-pdf',
      '/tools/pdf-to-excel',
      '/tools/pdf-to-jpg',
      '/tools/pdf-to-png',
      '/tools/png-to-pdf',
      '/tools/split-pdf',
      '/tools/word-to-pdf'
    ];
    return paths.map((path) => ({
      loc: `${config.siteUrl}${path}`,
      changefreq: 'daily',
      priority: path === '' ? 1.0 : 0.7,
      lastmod: new Date().toISOString(),
    }));
  },
  exclude: ['/dashboard/*', '/api/*'],
  outDir: 'public',
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard', '/api'],
      },
    ],
  },
}