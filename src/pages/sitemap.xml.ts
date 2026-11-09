import type { APIRoute } from 'astro';
import { paginasSitios } from '../data/paginas-sitios';
import { paginasServicios } from '../data/paginas-servicios';
import { BORRADOR, SITE_URL } from '../config';

const hoy = new Date().toISOString().slice(0, 10);

export const GET: APIRoute = () => {
  const base = [
    { loc: `${SITE_URL}/`, priority: '1.0', changefreq: 'monthly' },
    { loc: `${SITE_URL}/cotizador/`, priority: '0.8', changefreq: 'monthly' },
    { loc: `${SITE_URL}/migraciones.html`, priority: '0.5', changefreq: 'yearly' },
  ];

  const nuevas = BORRADOR
    ? []
    : [
        { loc: `${SITE_URL}/sitios-web/`, priority: '0.9', changefreq: 'monthly' },
        ...paginasSitios.map((p) => ({
          loc: `${SITE_URL}/sitios-web/${p.slug}/`,
          priority: '0.8',
          changefreq: 'monthly',
        })),
        { loc: `${SITE_URL}/servicios/`, priority: '0.8', changefreq: 'monthly' },
        ...paginasServicios.map((p) => ({
          loc: `${SITE_URL}/${p.slug}/`,
          priority: '0.8',
          changefreq: 'monthly',
        })),
      ];

  const urls = [...base, ...nuevas];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${hoy}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
