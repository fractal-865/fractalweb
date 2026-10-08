---
name: Fractal Host
description: Sistema visual de Fractal Host — infraestructura técnica con acento patagónico, cian de sistema y amarillo de acción.
colors:
  primary: "#00E5FF"
  primary-deep: "#00747F"
  focus-ring: "#00A9C4"
  primary-on-dark: "#6FE6FF"
  primary-ink: "#03222D"
  secondary: "#FFE600"
  secondary-hover: "#EFD700"
  secondary-on-light: "#8A6D00"
  ink: "#111318"
  night: "#04070D"
  night-soft: "#071120"
  surface-dark: "#0E1522"
  card-dark: "#141C2C"
  page: "#EBEBEB"
  page-soft: "#F7F8FA"
  text: "#2B2F36"
  text-on-dark: "#EDF2F8"
  muted: "#5F6B7A"
  muted-on-dark: "#A7B4C2"
  line: "#E3E6EA"
  line-on-dark: "rgba(255,255,255,0.10)"
  input: "#EAF3FB"
  input-dark: "#0F1725"
  success: "#12A150"
  success-deep: "#0F7A3D"
  live: "#22E6A8"
  whatsapp: "#25D366"
typography:
  display:
    fontFamily: "Montserrat, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.7rem, 3.8vw, 2.8rem)"
    fontWeight: 800
    lineHeight: 1.25
    letterSpacing: "0.02em"
  headline:
    fontFamily: "Montserrat, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 800
    lineHeight: 1.375
  title:
    fontFamily: "Montserrat, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.2rem"
    fontWeight: 800
    lineHeight: 1.35
    letterSpacing: "0.05em"
  body:
    fontFamily: "Roboto, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.02rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Montserrat, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.74rem"
    fontWeight: 700
    lineHeight: 1.625
    letterSpacing: "0.22em"
  nav:
    fontFamily: "Montserrat, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 700
    letterSpacing: "0.12em"
  action:
    fontFamily: "Montserrat, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.98rem"
    fontWeight: 700
  button-sm:
    fontFamily: "Montserrat, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 800
    lineHeight: 1.625
rounded:
  md: "6.375px"
  lg: "8.5px"
  xl: "12.75px"
  2xl: "17px"
  3xl: "21.25px"
  full: "9999px"
spacing:
  xs: "12.75px"
  sm: "17px"
  md: "25.5px"
  lg: "29.75px"
  xl: "34px"
  2xl: "42.5px"
  3xl: "51px"
components:
  button-primary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.ink}"
    typography: "{typography.action}"
    rounded: "{rounded.md}"
    padding: "14.875px 42.5px"
  button-primary-hover:
    backgroundColor: "{colors.secondary-hover}"
    textColor: "{colors.ink}"
    typography: "{typography.action}"
    rounded: "{rounded.md}"
    padding: "14.875px 42.5px"
  button-cyan:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-ink}"
    typography: "{typography.button-sm}"
    rounded: "{rounded.md}"
    padding: "8.5px 15.3px"
  button-outline-dark:
    backgroundColor: "transparent"
    textColor: "#E6EDF5"
    typography: "{typography.action}"
    rounded: "{rounded.md}"
    padding: "14.875px 34px"
  input:
    backgroundColor: "{colors.input}"
    textColor: "{colors.text}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "12.75px 17px"
  card-plan:
    backgroundColor: "#FFFFFF"
    textColor: "{colors.text}"
    typography: "{typography.body}"
    rounded: "{rounded.2xl}"
    padding: "29.75px"
  chip-pill:
    backgroundColor: "rgba(255,255,255,0.10)"
    textColor: "#EAF1F8"
    typography: "{typography.body}"
    rounded: "{rounded.full}"
    padding: "8.5px 17px"
  nav-link:
    textColor: "#E6EDF5"
    typography: "{typography.nav}"
---

# Design System: Fractal Host

## Overview

**Creative North Star: "El Nodo Austral"**

