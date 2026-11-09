import fs from 'node:fs';
import path from 'node:path';

const dir = path.resolve('dist/noticias');
const slugs = fs.readdirSync(dir, { withFileTypes: true }).filter(e => e.isDirectory()).map(e => e.name);
const rows = [];
for (const slug of slugs) {
  const file = path.join(dir, slug, 'index.html');
  if (!fs.existsSync(file)) continue;
  const html = fs.readFileSync(file, 'utf8');
  const title = (html.match(/<title>(.*?)<\/title>/) || [])[1] || '';
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
  const h1s = [...html.matchAll(/<h1[^>]*>(.*?)<\/h1>/g)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  const figures = (html.match(/class="article-figure"/g) || []).length;
  const faqs = (html.match(/class="article-faq__item"/g) || []).length;
  const related = (html.match(/class="noticia-card noticia-card--compact/g) || []).length;
  const draft = html.includes('noticia-draft-pill');
  const robots = (html.match(/<meta name="robots" content="([^"]*)"/) || [])[1] || '';
  rows.push({ slug, title, desc, h1s: h1s.length, h1: h1s[0], figures, faqs, related, draft, robots, titleLen: title.length, descLen: desc.length });
}
const dupTitles = rows.filter((r, i) => rows.findIndex(x => x.title === r.title) !== i).map(r => r.slug);
const dupDesc = rows.filter((r, i) => rows.findIndex(x => x.desc === r.desc) !== i).map(r => r.slug);
const problems = rows.filter(r => r.h1s !== 1 || r.figures !== 1 || r.faqs < 1 || r.related < 1 || !r.draft || !r.robots.includes('noindex') || r.titleLen > 65 || r.descLen > 165);
console.log(JSON.stringify({ count: rows.length, dupTitles, dupDesc, problems, sample: rows[0] }, null, 2));
