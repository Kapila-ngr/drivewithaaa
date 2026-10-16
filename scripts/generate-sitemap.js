#!/usr/bin/env node

/**
 * Sitemap Generator for Drive with AAA
 * Automatically generates sitemap.xml with current date
 */

import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const baseUrl = 'https://www.drivewithaaa.co.uk';
const currentDate = new Date().toISOString().split('T')[0];

const pages = [
  {
    loc: '/',
    changefreq: 'weekly',
    priority: '1.0',
    lastmod: currentDate
  }
];

function generateSitemap() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  ${pages.map(page => `
  <url>
    <loc>${baseUrl}${page.loc}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('')}
  
</urlset>`;

  const sitemapPath = join(__dirname, '../public/sitemap.xml');
  
  try {
    writeFileSync(sitemapPath, sitemap, 'utf8');
    console.log('✅ Sitemap generated successfully at:', sitemapPath);
    console.log(`📅 Last modified: ${currentDate}`);
    console.log(`📄 Total URLs: ${pages.length}`);
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

generateSitemap();
