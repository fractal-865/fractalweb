import type { ImageMetadata } from 'astro';

const portadas = import.meta.glob('../assets/noticias/portadas/*.png', {
  eager: true,
  import: 'default',
}) as Record<string, ImageMetadata>;

const internas = import.meta.glob('../assets/noticias/internas/*.png', {
  eager: true,
  import: 'default',
}) as Record<string, ImageMetadata>;

export const getPortada = (slug: string): ImageMetadata | undefined =>
  portadas[`../assets/noticias/portadas/${slug}.png`];

export const getImagenInterna = (slug: string): ImageMetadata | undefined =>
  internas[`../assets/noticias/internas/${slug}-explicacion.png`];
