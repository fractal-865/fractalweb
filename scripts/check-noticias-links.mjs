import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');
const files = [];
const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.html') && full.includes(`${path.sep}noticias${path.sep}`)) files.push(full);
  }
};
walk(path.join(dist, 'noticias'));

const links = new Set();
for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  for (const match of html.matchAll(/(?:href|src)="(\/[^"]*)"/g)) {
    links.add(match[1].split('#')[0]);
  }
}

const resolve = (url) => {
  const clean = url.split('?')[0];
  if (clean.startsWith('/_astro/')) return path.join(dist, clean.replace(/^\//, ''));
  if (clean === '/') return path.join(dist, 'index.html');
  if (clean.endsWith('/')) return path.join(dist, clean.replace(/^\//, ''), 'index.html');
  const direct = path.join(dist, clean.replace(/^\//, ''));
  if (fs.existsSync(direct)) return direct;
  return path.join(dist, clean.replace(/^\//, ''), 'index.html');
};

const bad = [];
for (const link of [...links].sort()) {
  if (!fs.existsSync(resolve(link))) bad.push(link);
}
console.log(JSON.stringify({ files: files.length, links: links.size, bad }, null, 2));