Fractal Host se ve como un nodo de infraestructura encendido en la oscuridad de la Patagonia: fondo casi negro atravesado por nebulosas cian, una rejilla técnica de 54px que se desvanece hacia los bordes, y fotografía de montaña tratada como textura de datos — nunca como postal. La superficie es oscura donde la marca habla (barra superior, header, hero, pie) y clara donde el visitante lee y compara (planes, servicios, FAQ, contacto). Ese contraste — cromo siempre oscuro sobre cuerpo de contenido claro — es la firma estructural del sistema, y el modo oscuro completo no es una inversión de filtros sino una segunda paleta declarada token por token.

La densidad es alta y deliberada: tipografía en mayúsculas extrabold, tracking amplio, filas de datos con divisores capilares y medidores de ping que se animan al entrar en viewport. Nada flota por costumbre. La profundidad viene de gradientes radiales, ruido fractal y una rejilla enmascarada; la sombra aparece solo como respuesta a estado, y su versión cromática (glow cian o amarillo) es la que realmente comunica elevación sobre fondo oscuro.

Los dos acentos son ortogonales y no se disputan el mismo elemento: el cian es la voz del sistema (estado en vivo, enlaces, iconos, checklists) y el amarillo es la voz de la acción (contratar, cotizar, área de clientes). La marca es de Punta Arenas pero habla como infraestructura seria: precisión, cifras y latencia por encima de decoración.

**Key Characteristics:**

- Cromo fijo siempre oscuro (topbar + header de 70px + hero + footer) sobre cuerpo claro con modo oscuro completo.
- Dos acentos ortogonales: cian = sistema/estado, amarillo = acción/conversión.
- Montserrat extrabold en mayúsculas para toda la jerarquía; Roboto regular para lectura.
- Rejilla técnica, ruido fractal y nebulosas radiales como atmósfera de fondo.
- Glow de estado como única elevación; planas en reposo.
- Pills y chips de borde capilar conviven con cajas de 2xl (17px) — geometría mixta pero disciplinada.
- Formato de precio siempre con la leyenda de valor líquido en tamaño de nota al pie.

## Colors

La paleta es bicolor de acento sobre una base neutra neutro-fría que existe duplicada en dos versiones declaradas (claro y oscuro), sin inversiones automáticas.

### Primary

