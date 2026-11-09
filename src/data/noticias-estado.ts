/**
 * Estado editorial de las noticias.
 *
 * El paquete llegó con los 29 artículos en `draft` y sin fechas. Se publicaron
 * todos el 9 de noviembre de 2026 con la fecha real de publicación.
 *
 * Para volver un artículo a borrador, cambie `status` a `'draft'` y quite la
 * fecha, o elimine su entrada. Con `NOTICIAS_MODO_PREVIA = true` en
 * `src/config.ts` se genera la vista previa completa sin indexar.
 *
 * Si un artículo se revisa después, agregue `dateModified` con la fecha real
 * de esa revisión.
 *
 * Pendientes editoriales:
 * - `ley-21719-sitio-web`: conviene una revisión legal. Se publicó antes del
 *   1 de diciembre de 2026, así que mantiene el título y el tiempo presente
 *   del paquete. Si se actualiza después de esa fecha, aplicar la variante
 *   `freshness` del paquete.
 * - `dominio-cl-precio-y-renovacion`: confirmar el precio comercial. La tarifa
 *   directa de NIC y la gestión de Fractal Host son cosas distintas.
 */
export type EstadoNoticia = {
  status: 'draft' | 'published';
  datePublished?: string;
  dateModified?: string;
};

export const estadoNoticias: Record<string, EstadoNoticia> = {
  'ley-21719-sitio-web': { status: 'published', datePublished: '2026-11-09T08:47:00-03:00' },
  'crear-sitios-web-en-punta-arenas': { status: 'published', datePublished: '2026-11-09T08:47:00-03:00' },
  'mantencion-de-sitios-web-en-punta-arenas': { status: 'published', datePublished: '2026-11-09T08:47:00-03:00' },
  'hosting-en-punta-arenas': { status: 'published', datePublished: '2026-11-09T08:47:00-03:00' },
  'hosting-en-chile': { status: 'published', datePublished: '2026-11-09T08:47:00-03:00' },
  'que-es-un-hosting': { status: 'published', datePublished: '2026-11-09T08:47:00-03:00' },
  'sitio-web-en-puerto-natales': { status: 'published', datePublished: '2026-11-09T08:47:00-03:00' },
  'sitio-web-en-porvenir': { status: 'published', datePublished: '2026-11-09T08:47:00-03:00' },
  'sitio-web-en-chiloe': { status: 'published', datePublished: '2026-11-09T08:47:00-03:00' },
  'hosting-para-wordpress': { status: 'published', datePublished: '2026-11-09T08:47:00-03:00' },
  'diferencia-entre-hosting-y-dominio': { status: 'published', datePublished: '2026-11-09T08:47:00-03:00' },
  'hosting-cpanel-o-ferozo': { status: 'published', datePublished: '2026-11-09T08:47:00-03:00' },
  'correo-corporativo-con-tu-dominio': { status: 'published', datePublished: '2026-11-09T08:47:00-03:00' },
  'migrar-hosting-sin-cortes': { status: 'published', datePublished: '2026-11-09T08:47:00-03:00' },
  'mejor-hosting-chile': { status: 'published', datePublished: '2026-11-09T08:47:00-03:00' },
  'hosting-barato-chile': { status: 'published', datePublished: '2026-11-09T08:47:00-03:00' },
  'tienda-online-en-punta-arenas': { status: 'published', datePublished: '2026-11-09T08:47:00-03:00' },
  'diseno-web-para-empresas': { status: 'published', datePublished: '2026-11-09T08:47:00-03:00' },
  'como-crear-una-pagina-web': { status: 'published', datePublished: '2026-11-09T08:47:00-03:00' },
  'tipos-de-sitios-web': { status: 'published', datePublished: '2026-11-09T08:47:00-03:00' },
  'diseno-web-personalizado': { status: 'published', datePublished: '2026-11-09T08:47:00-03:00' },
  'sitio-web-hackeado-punta-arenas': { status: 'published', datePublished: '2026-11-09T08:47:00-03:00' },
  'hosting-compartido-o-vps': { status: 'published', datePublished: '2026-11-09T08:47:00-03:00' },
  'dominio-cl-precio-y-renovacion': { status: 'published', datePublished: '2026-11-09T08:47:00-03:00' },
  'pagina-web-o-sitio-web': { status: 'published', datePublished: '2026-11-09T08:47:00-03:00' },
  'que-es-un-sitio-web': { status: 'published', datePublished: '2026-11-09T08:47:00-03:00' },
  'hay-que-pagar-por-una-pagina-web': { status: 'published', datePublished: '2026-11-09T08:47:00-03:00' },
  'crear-pagina-web-gratis': { status: 'published', datePublished: '2026-11-09T08:47:00-03:00' },
  'hosting-gratis-para-tu-negocio': { status: 'published', datePublished: '2026-11-09T08:47:00-03:00' },
};
