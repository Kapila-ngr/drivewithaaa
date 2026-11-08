# SEO

The site includes search metadata, canonical URLs, a sitemap, crawl instructions, and
organization structured data. These help search engines understand and discover the
site; they do not guarantee indexing, rich results, or a particular ranking.

## Current setup

- Route-specific titles, descriptions, canonical URLs, and Open Graph metadata are
  maintained in `src/routes.js` and applied by `src/components/Seo.jsx`.
- The homepage has a location-focused title and heading for driving lessons in
  Sheffield, Rotherham, and Chesterfield. The site also identifies Barnsley as a
  service area.
- `public/sitemap.xml` lists the site's public routes. `npm run build` regenerates it
  from `scripts/generate-sitemap.js`.
- `public/robots.txt` allows crawling and points to the sitemap.
- `index.html` contains the base metadata and organization structured data. Keep
  business details there accurate and consistent with the visible site.

## After deployment

1. Verify the canonical domain and confirm that the pages, sitemap, and robots file
   load successfully over HTTPS.
2. Verify ownership of `https://www.drivewithaaa.co.uk` in Google Search Console,
   submit `/sitemap.xml`, and inspect the homepage and important routes for indexing
   or crawl issues.
3. Set up or claim the Google Business Profile using the real business details and
   actual service area. Keep the name, phone, hours, and service-area information
   consistent wherever the business is listed.
4. Ask genuine customers for honest reviews and respond to them. Do not offer
   incentives or post reviews on customers' behalf.
5. Publish useful, original information about lessons and the areas served. Create
   a location page only when it can provide genuinely useful, unique details for
   that area; avoid near-identical pages made only to target keywords.
6. Monitor Search Console impressions, clicks, queries, and indexing over time.

Search results depend on the searcher's location, competition, business prominence,
site quality, and other factors. No code change or SEO provider can guarantee the
first result for a search phrase.

## Local validation

```bash
npm run lint
npm run build
```