- **Signal Cyan** (#00E5FF): voz del sistema. Estados en vivo, iconos de feature, bordes de panel oscuro, glow, subrayados activos. Es el color que aparece en indicadores de ping, checklists y "Estado de servidores".
- **Deep Cyan** (`--color-cydeep`, #00747F): el único cian válido como **texto** sobre fondo claro — 5,1:1 sobre blanco, 5,0:1 sobre #F7F8FA, 4,6:1 sobre #EBEBEB (AA). Texto de enlace, kickers en modo claro, iconos de fila.
- **Cyan Focus** (#00A9C4): borde de foco de 3px y acento de checkboxes — **nunca texto** (solo 2,6:1 sobre fondo claro, documentado en `global.css`).
- **Bright Cyan on Dark** (#6FE6FF): equivalente del cian para fondo oscuro; es el color de los kickers y enlaces cuando el fondo es night.
- **Cyan Ink** (#03222D): texto sobre botón cian. El cian es demasiado luminoso para llevar texto blanco.

### Secondary

- **Voltage Yellow** (#FFE600): voz de la acción. CTA principal, badge "Más elegido", botón de área de clientes, ítem de cotizador, subrayado de slide activo. Su aparición siempre significa "aquí se convierte".
- **Voltage Yellow Hover** (#EFD700): estado hover del amarillo; se oscurece en lugar de brillar más.
- **Ochre on Light** (#8A6D00): el amarillo traducido a texto legible sobre fondo claro (ítems de cotizador en el megamenú). El amarillo puro jamás se usa como color de texto.

### Tertiary

- **Live Mint** (#22E6A8): latencia y estado "en vivo" — punto pulsante del estado de servidores, ahorro de precio en modo oscuro.
- **Success Green** (#12A150) / **Success Deep** (#0F7A3D): checks, badges de descuento (-6%, -12%) y confirmaciones; su par claro/oscuro.
- **WhatsApp Green** (#25D366): reservado exclusivamente al canal WhatsApp (botón flotante, anillo pulsante, texto hover).

### Neutral

- **Night** (#04070D): negro azulado base; fondo de cromo y pie.
- **Night Soft** (#071120): segunda capa de los gradientes del header y las ondas del hero.
- **Surface Dark** (#0E1522) / **Card Dark** (#141C2C): página y tarjeta en modo oscuro.
- **Page** (#EBEBEB) / **Page Soft** (#F7F8FA): cuerpo en modo claro. No es blanco: los cards son blancos y el fondo gris claro para que el borde capilar se lea.
- **Ink** (#111318): texto sobre amarillo y sobre cian.
- **Text** (#2B2F36) / **Text on Dark** (#EDF2F8): texto corrido claro/oscuro.
- **Muted** (#5F6B7A) / **Muted on Dark** (#A7B4C2): secundario, descripciones, notas al pie de precio.
- **Line** (#E3E6EA) / **Line on Dark** (rgba(255,255,255,0.10)): borde capilar de cards, inputs y divisores.
- **Input** (#EAF3FB) / **Input Dark** (#0F1725): relleno de campo de formulario, un tono frío por sobre el fondo para que el campo se note sin borde grueso.

### Named Rules

**The Signal Rule.** El cian habla del sistema y el amarillo habla de la acción, y nunca intercambian papeles. Si un elemento describe estado, latencia o característica, es cian; si un elemento pide una decisión de compra, es amarillo. Un screen puede tener varios cianes, pero el amarillo pleno se reserva a la acción primaria de esa pantalla.

**The Two-Palette Rule.** Cada token de color existe en versión clara y versión oscura declaradas (`text`/`text-on-dark`, `line`/`line-on-dark`, `input`/`input-dark`). No se invierte el modo claro con filtros ni opacidad: se cambia de token.

**The Ochre Translation Rule.** Sobre fondo claro, el amarillo nunca es texto: se traduce a Ochre on Light (#8A6D00) o se mantiene como relleno con texto Ink.

## Typography

**Display Font:** Montserrat (con ui-sans-serif, system-ui, sans-serif)
**Body Font:** Roboto (con ui-sans-serif, system-ui, sans-serif)
**Label/Mono Font:** no hay familia monoespaciada declarada; los bloques de datos y precios resuelven en Roboto dentro de la escala body.

**Character:** El emparejamiento es voz de comando sobre lectura neutra: Montserrat extrabold en mayúsculas da autoridad de infraestructura, y Roboto mantiene los bloques explicativos (destinados a lectores no técnicos) en calma y legibles. La raíz de `html` es 17px, por lo que toda la escala rem resulta ~6% mayor que el estándar.

### Hierarchy

- **Display** (800, clamp(1.7rem, 3.8vw, 2.8rem), 1.25): titular hero, en mayúsculas con `letter-spacing: 0.02em`, con drop-shadow sobre la foto y una palabra en amarillo con glow.
- **Headline** (800, 2.25rem, 1.375): `h2` de sección, mayúsculas. Es la escala de ancla de cada bloque de la página única.
- **Title** (800, 1.2rem, `letter-spacing: 0.05em`, mayúsculas): nombre de plan, títulos de panel; variantes a 1.08rem para tarjetas del megamenú.
- **Body** (400, 1.02rem, 1.625): texto corrido, descripciones de plan (0.9rem = 15.3px es el tamaño más usado del sitio) y notas legales (0.74rem).
- **Label / Kicker** (700, 0.74rem, `letter-spacing: 0.22em`, mayúsculas): antetítulo de sección, flanqueado por dos reglas de 34×2px del mismo color.
- **Nav** (700, 0.8rem, `letter-spacing: 0.12em`, mayúsculas): enlaces del header y del menú móvil.
- **Action** (700, 0.98rem, 1.45): texto de botón CTA.

### Named Rules

**The Command-Case Rule.** Toda jerarquía display (Display, Headline, Title, Nav, Kicker) va en mayúsculas con tracking positivo; el cuerpo va en caja normal y nunca compite. No hay titulares en mayúsculas mixtas ni itálicas de énfasis.

**The Liquid-Price Rule.** Todo precio en pesos se muestra con su leyenda de valor líquido debajo, en Roboto 0.74rem y color muted, sin excepción.

## Layout

El sistema es de página única con anclas: `scroll-padding-top: 132px` compensa el header fijo de dos niveles. El contenedor `.wrap` es de **máximo 1180px con ancho 92%**, centrado; todos los bloques de sección lo reutilizan sin variantes.

El cromo es fijo y de dos pisos: una topbar de 3.1rem que se contrae a 2.35rem al hacer scroll (con transiciones de 0.35s sobre altura, padding, font-size y tamaño de ícono), y una barra principal de 70px con degradado night→darksec, `backdrop-blur` y borde cian al 10%. El menú móvil entra deslizando desde `-130%` con scroll propio bajo `max-height: calc(100vh - 118px)`.

Rejilla de contenido: 1–4 columnas según sección (`sm 640px` / `md 768px` / `lg 1024px`); la navegación de escritorio colapsa bajo `lg`. Las tarjetas de plan corren en fila con la destacada primero incluso en móvil (`max-md:order-first`). El hero ocupa `min-height: 560px` de contenido sobre ~196px de padding superior (header) y 110px inferior.

Ritmo de espaciado derivado de la raíz 17px: 12.75 / 17 / 25.5 / 29.75 / 34 / 42.5 / 51px. Los bloques de sección respiran con padding vertical grande (el pie usa 68px superior); la densidad real está dentro de las tarjetas, no entre ellas.

## Elevation & Depth

**Filosofía: plano con glow de estado.** En reposo las superficies son planas — cards blancas con borde capilar sobre Page y una sombra tenue de dos capas (`0 2px 6px` + `0 14px 34px` a muy baja alfa). La sombra se mueve solo en respuesta a estado: al hacer hover la card se eleva y la sombra se profundiza. En modo oscuro casi toda sombra desaparece contra el fondo nocturno, así que la elevación real la carga el **glow cromático**: halo amarillo bajo los CTA, halo cian bajo el badge destacado y bajo los paneles featured.

La segunda fuente de profundidad no es sombra sino atmósfera: `radial-gradient` superpuestos, `backdrop-blur` en el header y las pills, una capa de ruido fractal al 5.5% de opacidad, una rejilla cian al 5% enmascarada con `radial-gradient`, y sombras *inset* masivas en el hero (`inset 0 40px 90px`) que hunden el centro de la imagen.

### Shadow Vocabulary

- **Card rest** (`box-shadow: 0 2px 6px rgba(4,7,13,.05), 0 14px 34px rgba(4,7,13,.08)`): reposo de toda tarjeta sobre fondo claro.
- **Card hover** (`0 6px 14px rgba(4,7,13,.08), 0 26px 60px rgba(4,7,13,.14)`): acompañado siempre a `translateY(-6px)`.
- **Featured glow** (`0 8px 20px rgba(0,169,196,.16), 0 24px 60px rgba(0,169,196,.18)`): plan destacado; el glow es cian porque el destacado es decisión de comparación, no de compra todavía.
- **Action glow** (`0 6px 20px rgba(255,230,0,.28)` hero / `0 4px 16px rgba(255,230,0,.45)` compacto): bajo cada CTA amarillo.
- **Cyan glow** (`0 4px 16px rgba(0,229,255,.35)`): bajo el botón cian y el badge "Más elegido".
- **Panel lift** (`0 30px 80px rgba(4,7,13,.35), 0 4px 18px rgba(4,7,13,.15)`): megamenú flotante.
- **Chrome shadow** (`0 10px 40px rgba(0,0,0,.45)`): barra de navegación fija.

### Named Rules

**The Flat-By-Default Rule.** Ninguna superficie lleva sombra permanente fuerte en reposo. Toda sombra o glow es una respuesta a estado (hover, foco, destacado) o una señal de jerarquía (panel flotante, cromo fijo).

## Shapes

La geometría es mixta pero jerárquica: **cajas para lo que se compara, píldoras para lo que se pulsa o se etiqueta**. Los contenedores de contenido usan 17px (tarjetas de plan, spotlight, modales) o 12.75px (tarjetas del megamenú, mapas, campos grandes); los controles y micro-elementos usan 6.375–8.5px; y todo lo que es etiqueta, badge, chip, punto de slider o enlace secundario es píldora completa (9999px).

Los bordes son siempre capilares: 1px `Line` en modo claro y `line-on-dark` en oscuro, con dos exceiones semánticas — 2px amarillo para el botón de contorno y para la tarjeta featured, y 3px de subrayado cian/amarillo para el elemento activo de navegación. El foco global es un contorno de 3px en Deep Cyan con `outline-offset: 2px` y radio 4px.

Formas recurrentes: el antetítulo flanqueado por reglas de 34×2px; las ondas de montaña del hero en tres capas SVG (`#0A1A33` / `#071120` / `#04070D`) que cierran la sección oscura; la flecha-diamante del megamenú (cuadrado de 14px rotado 45° con dos bordes capilares); la flecha de tooltip rotada 45°; y la flecha de gradiente cian→amarillo (`90deg` o `180deg`) que marca la línea de tiempo y el drop activo.

## Components

Carácter general: **técnico y contundente**. Bordes de 1–2px, mayúsculas extrabold, esquinas de 6.375 a 17px, y glow de acento que confirma el estado. Nada ambiguo: cada control dice exactamente qué hace.

### Buttons

- **Shape:** radio de 6.375px (`rounded-md`) en la familia entera; los enlaces secundarios en píldora.
- **Primary (amarillo):** fondo Voltage Yellow, texto Ink, Montserrat 700 a 0.98rem; en hero `padding: 14.875px 42.5px`, en topbar compacto `8.5px 15.3px`. Hover: `#EFD700` + `translateY(-1px)` + glow amarillo.
- **Cyan:** fondo Signal Cyan, texto Cyan Ink, mismo radio y padding compacto. Uso de conversión secundaria en cromo (cotizar sitio).
- **Outline on dark:** transparente con borde blanco al 40% y texto blanco; hover lleva borde y texto a cian. También existe una variante con borde de 1px blanco al 35% y fondo blanco al 10% con `backdrop-blur` (pills de garantía).
- **Hover / Focus:** `transition-all` de 0.3s a `translateY(-1px)` o `-0.5px`; foco global de 3px cian con offset 2px.
- **Topbar ghosts:** ícono + texto en Roboto 700 a 0.8rem, color `#B9C6D4`, hover al acento de su canal (cian, verde WhatsApp o live).

### Chips (si se usan)

- **Style:** píldora con `background: rgba(255,255,255,0.10)`, `border: 1px solid rgba(255,255,255,0.25)`, `backdrop-blur`, texto `#EAF1F8`, ícono de check cian a la izquierda.
- **State:** son siempre informativos (garantías, características), nunca seleccionables. Las etiquetas de filtro de precio usan la variante clara: borde `Line`, fondo transparente, texto muted.

### Cards / Containers

- **Corner Style:** 17px para plan y spotlight; 12.75px para megacard; borde capilar de 1px.
- **Background:** `#FFFFFF` en claro, `#141C2C` en oscuro; los spotlight usan degradado radial sobre base casi negra con borde tintado (cian, verde o amarillo según el tema de la card).
- **Shadow Strategy:** Card rest → Card hover (Flat-By-Default); la destacada usa Featured glow.
- **Border:** capilar `Line`; la featured sube a 2px cian.
- **Internal Padding:** 29.75px en plan (`p-7`), 25.5px en megacard y spotlight (`p-6`).

### Inputs / Fields

- **Style:** relleno `Input` (#EAF3FB en claro, `#0F1725` en oscuro), borde 1px `Line`, radio 6.375px, `padding: 12.75px 17px`, Roboto 1rem, texto `Text`.
- **Focus:** outline global de 3px en Deep Cyan con offset 2px; el campo no cambia de fondo.
- **Error / Disabled:** el sistema declara `B4232A` para error y grises muted para deshabilitado; usar siempre texto muted en deshabilitado, nunca opacidad.

### Navigation

- **Style:** dos pisos fijos. Topbar oscura con datos de contacto/estado a la izquierda y acciones a la derecha (cian para cotizar, fantasma para agenda/WhatsApp, amarillo sólido para área de clientes, botón redondo de tema). Barra principal con logo con drop-shadow cian, enlaces Nav en mayúsculas y chevrones que rotan 180°.
- **Default / Hover / Active:** default `#E6EDF5`, hover Bright Cyan on Dark, active subrayado de 3px con gradiente cian→amarillo y glow. Los paneles del megamenú abren con `opacity` + `translateY(-10px→0)` en 0.3s.
- **Mobile:** menú deslizante sobre fondo night, secciones etiquetadas en kicker cian, ítems con divisores blancos al 5–10%, ítems de acción (cotizador) en amarillo y estado de servidores en live mint.

### Signature Components

- **Kicker:** antetítulo Montserrat 700 / 0.74rem / 0.22em en mayúsculas, centrado, flanqueado por dos reglas de 34×2px del mismo cian; cambia a Bright Cyan on Dark sobre fondos oscuros.
- **Plan card con badge:** la featured lleva un badge píldora cian con texto `#04222B` que sobresale `-15px` por el borde superior, centrado, con glow cian.
- **Medidor de ping:** barra de 8px con relleno que crece a 92% (EE. UU., gris `#9AA7B8`) y 22% (Cono Sur, gradiente cian→verde) con `cubic-bezier(.2,.8,.2,1)` de 1.5s al entrar en viewport.
- **Punto live:** círculo de 8px en Live Mint con `animate-pulse`, siempre acompañado a texto de estado.
- **Anillo WhatsApp:** pseudo-elemento de 2px en verde al 60% que escala de 1 a 1.55 desvaneciéndose, en bucle de 2s; reposiciona su `bottom` cuando el banner de cookies está abierto.
- **Reveal:** bloques que suben 28px con fade de 0.7s escalonados en pasos de 0.08s (`.d1`–`.d4`).
- **Tooltip (`#tipBox`):** caja fija de fondo Night, texto `#EAF1F8` a 0.74rem, radio 10px, flecha rotada 45°, sombra `0 12px 30px rgba(4,7,13,.45)`.

## Do's and Don'ts

### Do:

- **Do** reservar el amarillo pleno (#FFE600) para la acción primaria de la pantalla: contratar, cotizar, área de clientes, ver planes.
- **Do** usar Deep Cyan (`#00747F`) —no Signal Cyan puro ni `#00A9C4`— para texto e iconos de acento sobre fondo claro.
- **Do** traducir el amarillo a Ochre on Light (#8A6D00) cuando tenga que ser texto sobre fondo claro.
- **Do** mantener el cromo (topbar, header, hero, footer) en paleta night aunque el resto de la página esté en modo claro.
- **Do** declarar cada color en su par claro/oscuro y cambiar de token al alternar el modo.
- **Do** mantener el contenedor en 1180px / 92% y el `scroll-padding-top` en 132px en toda nueva sección anclada.
- **Do** acompañar cada elevación de estado con su glow de acento en modo oscuro, donde la sombra no se lee.
- **Do** usar radio 6.375px para controles, 17px para contenedores de contenido y píldora completa para etiquetas y chips.
- **Do** escribir toda jerarquía display en mayúsculas con su tracking (0.02em / 0.05em / 0.12em / 0.22em según nivel).
- **Do** mostrar el precio con su leyenda de valor líquido inmediatamente debajo, en 0.74rem muted.
- **Do** aplicar el foco global de 3px cian con offset 2px en todo elemento interactivo nuevo.

### Don't:

- **Don't** usar #FFE600 como color de texto sobre fondo claro ni como fondo de texto largo.
- **Don't** usar #00E5FF como color de texto sobre fondo claro; usar `#00747F` (AA). `#00A9C4` queda solo para foco y acentos no textuales.
- **Don't** invertir el modo claro con filtros, `invert` u opacidad: usar los tokens `-on-dark` / `-d`.
- **Don't** dar sombras permanentes fuertes a las superficies en reposo; la sombra y el glow son respuesta a estado.
- **Don't** usar la fotografía de la Patagonia como postal soleada: va tratada como textura oscura con superposición de degradado night y capas de montaña.
- **Don't** romper el par de acentos —cian para sistema, amarillo para acción— ni poner ambos acentos plenos compitiendo en el mismo elemento.
- **Don't** introducir una tercera familia tipográfica ni una monoespaciada para datos: Montserrat manda, Roboto lee.
- **Don't** llevar titulares a caja mixta ni usar itálicas como énfasis dentro de la jerarquía display.
- **Don't** exponer un precio sin su leyenda de valor líquido.
- **Don't** redondear controles a 17px ni contenedores a píldora completa; respetar la jerarquía de formas.
