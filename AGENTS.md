## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Contexto Fractal Host

Este sitio es la réplica de https://fractalhost.cl/ (Astro 7 + Tailwind 4). Staging en GitHub Pages con cada push a `main`.

**Contexto corporativo completo (documento interno, fuera del repo):** leer
`C:\Users\Ariel\Mi unidad\Fractal Host\Contexto\0 Información Corporativa - Fractal Host Consolidado.md`
antes de tareas de copy, contenido, diseño o auditoría. Nunca copiar ese archivo ni su contenido al repo.

### Reglas duras

- El repo es **público**: no commitear datos financieros ni identificativos (RUT, cuenta bancaria, costos y márgenes de planes), credenciales ni el nombre del panel de facturación/venta.
- Jamás mostrar en contenido público el nombre del software de facturación/venta que usamos: el carrito es "nuestro carrito de compra".
- Las referencias internas de calibración de tono (otras marcas) nunca se nombran en contenido para clientes.
- Precios y datos de planes: solo los que ya están publicados en el sitio; ante dudas, reportar en vez de corregir.

### Tono de marca

- Voz en "nosotros". Frases cortas y directas con ritmo irregular; nunca frases tipo IA ("en el mundo digital actual", "desbloquea tu potencial", "soluciones a la medida de tus necesidades").
- Transmite siempre que resuelve una persona real y capaz: "hablas con quien administra tu hosting", no "contamos con un equipo de soporte".
- El lector no asume conocimiento técnico. Público: pymes y empresarios desde los 30-40 años en adelante; sin lenguaje "startup".
- Idea central: **simplificamos lo complicado**; somos el intermediario que hace que Internet funcione sin fricción.
- Patagonia como textura/forma abstracta, nunca cliché turístico. Eslogan: "Patagonia conectada".

### Identidad visual

- Paleta: cian `#00F0FF`, verde azulado `#00D6C2`, azul `#2563EB`, noche `#0B1220`, marino `#111A2B`, blanco hielo `#E6F0F7`. Cian de titulares con contraste AA: `#00747F`.
- Tipografía: Montserrat (títulos) y Roboto (cuerpo), autoalojadas (sin Google Fonts).
- Iconografía SVG lineal, stroke 1.5-2 px, base 24 px. Dark mode predominante, glow/neon moderado, animaciones 200-400 ms ease-in-out.

### Oferta pública (debe coincidir con el sitio)

- Hosting Global cPanel: planes Starter / Pro / Master (9 en total, $39.990 a $259.990 CLP/año, valor líquido).
- Hosting Nacional Cono Sur (Panel Ferozo): Austral, Glaciar, Fiordo y Fiordo Extra ($49.990 a $129.990 CLP/año).
- Sitios web (1 año de hosting + dominio .cl gratis), correo corporativo, mantención web, seguridad y recuperación ante hackeos, migración gratis, adecuación Ley 21.719.
- Contacto: hola@fractalhost.cl · WhatsApp +56 9 5413 2014 · Punta Arenas, Chile.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
