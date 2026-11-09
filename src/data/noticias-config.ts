/**
 * Configuración editorial de noticias.
 *
 * `NOTICIAS_DESTACADAS_IDS` controla el orden del carrusel del inicio.
 * Cambie los IDs de esta lista para elegir qué noticias se muestran primero.
 * Si un artículo no está publicado, se omite automáticamente.
 */
export const NOTICIAS_DESTACADAS_IDS = [30, 28, 1, 2, 3, 4, 5, 6];

export type CategoriaNoticia = {
  name: string;
  slug: string;
};

export const CATEGORIAS_NOTICIAS: CategoriaNoticia[] = [
  { name: 'Sitios web', slug: 'sitios-web' },
  { name: 'Diseño web y UX', slug: 'diseno-web-y-ux' },
  { name: 'Mantención', slug: 'mantencion' },
  { name: 'Hosting', slug: 'hosting' },
  { name: 'Ciudades', slug: 'ciudades' },
  { name: 'Dominios', slug: 'dominios' },
  { name: 'Seguridad', slug: 'seguridad' },
  { name: 'Privacidad', slug: 'privacidad' },
  { name: 'Correo', slug: 'correo' },
];
