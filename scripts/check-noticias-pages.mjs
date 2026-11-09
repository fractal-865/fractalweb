import fs from 'node:fs';
import path from 'node:path';

const dir = path.resolve('dist/noticias');
const hub = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
const modoPrevia = /<meta name="robots" content="noindex/.test(hub);
const slugs = fs.readdirSync(dir, { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name);
const rows = [];
for (const slug of slugs) {
  const file = path.join(dir, slug, 'index.html');
  if (!fs.existsSync(file)) continue;
  const html = fs.readFileSync(file, 'utf8');
  const title = (html.match(/<title>(.*?)<\/title>/) || [])[1] || '';
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
  const h1s = [...html.matchAll(/<h1[^>]*>(.*?)<\/h1>/g)].map((m) => m[1].replace(/<[^>]+>/g, '').trim());
  const figures = (html.match(/class="article-figure"/g) || []).length;
  const faqs = (html.match(/class="article-faq__item"/g) || []).length;
  const related = (html.match(/class="noticia-card noticia-card--compact/g) || []).length;
  const draft = /<span class="noticia-draft-pill">/.test(html);
  const robots = (html.match(/<meta name="robots" content="([^"]*)"/) || [])[1] || '';
  const hasDate = /<time datetime="/.test(html);
  const fechaPorAsignar = /Fecha por asignar/.test(html);
  rows.push({
    slug,
    title,
    desc,
    h1s: h1s.length,
    h1: h1s[0],
    figures,
    faqs,
    related,
    draft,
    robots,
    hasDate,
    fechaPorAsignar,
    titleLen: title.length,
    descLen: desc.length,
  });
}
const dupTitles = rows.filter((r, i) => rows.findIndex((x) => x.title === r.title) !== i).map((r) => r.slug);
const dupDesc = rows.filter((r, i) => rows.findIndex((x) => x.desc === r.desc) !== i).map((r) => r.slug);
const problems = rows.filter(
  (r) =>
    r.h1s !== 1 ||
    r.figures !== 1 ||
    r.faqs < 1 ||
    r.related < 1 ||
    r.titleLen > 65 ||
    r.descLen > 165 ||
    r.robots.includes('noindex') !== modoPrevia
);
const stateProblems = rows.filter(
  (r) => r.draft !== modoPrevia || (modoPrevia ? false : r.fechaPorAsignar || !r.hasDate)
);
console.log(JSON.stringify({ modoPrevia, count: rows.length, dupTitles, dupDesc, problems, stateProblems, sample: rows[0] }, null, 2));
