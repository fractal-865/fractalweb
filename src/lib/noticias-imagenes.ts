import type { ImageMetadata } from 'astro';

const portadasPng = import.meta.glob('../assets/noticias/portadas/*.png', {
  eager: true,
  import: 'default',
}) as Record<string, ImageMetadata>;

const portadasAvif = import.meta.glob('../assets/noticias/portadas/*.avif', {
  eager: true,
  import: 'default',
}) as Record<string, ImageMetadata>;

const internasPng = import.meta.glob('../assets/noticias/internas/*.png', {
  eager: true,
  import: 'default',
}) as Record<string, ImageMetadata>;

const internasAvif = import.meta.glob('../assets/noticias/internas/*.avif', {
  eager: true,
  import: 'default',
}) as Record<string, ImageMetadata>;

const portadas = { ...portadasPng, ...portadasAvif };
const internas = { ...internasPng, ...internasAvif };

export const getPortada = (slug: string): ImageMetadata | undefined =>
  portadas[`../assets/noticias/portadas/${slug}.avif`] ??
  portadas[`../assets/noticias/portadas/${slug}.png`];

export const getImagenInterna = (slug: string): ImageMetadata | undefined =>
  internas[`../assets/noticias/internas/${slug}-explicacion.avif`] ??
  internas[`../assets/noticias/internas/${slug}-explicacion.png`];
