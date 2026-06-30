import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the routes for the sitemap
const routes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/tours', priority: '0.9', changefreq: 'weekly' },
  { path: '/transport', priority: '0.9', changefreq: 'weekly' },
  { path: '/blog', priority: '0.8', changefreq: 'daily' },
  { path: '/contact', priority: '0.8', changefreq: 'monthly' },
];

// Tour and transport data paths
const toursDataPath = path.resolve(__dirname, '../src/data/tours.ts');
const transportDataPath = path.resolve(__dirname, '../src/data/transportServices.ts');
const transferDefaultsPath = path.resolve(__dirname, '../src/data/transferDefaults.ts');

const baseUrl = 'https://bavaro.tours';
const today = new Date().toISOString().split('T')[0];

// Helper to extract tour slugs from TypeScript files
function extractSlugsFromFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const slugMatches = content.match(/slug:\s*['"]([^'"]+)['"]/g);
    if (slugMatches) {
      return slugMatches.map(match => match.match(/['"]([^'"]+)['"]/)[1]);
    }
  } catch (e) {
    console.warn(`Could not read ${filePath}: ${e.message}`);
  }
  return [];
}

// Extract tour slugs
const tourSlugs = extractSlugsFromFile(toursDataPath);
const transportSlugs = extractSlugsFromFile(transportDataPath);
const transferSlugs = extractSlugsFromFile(transferDefaultsPath);

// Build XML
let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

// Add main routes
for (const route of routes) {
  xml += `  <url>\n`;
  xml += `    <loc>${baseUrl}${route.path}</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
  xml += `    <priority>${route.priority}</priority>\n`;
  xml += `    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}${route.path}?lang=en"/>\n`;
  xml += `    <xhtml:link rel="alternate" hreflang="es" href="${baseUrl}${route.path}?lang=es"/>\n`;
  xml += `  </url>\n`;
}

// Add tour detail pages
for (const slug of tourSlugs) {
  const tourPath = `/details/tours/${slug}`;
  xml += `  <url>\n`;
  xml += `    <loc>${baseUrl}${tourPath}</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += `    <changefreq>monthly</changefreq>\n`;
  xml += `    <priority>0.7</priority>\n`;
  xml += `    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}${tourPath}?lang=en"/>\n`;
  xml += `    <xhtml:link rel="alternate" hreflang="es" href="${baseUrl}${tourPath}?lang=es"/>\n`;
  xml += `  </url>\n`;
}

// Add transport detail pages
for (const slug of transportSlugs) {
  const transportPath = `/details/transport/${slug}`;
  xml += `  <url>\n`;
  xml += `    <loc>${baseUrl}${transportPath}</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += `    <changefreq>monthly</changefreq>\n`;
  xml += `    <priority>0.7</priority>\n`;
  xml += `    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}${transportPath}?lang=en"/>\n`;
  xml += `    <xhtml:link rel="alternate" hreflang="es" href="${baseUrl}${transportPath}?lang=es"/>\n`;
  xml += `  </url>\n`;
}

// Add transfer detail pages
for (const slug of transferSlugs) {
  const transferPath = `/details/transport/${slug}`;
  xml += `  <url>\n`;
  xml += `    <loc>${baseUrl}${transferPath}</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += `    <changefreq>monthly</changefreq>\n`;
  xml += `    <priority>0.7</priority>\n`;
  xml += `    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}${transferPath}?lang=en"/>\n`;
  xml += `    <xhtml:link rel="alternate" hreflang="es" href="${baseUrl}${transferPath}?lang=es"/>\n`;
  xml += `  </url>\n`;
}

xml += `</urlset>\n`;

// Write to public folder
const outputPath = path.resolve(__dirname, '../public/sitemap.xml');
fs.writeFileSync(outputPath, xml, 'utf-8');

console.log(`Sitemap generated at ${outputPath}`);
