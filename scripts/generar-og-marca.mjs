import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const source = path.join(root, 'src/assets/marca/logo-fractal-host.png');
const output = path.join(root, 'public/og-fractal-host.jpg');

const WIDTH = 1200;
const HEIGHT = 630;
const LOGO_HEIGHT = 410;

const trimmed = await sharp(source).trim({ threshold: 1 }).toBuffer({ resolveWithObject: true });
const ratio = trimmed.info.width / trimmed.info.height;
const logoWidth = Math.round(LOGO_HEIGHT * ratio);
const logo = await sharp(trimmed.data).resize({ height: LOGO_HEIGHT }).png().toBuffer();

const background = `
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#050B14"/>
      <stop offset="0.55" stop-color="#081422"/>
      <stop offset="1" stop-color="#0A1A33"/>
    </linearGradient>
    <radialGradient id="glowCyan" cx="0.12" cy="1" r="0.85">
      <stop offset="0" stop-color="#00E5FF" stop-opacity="0.20"/>
      <stop offset="1" stop-color="#00E5FF" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowBlue" cx="0.95" cy="0" r="0.7">
      <stop offset="0" stop-color="#1B74E4" stop-opacity="0.28"/>
      <stop offset="1" stop-color="#1B74E4" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="logoGlow" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#00E5FF" stop-opacity="0.24"/>
      <stop offset="1" stop-color="#00E5FF" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="gridMask" cx="0.5" cy="0.45" r="0.78">
      <stop offset="0" stop-color="#fff" stop-opacity="0.9"/>
      <stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="54" height="54" patternUnits="userSpaceOnUse">
      <path d="M54 0H0V54" fill="none" stroke="#00E5FF" stroke-opacity="0.075" stroke-width="1"/>
    </pattern>
    <mask id="gridMaskRect"><rect width="${WIDTH}" height="${HEIGHT}" fill="url(#gridMask)"/></mask>
    <radialGradient id="vignette" cx="0.5" cy="0.45" r="0.75">
      <stop offset="0.55" stop-color="#04070D" stop-opacity="0"/>
      <stop offset="1" stop-color="#04070D" stop-opacity="0.55"/>
    </radialGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glowCyan)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glowBlue)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#grid)" mask="url(#gridMaskRect)"/>
  <ellipse cx="${WIDTH / 2}" cy="${HEIGHT / 2 - 10}" rx="330" ry="215" fill="url(#logoGlow)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#vignette)"/>
  <rect x="0" y="${HEIGHT - 3}" width="${WIDTH}" height="3" fill="#00E5FF" opacity="0.7"/>
</svg>`;

await sharp(Buffer.from(background))
  .composite([
    {
      input: logo,
      left: Math.round((WIDTH - logoWidth) / 2),
      top: Math.round((HEIGHT - LOGO_HEIGHT) / 2) - 8,
    },
  ])
  .jpeg({ quality: 90, mozjpeg: true })
  .toFile(output);

console.log(JSON.stringify({ output, width: WIDTH, height: HEIGHT, logo: { w: logoWidth, h: LOGO_HEIGHT }, bytes: (await sharp(output).metadata()).size }, null, 2));
