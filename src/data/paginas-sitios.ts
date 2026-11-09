export type PageKind = 'sitio' | 'servicio' | 'hosting';

export interface Feature {
  title: string;
  text: string;
  icon: string;
}

export interface Step {
  n: string;
  title: string;
  text: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface Related {
  title: string;
  text: string;
  href: string;
}

export interface Spec {
  label: string;
  value: string;
}

export interface PageData {
  slug: string;
  kind: PageKind;
  name: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  kicker: string;
  intro: string;
  heroBullets: string[];
  specs: Spec[];
  audienceTitle: string;
  audience: Feature[];
  featuresTitle: string;
  features: Feature[];
  processTitle: string;
  process: Step[];
  notIncludedTitle: string;
  notIncluded: string[];
  faqs: Faq[];
  relatedTitle: string;
  related: Related[];
  mockup: string;
  accent: 'cy' | 'yel' | 'ok';
  host?: 'global' | 'conosur';
  ctaLabel: string;
  ctaHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

const cotizar = { ctaLabel: 'Cotizar mi sitio', ctaHref: '/cotizador/' };
const whatsapp = { label: 'Hablar por WhatsApp', href: 'https://wa.me/56954132014?text=Hola%2C%20quiero%20cotizar%20un%20sitio%20web' };

export const paginasSitios: PageData[] = [
  {
    slug: 'micrositio',
    kind: 'sitio',
    name: 'Micrositio',
    h1: 'Micrositio web listo en 24 horas',
    metaTitle: 'Micrositio web en 24 horas | Fractal Host',
    metaDescription:
      'Tenga una página profesional en 24 horas, con dominio .cl, hosting y correo corporativo incluidos el primer año. Cotice su micrositio con Fractal Host.',
    kicker: 'Presencia inmediata',
    intro:
      'Una página profesional para existir en internet hoy. Le damos el diseño, el dominio .cl, el hosting y el correo corporativo para que sus clientes lo encuentren y lo contacten sin depender de una red social.',
    heroBullets: [
      'Publicación en 24 horas hábiles',
      'Dominio .cl y hosting el primer año',
      'Formulario y botón de WhatsApp',
    ],
    specs: [
      { label: 'Plazo', value: '24 horas' },
      { label: 'Páginas', value: '1 página' },
      { label: 'Administrable', value: 'No' },
      { label: 'Incluye', value: 'Hosting y dominio .cl' },
    ],
    audienceTitle: 'Para quién es un micrositio',
    audience: [
      {
        title: 'Emprendedores que necesitan partir ya',
        text: 'Tiene el negocio funcionando, pero todavía no tiene una dirección web que pueda compartir con confianza.',
        icon: 'spark',
      },
      {
        title: 'Profesionales que quieren una tarjeta digital',
        text: 'Abogados, consultores, kinesiólogos y oficios que necesitan mostrar qué hacen, dónde atienden y cómo contactarlos.',
        icon: 'user',
      },
      {
        title: 'Negocios con una campaña o lanzamiento',
        text: 'Necesita una página puntual para una promoción, un evento o un servicio nuevo, sin construir un sitio completo.',
        icon: 'target',
      },
    ],
    featuresTitle: 'Qué incluye su micrositio',
    features: [
      {
        title: 'Una página bien armada',
        text: 'Presentación, servicios, ubicación y contacto en una sola página ordenada para leer en el celular.',
        icon: 'layers',
      },
      {
        title: 'Diseño adaptado a su marca',
        text: 'Usamos su logo, sus colores y sus fotos. Si no tiene logo, lo conversamos antes de empezar.',
        icon: 'palette',
      },
      {
        title: 'Dominio .cl incluido',
        text: 'Registramos su dominio en NIC Chile y lo dejamos operativo a su nombre desde el primer día.',
        icon: 'globe',
      },
      {
        title: 'Hosting y correo el primer año',
        text: 'El sitio queda alojado con nosotros y su correo corporativo configurado en el dispositivo que use.',
        icon: 'server',
      },
      {
        title: 'Formulario y WhatsApp',
        text: 'Las consultas llegan a su correo y puede sumar un botón directo a WhatsApp.',
        icon: 'mail',
      },
      {
        title: 'SEO básico y SSL',
        text: 'Título, descripción, velocidad, certificado de seguridad y buenas prácticas para que Google pueda leerlo.',
        icon: 'search',
      },
    ],
    processTitle: 'Cómo se hace un micrositio en 24 horas',
    process: [
      {
        n: '01',
        title: 'Conversamos',
        text: 'Nos cuenta qué hace, a quién atiende y qué quiere lograr con la página. Puede ser por WhatsApp o videollamada.',
      },
      {
        n: '02',
        title: 'Nos envía lo básico',
        text: 'Logo, fotos, textos y datos de contacto. Si no tiene todo, lo ordenamos con usted.',
      },
      {
        n: '03',
        title: 'Armamos y revisamos',
        text: 'Publicamos una versión para que la revise. Corregimos detalles de contenido y enlaces.',
      },
      {
        n: '04',
        title: 'Queda en línea',
        text: 'Configuramos el dominio, el correo y el SSL. Le entregamos los accesos y una explicación de uso.',
      },
    ],
    notIncludedTitle: 'Qué no incluye',
    notIncluded: [
      'Textos y fotografías: los entrega el cliente, salvo que se cotice contenido aparte.',
      'Secciones o páginas adicionales a la estructura acordada.',
      'Logo o identidad visual desde cero.',
      'Administración de contenidos: el micrositio no es administrable.',
    ],
    faqs: [
      {
        q: '¿De verdad queda listo en 24 horas?',
        a: 'Sí, cuando el contenido está completo y el anticipo está pagado. El plazo corre desde que recibimos logo, textos, fotos y datos de contacto. Si falta material, el reloj se detiene hasta que lo tengamos.',
      },
      {
        q: '¿Qué necesito para empezar?',
        a: 'Logo, fotos, una descripción breve de su negocio, servicios o productos, dirección, teléfono, correo y redes sociales. Si no tiene algún elemento, lo revisamos juntos antes de cotizar.',
      },
      {
        q: '¿Incluye el dominio .cl?',
        a: 'Sí. El primer año de dominio .cl y hosting va incluido. Desde el segundo año, la renovación del dominio se paga aparte en NIC Chile y el hosting se renueva según el plan que elija.',
      },
      {
        q: '¿Puedo ampliarlo después a un sitio más grande?',
        a: 'Sí. Muchos clientes parten con un micrositio y después pasan a un One Page o a un sitio corporativo. El contenido y el dominio se conservan; lo que cambia es la estructura y el diseño.',
      },
      {
        q: '¿Va a aparecer en Google?',
        a: 'El sitio queda con SEO básico y puede ser indexado. Aparecer en los primeros resultados depende de la competencia de su rubro y del trabajo continuo. No prometemos posiciones: prometemos una base técnica bien hecha.',
      },
      {
        q: '¿Puedo administrarlo yo?',
        a: 'El micrositio no es administrable. Si necesita cambiar textos o fotos por su cuenta, conviene un sitio corporativo con WordPress. También podemos hacer cambios puntuales como servicio aparte.',
      },
    ],
    relatedTitle: 'Otros tipos de sitio que le pueden servir',
    related: [
      {
        title: 'One Page',
        text: 'Una página con diseño propio y más secciones para contar mejor su oferta.',
        href: '/sitios-web/one-page/',
      },
      {
        title: 'Sitio corporativo',
        text: 'Un sitio administrable con varias páginas, blog y capacitación de uso.',
        href: '/sitios-web/sitio-corporativo/',
      },
      {
        title: 'Tienda online',
        text: 'Si además de mostrar quiere vender productos con carrito y pagos.',
        href: '/sitios-web/tienda-online/',
      },
    ],
    mockup: 'micrositio',
    accent: 'yel',
    ...cotizar,
    secondaryLabel: whatsapp.label,
    secondaryHref: whatsapp.href,
  },
  {
    slug: 'one-page',
    kind: 'sitio',
    name: 'One Page',
    h1: 'Sitio web One Page: todo su negocio en una página',
    metaTitle: 'Sitio web One Page en Punta Arenas | Fractal Host',
    metaDescription:
      'Un sitio de una página con diseño propio, hasta 8 secciones y hosting con dominio .cl incluidos. Cotice su One Page con Fractal Host en 3 a 7 días.',
    kicker: 'Diseño propio en una página',
    intro:
      'Una sola página bien contada, con diseño a medida y hasta ocho secciones. Es la opción para servicios, profesionales y pymes que necesitan explicar su oferta sin construir un sitio extenso.',
    heroBullets: [
      'Diseño a medida, no plantilla genérica',
      'Hasta 8 secciones con menú de anclas',
      'Hosting y dominio .cl el primer año',
    ],
    specs: [
      { label: 'Plazo', value: '3 a 7 días' },
      { label: 'Páginas', value: '1 página' },
      { label: 'Administrable', value: 'No' },
      { label: 'Incluye', value: 'Hosting y dominio .cl' },
    ],
    audienceTitle: 'Para quién es un sitio One Page',
    audience: [
      {
        title: 'Pymes de servicios',
        text: 'Consultoras, talleres, clínicas, estudios y oficinas que necesitan explicar qué hacen y cómo los contactan.',
        icon: 'briefcase',
      },
      {
        title: 'Profesionales independientes',
        text: 'Quien vende su experiencia y quiere una presencia más cuidada que una tarjeta digital.',
        icon: 'user',
      },
      {
        title: 'Lanzamientos y campañas',
        text: 'Un servicio nuevo, una sucursal o una promoción que necesita una página propia con diseño a la altura.',
        icon: 'rocket',
      },
    ],
    featuresTitle: 'Qué incluye su One Page',
    features: [
      {
        title: 'Diseño a medida',
        text: 'Armamos una propuesta visual con su marca, no un tema comprado y rellenado con texto.',
        icon: 'palette',
      },
      {
        title: 'Hasta 8 secciones',
        text: 'Inicio, servicios, quiénes somos, galería, preguntas frecuentes, contacto y las que su negocio necesite.',
        icon: 'layers',
      },
      {
        title: 'Menú de anclas',
        text: 'El menú lleva a cada sección dentro de la misma página, sin recargar ni perderse.',
        icon: 'link',
      },
      {
        title: 'Formulario y WhatsApp',
        text: 'Recibe consultas por correo y ofrece un canal directo para quienes prefieren escribir por WhatsApp.',
        icon: 'mail',
      },
      {
        title: 'SEO técnico y Analytics',
        text: 'Títulos, descripción, velocidad, SSL y medición de visitas para saber qué está pasando.',
        icon: 'chart',
      },
      {
        title: 'Hosting y dominio .cl',
        text: 'El primer año de hosting y el dominio .cl van incluidos. Nos encargamos del registro y la configuración.',
        icon: 'server',
      },
    ],
    processTitle: 'Cómo trabajamos su One Page',
    process: [
      {
        n: '01',
        title: 'Levantamos la información',
        text: 'Revisamos su negocio, su competencia y lo que necesita comunicar. Definimos las secciones y el objetivo de cada una.',
      },
      {
        n: '02',
        title: 'Diseñamos la propuesta',
        text: 'Le mostramos un demo navegable con el diseño y los contenidos. Ahí centralizamos todas las observaciones.',
      },
      {
        n: '03',
        title: 'Ajustamos detalles',
        text: 'Corregimos textos, imágenes, enlaces y comportamiento en celular. Las revisiones están incluidas dentro del plazo.',
      },
      {
        n: '04',
        title: 'Publicamos y explicamos',
        text: 'Dejamos el dominio, el correo y el SSL funcionando, y le explicamos cómo se ve y cómo se contacta un cliente.',
      },
    ],
    notIncludedTitle: 'Qué no incluye',
    notIncluded: [
      'Blog, tienda online o área privada: son proyectos distintos y se cotizan aparte.',
      'Carga permanente de contenidos. El One Page no es administrable.',
      'Sesión de fotos, logo o redacción desde cero, salvo que se acuerde en la cotización.',
      'Campañas de publicidad o posicionamiento continuo.',
    ],
    faqs: [
      {
        q: '¿Cuál es la diferencia con un micrositio?',
        a: 'El micrositio es una solución rápida de 24 horas, con una estructura acotada. El One Page es un diseño a medida, con más secciones, más trabajo de contenido y un plazo de 3 a 7 días.',
      },
      {
        q: '¿Cuántas secciones puedo incluir?',
        a: 'Hasta ocho secciones dentro de la misma página. Si necesita más, se puede evaluar un sitio corporativo con páginas separadas, que también ayuda al SEO cuando hay mucho contenido.',
      },
      {
        q: '¿Puedo agregar un blog después?',
        a: 'Sí, pero implica pasar a WordPress con una estructura administrable. Se puede hacer como una segunda etapa; el dominio y el contenido se conservan.',
      },
      {
        q: '¿Yo puedo cambiar los textos?',
        a: 'El One Page no se entrega con panel administrable. Los cambios se piden a nosotros. Si necesita autonomía para editar, conviene un sitio corporativo.',
      },
      {
        q: '¿Los textos los escriben ustedes?',
        a: 'Usted entrega la información base. Nosotros la ordenamos, la corregimos y la adaptamos para web. Si no tiene textos, lo conversamos en la cotización.',
      },
      {
        q: '¿Incluye hosting y dominio?',
        a: 'Sí, el primer año de hosting y el dominio .cl están incluidos. Desde el segundo año se renuevan aparte: el dominio en NIC Chile y el hosting según el plan.',
      },
    ],
    relatedTitle: 'Compare con otros tipos de sitio',
    related: [
      {
        title: 'Micrositio en 24 horas',
        text: 'Si necesita una presencia urgente y una estructura más simple.',
        href: '/sitios-web/micrositio/',
      },
      {
        title: 'Sitio corporativo',
        text: 'Si necesita varias páginas, blog y un panel para editar contenidos.',
        href: '/sitios-web/sitio-corporativo/',
      },
      {
        title: 'Sitio a medida',
        text: 'Si su proyecto necesita funciones que no existen en una página estándar.',
        href: '/sitios-web/sitio-a-medida/',
      },
    ],
    mockup: 'onepage',
    accent: 'cy',
    ...cotizar,
    secondaryLabel: whatsapp.label,
    secondaryHref: whatsapp.href,
  },
  {
    slug: 'sitio-corporativo',
    kind: 'sitio',
    name: 'Sitio corporativo',
    h1: 'Sitio web corporativo administrable',
    metaTitle: 'Sitio web corporativo administrable | Fractal Host',
    metaDescription:
      'Sitio web para empresas con WordPress y Elementor: usted actualiza sus contenidos sin programar. Hosting, dominio .cl y capacitación incluidos.',
    kicker: 'La casa digital de su empresa',
    intro:
      'La casa digital de su empresa: quiénes son, qué hacen, servicios, proyectos y contacto. Con WordPress y Elementor para que usted mismo actualice los contenidos sin saber programar.',
    heroBullets: [
      'WordPress + Elementor',
      'Usted edita textos, fotos y noticias',
      'Capacitación de uso incluida',
    ],
    specs: [
      { label: 'Plazo', value: '1 a 3 semanas' },
      { label: 'Páginas', value: 'Según proyecto' },
      { label: 'Administrable', value: 'Sí, con WordPress' },
      { label: 'Incluye', value: 'Hosting, dominio y capacitación' },
    ],
    audienceTitle: 'Para quién es un sitio corporativo',
    audience: [
      {
        title: 'Empresas con varios servicios',
        text: 'Necesitan explicar cada línea de negocio, mostrar experiencia y dar confianza a clientes y proveedores.',
        icon: 'briefcase',
      },
      {
        title: 'Instituciones y organizaciones',
        text: 'Colegios, fundaciones, municipalidades y agrupaciones que publican noticias, documentos y actividades.',
        icon: 'building',
      },
      {
        title: 'Pymes que quieren autonomía',
        text: 'Quieren cambiar textos, fotos y noticias sin depender de un diseñador para cada ajuste.',
        icon: 'settings',
      },
    ],
    featuresTitle: 'Qué incluye su sitio corporativo',
    features: [
      {
        title: 'Estructura a medida',
        text: 'Definimos el mapa del sitio: inicio, servicios, quiénes somos, proyectos, noticias y contacto.',
        icon: 'layers',
      },
      {
        title: 'WordPress + Elementor',
        text: 'Un panel conocido, en español, para editar páginas y contenidos con bloques visuales.',
        icon: 'code',
      },
      {
        title: 'Diseño con su identidad',
        text: 'Aplicamos su logo, colores y estilo. Si no tiene manual de marca, lo ordenamos en el camino.',
        icon: 'palette',
      },
      {
        title: 'Noticias o blog',
        text: 'Si necesita publicar novedades, habilitamos un blog con categorías y fechas.',
        icon: 'file',
      },
      {
        title: 'SEO y velocidad',
        text: 'Estructura de enlaces, títulos, metadescripciones, SSL, caché e imágenes optimizadas.',
        icon: 'search',
      },
      {
        title: 'Capacitación de uso',
        text: 'Una clase personalizada para que pueda editar sin miedo, más soporte para dudas puntuales.',
        icon: 'users',
      },
    ],
    processTitle: 'Cómo desarrollamos su sitio corporativo',
    process: [
      {
        n: '01',
        title: 'Planificamos',
        text: 'Revisamos su negocio, sus servicios y lo que necesitan encontrar sus clientes. Armamos el mapa del sitio.',
      },
      {
        n: '02',
        title: 'Diseñamos',
        text: 'Le presentamos una propuesta visual en un demo navegable. Ajustamos diseño, contenidos y estructura.',
      },
      {
        n: '03',
        title: 'Desarrollamos',
        text: 'Instalamos WordPress, configuramos Elementor, cargamos contenidos y probamos formularios, enlaces y celular.',
      },
      {
        n: '04',
        title: 'Capacitamos y publicamos',
        text: 'Le enseñamos a editar, dejamos el dominio y el correo funcionando, y publicamos el sitio.',
      },
    ],
    notIncludedTitle: 'Qué no incluye',
    notIncluded: [
      'Tienda online, área privada o sistema de reservas: se cotizan como proyectos aparte.',
      'Carga permanente de noticias o productos. La mantención incluye lo técnico, no la edición diaria.',
      'Redacción de contenidos desde cero, salvo que se acuerde en la cotización.',
      'Campañas de publicidad, redes sociales o posicionamiento continuo.',
    ],
    faqs: [
      {
        q: '¿Puedo editar el sitio yo mismo?',
        a: 'Sí. Entregamos WordPress con Elementor y una capacitación para que cambie textos, fotos y noticias. No necesita saber programar, pero sí dedicarle tiempo a la edición.',
      },
      {
        q: '¿Incluye blog o noticias?',
        a: 'Sí, si lo necesita. Habilitamos un blog con categorías y lo dejamos integrado al diseño. Si no va a publicar noticias, no lo incluimos para no sumar mantención innecesaria.',
      },
      {
        q: '¿Cuántas páginas incluye?',
        a: 'Depende del proyecto. Un sitio corporativo típico tiene entre cinco y diez páginas. Lo definimos en la propuesta según sus servicios y la información que necesite publicar.',
      },
      {
        q: '¿La capacitación es presencial?',
        a: 'En Punta Arenas podemos coordinar una clase presencial según disponibilidad. Para el resto de Chile, la hacemos por videollamada y compartimos la grabación o una guía breve.',
      },
      {
        q: '¿Qué pasa con la mantención?',
        a: 'Si el sitio queda alojado con nosotros, la mantención técnica de WordPress, plugins y plantillas está incluida para sitios desarrollados por nosotros. La carga de contenidos la hace usted.',
      },
      {
        q: '¿Cuánto demora?',
        a: 'Entre una y tres semanas, contadas desde que recibimos la información base y el anticipo. Los tiempos exactos dependen del tamaño del sitio y de la velocidad con que lleguen los contenidos.',
      },
    ],
    relatedTitle: 'Otros tipos de sitio que le pueden servir',
    related: [
      {
        title: 'One Page',
        text: 'Si prefiere una sola página con diseño propio y menos estructura.',
        href: '/sitios-web/one-page/',
      },
      {
        title: 'Tienda online',
        text: 'Si además de mostrar servicios quiere vender productos.',
        href: '/sitios-web/tienda-online/',
      },
      {
        title: 'Sitio a medida',
        text: 'Si necesita funciones especiales dentro de su sitio corporativo.',
        href: '/sitios-web/sitio-a-medida/',
      },
    ],
    mockup: 'corporativo',
    accent: 'cy',
    ...cotizar,
    secondaryLabel: whatsapp.label,
    secondaryHref: whatsapp.href,
  },
  {
    slug: 'tienda-online',
    kind: 'sitio',
    name: 'Tienda online',
    h1: 'Tienda online con WooCommerce',
    metaTitle: 'Tienda online con WooCommerce | Fractal Host',
    metaDescription:
      'Venda 24/7 con catálogo, carrito, pagos y envíos. Tienda online en WordPress y WooCommerce, administrada por usted y con soporte directo.',
    kicker: 'Venda sin horario',
    intro:
      'Venda 24/7 con catálogo, carrito, pagos y envíos. WooCommerce sobre WordPress, con la tienda administrada por usted y el soporte técnico de nosotros.',
    heroBullets: [
      'Catálogo, carrito y checkout',
      'Pagos y envíos configurados',
      'Capacitación para cargar productos',
    ],
    specs: [
      { label: 'Plazo', value: '15 a 45 días' },
      { label: 'Plataforma', value: 'WordPress + WooCommerce' },
      { label: 'Administrable', value: 'Sí' },
      { label: 'Incluye', value: 'Hosting y dominio .cl' },
    ],
    audienceTitle: 'Para quién es una tienda online',
    audience: [
      {
        title: 'Comercio y retail',
        text: 'Tiendas que ya venden en local o por redes sociales y necesitan un canal propio, ordenado y disponible todo el día.',
        icon: 'cart',
      },
      {
        title: 'Artesanos y productores',
        text: 'Quienes venden piezas únicas o por temporada y necesitan mostrar el catálogo con fotos y stock.',
        icon: 'package',
      },
      {
        title: 'Mayoristas y catálogos B2B',
        text: 'Negocios que necesitan un catálogo con precios, variantes y pedidos, aunque el pago se coordine aparte.',
        icon: 'briefcase',
      },
    ],
    featuresTitle: 'Qué incluye su tienda online',
    features: [
      {
        title: 'Catálogo con categorías',
        text: 'Productos, variantes, stock, precios y fotos organizados para que el cliente encuentre rápido.',
        icon: 'grid',
      },
      {
        title: 'Carrito y checkout',
        text: 'Un flujo de compra claro, con resumen, datos de envío y confirmación por correo.',
        icon: 'cart',
      },
      {
        title: 'Pagos seguros',
        text: 'Configuramos la pasarela que usted defina, como Flow, Webpay u otra compatible. Las comisiones las cobra la pasarela.',
        icon: 'card',
      },
      {
        title: 'Envíos y retiros',
        text: 'Zonas, costos, envío gratis por monto y retiro en tienda, según cómo opere su negocio.',
        icon: 'truck',
      },
      {
        title: 'Carga inicial de productos',
        text: 'Cargamos un lote inicial de productos con la información que nos entregue y le enseñamos a continuar.',
        icon: 'upload',
      },
      {
        title: 'SEO y velocidad',
        text: 'Estructura para Google, fichas con metadatos, imágenes optimizadas y caché para que la tienda responda.',
        icon: 'search',
      },
    ],
    processTitle: 'Cómo armamos su tienda online',
    process: [
      {
        n: '01',
        title: 'Definimos el negocio',
        text: 'Revisamos qué vende, cómo cobra, cómo envía y qué necesita el cliente para comprar sin dudas.',
      },
      {
        n: '02',
        title: 'Diseñamos la tienda',
        text: 'Armamos la estructura de categorías, fichas, carrito y checkout. Le mostramos un demo navegable.',
      },
      {
        n: '03',
        title: 'Configuramos pagos y envíos',
        text: 'Conectamos la pasarela, definimos zonas y costos, y probamos compras reales antes de publicar.',
      },
      {
        n: '04',
        title: 'Cargamos y capacitamos',
        text: 'Subimos el lote inicial de productos y le enseñamos a agregar, editar y revisar pedidos.',
      },
    ],
    notIncludedTitle: 'Qué no incluye',
    notIncluded: [
      'Fotografía de productos y textos de fichas: los entrega el cliente o se cotizan aparte.',
      'Comisiones de la pasarela de pago y costos de envío.',
      'Integración con ERP, facturación automática o bodega externa: se cotiza según el sistema.',
      'Campañas de publicidad o gestión de redes sociales.',
    ],
    faqs: [
      {
        q: '¿Cuántos productos puedo cargar?',
        a: 'No hay un límite técnico fijo. La cotización incluye un lote inicial de carga; después usted agrega el resto con la capacitación. Si necesita migrar cientos de productos, se cotiza aparte.',
      },
      {
        q: '¿Quién carga los productos?',
        a: 'Cargamos el lote inicial con la información que nos entregue. Después le enseñamos a hacerlo. Si prefiere que nos encarguemos de toda la carga, se puede cotizar.',
      },
      {
        q: '¿Qué medios de pago se pueden usar?',
        a: 'Trabajamos con pasarelas compatibles con WooCommerce, como Flow, Webpay u otras. La que elija debe permitir su tipo de negocio. Las comisiones y requisitos los define la pasarela.',
      },
      {
        q: '¿Incluye envíos?',
        a: 'Configuramos zonas, costos, envío gratis por monto y retiro en tienda. Si necesita integración con una empresa de logística específica, se evalúa y se cotiza.',
      },
      {
        q: '¿Puedo emitir boleta o factura?',
        a: 'La tienda puede generar documentos, pero la emisión tributaria depende del sistema que use. Si necesita integración con su sistema de facturación, se cotiza como un desarrollo aparte.',
      },
      {
        q: '¿El hosting y el dominio están incluidos?',
        a: 'Sí, el primer año de hosting y el dominio .cl van incluidos. En ecommerce de alta envergadura o con infraestructura especial, lo confirmamos en la cotización. Desde el segundo año, el dominio se renueva en NIC Chile y el hosting según el plan.',
      },
      {
        q: '¿Qué pasa con la mantención?',
        a: 'Si la tienda queda alojada con nosotros, la mantención técnica de WordPress, WooCommerce y plugins está incluida para sitios desarrollados por nosotros. La carga de productos y la gestión de pedidos son suyas.',
      },
    ],
    relatedTitle: 'Otros tipos de sitio que le pueden servir',
    related: [
      {
        title: 'Eventos y entradas',
        text: 'Si vende entradas para actividades y necesita control de acceso con QR.',
        href: '/sitios-web/eventos-y-entradas/',
      },
      {
        title: 'Sitio corporativo',
        text: 'Si además de vender necesita presentar su empresa y sus servicios.',
        href: '/sitios-web/sitio-corporativo/',
      },
      {
        title: 'Sitio a medida',
        text: 'Si su operación necesita integraciones o flujos especiales.',
        href: '/sitios-web/sitio-a-medida/',
      },
    ],
    mockup: 'tienda',
    accent: 'yel',
    ...cotizar,
    secondaryLabel: whatsapp.label,
    secondaryHref: whatsapp.href,
  },
  {
    slug: 'eventos-y-entradas',
    kind: 'sitio',
    name: 'Eventos y entradas',
    h1: 'Venta de entradas online con QR',
    metaTitle: 'Venta de entradas online con QR | Fractal Host',
    metaDescription:
      'Publique su evento, venda entradas online y valide el ingreso con QR. Ticketera con cupos, pagos y reportes, hecha a la medida de su evento.',
    kicker: 'Ticketera propia',
    intro:
      'Publique su evento, venda entradas y valide el ingreso con QR. Sin listas en papel ni planillas paralelas: el cupo, el pago y el acceso quedan en el mismo sistema.',
    heroBullets: [
      'Venta online con cupos controlados',
      'Entrada digital con código QR',
      'Validación en la puerta desde el celular',
    ],
    specs: [
      { label: 'Plazo', value: 'Según alcance' },
      { label: 'Incluye', value: 'Ticketera y QR' },
      { label: 'Administrable', value: 'Sí' },
      { label: 'Pagos', value: 'Online y en puerta' },
    ],
    audienceTitle: 'Para quién es una ticketera propia',
    audience: [
      {
        title: 'Eventos culturales y conciertos',
        text: 'Productoras y centros culturales que necesitan vender entradas y controlar el ingreso sin depender de una ticketera externa.',
        icon: 'ticket',
      },
      {
        title: 'Talleres y seminarios',
        text: 'Relatores y organizaciones que venden cupos limitados y necesitan saber quién asistió.',
        icon: 'users',
      },
      {
        title: 'Ferias y actividades municipales',
        text: 'Eventos con inscripción gratuita o pagada que necesitan ordenar el registro y la acreditación.',
        icon: 'calendar',
      },
    ],
    featuresTitle: 'Qué incluye su ticketera',
    features: [
      {
        title: 'Ficha del evento',
        text: 'Fecha, lugar, programa, precio, cupos y condiciones en una página clara.',
        icon: 'file',
      },
      {
        title: 'Compra online',
        text: 'El asistente elige cantidad, paga y recibe su entrada digital con un código único.',
        icon: 'card',
      },
      {
        title: 'Código QR',
        text: 'Cada entrada lleva un QR que se valida una sola vez en la puerta.',
        icon: 'qr',
      },
      {
        title: 'Control de acceso',
        text: 'Su equipo valida desde el celular, sin instalar planillas ni depender de internet estable.',
        icon: 'check',
      },
      {
        title: 'Cupos y tipos de entrada',
        text: 'General, VIP, estudiante o las categorías que necesite, con cupos independientes.',
        icon: 'layers',
      },
      {
        title: 'Reportes',
        text: 'Ventas, asistentes, entradas pendientes y validaciones para cerrar el evento con números claros.',
        icon: 'chart',
      },
    ],
    processTitle: 'Cómo se arma la venta de entradas',
    process: [
      {
        n: '01',
        title: 'Definimos el evento',
        text: 'Revisamos fecha, lugar, cupos, tipos de entrada, precios y cómo se validará el ingreso.',
      },
      {
        n: '02',
        title: 'Armamos la ticketera',
        text: 'Creamos la ficha, el flujo de compra y el sistema de QR. Probamos con entradas de prueba.',
      },
      {
        n: '03',
        title: 'Abrimos la venta',
        text: 'Conectamos el pago y publicamos. Usted puede seguir las ventas y los cupos en línea.',
      },
      {
        n: '04',
        title: 'Validamos el ingreso',
        text: 'El día del evento, su equipo valida los QR y al cierre entregamos el reporte de asistentes.',
      },
    ],
    notIncludedTitle: 'Qué no incluye',
    notIncluded: [
      'Producción, sonido, iluminación o staff del evento.',
      'Difusión y campañas de publicidad para vender entradas.',
      'Comisiones de la pasarela de pago.',
      'Hardware para validar QR: se usa el celular del equipo o se cotiza un lector aparte.',
    ],
    faqs: [
      {
        q: '¿Cómo se valida el QR?',
        a: 'Su equipo entra desde el celular a la herramienta de validación, escanea el código y el sistema marca la entrada como usada. Si no hay internet en el lugar, se puede definir un modo de respaldo.',
      },
      {
        q: '¿Puedo vender entradas en la puerta?',
        a: 'Sí. Se puede habilitar una venta rápida en el acceso o dejar entradas de cortesía. Lo definimos según la operación del evento.',
      },
      {
        q: '¿Cuántos eventos puedo tener?',
        a: 'La plataforma puede alojar varios eventos, cada uno con sus fechas, cupos y precios. La cantidad depende del alcance que acordemos.',
      },
      {
        q: '¿Qué pasa si se agota el cupo?',
        a: 'El sistema deja de vender cuando se alcanza el límite que usted definió. También puede abrir una lista de espera o liberar cupos manualmente.',
      },
      {
        q: '¿Los pagos son online?',
        a: 'Sí, a través de una pasarela compatible. También puede dejar entradas gratuitas con registro previo. Las comisiones de la pasarela se informan en la cotización.',
      },
      {
        q: '¿Cuánto demora?',
        a: 'Depende de la complejidad del evento y de la cantidad de tipos de entrada. Un evento simple puede estar listo en pocas semanas; una ticketera con varios eventos y validaciones requiere más trabajo.',
      },
    ],
    relatedTitle: 'Otros tipos de sitio que le pueden servir',
    related: [
      {
        title: 'Tienda online',
        text: 'Si además de entradas vende productos o merchandising.',
        href: '/sitios-web/tienda-online/',
      },
      {
        title: 'Reserva de horas',
        text: 'Si su actividad funciona con horas agendadas en vez de cupos por evento.',
        href: '/sitios-web/reserva-de-horas/',
      },
      {
        title: 'Sitio corporativo',
        text: 'Si necesita presentar la productora, la fundación o la organización detrás del evento.',
        href: '/sitios-web/sitio-corporativo/',
      },
    ],
    mockup: 'eventos',
    accent: 'cy',
    ...cotizar,
    secondaryLabel: whatsapp.label,
    secondaryHref: whatsapp.href,
  },
  {
    slug: 'reserva-de-horas',
    kind: 'sitio',
    name: 'Reserva de horas',
    h1: 'Reserva de horas online para su negocio',
    metaTitle: 'Reserva de horas online para su negocio | Fractal Host',
    metaDescription:
      'Sus clientes reservan día y hora sin llamar. Agenda online con servicios, disponibilidad, confirmaciones y recordatorios para su negocio.',
    kicker: 'Agenda 24/7',
    intro:
      'Sus clientes eligen servicio, día y hora sin llamar. Usted define la disponibilidad, bloquea feriados y recibe las confirmaciones en un solo lugar.',
    heroBullets: [
      'Reservas desde el celular',
      'Disponibilidad y bloqueos bajo su control',
      'Confirmaciones y recordatorios',
    ],
    specs: [
      { label: 'Plazo', value: 'Según alcance' },
      { label: 'Incluye', value: 'Agenda y panel' },
      { label: 'Administrable', value: 'Sí' },
      { label: 'Pagos', value: 'Opcional al reservar' },
    ],
    audienceTitle: 'Para quién es una agenda online',
    audience: [
      {
        title: 'Consultas y profesionales de la salud',
        text: 'Dentistas, kinesiólogos, psicólogos y médicos que necesitan ordenar las horas y reducir llamadas.',
        icon: 'health',
      },
      {
        title: 'Servicios con hora',
        text: 'Peluquerías, spas, talleres, profesores y técnicos que trabajan con agenda y necesitan evitar cruces.',
        icon: 'calendar',
      },
      {
        title: 'Turismo y alojamiento',
        text: 'Hoteles, cabañas y tours que reservan por fecha y necesitan controlar disponibilidad.',
        icon: 'map',
      },
    ],
    featuresTitle: 'Qué incluye su sistema de reservas',
    features: [
      {
        title: 'Calendario de disponibilidad',
        text: 'Define horarios por día, duración de cada servicio y bloqueos para feriados o vacaciones.',
        icon: 'calendar',
      },
      {
        title: 'Reserva sin llamar',
        text: 'El cliente elige servicio, fecha y hora, y deja sus datos en pocos pasos.',
        icon: 'smartphone',
      },
      {
        title: 'Confirmaciones',
        text: 'Avisos por correo y, si se acuerda, por WhatsApp para que el cliente no olvide su hora.',
        icon: 'mail',
      },
      {
        title: 'Panel de reservas',
        text: 'Ve la agenda del día, confirma, reprograma o cancela desde un solo lugar.',
        icon: 'settings',
      },
      {
        title: 'Pago opcional',
        text: 'Si necesita asegurar la reserva, se puede pedir un abono o el pago completo al agendar.',
        icon: 'card',
      },
      {
        title: 'Recordatorios',
        text: 'Mensajes automáticos antes de la cita para reducir inasistencias y liberar horas.',
        icon: 'bell',
      },
    ],
    processTitle: 'Cómo implementamos su agenda',
    process: [
      {
        n: '01',
        title: 'Revisamos su operación',
        text: 'Qué servicios ofrece, cuánto duran, quién atiende y cómo se organizan hoy las horas.',
      },
      {
        n: '02',
        title: 'Configuramos la agenda',
        text: 'Cargamos servicios, profesionales, horarios y bloqueos. Definimos las reglas de reserva.',
      },
      {
        n: '03',
        title: 'Probamos el flujo',
        text: 'Hacemos reservas de prueba, revisamos correos y ajustamos la experiencia en celular.',
      },
      {
        n: '04',
        title: 'Capacitamos',
        text: 'Le enseñamos a ver la agenda, mover horas y bloquear días. Queda funcionando en su sitio.',
      },
    ],
    notIncludedTitle: 'Qué no incluye',
    notIncluded: [
      'Licencias de software clínico o de gestión interna.',
      'Integración con sistemas de fichas médicas, salvo que se cotice aparte.',
      'Atención telefónica o recepción de pacientes.',
      'Campañas para llenar la agenda.',
    ],
    faqs: [
      {
        q: '¿Se sincroniza con Google Calendar?',
        a: 'Se puede evaluar según la herramienta que usemos. Si su operación depende de Google Calendar o Outlook, lo revisamos en la etapa de definición y lo cotizamos si requiere un desarrollo adicional.',
      },
      {
        q: '¿Puedo cobrar al reservar?',
        a: 'Sí, si su negocio lo necesita. Se puede pedir un abono o el pago completo a través de una pasarela. Las comisiones las cobra la pasarela.',
      },
      {
        q: '¿Se envían recordatorios?',
        a: 'Sí. Configuramos avisos por correo y, si se acuerda, por WhatsApp. El objetivo es reducir las inasistencias y liberar horas.',
      },
      {
        q: '¿Puedo bloquear días o vacaciones?',
        a: 'Sí. Desde el panel puede cerrar días completos, bloquear rangos horarios o cambiar la disponibilidad de un profesional.',
      },
      {
        q: '¿Cuántas agendas puede tener?',
        a: 'Depende del alcance. Se puede partir con una agenda y sumar profesionales o sucursales. Lo definimos en la propuesta.',
      },
      {
        q: '¿Cuánto demora?',
        a: 'Una agenda simple puede estar lista en pocas semanas. Si incluye pagos, varios profesionales o integraciones, el plazo se extiende y se informa en la cotización.',
      },
    ],
    relatedTitle: 'Otros tipos de sitio que le pueden servir',
    related: [
      {
        title: 'Sitio corporativo',
        text: 'Si además de la agenda necesita presentar su equipo y sus servicios.',
        href: '/sitios-web/sitio-corporativo/',
      },
      {
        title: 'Eventos y entradas',
        text: 'Si su actividad se organiza por eventos y cupos, no por horas.',
        href: '/sitios-web/eventos-y-entradas/',
      },
      {
        title: 'Sitio a medida',
        text: 'Si necesita integrar la agenda con un sistema que ya usa.',
        href: '/sitios-web/sitio-a-medida/',
      },
    ],
    mockup: 'reservas',
    accent: 'ok',
    ...cotizar,
    secondaryLabel: whatsapp.label,
    secondaryHref: whatsapp.href,
  },
  {
    slug: 'sitio-inmobiliario',
    kind: 'sitio',
    name: 'Sitio inmobiliario',
    h1: 'Sitio web inmobiliario para corredoras y propiedades',
    metaTitle: 'Sitio web inmobiliario para corredoras | Fractal Host',
    metaDescription:
      'Publique propiedades con fotos, filtros y mapa, y reciba consultas por cada inmueble. Sitio inmobiliario administrable para corredoras y agentes.',
    kicker: 'Propiedades con filtros y mapa',
    intro:
      'Publique propiedades con fotos, filtros y mapa, y reciba consultas directas por cada inmueble. Un sitio pensado para que el comprador encuentre rápido y para que usted actualice la cartera sin depender de nadie.',
    heroBullets: [
      'Fichas con fotos y características',
      'Filtros por comuna, precio y dormitorios',
      'Consultas directas por propiedad',
    ],
    specs: [
      { label: 'Plazo', value: 'Según alcance' },
      { label: 'Incluye', value: 'Fichas, filtros y mapa' },
      { label: 'Administrable', value: 'Sí' },
      { label: 'Ideal para', value: 'Corredoras y agentes' },
    ],
    audienceTitle: 'Para quién es un sitio inmobiliario',
    audience: [
      {
        title: 'Corredoras de propiedades',
        text: 'Necesitan una vitrina propia, ordenada y con la identidad de la corredora, no solo publicaciones en portales.',
        icon: 'building',
      },
      {
        title: 'Inmobiliarias y proyectos',
        text: 'Venden casas, departamentos o parcelas y necesitan mostrar avances, disponibilidad y contacto por proyecto.',
        icon: 'home',
      },
      {
        title: 'Agentes independientes',
        text: 'Manejan una cartera acotada y quieren una página profesional para compartir con sus clientes.',
        icon: 'user',
      },
    ],
    featuresTitle: 'Qué incluye su sitio inmobiliario',
    features: [
      {
        title: 'Ficha de propiedad',
        text: 'Fotos, precio, superficie, dormitorios, baños, características y ubicación en un solo lugar.',
        icon: 'home',
      },
      {
        title: 'Filtros de búsqueda',
        text: 'Por tipo de propiedad, comuna, rango de precio, dormitorios y otros criterios que use su cartera.',
        icon: 'search',
      },
      {
        title: 'Mapa',
        text: 'Ubicación referencial de cada propiedad para que el interesado se haga una idea antes de la visita.',
        icon: 'map',
      },
      {
        title: 'Contacto por propiedad',
        text: 'El interesado consulta por esa casa o departamento y le llega el dato al agente correspondiente.',
        icon: 'mail',
      },
      {
        title: 'Propiedades destacadas',
        text: 'Puede priorizar los inmuebles que necesita mover primero, sin cambiar el resto del catálogo.',
        icon: 'star',
      },
      {
        title: 'Panel de administración',
        text: 'Usted publica, actualiza y retira propiedades. También puede administrar agentes y consultas.',
        icon: 'settings',
      },
    ],
    processTitle: 'Cómo armamos su sitio inmobiliario',
    process: [
      {
        n: '01',
        title: 'Definimos la cartera',
        text: 'Revisamos qué tipos de propiedad maneja, qué datos son obligatorios y cómo quiere que lo contacten.',
      },
      {
        n: '02',
        title: 'Diseñamos la búsqueda',
        text: 'Armamos la ficha, los filtros y el mapa. Probamos con propiedades de ejemplo para ajustar la experiencia.',
      },
      {
        n: '03',
        title: 'Cargamos y probamos',
        text: 'Subimos una muestra real, revisamos fotos, enlaces y formularios, y ajustamos en celular.',
      },
      {
        n: '04',
        title: 'Capacitamos',
        text: 'Le enseñamos a publicar propiedades, cambiar precios y responder consultas desde el panel.',
      },
    ],
    notIncludedTitle: 'Qué no incluye',
    notIncluded: [
      'Carga permanente de propiedades: la hace su equipo después de la capacitación.',
      'Tour virtual 360, video profesional o fotografía de inmuebles.',
      'Integración automática con portales inmobiliarios, salvo que se cotice aparte.',
      'Gestión de leads, llamadas o visitas comerciales.',
    ],
    faqs: [
      {
        q: '¿Quién sube las propiedades?',
        a: 'Su equipo las sube desde el panel. Nosotros dejamos el sitio configurado, cargamos una muestra y lo capacitamos. Si prefiere que nos encarguemos de la carga inicial completa, se puede cotizar.',
      },
      {
        q: '¿Qué filtros se pueden incluir?',
        a: 'Tipo de propiedad, comuna o sector, rango de precio, dormitorios, baños, superficie y estado. Los definimos según su cartera y lo que realmente use su cliente.',
      },
      {
        q: '¿Incluye mapa?',
        a: 'Sí, con la ubicación referencial de cada propiedad. Si necesita mapas interactivos con polígonos o capas especiales, se evalúa y se cotiza.',
      },
      {
        q: '¿Se puede integrar con portales inmobiliarios?',
        a: 'Algunos portales permiten importar o exportar propiedades. La integración depende del portal y de su documentación técnica, por eso se cotiza aparte.',
      },
      {
        q: '¿Puedo mostrar un tour virtual?',
        a: 'Sí, si usted entrega el enlace del tour. La producción del tour, las fotos y el video no están incluidos.',
      },
      {
        q: '¿Cuánto demora?',
        a: 'Depende de la cantidad de propiedades, filtros y funcionalidades. Un sitio con cartera simple puede estar listo en pocas semanas; uno con mapas avanzados o integraciones requiere más tiempo.',
      },
    ],
    relatedTitle: 'Otros tipos de sitio que le pueden servir',
    related: [
      {
        title: 'Sitio corporativo',
        text: 'Si necesita presentar la corredora, su equipo y sus servicios.',
        href: '/sitios-web/sitio-corporativo/',
      },
      {
        title: 'Sitio a medida',
        text: 'Si necesita integrar su cartera con un sistema o portal externo.',
        href: '/sitios-web/sitio-a-medida/',
      },
      {
        title: 'One Page',
        text: 'Si maneja pocas propiedades y prefiere una página simple.',
        href: '/sitios-web/one-page/',
      },
    ],
    mockup: 'inmobiliario',
    accent: 'ok',
    ...cotizar,
    secondaryLabel: whatsapp.label,
    secondaryHref: whatsapp.href,
  },
  {
    slug: 'sitio-a-medida',
    kind: 'sitio',
    name: 'Sitio a medida',
    h1: 'Desarrollo web a medida para procesos especiales',
    metaTitle: 'Desarrollo web a medida en Chile | Fractal Host',
    metaDescription:
      'Calculadoras, catálogos B2B, áreas privadas e integraciones. Desarrollo web a medida para procesos que no caben en una plantilla.',
    kicker: 'Cuando la plantilla no alcanza',
    intro:
      'Cuando la plantilla no alcanza: calculadoras, catálogos B2B, áreas privadas, integraciones y flujos que su negocio necesita. Lo diseñamos desde el proceso, no desde un tema comprado.',
    heroBullets: [
      'Levantamiento del proceso',
      'Desarrollo con WordPress y ACF',
      'Integraciones con sus sistemas',
    ],
    specs: [
      { label: 'Plazo', value: 'Según alcance' },
      { label: 'Base', value: 'WordPress + ACF' },
      { label: 'Administrable', value: 'Sí' },
      { label: 'Incluye', value: 'Documentación y capacitación' },
    ],
    audienceTitle: 'Para quién es un desarrollo a medida',
    audience: [
      {
        title: 'Empresas con procesos propios',
        text: 'Necesitan una herramienta web que siga su forma de trabajar, no una plantilla que los obligue a cambiar.',
        icon: 'settings',
      },
      {
        title: 'Catálogos B2B y distribuidores',
        text: 'Manejan listas de precios, clientes, stock o pedidos que no caben en una tienda estándar.',
        icon: 'briefcase',
      },
      {
        title: 'Instituciones y proyectos especiales',
        text: 'Requieren postulaciones, fichas, paneles de consulta o áreas privadas con permisos.',
        icon: 'building',
      },
    ],
    featuresTitle: 'Qué incluye un desarrollo a medida',
    features: [
      {
        title: 'Levantamiento del proceso',
        text: 'Entendemos cómo trabaja hoy, qué datos se usan y qué tiene que pasar para que la herramienta sirva.',
        icon: 'search',
      },
      {
        title: 'Diseño de experiencia',
        text: 'Armamos el flujo y las pantallas para que la herramienta sea clara, incluso si el proceso es complejo.',
        icon: 'palette',
      },
      {
        title: 'Desarrollo a medida',
        text: 'Programamos las funciones necesarias sobre WordPress, con campos personalizados y lógica propia.',
        icon: 'code',
      },
      {
        title: 'Áreas privadas',
        text: 'Accesos con roles y permisos para que cada usuario vea solo lo que le corresponde.',
        icon: 'lock',
      },
      {
        title: 'Integraciones',
        text: 'Conexión con APIs, sistemas de facturación, CRM, ERP o servicios externos, según lo que exista.',
        icon: 'link',
      },
      {
        title: 'Documentación y capacitación',
        text: 'Le explicamos cómo funciona, qué puede administrar y qué requiere soporte técnico.',
        icon: 'file',
      },
    ],
    processTitle: 'Cómo se desarrolla un proyecto a medida',
    process: [
      {
        n: '01',
        title: 'Descubrimiento',
        text: 'Revisamos el proceso, los usuarios, los datos y las restricciones técnicas. Definimos el alcance.',
      },
      {
        n: '02',
        title: 'Prototipo',
        text: 'Armamos un flujo navegable para validar la lógica antes de programar. Ahí se corrigen supuestos.',
      },
      {
        n: '03',
        title: 'Desarrollo por etapas',
        text: 'Construimos por módulos, con entregas revisables. Probamos con datos reales y ajustamos.',
      },
      {
        n: '04',
        title: 'Puesta en marcha',
        text: 'Migración, pruebas finales, documentación y capacitación del equipo que usará la herramienta.',
      },
    ],
    notIncludedTitle: 'Qué no incluye',
    notIncluded: [
      'Licencias de software de terceros, servicios en la nube o costos de APIs.',
      'Hardware, equipos o infraestructura interna.',
      'Soporte de sistemas externos que no administramos.',
      'Mantención evolutiva continua, salvo que se contrate aparte.',
    ],
    faqs: [
      {
        q: '¿Qué tipo de proyectos se pueden hacer?',
        a: 'Calculadoras de precios, catálogos B2B con listas por cliente, postulaciones, paneles de consulta, áreas privadas, integraciones con CRM o facturación y flujos internos. Si el proceso se puede describir, lo evaluamos.',
      },
      {
        q: '¿Cuánto demora?',
        a: 'Depende del alcance. Un módulo simple puede tomar pocas semanas; un sistema con varias integraciones y roles requiere más tiempo. Después del levantamiento entregamos una carta Gantt con etapas.',
      },
      {
        q: '¿Se puede integrar con mi sistema actual?',
        a: 'Sí, siempre que el sistema tenga una API, base de datos accesible o un mecanismo de exportación. Revisamos la documentación y la viabilidad antes de cotizar.',
      },
      {
        q: '¿Puedo administrarlo yo?',
        a: 'Las partes que tengan sentido se entregan administrables con WordPress y ACF. Las funciones críticas quedan documentadas y con soporte. No todo se puede tocar sin riesgo, y se lo explicamos desde el inicio.',
      },
      {
        q: '¿Incluye soporte?',
        a: 'La entrega incluye una garantía de 30 días para corregir errores del desarrollo. Después se puede contratar mantención o soporte por horas, según lo que necesite.',
      },
      {
        q: '¿Cómo se cotiza?',
        a: 'Con un levantamiento del proceso. No cotizamos a ciegas: primero entendemos qué tiene que hacer la herramienta, quién la va a usar y con qué sistemas se tiene que conectar.',
      },
    ],
    relatedTitle: 'Otros tipos de sitio que le pueden servir',
    related: [
      {
        title: 'Sitio corporativo',
        text: 'Si la base es presentar la empresa y sus servicios, sin procesos complejos.',
        href: '/sitios-web/sitio-corporativo/',
      },
      {
        title: 'Tienda online',
        text: 'Si el proceso principal es vender productos con catálogo y pagos.',
        href: '/sitios-web/tienda-online/',
      },
      {
        title: 'Reserva de horas',
        text: 'Si necesita una agenda especializada con reglas propias.',
        href: '/sitios-web/reserva-de-horas/',
      },
    ],
    mockup: 'medida',
    accent: 'cy',
    ...cotizar,
    secondaryLabel: whatsapp.label,
    secondaryHref: whatsapp.href,
  },
];
