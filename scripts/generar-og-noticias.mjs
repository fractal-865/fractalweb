import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const dataPath = path.join(root, 'src/data/noticias-paquete.json');
const outCovers = path.join(root, 'public/imagenes/noticias/og');
const outInternals = path.join(root, 'public/imagenes/noticias/internas/og');

const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
fs.mkdirSync(outCovers, { recursive: true });
fs.mkdirSync(outInternals, { recursive: true });

const render = async (input, output) => {
  await sharp(input)
    .resize(1200, 675, {
      fit: 'contain',
      background: { r: 7, g: 17, b: 32, alpha: 1 },
    })
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(output);
};

const firstExisting = (base, name) => {
  for (const ext of ['avif', 'png', 'jpg', 'jpeg', 'webp']) {
    const candidate = path.join(base, `${name}.${ext}`);
    if (fs.existsSync(candidate)) return candidate;
  }
  return null;
};

let covers = 0;
let internals = 0;
for (const article of data.articles) {
  const coverInput = firstExisting(path.join(root, 'src/assets/noticias/portadas'), article.slug);
  const coverOutput = path.join(outCovers, `${article.slug}.jpg`);
  if (coverInput) {
    await render(coverInput, coverOutput);
    covers += 1;
  }

  const internalInput = firstExisting(
    path.join(root, 'src/assets/noticias/internas'),
    `${article.slug}-explicacion`
  );
  const internalOutput = path.join(outInternals, `${article.slug}-explicacion.jpg`);
  if (internalInput) {
    await render(internalInput, internalOutput);
    internals += 1;
  }
}

console.log(JSON.stringify({ covers, internals }, null, 2));
