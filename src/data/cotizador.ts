/* Datos base del cotizador de sitios web — Fractal Host */

/* Precio oficial del dominio .cl según tarifas vigentes de NIC Chile:
   $9.990 anual (exento de IVA) — nic.cl/dominios/tarifas.html
   Si el dominio se registra/administra con nosotros, el valor es el doble. */
export const DOMINIO_NIC = 9990;
export const DOMINIO_FH = DOMINIO_NIC * 2;

export const TIPOS = [
  {id:'corp',      insignia:'★ El más elegido', nombre:'Sitio corporativo', desc:'La casa digital de tu empresa: servicios, quiénes somos y contacto.', plazo:'5 días a 2 semanas',
   icon:'<path d="M3 21h18M5 21V7l7-4 7 4v14"/><path d="M9 21v-4h6v4M9 10h.01M12 10h.01M15 10h.01M9 13h.01M12 13h.01M15 13h.01"/>'},
  {id:'onepage',   insignia:'★ 2° más elegido', nombre:'Tarjeta digital / One Page', desc:'Una sola página, directa al grano: quién eres, qué haces y cómo contactarte.', plazo:'24 a 48 horas',
   icon:'<rect x="8" y="3" width="8" height="18" rx="2"/><path d="M10 7h4M10 11h4M11 17h2"/>'},
  {id:'ecommerce', insignia:null, nombre:'Tienda virtual', desc:'Catálogo, carrito y pagos seguros. Tu negocio vendiendo 24/7.', plazo:'Desde 3 semanas',
   icon:'<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M3 4h2l2.5 12h11L21 8H6"/><path d="M12 8v4M10 10h4"/>'},
  {id:'reservas',  insignia:null, nombre:'Reservas / Booking y Turismo', desc:'Agenda de horas, alojamientos, tours y experiencias. Ideal para servicios y turismo en la Patagonia.', plazo:'3 a 5 semanas',
   icon:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18M9 15h2v2H9z"/>'},
  {id:'eventos',   insignia:null, nombre:'Eventos y tickets', desc:'Difunde tu feria o concierto y vende entradas con control QR.', plazo:'2 a 4 semanas',
   icon:'<path d="M4 8a2 2 0 002-2h12a2 2 0 002 2v3a2 2 0 000 2v3a2 2 0 00-2 2H6a2 2 0 00-2-2v-3a2 2 0 000-2V8z"/><path d="M13 6v2M13 11v2M13 16v2"/>'},
  {id:'miembros',  insignia:null, nombre:'Área de miembros', desc:'Portal privado con usuario y contraseña para clientes, socios o tu equipo.', plazo:'Desde 3 semanas',
   icon:'<circle cx="10" cy="8" r="3"/><path d="M4 20c0-3.2 2.7-5 6-5 1.2 0 2.3.2 3.2.6"/><rect x="14" y="14" width="7" height="6" rx="1.5"/><path d="M16 14v-1.5a1.5 1.5 0 013 0V14"/>'},
  {id:'corredora', insignia:null, nombre:'Corredora de propiedades', desc:'Publica propiedades en venta y arriendo, con fotos y fichas claras.', plazo:'2 a 4 semanas',
   icon:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h5v-6h4v6h5V10"/><path d="M12 7.5h.01"/>'},
  {id:'medida',    insignia:null, nombre:'Proyecto a medida', desc:'Un sistema único para tu negocio. Lo conversamos contigo.', plazo:'A convenir',
   icon:'<path d="M14.7 6.3a4 4 0 00-5.4 5.4L4 17v3h3l5.3-5.3a4 4 0 005.4-5.4l-2.7 2.7-2-2 2.7-2.7z"/>'},
  {id:'rediseno',  nombre:'Rediseño de sitio', plazo:'Según el tipo de sitio'},
  {id:'mantencion',nombre:'Mantención web', plazo:'Activación en 24 a 48 h'}
];

export const DETALLES: Record<string, any> = {
  corp: {
    titulo:'¿Cuánto contenido tendrá tu sitio?',
    intro:'Mientras más páginas, más espacio para mostrar tu empresa completa.',
    desde:120000, asegura:true,
    opciones:[
      {id:'c4', nombre:'Hasta 4 páginas', desc:'Lo esencial: inicio, servicios, quiénes somos y contacto.', tag:'Conveniente'},
      {id:'c8', nombre:'Entre 5 y 8 páginas', desc:'Para sumar galería, proyectos, sucursales o preguntas frecuentes.', tag:null, badge:'más contenido'},
      {id:'c9', nombre:'9 páginas o más', desc:'Empresas con varias áreas o mucho material por mostrar.', tag:null, badge:'proyecto grande'}
    ],
    extra:{label:'Quiero administrarlo yo mismo', desc:'Lo construimos en WordPress y te hacemos una clase en vivo para que aprendas a editarlo. Es un desarrollo más complejo.', badge:'administrable · costo mayor'}
  },
  onepage: {
    titulo:'Elige el formato exacto',
    intro:'Son sitios estáticos: cargan al instante, son muy seguros y no necesitan mantención. Listos en 24 a 48 horas.',
    desde:60000, asegura:true,
    opciones:[
      {id:'onepagec', nombre:'One Page completa', desc:'Una página con secciones completas: inicio, servicios, nosotros y contacto.', tag:'Popular'},
      {id:'tarjeta',  nombre:'Tarjeta digital', desc:'Lo esencial en una pantalla: nombre, rubro y botón de contacto.', tag:null},
      {id:'enlaces',  nombre:'Concentrador de enlaces', desc:'Tu versión de Linktree, pero con tu marca y tu propio dominio.', tag:null},
      {id:'landing',  nombre:'Landing de venta', desc:'Una página enfocada en un solo objetivo: que te contacten o compren.', tag:null}
    ]
  },
  ecommerce: {
    titulo:'¿Cuántos productos venderás?',
    intro:'La tienda incluye catálogo, carrito y pagos. Es nuestro proyecto más completo.',
    estimacion:'Se cotiza según tu proyecto',
    opciones:[
      {id:'e20',  nombre:'Hasta 20 productos', desc:'Ideal para partir con una carta acotada.', tag:'Popular'},
      {id:'e100', nombre:'Entre 21 y 100 productos', desc:'Catálogo mediano, con categorías y filtros.', tag:null, badge:'catálogo mediano'},
      {id:'e999', nombre:'Más de 100 productos', desc:'Lo cotizamos a medida según tu catálogo.', tag:null, badge:'a medida'}
    ]
  },
  reservas: {
    titulo:'¿Qué se reserva en tu negocio?',
    intro:'Desde horas de consulta hasta tours en la Patagonia: agenda, calendario y contacto directo.',
    estimacion:'Se cotiza según tu proyecto',
    opciones:[
      {id:'horas',   nombre:'Horas y consultas', desc:'Consultorios, asesorías y profesionales: agenda por bloques de tiempo.', tag:'Popular'},
      {id:'aloja',   nombre:'Alojamiento', desc:'Cabañas, hoteles y hostel: disponibilidad por fecha y temporada.', tag:null, badge:'calendario avanzado'},
      {id:'tours',   nombre:'Tours y excursiones', desc:'Programas, tarifas y salidas para turismo en la Patagonia.', tag:null},
      {id:'exp',     nombre:'Experiencias y actividades', desc:'Kayak, trekking, fotografía… páginas que venden la experiencia.', tag:null},
      {id:'servicios', nombre:'Servicios generales', desc:'Arriendo de espacios, clases, transporte u otros servicios con agenda.', tag:null}
    ],
    extra:{label:'Quiero cobrar las reservas con pago en línea', desc:'Integramos pagos con Flow: tarjetas hasta en 3 cuotas, débito y transferencia.', badge:'pagos en línea · costo mayor'}
  },
  eventos: {
    titulo:'¿Qué tipo de evento es?',
    intro:'Adaptamos el sitio al formato de tu evento.',
    estimacion:'Se cotiza según tu proyecto',
    opciones:[
      {id:'feria',     nombre:'Feria o expo', desc:'Programa, expositores, ubicación e inscripciones.', tag:'Popular'},
      {id:'concierto', nombre:'Concierto o fiesta', desc:'Lineup, valores, redes del evento y venta de entradas.', tag:null},
      {id:'congreso',  nombre:'Congreso o conferencia', desc:'Charlas, relatores, programa por día y formularios.', tag:null},
      {id:'taller',    nombre:'Taller o workshop', desc:'Página directa con cupos, valores e inscripción.', tag:null}
    ],
    extra:{label:'Quiero vender entradas con control QR', desc:'Sumamos el sistema de tickets digitales con validación por código QR en la puerta.', badge:'tickets · costo mayor'}
  },
  miembros: {
    titulo:'¿Para quién será el acceso privado?',
    intro:'Creamos un área con usuario y contraseña, donde cada persona ve solo lo que le corresponde.',
    estimacion:'Se cotiza según tu proyecto',
    nota:'Este proyecto es más avanzado que un sitio tradicional: el acceso privado implica desarrollo adicional (costo mayor).',
    opciones:[
      {id:'clientes',    nombre:'Portal de clientes', desc:'Documentos, estados de cuenta o avances para tus clientes.', tag:'Popular'},
      {id:'socios',      nombre:'Asociaciones y clubes', desc:'Socios con acceso a noticias, documentos y beneficios.', tag:null},
      {id:'estudiantes', nombre:'Cursos y capacitaciones', desc:'Material privado para alumnos o equipos de trabajo.', tag:null},
      {id:'equipo',      nombre:'Uso interno de empresa', desc:'Intranet simple con recursos para tu propio equipo.', tag:null}
    ]
  },
  corredora: {
    titulo:'¿Cómo quieres mostrar tus propiedades?',
    intro:'Una ficha clara por propiedad: fotos, características y contacto directo contigo.',
    estimacion:'Se cotiza según tu proyecto',
    opciones:[
      {id:'catalogo', nombre:'Catálogo de propiedades', desc:'Lista de propiedades en venta y arriendo con fotos y fichas.', tag:'Popular'},
      {id:'filtros',  nombre:'Con buscador y filtros', desc:'Tus clientes buscan por zona, precio y características.', tag:null, badge:'más avanzado'},
      {id:'portal',   nombre:'Con portal de propietarios', desc:'Acceso privado para que los dueños vean su propiedad y su estado.', tag:null, badge:'acceso privado · costo mayor'}
    ]
  },
  rediseno:{ especial:true, estimacion:'Se cotiza según tu proyecto' },
  mantencion:{ especial:true, estimacion:'Se cotiza según tu sitio' },
  medida:null
};

export const PLANES: Record<string, any[]> = {
  usa: [
    {id:'starter1', nombre:'Starter 1', gb:'1,5 GB', correos:'3 correos',  precio:39990},
    {id:'starter2', nombre:'Starter 2', gb:'2,5 GB', correos:'5 correos',  precio:49990},
    {id:'starter3', nombre:'Starter 3', gb:'4 GB',   correos:'12 correos', precio:69990},
    {id:'pro1',     nombre:'Pro 1',     gb:'8 GB',   correos:'20 correos', precio:86990},
    {id:'pro2',     nombre:'Pro 2',     gb:'15 GB',  correos:'Ilimitados', precio:109990},
    {id:'master1',  nombre:'Master 1',  gb:'50 GB',  correos:'Ilimitados', precio:179990}
  ],
  nacional: [
    {id:'austral',  nombre:'Austral',      gb:'1,5 GB', correos:'3 correos',  precio:49990},
    {id:'glaciar',  nombre:'Glaciar',      gb:'2,5 GB', correos:'5 correos',  precio:69990},
    {id:'fiordo',   nombre:'Fiordo',       gb:'4 GB',   correos:'12 correos', precio:89990},
    {id:'fiordoX',  nombre:'Fiordo Extra', gb:'8 GB',   correos:'20 correos', precio:129990}
  ]
};

export const EQUIV_PLAN: Record<string, string> = {
  starter1:'austral', starter2:'glaciar', starter3:'fiordo', pro1:'fiordoX', pro2:'fiordoX', master1:'fiordoX',
  austral:'starter1', glaciar:'starter2', fiordo:'starter3', fiordoX:'pro1'
};

export const HOSTING_TIPO: Record<string, any> = {
  onepage:{usa:'starter1',nacional:'austral'}, corp:{usa:'starter2',nacional:'austral'},
  ecommerce:{usa:'starter2',nacional:'glaciar'}, eventos:{usa:'starter2',nacional:'glaciar'},
  reservas:{usa:'starter3',nacional:'fiordo'}, miembros:{usa:'starter3',nacional:'fiordo'},
  corredora:{usa:'pro1',nacional:'fiordoX'}, medida:null
};

export const ADICIONALES = [
  {id:'premium', cat:'Premium High-End', nombre:'Sitio Web Enterprise / Premium', desc:'Animaciones avanzadas, gráficos interactivos, elementos visuales a medida y diseño de alto impacto para proyectos de gran envergadura.',
   icon:'<path d="M12 3l1.7 4.6L18 9.3l-4.3 1.7L12 15.6l-1.7-4.6L6 9.3l4.3-1.7L12 3z"/><path d="M18.5 15.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8z"/>'},
  {id:'seo', cat:'SEO', nombre:'SEO Avanzado / Estrategia de Posicionamiento', desc:'Auditoría de palabras clave, optimización de estructura y estrategia de contenidos para alcanzar las primeras posiciones de Google.',
   icon:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="M21 21l-5-5"/><path d="M7.5 11.5l2-2.5 1.8 1.5 2.7-3"/>'},
  {id:'forms', cat:'Formularios y Procesos', nombre:'Formularios, Encuestas o Cotizadores adicionales', desc:'El sitio incluye 1 formulario sin costo. Marca aquí si necesitas formularios extra, encuestas con lógica condicional o cotizadores complejos.',
   icon:'<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h3"/>'},
  {id:'procesos', cat:'Formularios y Procesos', nombre:'Digitalización de Procesos Internos', desc:'Adaptación de formularios específicos para automatizar solicitudes, trámites o flujos de trabajo de tu empresa.',
   icon:'<rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/><path d="M10 7.5h5a2.5 2.5 0 012.5 2.5v3M14 16.5H9a2.5 2.5 0 01-2.5-2.5v-3"/>'},
  {id:'docs', cat:'Archivos y Reservas', nombre:'Gestor de Documentos o Descargas', desc:'Sección organizada para subir y categorizar catálogos PDF, fichas técnicas, circulares o certificados descargables.',
   icon:'<path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"/><path d="M12 11v6M9.5 14.5L12 17l2.5-2.5"/>'},
  {id:'booking', cat:'Archivos y Reservas', nombre:'Sistema de Reservas / Booking Simple', desc:'Calendario de agendamiento básico para citas, consultas o reservas de horas de forma directa.',
   icon:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/><path d="M9.5 15l1.8 1.8L15 13"/>'},
  {id:'idiomas', cat:'Idiomas', nombre:'Sitio Multilenguaje Automatizado (180+ Idiomas)', desc:'Integración con Google Translate para traducir tu sitio al instante a más de 180 idiomas con un selector dinámico.',
   icon:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 4 5.6 4 9s-1.5 6.4-4 9c-2.5-2.6-4-5.6-4-9s1.5-6.4 4-9z"/>'},
  {id:'mapas', cat:'Ubicación y Accesibilidad', nombre:'Ubicación y Mapas Interactivos', desc:'Integración de Google Maps con múltiples sucursales, direcciones y enlaces directos a Waze o GPS.',
   icon:'<path d="M12 21s-7-5.5-7-11a7 7 0 0114 0c0 5.5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>'},
  {id:'accesibilidad', cat:'Ubicación y Accesibilidad', nombre:'Widget de Accesibilidad Web (Inclusión Visual)', desc:'Herramientas para personas con discapacidad visual o reducida: tamaño de letra, alto contraste y lectura de pantalla.',
   icon:'<circle cx="12" cy="5" r="2"/><path d="M4 9.5c2.7.8 5.3 1.2 8 1.2s5.3-.4 8-1.2"/><path d="M12 10.7v3.3l2.8 5.5M12 14l-2.8 5.5"/>'}
];

export const INCLUIDOS = [
  {nombre:'SEO Básico de fábrica', desc:'Indexación inicial en Google, optimización de etiquetas base y velocidad de carga.'},
  {nombre:'Integración con Redes Sociales y Multimedia', desc:'Conexión para incrustar videos (ej. YouTube) y enlazar tus perfiles sociales sin costo adicional.'},
  {nombre:'1 Formulario Personalizado', desc:'Formulario de contacto base, cotización estándar o solicitud adaptado a tu proyecto.'},
  {nombre:'Botonera y Chat de WhatsApp Business', desc:'Botón flotante preconfigurado para contacto directo y rápido de tus clientes.'},
  {nombre:'Pop-ups, Banners y Sliders', desc:'Banners promocionales, avisos emergentes o carruseles de imágenes para destacar ofertas o novedades.'},
  {nombre:'Métricas con Google Analytics', desc:'Configuración de seguimiento básico con Google Analytics 4 para medir tus visitas.'}
];

export const ARCHIVOS_PERMITIDOS = ['pdf','doc','docx','xls','xlsx','txt','jpg','jpeg','png','webp'];
export const AUTOSAVE_KEY = 'fhCotV7';

export const FALLAS_REDISENO = ['Se ve antiguo','Es lento','No se ve bien en el celular','No puedo editarlo','Otro'];
export const PROBLEMAS_MANT = ['Lentitud','Fallas o caídas','Ha sufrido ataques','Ninguno'];
