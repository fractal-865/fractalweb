/**
 * Estado editorial de las noticias.
 *
 * El paquete llega con los 29 artículos en `draft` y sin fechas.
 * Para publicar uno, agregue su slug con `status: 'published'` y una fecha
 * real en formato ISO 8601 con zona horaria, por ejemplo:
 *
 * 'que-es-un-hosting': {
 *   status: 'published',
 *   datePublished: '2026-11-15T10:00:00-03:00',
 * },
 *
 * No use la fecha de preparación del paquete como fecha de publicación.
 * Si el artículo se revisa después, agregue `dateModified` con la fecha real
 * de esa revisión.
 *
 * Pendientes editoriales:
 * - `ley-21719-sitio-web`: revisar el texto legal y, si se publica desde el
 *   1 de diciembre de 2026, aplicar el título de actualización del paquete.
 * - `dominio-cl-precio-y-renovacion`: confirmar el precio comercial antes de
 *   publicar. La tarifa directa de NIC y la gestión de Fractal Host son cosas
 *   distintas.
 */
export type EstadoNoticia = {
  status: 'draft' | 'published';
  datePublished?: string;
  dateModified?: string;
};

export const estadoNoticias: Record<string, EstadoNoticia> = {
  // Todos comienzan en borrador. Complete aquí los que apruebe.
};
