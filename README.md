# Fractal Host — sitio completo

Sitio Astro de Fractal Host. Incluye la portada, el cotizador, la página de migraciones y la sección nueva de páginas internas de sitios web y servicios.

## Desarrollo

```bash
npm install
npm run dev
```

Para revisar la versión estática:

```bash
npm run build
npm run preview
```

## Páginas nuevas

### Sitios web

- `/sitios-web/` — hub y comparador de los 8 tipos.
- `/sitios-web/micrositio/`
- `/sitios-web/one-page/`
- `/sitios-web/sitio-corporativo/`
- `/sitios-web/tienda-online/`
- `/sitios-web/eventos-y-entradas/`
- `/sitios-web/reserva-de-horas/`
- `/sitios-web/sitio-inmobiliario/`
- `/sitios-web/sitio-a-medida/`

### Servicios

- `/servicios/` — hub de servicios.
- `/hosting-global/`
- `/hosting-cono-sur/`
- `/correo-corporativo/`
- `/mantencion-web/`
- `/seguridad-informatica/`
- `/ley-21719/`
- `/migracion/`

### Revisión

- `/preview/` — índice interno de las páginas nuevas. No está enlazado desde el sitio, no está en el sitemap y lleva `noindex`.

## Modo borrador

En `src/config.ts`:

```ts
export const BORRADOR = true;
```

Con `true`:

- Las páginas nuevas llevan `noindex, nofollow`.
- No se agregan al `sitemap.xml`.
- Aparece la etiqueta “Borrador · Vista previa” en el hero.
- El índice `/preview/` queda disponible para revisión.

Para publicar, cambie a `false` y vuelva a compilar. Las páginas pasan a `index, follow`, se genera su `canonical` y se agregan al sitemap.

## Dónde se enlazan

- `src/components/Sitios.astro`: las tarjetas de la portada enlazan a cada página. La tarjeta “Micrositio y One Page” enlaza su título al hub y sus dos badges a cada ficha. También se agregó “Ver todos los tipos de sitio”.
- `src/components/Header.astro`: los megamenús de Hosting, Servicios y Sitios Web apuntan a las páginas nuevas. El menú móvil también.
- `src/components/Footer.astro`: columna de servicios actualizada y fila completa de “Sitios web”.

## Noticias y guías

La sección vive en `/noticias/` y en `/noticias/<slug>/`. Los 29 artículos están en `src/data/noticias-paquete.json`, que es la fuente principal. No se importan por separado los archivos `articulos/` ni `seo/` del paquete para evitar duplicados.

- `src/lib/noticias.ts`: normalización de rutas, estado editorial, fechas, categorías, destacadas y relacionadas.
- `src/lib/noticias-markdown.ts`: render del Markdown, eliminación del H1 y de la imagen interna duplicada, extracción de FAQ/relacionadas, IDs de encabezados y reescritura de enlaces.
- `src/data/noticias-estado.ts`: estado y fechas reales por artículo. Los 29 están publicados con fecha 9 de noviembre de 2026.
- `src/data/noticias-config.ts`: orden del carrusel (`NOTICIAS_DESTACADAS_IDS`) y categorías.
- `src/assets/noticias/portadas`: 29 portadas fuente.
- `src/assets/noticias/internas`: 29 infografías fuente.
- `public/imagenes/noticias/og`: portadas OG de 1200×675.
- `public/imagenes/noticias/internas/og`: infografías OG de 1200×675.

### Estado actual y publicación

Las 29 noticias están publicadas e indexables. La fecha de publicación es la real del 9 de noviembre de 2026.

En `src/config.ts`:

```ts
export const NOTICIAS_MODO_PREVIA = false;
```

Para despublicar un artículo, cambie su entrada en `src/data/noticias-estado.ts` a `status: 'draft'` o elimínela. Dejará de generarse como ruta pública y saldrá del sitemap.

Para revisar borradores antes de publicarlos, ponga `NOTICIAS_MODO_PREVIA = true`: las noticias visibles se generan con `noindex` y etiqueta “Borrador editorial”, sin entrar al sitemap. Vuelva a `false` al terminar.

### Imágenes y OG

Las imágenes visibles usan `Picture` de Astro con AVIF/WebP y anchos responsivos. La portada del artículo carga con prioridad; las tarjetas y la infografía usan carga diferida. Los OG se generan sin recortar el texto:

```bash
npm run og:noticias
```

### Pendientes editoriales

- `ley-21719-sitio-web`: revisar el contenido legal. Se publicó antes del 1 de diciembre de 2026; si se actualiza después de esa fecha, aplicar el título de actualización del paquete y el tiempo presente.
- `dominio-cl-precio-y-renovacion`: confirmar el precio comercial. La tarifa directa de NIC y la gestión de Fractal Host son cosas distintas.

### Voz

El cuerpo de los artículos se conserva tal como viene en el paquete, en “tú”. La interfaz, el menú, los CTA y las páginas de servicio están en “usted”. El cambio completo de los artículos a “usted” requiere una pasada editorial aparte.

### URLs

Se usa `/noticias/<slug>/` con barra final para que coincida con `/cotizador/` y `/sitios-web/.../`. El slug se conserva; solo se normaliza la barra para evitar redirecciones y canónicas contradictorias.

## Dónde editar el contenido

- `src/data/paginas-sitios.ts`: contenido de las 8 fichas de sitios web.
- `src/data/paginas-servicios.ts`: contenido de los 7 servicios.
- `src/data/planes.ts`: planes y precios de hosting.
- `src/styles/paginas.css`: estilos de las páginas nuevas, maquetas y componentes.
- `src/pages/sitios-web/index.astro` y `src/pages/servicios/index.astro`: hubs.
- `src/pages/[slug].astro` y `src/pages/sitios-web/[slug].astro`: plantillas de las fichas.
- `src/layouts/PageLayout.astro`: layout de las páginas nuevas, con el header, footer, cookies y modales del sitio.

## Pruebas

```bash
npm run check
npm run build
```

Los scripts de `scripts/` permiten revisar páginas, enlaces, datos estructurados e interacciones con Chrome. Por defecto esperan el sitio en `http://localhost:4323`; puede cambiar la URL con `BASE_URL`.

## Despliegue en cPanel

El zip de despliegue generado está en:

```text
C:\Users\Ariel\Downloads\fractalhost-despliegue-cpanel-2026-11-08.zip
```

Siga el `LEEME-cPanel.txt` de la carpeta de despliegue:

1. Haga respaldo de `public_html`.
2. Borre la carpeta `_astro/` antigua.
3. Suba y extraiga el zip en `public_html`.
4. No borre `enviar.php` ni la carpeta `PHPMailer/`; no vienen en el zip y deben seguir en el servidor.
5. Verifique el home, el cotizador, las páginas nuevas y el formulario de contacto.

El repositorio de origen es `https://github.com/fractal-865/fractalweb`. GitHub Pages se usa como staging; cPanel es producción.
