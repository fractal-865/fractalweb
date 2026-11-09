import { marked } from 'marked';
import { base } from './url';
import { getNoticiaBySlug, normalizeArticlePath, type Noticia } from './noticias';
import { NOTICIAS_MODO_PREVIA } from '../config';

export interface TocItem {
  id: string;
  text: string;
}

export interface RenderedNoticia {
  introHtml: string;
  bodyHtml: string;
  toc: TocItem[];
}

const stripTags = (value: string) =>
  value
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

export const slugifyHeading = (value: string) =>
  stripTags(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'seccion';

const removeInternalFigure = (markdown: string, internalPath: string) => {
  const lines = markdown.split('\n');
  const output: string[] = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes(internalPath) && /!\[[^\]]*\]\([^)]*\)/.test(line)) {
      let next = i + 1;
      while (next < lines.length && lines[next].trim() === '') next++;
      if (
        next < lines.length &&
        lines[next].trim().startsWith('*') &&
        lines[next].trim().endsWith('*')
      ) {
        i = next;
      }
      continue;
    }
    output.push(line);
  }
  return output.join('\n');
};

const addHeadingIds = (html: string) => {
  const headings: Array<TocItem & { level: number }> = [];
  const seen = new Map<string, number>();
  const processed = html.replace(/<h([23])>([\s\S]*?)<\/h\1>/g, (_match, level: string, inner: string) => {
    const text = stripTags(inner);
    const baseId = slugifyHeading(text);
    const count = seen.get(baseId) ?? 0;
    const id = count === 0 ? baseId : `${baseId}-${count + 1}`;
    seen.set(baseId, count + 1);
    headings.push({ id, text, level: Number(level) });
    return `<h${level} id="${id}">${inner}</h${level}>`;
  });
  return { html: processed, headings };
};

const rewriteLinks = (html: string) =>
  html.replace(/<a\s+href="([^"]+)"([^>]*)>([\s\S]*?)<\/a>/g, (_match, href: string, attrs: string, inner: string) => {
    const cleanHref = href.trim();
    const articleMatch = cleanHref.match(/^\/noticias\/([^/#?]+)\/?$/);
    if (articleMatch) {
      const target = getNoticiaBySlug(articleMatch[1]);
      const available = NOTICIAS_MODO_PREVIA || Boolean(target?.isPublished);
      if (!available) {
        return `<span class="article-link-unavailable">${inner}</span>`;
      }
      return `<a href="${base}${normalizeArticlePath(cleanHref)}"${attrs}>${inner}</a>`;
    }
    if (cleanHref.startsWith('http://') || cleanHref.startsWith('https://')) {
      return `<a href="${cleanHref}"${attrs} target="_blank" rel="noopener noreferrer">${inner}</a>`;
    }
    if (cleanHref.startsWith('/')) {
      return `<a href="${base}${cleanHref}"${attrs}>${inner}</a>`;
    }
    return `<a href="${cleanHref}"${attrs}>${inner}</a>`;
  });

const markInlineCta = (html: string) =>
  html.replace(
    /<p>((?:(?!<\/p>)[\s\S])*?wa\.me(?:(?!<\/p>)[\s\S])*?)<\/p>/g,
    '<p class="article-inline-cta">$1</p>'
  );

export const renderNoticia = (noticia: Noticia): RenderedNoticia => {
  let markdown = noticia.markdown.replace(/^#\s+.*(?:\r?\n)+/, '');
  markdown = removeInternalFigure(markdown, noticia.internalImage.path);

  const firstH2 = markdown.search(/^##\s+/m);
  let intro = firstH2 >= 0 ? markdown.slice(0, firstH2).trim() : markdown.trim();
  let body = firstH2 >= 0 ? markdown.slice(firstH2).trim() : '';

  const faqIndex = body.search(/^##\s+Preguntas frecuentes\s*$/m);
  if (faqIndex >= 0) body = body.slice(0, faqIndex).trim();
  const relatedIndex = body.search(/^##\s+Lecturas relacionadas\s*$/m);
  if (relatedIndex >= 0) body = body.slice(0, relatedIndex).trim();

  const introHtml = markInlineCta(rewriteLinks(marked.parse(intro, { async: false, gfm: true }) as string));
  const bodyRender = addHeadingIds(
    markInlineCta(rewriteLinks(marked.parse(body, { async: false, gfm: true }) as string))
  );
  const bodyHtml = bodyRender.html;
  const toc = bodyRender.headings
    .filter((heading) => heading.level === 2)
    .map(({ id, text }) => ({ id, text }));

  return { introHtml, bodyHtml, toc };
};
