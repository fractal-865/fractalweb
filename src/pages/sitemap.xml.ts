import type { APIRoute } from 'astro';
import { paginasSitios } from '../data/paginas-sitios';
import { paginasServicios } from '../data/paginas-servicios';
import { noticiasPublicadas } from '../lib/noticias';
import { BORRADOR, NOTICIAS_MODO_PREVIA, SITE_URL } from '../config';

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

  const noticias =
    NOTICIAS_MODO_PREVIA || noticiasPublicadas.length === 0
      ? []
      : [
          {
            loc: `${SITE_URL}/noticias/`,
            priority: '0.8',
            changefreq: 'weekly',
            lastmod: noticiasPublicadas
              .map((n) => n.dateModified || n.datePublished || '')
              .filter(Boolean)
              .sort()
              .at(-1)
              ?.slice(0, 10) ?? hoy,
          },
          ...noticiasPublicadas.map((n) => ({
            loc: n.canonical,
            priority: '0.7',
            changefreq: 'monthly',
            lastmod: (n.dateModified || n.datePublished || hoy).slice(0, 10),
          })),
        ];

  const urls = [...base, ...nuevas, ...noticias];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${'lastmod' in u && u.lastmod ? u.lastmod : hoy}</lastmod>
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
