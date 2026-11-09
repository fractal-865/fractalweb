import paquete from '../data/noticias-paquete.json';
import hubData from '../data/noticias-hub.json';
import { estadoNoticias } from '../data/noticias-estado';
import { CATEGORIAS_NOTICIAS, NOTICIAS_DESTACADAS_IDS, type CategoriaNoticia } from '../data/noticias-config';
import { NOTICIAS_MODO_PREVIA, SITE_URL } from '../config';

export interface Cover {
  source: string;
  url: string;
  path: string;
  alt: string;
  width: number;
  height: number;
  mimeType: string;
  originalFile: string;
}

export interface InternalImage {
  role: string;
  title: string;
  source: string;
  path: string;
  url: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  mimeType: string;
  placement: string;
}

export interface Heading {
  level: 2 | 3;
  text: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface RelatedRaw {
  id: number;
  path: string;
  label: string;
}

export interface RelatedItem extends RelatedRaw {
  href: string;
  title: string;
  category: string;
  excerpt: string;
  isPublished: boolean;
}

export interface Author {
  type: string;
  name: string;
  url: string;
}

export interface NoticiaRaw {
  id: number;
  status: string;
  publicationOrder: number;
  language: string;
  timezone: string;
  title: string;
  slug: string;
  path: string;
  canonical: string;
  category: string;
  searchIntent: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  seoTitle: string;
  metaDescription: string;
  excerpt: string;
  author: Author;
  datePublished: string | null;
  dateModified: string | null;
  preparedAt: string;
  robotsDraft: string;
  robotsPublished: string;
  cover: Cover;
  openGraph: Record<string, unknown>;
  twitter: Record<string, unknown>;
  headings: Heading[];
  faq: Faq[];
  related: RelatedRaw[];
  sourceIds: string[];
  contentFile: string;
  seoFile: string;
  structuredData: Record<string, unknown>;
  wordCount: number;
  markdown: string;
  internalImages: InternalImage[];
  freshness?: Record<string, unknown>;
}

export interface Noticia {
  id: number;
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  excerpt: string;
  category: string;
  categorySlug: string;
  author: Author;
  status: 'draft' | 'published';
  isPublished: boolean;
  datePublished: string | null;
  dateModified: string | null;
  path: string;
  canonical: string;
  url: string;
  cover: Cover & { ogPath: string; ogUrl: string };
  internalImage: InternalImage & { ogPath: string; ogUrl: string };
  headings: Heading[];
  faq: Faq[];
  related: RelatedRaw[];
  wordCount: number;
  readingTime: number;
  markdown: string;
  searchText: string;
  publicationOrder: number;
  primaryKeyword: string;
  secondaryKeywords: string[];
}

export interface HubNoticias {
  path: string;
  canonical: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  intro: string;
  categories: string[];
  onlyPublished: boolean;
  featuredIds: number[];
  note: string;
}

export const hubNoticias = hubData as HubNoticias;

export const normalizeText = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

export const categorySlug = (name: string) =>
  CATEGORIAS_NOTICIAS.find((c) => c.name === name)?.slug ?? normalizeText(name).replace(/\s+/g, '-');

export const normalizeArticlePath = (path: string) => {
  const clean = path.replace(/^\/+|\/+$/g, '');
  const slug = clean.replace(/^noticias\//, '');
  return `/noticias/${slug}/`;
};

export const absoluteUrl = (path: string) => `${SITE_URL}${path}`;

export const parseFecha = (value: string | null | undefined): Date | null => {
  if (!value) return null;
  const iso = value.length === 10 ? `${value}T12:00:00-03:00` : value;
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? null : date;
};

export const formatFecha = (value: string | null | undefined): string => {
  const date = parseFecha(value);
  if (!date) return '';
  return new Intl.DateTimeFormat('es-CL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'America/Punta_Arenas',
  }).format(date);
};

export const dateTimeAttribute = (value: string | null | undefined): string => {
  const date = parseFecha(value);
  return date ? date.toISOString() : '';
};

const raw = (paquete as unknown as { articles: NoticiaRaw[] }).articles;

const buildNoticia = (article: NoticiaRaw): Noticia => {
  const override = estadoNoticias[article.slug];
  const status: 'draft' | 'published' =
    override?.status ?? (article.status === 'published' ? 'published' : 'draft');
  const datePublished = override?.datePublished ?? article.datePublished ?? null;
  const dateModified = override?.dateModified ?? article.dateModified ?? null;
  const publishedDate = parseFecha(datePublished);
  const isPublished = status === 'published' && !!publishedDate && publishedDate.getTime() <= Date.now();
  const path = normalizeArticlePath(article.path);
  const cover = {
    ...article.cover,
    ogPath: `/imagenes/noticias/og/${article.slug}.jpg`,
    ogUrl: `${SITE_URL}/imagenes/noticias/og/${article.slug}.jpg`,
  };
  const internal = article.internalImages[0];
  const internalImage = {
    ...internal,
    ogPath: `/imagenes/noticias/internas/og/${article.slug}-explicacion.jpg`,
    ogUrl: `${SITE_URL}/imagenes/noticias/internas/og/${article.slug}-explicacion.jpg`,
  };
  const searchText = normalizeText(
    [
      article.title,
      article.excerpt,
      article.category,
      article.primaryKeyword,
      ...article.secondaryKeywords,
    ].join(' ')
  );

  return {
    id: article.id,
    slug: article.slug,
    title: article.title,
    seoTitle: article.seoTitle,
    metaDescription: article.metaDescription,
    excerpt: article.excerpt,
    category: article.category,
    categorySlug: categorySlug(article.category),
    author: article.author,
    status,
    isPublished,
    datePublished,
    dateModified,
    path,
    canonical: absoluteUrl(path),
    url: absoluteUrl(path),
    cover,
    internalImage,
    headings: article.headings,
    faq: article.faq,
    related: article.related.map((item) => ({
      ...item,
      path: normalizeArticlePath(item.path),
    })),
    wordCount: article.wordCount,
    readingTime: Math.max(1, Math.round(article.wordCount / 200)),
    markdown: article.markdown,
    searchText,
    publicationOrder: article.publicationOrder,
    primaryKeyword: article.primaryKeyword,
    secondaryKeywords: article.secondaryKeywords,
  };
};

export const noticias: Noticia[] = raw
  .map(buildNoticia)
  .sort((a, b) => a.publicationOrder - b.publicationOrder);

export const noticiasPublicadas: Noticia[] = noticias
  .filter((n) => n.isPublished)
  .sort((a, b) => {
    const da = parseFecha(a.datePublished)?.getTime() ?? 0;
    const db = parseFecha(b.datePublished)?.getTime() ?? 0;
    if (db !== da) return db - da;
    return a.publicationOrder - b.publicationOrder;
  });

export const noticiasVisibles: Noticia[] = NOTICIAS_MODO_PREVIA ? noticias : noticiasPublicadas;

export const getNoticiaBySlug = (slug: string) => noticias.find((n) => n.slug === slug);

export const getNoticiaByPath = (path: string) => {
  const normalized = normalizeArticlePath(path);
  return noticias.find((n) => n.path === normalized);
};

export const getCategorias = (): Array<CategoriaNoticia & { count: number }> => {
  const source = NOTICIAS_MODO_PREVIA ? noticias : noticiasPublicadas;
  return CATEGORIAS_NOTICIAS.map((categoria) => ({
    ...categoria,
    count: source.filter((n) => n.category === categoria.name).length,
  }));
};

const dedupe = (items: Noticia[]) => {
  const seen = new Set<number>();
  return items.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
};

export const getDestacadas = (limit = 8): Noticia[] => {
  const source = NOTICIAS_MODO_PREVIA ? noticias : noticiasPublicadas;
  const byId = new Map(source.map((n) => [n.id, n]));
  const selected = NOTICIAS_DESTACADAS_IDS.map((id) => byId.get(id)).filter(
    (n): n is Noticia => Boolean(n)
  );
  if (selected.length < limit) {
    for (const noticia of source) {
      if (selected.length >= limit) break;
      if (!selected.some((item) => item.id === noticia.id)) selected.push(noticia);
    }
  }
  return dedupe(selected).slice(0, limit);
};

export const getRelacionadas = (noticia: Noticia, limit = 3): Noticia[] => {
  const source = NOTICIAS_MODO_PREVIA ? noticias : noticiasPublicadas;
  const byId = new Map(source.map((n) => [n.id, n]));
  const byPath = new Map(source.map((n) => [n.path, n]));
  const selected = noticia.related
    .map((item) => byId.get(item.id) ?? byPath.get(item.path))
    .filter((n): n is Noticia => Boolean(n) && n!.id !== noticia.id);
  if (selected.length >= limit) return dedupe(selected).slice(0, limit);
  const sameCategory = source.filter(
    (n) => n.category === noticia.category && n.id !== noticia.id
  );
  const rest = source.filter(
    (n) => n.category !== noticia.category && n.id !== noticia.id
  );
  return dedupe([...selected, ...sameCategory, ...rest]).slice(0, limit);
};

export const getCtaForNoticia = (noticia: Noticia) => {
  const map: Record<string, { title: string; text: string; href: string; label: string }> = {
    'Sitios web': {
      title: '¿Necesita un sitio web que le traiga consultas?',
      text: 'Revisamos su caso y le proponemos el tipo de sitio y el alcance que necesita.',
      href: '/sitios-web/',
      label: 'Ver tipos de sitio',
    },
    'Mantención': {
      title: '¿Su sitio necesita mantención?',
      text: 'Actualizaciones, respaldos, monitoreo y soporte directo para su WordPress.',
      href: '/mantencion-web/',
      label: 'Ver mantención web',
    },
    Hosting: {
      title: '¿Necesita revisar su hosting o migrar su sitio?',
      text: 'Le ayudamos a elegir el plan y a mover su sitio y correos sin cortes.',
      href: '/hosting-global/',
      label: 'Ver hosting',
    },
    Ciudades: {
      title: '¿Está en la Patagonia y necesita presencia online?',
      text: 'Trabajamos de forma remota con todo Chile, con atención directa desde Punta Arenas.',
      href: '/sitios-web/',
      label: 'Ver sitios web',
    },
    Dominios: {
      title: '¿Necesita registrar o renovar su dominio?',
      text: 'Le orientamos con el registro, la renovación y la configuración de su dominio .cl.',
      href: '/servicios/',
      label: 'Ver servicios',
    },
    Seguridad: {
      title: '¿Su sitio fue hackeado o marcado como peligroso?',
      text: 'Revisamos el caso, desinfectamos el sitio y reforzamos la seguridad.',
      href: '/seguridad-informatica/',
      label: 'Ver seguridad informática',
    },
    Privacidad: {
      title: '¿Necesita revisar la privacidad de su sitio?',
      text: 'Política, cookies y formularios son parte de la adecuación técnica a la Ley 21.719.',
      href: '/ley-21719/',
      label: 'Ver Ley 21.719',
    },
    Correo: {
      title: '¿Quiere correo con el dominio de su empresa?',
      text: 'Configuramos sus cuentas y las dejamos funcionando en Gmail, Outlook o su celular.',
      href: '/correo-corporativo/',
      label: 'Ver correo corporativo',
    },
  };
  return (
    map[noticia.category] ?? {
      title: '¿Necesita ayuda con su presencia online?',
      text: 'Cuéntenos qué necesita y le orientamos con el siguiente paso.',
      href: '/servicios/',
      label: 'Ver servicios',
    }
  );
};
