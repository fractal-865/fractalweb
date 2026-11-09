import { paginasSitios, type PageData } from './paginas-sitios';

export const paginasServicios: PageData[] = [
  {
    slug: 'hosting-global',
    kind: 'hosting',
    host: 'global',
    name: 'Hosting Global',
    h1: 'Hosting Global con cPanel para WordPress',
    metaTitle: 'Hosting Global con cPanel para WordPress | Fractal Host',
    metaDescription:
      'Hosting con cPanel, LiteSpeed, SSD NVMe, SSL, correos y respaldos diarios. Planes desde $39.990 al año, con migración gratis y soporte directo.',
    kicker: 'cPanel · Datacenter EE. UU.',
    intro:
      'Servidores en Estados Unidos con cPanel, LiteSpeed, SSD NVMe, SSL, correos y respaldos diarios. La opción estándar para la mayoría de los sitios, con migración gratis y soporte directo.',
    heroBullets: [
      'cPanel completo en español',
      'LiteSpeed Enterprise y SSD NVMe',
      'Migración gratis desde su proveedor actual',
    ],
    specs: [
      { label: 'Panel', value: 'cPanel' },
      { label: 'Datacenter', value: 'Estados Unidos' },
      { label: 'Desde', value: '$39.990 / año' },
      { label: 'Migración', value: 'Gratis' },
    ],
    audienceTitle: 'Para quién es el Hosting Global',
    audience: [
      {
        title: 'Sitios WordPress',
        text: 'La mayoría de los proyectos funcionan bien con esta línea: cPanel, LiteSpeed y una configuración pensada para WordPress.',
        icon: 'code',
      },
      {
        title: 'Pymes y profesionales',
        text: 'Negocios que necesitan sitio, correos y bases de datos en un panel conocido, sin pagar infraestructura que no usan.',
        icon: 'briefcase',
      },
      {
        title: 'Agencias y desarrolladores',
        text: 'Equipos que administran varios sitios y necesitan cPanel, acceso técnico y una migración ordenada.',
        icon: 'users',
      },
    ],
    featuresTitle: 'Qué incluye el Hosting Global',
    features: [
      {
        title: 'Panel cPanel',
        text: 'Administre archivos, correos, bases de datos, dominios y certificados desde un solo lugar.',
        icon: 'settings',
      },
      {
        title: 'LiteSpeed Enterprise',
        text: 'Servidor web optimizado para WordPress, con caché y reglas de rendimiento configuradas.',
        icon: 'gauge',
      },
      {
        title: 'Disco SSD NVMe',
        text: 'Almacenamiento más rápido que un disco tradicional, para que el sitio responda mejor.',
        icon: 'server',
      },
      {
        title: 'SSL incluido',
        text: 'Certificado de seguridad activo para que su sitio funcione con HTTPS desde el primer día.',
        icon: 'lock',
      },
      {
        title: 'Correos y bases de datos',
        text: 'Cuentas de correo con su dominio y bases de datos MySQL según el plan que elija.',
        icon: 'mail',
      },
      {
        title: 'Respaldos y protección',
        text: 'Copias de seguridad diarias y protección contra malware con Imunify360.',
        icon: 'shield',
      },
    ],
    processTitle: 'Cómo empieza con el Hosting Global',
    process: [
      {
        n: '01',
        title: 'Elija el plan',
        text: 'Revise espacio, transferencia, correos y bases de datos. Si no sabe cuál sirve, lo orientamos.',
      },
      {
        n: '02',
        title: 'Contrata en línea',
        text: 'Pagas con Flow o transferencia. La cuenta se activa y recibes los accesos del área de clientes.',
      },
      {
        n: '03',
        title: 'Migramos',
        text: 'Con los accesos de su hosting actual, movemos sitio, correos y bases de datos sin costo.',
      },
      {
        n: '04',
        title: 'Verificamos',
        text: 'Probamos el sitio, el correo y el SSL. Ajustamos lo necesario y quedas con acceso a cPanel.',
      },
    ],
    notIncludedTitle: 'Qué no incluye',
    notIncluded: [
      'El dominio .cl se registra o renueva aparte, salvo que contrate un sitio web con nosotros.',
      'Desarrollo, rediseño o carga de contenidos del sitio.',
      'Configuración de Outlook o Gmail en dispositivos, salvo la excepción de hasta dos casillas en remoto.',
      'Licencias de plugins, plantillas o software de terceros.',
    ],
    faqs: [
      {
        q: '¿Por qué el datacenter está en Estados Unidos?',
        a: 'Es una infraestructura estable y con buena conectividad internacional. Para la mayoría de los sitios funciona bien. Si su público está concentrado en Chile y necesita la menor latencia posible, conviene el Hosting Cono Sur.',
      },
      {
        q: '¿Es lento para visitantes de Chile?',
        a: 'No es lento, pero un servidor en el Cono Sur responde más rápido. La diferencia ronda entre 150 y 200 ms menos de ping. Si el sitio está bien optimizado, la experiencia es buena en ambas líneas.',
      },
      {
        q: '¿Puedo migrar mi sitio actual?',
        a: 'Sí, si su proveedor actual usa cPanel. La migración es gratuita y no necesita contratar un técnico aparte: con los accesos del hosting de origen movemos sitio, correos y bases de datos.',
      },
      {
        q: '¿Incluye correos corporativos?',
        a: 'Sí. Cada plan indica cuántas cuentas incluye. Configuramos las que necesite para que funcionen en Gmail, Outlook, Thunderbird o el celular.',
      },
      {
        q: '¿Qué pasa si mi sitio crece?',
        a: 'Puede subir de plan dentro de la misma línea, sin cambiar de proveedor ni volver a migrar. Si necesita más recursos, se calcula la diferencia y se ajusta la cuenta.',
      },
      {
        q: '¿Cómo se renueva?',
        a: 'El servicio se renueva cada 12 meses. Enviamos un recordatorio 15 días antes. Si pasan 15 días de vencido, se suspende; a los 120 días sin pago, el sitio se elimina.',
      },
    ],
    relatedTitle: 'Servicios relacionados',
    related: [
      {
        title: 'Hosting Cono Sur',
        text: 'Si necesita la menor latencia para visitantes de Chile.',
        href: '/hosting-cono-sur/',
      },
      {
        title: 'Correo corporativo',
        text: 'Para dejar las cuentas con su dominio configuradas y probadas.',
        href: '/correo-corporativo/',
      },
      {
        title: 'Migración de sitio y correos',
        text: 'Para mover su sitio desde otro proveedor sin cortes.',
        href: '/migracion/',
      },
    ],
    mockup: 'hosting',
    accent: 'cy',
    ctaLabel: 'Ver planes y contratar',
    ctaHref: 'https://clientes.fractalhost.cl/store/planes',
    secondaryLabel: 'Hablar por WhatsApp',
    secondaryHref: 'https://wa.me/56954132014?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20el%20Hosting%20Global',
  },
  {
    slug: 'hosting-cono-sur',
    kind: 'hosting',
    host: 'conosur',
    name: 'Hosting Cono Sur',
    h1: 'Hosting Cono Sur: más rápido para visitantes de Chile',
    metaTitle: 'Hosting Cono Sur de baja latencia | Fractal Host',
    metaDescription:
      'Servidores en el Cono Sur con hasta 200 ms menos de ping para visitantes de Chile. Panel Ferozo, SSL, respaldos y migración gratis.',
    kicker: 'Panel Ferozo · Baja latencia',
    intro:
      'Servidores en el Cono Sur con Panel Ferozo. Entre 150 y 200 ms menos de ping que un datacenter en Estados Unidos, para sitios con público en Chile.',
    heroBullets: [
      'Entre 150 y 200 ms menos de ping',
      'Panel Ferozo en español',
      'Migración gratis y sin cortes',
    ],
    specs: [
      { label: 'Panel', value: 'Ferozo' },
      { label: 'Servidores', value: 'Cono Sur' },
      { label: 'Desde', value: '$49.990 / año' },
      { label: 'Latencia', value: '~60 ms en Chile' },
    ],
    audienceTitle: 'Para quién es el Hosting Cono Sur',
    audience: [
      {
        title: 'Negocios con público chileno',
        text: 'Si la mayoría de sus visitantes está en Chile, la cercanía del servidor se nota en la velocidad de carga.',
        icon: 'globe',
      },
      {
        title: 'WordPress y sitios livianos',
        text: 'Sitios que necesitan responder rápido sin pagar la complejidad de un servidor dedicado.',
        icon: 'code',
      },
      {
        title: 'Pymes de la Patagonia',
        text: 'Negocios locales que quieren una experiencia ágil para sus clientes y para ellos mismos al administrar.',
        icon: 'building',
      },
    ],
    featuresTitle: 'Qué incluye el Hosting Cono Sur',
    features: [
      {
        title: 'Servidor en el Cono Sur',
        text: 'Infraestructura geográficamente más cerca de Chile, con menor tiempo de respuesta.',
        icon: 'gauge',
      },
      {
        title: 'Panel Ferozo',
        text: 'Una interfaz simple, en español, para administrar el sitio, los correos y las bases de datos.',
        icon: 'settings',
      },
      {
        title: 'SSL incluido',
        text: 'Certificado activo para que el sitio funcione con HTTPS desde el primer día.',
        icon: 'lock',
      },
      {
        title: 'Respaldos diarios',
        text: 'Copias de seguridad de archivos y bases de datos, con 15 días disponibles para descarga.',
        icon: 'server',
      },
      {
        title: 'Optimizado para WordPress',
        text: 'Configuración de rendimiento y seguridad para que WordPress funcione sin fricción.',
        icon: 'code',
      },
      {
        title: 'Migración asistida',
        text: 'Movemos su sitio, correos y bases de datos desde cPanel o Ferozo, sin costo adicional.',
        icon: 'refresh',
      },
    ],
    processTitle: 'Cómo empieza con el Hosting Cono Sur',
    process: [
      {
        n: '01',
        title: 'Revisamos su caso',
        text: 'Vemos dónde está su público, cuánto espacio usa y si la latencia es un factor importante.',
      },
      {
        n: '02',
        title: 'Elija el plan',
        text: 'Austral, Glaciar, Fiordo o Fiordo Extra, según espacio, transferencia y correos.',
      },
      {
        n: '03',
        title: 'Migramos',
        text: 'Con los accesos del hosting actual, movemos el sitio y los correos a Ferozo.',
      },
      {
        n: '04',
        title: 'Probamos',
        text: 'Verificamos DNS, SSL, correos y velocidad. Le entregamos los accesos y lo acompañamos.',
      },
    ],
    notIncludedTitle: 'Qué no incluye',
    notIncluded: [
      'El dominio .cl se registra o renueva aparte, salvo que contrate un sitio web con nosotros.',
      'Desarrollo, rediseño o carga de contenidos.',
      'Configuración de dispositivos o respaldos locales, salvo la excepción de hasta dos casillas en remoto.',
      'Licencias de plugins o plantillas de terceros.',
    ],
    faqs: [
      {
        q: '¿Dónde están los servidores?',
        a: 'En el Cono Sur. La ubicación exacta depende de la infraestructura del proveedor, pero está pensada para reducir la distancia con Chile respecto de un datacenter en Estados Unidos.',
      },
      {
        q: '¿Por qué es más rápido?',
        a: 'Porque el viaje de los datos es más corto. En pruebas de ping, la diferencia con Estados Unidos ronda entre 150 y 200 ms menos. Eso se nota en la carga inicial y en la navegación.',
      },
      {
        q: '¿Qué es el Panel Ferozo?',
        a: 'Es un panel de control en español, más simple que cPanel y suficiente para administrar sitio, correos y bases de datos. No tiene todas las funciones de cPanel, pero cubre lo que la mayoría de los sitios necesita.',
      },
      {
        q: '¿Puedo migrar desde cPanel?',
        a: 'Sí. Movemos sitio, correos y bases de datos desde cPanel a Ferozo, o de Ferozo a Ferozo, con los accesos del hosting actual y sin costo adicional.',
      },
      {
        q: '¿Incluye correos corporativos?',
        a: 'Sí. Cada plan indica cuántas cuentas incluye. Las configuramos para que funcionen en Gmail, Outlook o el celular.',
      },
      {
        q: '¿Cómo se renueva?',
        a: 'Cada 12 meses, con aviso 15 días antes. Si pasan 15 días de vencido, el servicio se suspende; a los 120 días sin pago, el sitio se elimina.',
      },
    ],
    relatedTitle: 'Servicios relacionados',
    related: [
      {
        title: 'Hosting Global',
        text: 'Si necesita cPanel completo y un datacenter en Estados Unidos.',
        href: '/hosting-global/',
      },
      {
        title: 'Migración de sitio y correos',
        text: 'Para mover su sitio desde cPanel o Ferozo sin cortes.',
        href: '/migracion/',
      },
      {
        title: 'Correo corporativo',
        text: 'Para dejar las cuentas con su dominio configuradas y probadas.',
        href: '/correo-corporativo/',
      },
    ],
    mockup: 'conosur',
    accent: 'ok',
    ctaLabel: 'Ver planes Cono Sur',
    ctaHref: 'https://clientes.fractalhost.cl/store/enlace-nacional-patagonia-cloud-server',
    secondaryLabel: 'Hablar por WhatsApp',
    secondaryHref: 'https://wa.me/56954132014?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20el%20Hosting%20Cono%20Sur',
  },
  {
    slug: 'correo-corporativo',
    kind: 'servicio',
    name: 'Correo corporativo',
    h1: 'Correo corporativo con el nombre de su empresa',
    metaTitle: 'Correo corporativo con su dominio | Fractal Host',
    metaDescription:
      'Tenga contacto@suempresa.cl configurado en Gmail, Outlook o su celular. Correo corporativo incluido con su hosting, probado por nosotros.',
    kicker: 'Confianza en cada mensaje',
    intro:
      'Deje el Gmail personal. Tenga contacto@suempresa.cl, configurado y probado por nosotros en Gmail, Outlook o su celular. Un correo con su dominio cambia la percepción de su negocio en cada cotización.',
    heroBullets: [
      'Cuentas con su dominio',
      'Configuración incluida con el hosting',
      'Gmail, Outlook, Thunderbird o celular',
    ],
    specs: [
      { label: 'Incluido', value: 'Con su hosting' },
      { label: 'Protocolos', value: 'SMTP, IMAP y POP3' },
      { label: 'Google Workspace', value: 'Opcional' },
      { label: 'Soporte', value: 'Directo' },
    ],
    audienceTitle: 'Para quién es el correo corporativo',
    audience: [
      {
        title: 'Pymes que usan Gmail personal',
        text: 'Negocios que atienden con @gmail.com o @hotmail.com y necesitan verse más profesionales.',
        icon: 'mail',
      },
      {
        title: 'Profesionales y oficinas',
        text: 'Abogados, contadores, consultoras y oficinas que envían cotizaciones y documentos a diario.',
        icon: 'briefcase',
      },
      {
        title: 'Equipos con varias casillas',
        text: 'Empresas que necesitan cuentas por área, con copia, reenvío y acceso desde varios dispositivos.',
        icon: 'users',
      },
    ],
    featuresTitle: 'Qué incluye el correo corporativo',
    features: [
      {
        title: 'Cuentas con su dominio',
        text: 'contacto@, ventas@, administracion@ o las que necesite, con el nombre de su empresa.',
        icon: 'mail',
      },
      {
        title: 'Configuración completa',
        text: 'Creamos las cuentas, configuramos SMTP, IMAP o POP3 y probamos envío y recepción.',
        icon: 'settings',
      },
      {
        title: 'Funciona donde ya trabaja',
        text: 'Gmail, Outlook, Thunderbird o la app de correo del celular, sin cambiar de herramienta.',
        icon: 'smartphone',
      },
      {
        title: 'Antispam',
        text: 'Filtros activos para reducir correos basura y proteger la bandeja de entrada.',
        icon: 'shield',
      },
      {
        title: 'Pruebas reales',
        text: 'Verificamos que los correos lleguen, salgan y se vean bien antes de darlo por terminado.',
        icon: 'check',
      },
      {
        title: 'Google Workspace opcional',
        text: 'Si quiere la interfaz de Gmail con su dominio, hacemos toda la configuración técnica.',
        icon: 'globe',
      },
    ],
    processTitle: 'Cómo dejamos su correo funcionando',
    process: [
      {
        n: '01',
        title: 'Definimos las cuentas',
        text: 'Vemos qué casillas necesita, quién las usará y desde qué dispositivos las revisará.',
      },
      {
        n: '02',
        title: 'Creamos y configuramos',
        text: 'Creamos las cuentas, ajustamos DNS, antispam y protocolos. Si es Google Workspace, verificamos el dominio.',
      },
      {
        n: '03',
        title: 'Probamos',
        text: 'Enviamos y recibimos correos de prueba, revisamos spam y confirmamos que todo llegue.',
      },
      {
        n: '04',
        title: 'Le explicamos',
        text: 'Le mostramos cómo usarlo en cada dispositivo y cómo crear o cambiar una contraseña.',
      },
    ],
    notIncludedTitle: 'Qué no incluye',
    notIncluded: [
      'La licencia de Google Workspace se contrata directamente con Google.',
      'El dominio .cl se registra o renueva aparte, salvo que contrate un sitio web con nosotros.',
      'Migración masiva de correos antiguos, salvo que se cotice aparte.',
      'Configuración presencial en sus oficinas, salvo la excepción de hasta dos casillas en remoto.',
    ],
    faqs: [
      {
        q: '¿El correo viene incluido con el hosting?',
        a: 'Sí. Cada plan de hosting incluye una cantidad de cuentas. Nosotros las creamos y configuramos sin costo adicional. Si necesita más, se puede ampliar el plan.',
      },
      {
        q: '¿Puedo usar Gmail con mi dominio?',
        a: 'Sí. Puede usar Gmail como cliente de su correo con IMAP, o contratar Google Workspace para tener la interfaz completa de Gmail con su dominio. Son dos cosas distintas y se lo explicamos antes de elegir.',
      },
      {
        q: '¿Google Workspace incluye la licencia?',
        a: 'No. La licencia se paga directamente a Google. Nosotros hacemos la activación, la verificación del dominio, la configuración antispam, las pruebas y la revisión anual.',
      },
      {
        q: '¿Cuántas cuentas puedo tener?',
        a: 'Depende del plan de hosting. Starter 1 incluye 3, Starter 2 incluye 6 y los planes superiores tienen más. Si necesita un número específico, lo revisamos en la cotización.',
      },
      {
        q: '¿Pueden migrar mis correos antiguos?',
        a: 'Sí, si están en un servidor con IMAP o cPanel. La migración base incluye las cuentas y los correos. Si hay casillas muy pesadas o configuraciones especiales, se evalúa y se cotiza aparte.',
      },
      {
        q: '¿Qué pasa con el spam?',
        a: 'Activamos filtros antispam y revisamos que los correos legítimos no se bloqueen. Si después aparece spam, nos avisa y ajustamos las reglas.',
      },
    ],
    relatedTitle: 'Servicios relacionados',
    related: [
      {
        title: 'Hosting Global',
        text: 'El plan donde viven su sitio y sus cuentas de correo.',
        href: '/hosting-global/',
      },
      {
        title: 'Hosting Cono Sur',
        text: 'Si necesita correo y sitio con baja latencia en Chile.',
        href: '/hosting-cono-sur/',
      },
      {
        title: 'Migración de sitio y correos',
        text: 'Para mover las cuentas desde su proveedor actual.',
        href: '/migracion/',
      },
    ],
    mockup: 'correo',
    accent: 'cy',
    ctaLabel: 'Cotizar correo corporativo',
    ctaHref: '/cotizador/',
    secondaryLabel: 'Hablar por WhatsApp',
    secondaryHref: 'https://wa.me/56954132014?text=Hola%2C%20quiero%20configurar%20mi%20correo%20corporativo',
  },
  {
    slug: 'mantencion-web',
    kind: 'servicio',
    name: 'Mantención web',
    h1: 'Mantención web para WordPress',
    metaTitle: 'Mantención web para WordPress | Fractal Host',
    metaDescription:
      'Actualizaciones, respaldos, monitoreo 24/7, SSL y soporte directo para su sitio WordPress. Mantención web independiente del hosting.',
    kicker: 'Su sitio cuidado después de publicar',
    intro:
      'Un sitio no se termina cuando se publica. WordPress, sus plugins y el servidor necesitan actualizaciones constantes. La mantención es eso: alguien revisando su sitio para que siga rápido, seguro y sin sorpresas.',
    heroBullets: [
      'Actualizaciones probadas antes de aplicar',
      'Respaldos y monitoreo 24/7',
      'Soporte directo con quien administra su sitio',
    ],
    specs: [
      { label: 'Servicio', value: 'Independiente del hosting' },
      { label: 'Plataforma', value: 'WordPress' },
      { label: 'Monitoreo', value: '24/7' },
      { label: 'Soporte', value: 'Directo' },
    ],
    audienceTitle: 'Para quién es la mantención web',
    audience: [
      {
        title: 'Sitios WordPress activos',
        text: 'Negocios que publican, reciben consultas y no pueden darse el lujo de una caída o un hackeo.',
        icon: 'code',
      },
      {
        title: 'Pymes sin equipo técnico',
        text: 'Empresas que no tienen a alguien dedicado a revisar plugins, respaldos y seguridad.',
        icon: 'briefcase',
      },
      {
        title: 'Sitios que ya tuvieron problemas',
        text: 'Quienes vivieron una caída, un hackeo o una actualización que rompió algo y no quieren repetirlo.',
        icon: 'shield',
      },
    ],
    featuresTitle: 'Qué incluye la mantención web',
    features: [
      {
        title: 'Actualizaciones',
        text: 'WordPress, plugins y plantillas al día, probando que no rompan el diseño ni las funciones.',
        icon: 'refresh',
      },
      {
        title: 'Respaldos',
        text: 'Copias de seguridad periódicas de archivos y base de datos para restaurar rápido si algo falla.',
        icon: 'database',
      },
      {
        title: 'Monitoreo 24/7',
        text: 'Vigilancia de disponibilidad, intentos de ataque, malware y comportamiento anómalo.',
        icon: 'eye',
      },
      {
        title: 'SSL vigente',
        text: 'El certificado de seguridad activo y funcionando, sin que usted tenga que renovarlo.',
        icon: 'lock',
      },
      {
        title: 'Rendimiento',
        text: 'Revisión de velocidad, caché, imágenes pesadas y procesos que ralentizan el sitio.',
        icon: 'gauge',
      },
      {
        title: 'Resolución de vulneraciones',
        text: 'Si el sitio sufre un ataque o queda comprometido, lo reparamos como parte del servicio.',
        icon: 'shield',
      },
      {
        title: 'Reparación por mal uso',
        text: 'Si una edición errónea o un tercero genera una falla, la solucionamos. Si es grave, evaluamos el alcance.',
        icon: 'wrench',
      },
      {
        title: 'Soporte directo',
        text: 'Consultas por WhatsApp, correo o asistencia remota, atendidas por quien administra su sitio.',
        icon: 'users',
      },
    ],
    processTitle: 'Cómo funciona la mantención',
    process: [
      {
        n: '01',
        title: 'Diagnóstico',
        text: 'Revisamos el estado del sitio, plugins, respaldos, SSL y seguridad antes de empezar.',
      },
      {
        n: '02',
        title: 'Plan de trabajo',
        text: 'Definimos frecuencia, alcance y prioridades. Si hay algo urgente, se corrige primero.',
      },
      {
        n: '03',
        title: 'Ejecución periódica',
        text: 'Actualizamos, respaldamos, monitoreamos y revisamos rendimiento. Todo queda registrado.',
      },
      {
        n: '04',
        title: 'Reporte y soporte',
        text: 'Le informamos lo hecho y los riesgos detectados. Si algo falla, lo atendemos.',
      },
    ],
    notIncludedTitle: 'Qué no cubre la mantención',
    notIncluded: [
      'Edición o carga de contenido en sitios con panel propio: para eso lo capacitamos.',
      'Funcionalidades nuevas que no existían en el sitio original.',
      'Rediseños completos o cambios de estructura mayor.',
      'Licencias de plugins premium o plantillas de pago.',
    ],
    faqs: [
      {
        q: '¿Qué incluye exactamente?',
        a: 'Actualizaciones de WordPress, plugins y plantillas; respaldos; monitoreo 24/7; SSL vigente; revisión de rendimiento; resolución de vulneraciones; reparación de daños por mal uso; cambios menores de diseño; gestión de accesos y usuarios; y soporte directo.',
      },
      {
        q: '¿Qué no incluye?',
        a: 'La carga diaria de contenidos, funcionalidades nuevas y rediseños. Si su sitio tiene panel administrable, le enseñamos a editar; si necesita que lo hagamos nosotros, se cotiza aparte.',
      },
      {
        q: '¿Sirve si mi sitio no lo hicieron ustedes?',
        a: 'Sí, siempre que sea WordPress y podamos revisarlo. Primero hacemos un diagnóstico para ver el estado y si hay riesgos que corregir antes de tomar la mantención.',
      },
      {
        q: '¿Cada cuánto se hace?',
        a: 'Las actualizaciones críticas se revisan con frecuencia y los respaldos son periódicos. La frecuencia exacta depende del plan y del tipo de sitio; se define al contratar.',
      },
      {
        q: '¿Incluye limpieza si me hackean?',
        a: 'Para sitios desarrollados por nosotros y alojados con nosotros, la recuperación ante hackeos está incluida sin costo adicional. Para sitios de terceros, se evalúa el alcance y puede requerir el servicio de seguridad informática.',
      },
      {
        q: '¿Cuánto cuesta?',
        a: 'Depende del tamaño y la complejidad del sitio. No publicamos un precio único porque un sitio de cinco páginas no es lo mismo que una tienda con cientos de productos. Lo cotizamos después de revisar el sitio.',
      },
    ],
    relatedTitle: 'Servicios relacionados',
    related: [
      {
        title: 'Seguridad informática',
        text: 'Si su sitio ya fue hackeado o está marcado como peligroso.',
        href: '/seguridad-informatica/',
      },
      {
        title: 'Adecuación Ley 21.719',
        text: 'Para poner al día la privacidad y las cookies de su sitio.',
        href: '/ley-21719/',
      },
      {
        title: 'Hosting Global',
        text: 'Para alojar el sitio con cPanel, LiteSpeed y respaldos.',
        href: '/hosting-global/',
      },
    ],
    mockup: 'mantencion',
    accent: 'ok',
    ctaLabel: 'Cotizar mantención',
    ctaHref: '/cotizador/',
    secondaryLabel: 'Hablar por WhatsApp',
    secondaryHref: 'https://wa.me/56954132014?text=Hola%2C%20quiero%20cotizar%20mantenci%C3%B3n%20web',
  },
  {
    slug: 'seguridad-informatica',
    kind: 'servicio',
    name: 'Seguridad informática',
    h1: 'Seguridad informática y recuperación de sitios hackeados',
    metaTitle: 'Recuperación de sitios hackeados | Fractal Host',
    metaDescription:
      'Desinfectamos sitios hackeados o con malware, reforzamos la seguridad y le entregamos un informe claro. Atención directa y respaldo previo.',
    kicker: 'Emergencia y remediación',
    intro:
      'Si su sitio fue hackeado, infectado o marcado como peligroso, lo desinfectamos, reforzamos y dejamos documentado. No entregamos un informe automático: intervenimos el sitio y le explicamos qué encontramos y qué hicimos.',
    heroBullets: [
      'Respaldo previo a cualquier cambio',
      'Desinfección y refuerzo de seguridad',
      'Informe final en lenguaje claro',
    ],
    specs: [
      { label: 'Tipo', value: 'Emergencia' },
      { label: 'Plataforma', value: 'WordPress' },
      { label: 'Incluye', value: 'Desinfección y refuerzo' },
      { label: 'Entrega', value: 'Informe final' },
    ],
    audienceTitle: 'Para quién es este servicio',
    audience: [
      {
        title: 'Sitios hackeados o con malware',
        text: 'El sitio muestra contenido extraño, redirige a otras páginas o el antivirus del visitante lo bloquea.',
        icon: 'alert',
      },
      {
        title: 'Sitios marcados por Google',
        text: 'Aparece la advertencia de “sitio peligroso” y necesita limpiarlo y pedir la revisión.',
        icon: 'search',
      },
      {
        title: 'Negocios que no pueden perder confianza',
        text: 'Un sitio comprometido no es solo un problema técnico: afecta la imagen y la venta.',
        icon: 'shield',
      },
    ],
    featuresTitle: 'Qué incluye la recuperación',
    features: [
      {
        title: 'Respaldo previo',
        text: 'Antes de tocar cualquier archivo, generamos un respaldo completo del sitio y la base de datos.',
        icon: 'database',
      },
      {
        title: 'Desinfección',
        text: 'Eliminamos spam, troyanos y código malicioso en archivos, base de datos y correo.',
        icon: 'shield',
      },
      {
        title: 'Credenciales nuevas',
        text: 'Cambiamos contraseñas de base de datos, administración, FTP y panel de control.',
        icon: 'lock',
      },
      {
        title: 'Revisión de administradores',
        text: 'Verificamos que no existan cuentas creadas sin autorización durante el ataque.',
        icon: 'users',
      },
      {
        title: 'Reinstalación limpia',
        text: 'Reinstalamos WordPress y los plugins infectados desde repositorios oficiales.',
        icon: 'refresh',
      },
      {
        title: 'Refuerzo de seguridad',
        text: 'Ajustamos permisos, actualizamos versiones, instalamos protección y captcha anti-spam.',
        icon: 'wrench',
      },
      {
        title: 'Revisión del origen',
        text: 'Buscamos cómo ocurrió, cuando es identificable, para reducir el riesgo de que vuelva.',
        icon: 'search',
      },
      {
        title: 'Informe final',
        text: 'Un resumen simple de qué encontramos y qué hicimos, útil para reportar interna o externamente.',
        icon: 'file',
      },
    ],
    processTitle: 'Cómo intervenimos un sitio comprometido',
    process: [
      {
        n: '01',
        title: 'Diagnóstico urgente',
        text: 'Revisamos el sitio, los accesos, los archivos y la base de datos para dimensionar el problema.',
      },
      {
        n: '02',
        title: 'Respaldo y contención',
        text: 'Guardamos una copia completa y bloqueamos los accesos comprometidos mientras trabajamos.',
      },
      {
        n: '03',
        title: 'Limpieza y refuerzo',
        text: 'Desinfectamos, reinstalamos lo necesario, actualizamos y cerramos las puertas de entrada.',
      },
      {
        n: '04',
        title: 'Verificación e informe',
        text: 'Probamos el sitio, revisamos SSL y listas negras, y le entregamos el informe final.',
      },
    ],
    notIncludedTitle: 'Qué no cubre este servicio',
    notIncluded: [
      'Recuperación de contenido perdido que no estaba respaldado antes del ataque.',
      'Mantención continua posterior: se recomienda contratar mantención web.',
      'Asesoría legal o representación ante una fiscalización.',
      'Limpieza de equipos internos, correos personales o sistemas fuera del sitio web.',
    ],
    faqs: [
      {
        q: '¿Cómo sé si mi sitio está hackeado?',
        a: 'Señales típicas: redirecciones a sitios extraños, contenido que usted no publicó, lentitud repentina, correos masivos desde su dominio o advertencias de Google. Si tiene dudas, lo revisamos.',
      },
      {
        q: '¿Cuánto demora?',
        a: 'Depende del grado de compromiso. Un sitio con malware simple puede resolverse en horas; uno con múltiples archivos infectados o una base de datos comprometida requiere más tiempo. Le damos un plazo después del diagnóstico.',
      },
      {
        q: '¿Voy a perder contenido?',
        a: 'Trabajamos con un respaldo previo para reducir el riesgo. Si el ataque borró contenido y no existía un respaldo anterior, puede que no sea recuperable. Por eso el respaldo es siempre el primer paso.',
      },
      {
        q: '¿Me sacan de la lista negra de Google?',
        a: 'Limpiamos el sitio y solicitamos la revisión cuando corresponde. Google decide cuándo retira la advertencia; nosotros dejamos el sitio en condiciones y hacemos la gestión.',
      },
      {
        q: '¿Incluye mantención después?',
        a: 'No. La mantención es un servicio aparte. Una vez resuelta la emergencia, recomendamos contratarla para evitar que la situación se repita.',
      },
      {
        q: '¿Trabajan con sitios que no alojan con ustedes?',
        a: 'Sí, siempre que tengamos los accesos necesarios. Si el sitio está en otro proveedor, coordinamos con ellos lo que corresponda.',
      },
    ],
    relatedTitle: 'Servicios relacionados',
    related: [
      {
        title: 'Mantención web',
        text: 'Para que el sitio se mantenga actualizado y monitoreado después de la limpieza.',
        href: '/mantencion-web/',
      },
      {
        title: 'Adecuación Ley 21.719',
        text: 'Para ordenar la privacidad y las cookies del sitio.',
        href: '/ley-21719/',
      },
      {
        title: 'Hosting Global',
        text: 'Para alojar el sitio con respaldos y protección.',
        href: '/hosting-global/',
      },
    ],
    mockup: 'seguridad',
    accent: 'yel',
    ctaLabel: 'Pedir ayuda ahora',
    ctaHref: 'https://wa.me/56954132014?text=Hola%2C%20mi%20sitio%20fue%20hackeado%20o%20marcado%20como%20peligroso',
    secondaryLabel: 'Escribir por correo',
    secondaryHref: 'mailto:hola@fractalhost.cl?subject=Mi%20sitio%20fue%20hackeado',
  },
  {
    slug: 'ley-21719',
    kind: 'servicio',
    name: 'Ley 21.719',
    h1: 'Adecuación a la Ley 21.719 de protección de datos',
    metaTitle: 'Adecuación a la Ley 21.719 | Fractal Host',
    metaDescription:
      'Política de privacidad, banner de cookies y formularios con consentimiento para cumplir la Ley 21.719. Adecuación técnica para sitios WordPress.',
    kicker: 'Protección de datos',
    intro:
      'La Ley 21.719 entra en vigencia el 1 de diciembre de 2026. Si su sitio pide nombre, correo o teléfono, necesita decir para qué los usa y pedir autorización real. Preparamos la parte técnica para que su sitio cumpla.',
    heroBullets: [
      'Política de privacidad publicada',
      'Banner de cookies por categoría',
      'Formularios con consentimiento explícito',
    ],
    specs: [
      { label: 'Vigencia', value: '1 de diciembre de 2026' },
      { label: 'Plataforma', value: 'WordPress' },
      { label: 'Alcance', value: 'Adecuación técnica' },
      { label: 'No incluye', value: 'Asesoría legal' },
    ],
    audienceTitle: 'A quién le aplica',
    audience: [
      {
        title: 'Sitios con formularios',
        text: 'Si pide nombre, correo o teléfono para responder consultas, ya está tratando datos personales.',
        icon: 'file',
      },
      {
        title: 'Newsletter y cotizadores',
        text: 'Si guarda correos para enviar novedades o usa un cotizador que recopila datos, necesita consentimiento.',
        icon: 'mail',
      },
      {
        title: 'Tiendas online',
        text: 'Si vende en línea, maneja direcciones, teléfonos e historial de compra. La ley también le aplica.',
        icon: 'cart',
      },
    ],
    featuresTitle: 'Qué incluye la adecuación',
    features: [
      {
        title: 'Política de privacidad',
        text: 'Redactada con la información real de su negocio, en lenguaje claro y publicada en el sitio.',
        icon: 'file',
      },
      {
        title: 'Banner de cookies',
        text: 'Aviso con opciones por categoría: necesarias, analíticas y de marketing. No solo “aceptar todo”.',
        icon: 'cookie',
      },
      {
        title: 'Formularios con consentimiento',
        text: 'Ajustamos los formularios para que la autorización sea una acción afirmativa, sin casillas premarcadas.',
        icon: 'check',
      },
      {
        title: 'Revisión del sitio',
        text: 'Identificamos dónde se recopilan datos y qué falta para cumplir con la ley.',
        icon: 'search',
      },
      {
        title: 'Implementación',
        text: 'Dejamos la política, el banner y los formularios funcionando y probados.',
        icon: 'settings',
      },
      {
        title: 'Documentación',
        text: 'Le entregamos un resumen de lo implementado para que sepa qué tiene y cómo mantenerlo.',
        icon: 'layers',
      },
    ],
    processTitle: 'Cómo ponemos su sitio al día',
    process: [
      {
        n: '01',
        title: 'Revisión',
        text: 'Analizamos formularios, cookies, newsletter y cualquier punto donde se recopilen datos.',
      },
      {
        n: '02',
        title: 'Política',
        text: 'Redactamos la política de privacidad con la información de su negocio y la publicamos.',
      },
      {
        n: '03',
        title: 'Cookies y formularios',
        text: 'Implementamos el banner por categoría y ajustamos los formularios para el consentimiento explícito.',
      },
      {
        n: '04',
        title: 'Pruebas',
        text: 'Verificamos que el banner recuerde la elección, que los formularios guarden el consentimiento y que todo funcione.',
      },
    ],
    notIncludedTitle: 'Qué no incluye',
    notIncluded: [
      'Asesoría legal formal ni representación ante una fiscalización.',
      'Sitios en plataformas distintas a WordPress: se cotizan aparte.',
      'Auditorías de datos internos, contratos con terceros o gestión de brechas.',
      'Actualizaciones futuras de la ley o de las herramientas de terceros.',
    ],
    faqs: [
      {
        q: '¿La ley me aplica si soy una pyme?',
        a: 'Sí. La ley no distingue por tamaño. Si su sitio recopila nombre, correo, teléfono o datos de navegación, tiene obligaciones. Durante el primer año hay un régimen especial para pymes, pero la obligación rige desde el primer día.',
      },
      {
        q: '¿Qué pasa si no me pongo al día?',
        a: 'La ley contempla multas y observaciones. Durante el primer año de vigencia, las pymes que no tratan datos de alto riesgo pueden recibir una amonestación antes que una multa en su primera infracción. Aun así, la obligación existe desde el 1 de diciembre de 2026.',
      },
      {
        q: '¿Incluye un abogado?',
        a: 'No. Este es un servicio de adecuación técnica del sitio. La política de privacidad se redacta con la información que usted entrega, pero no reemplaza una asesoría legal formal.',
      },
      {
        q: '¿Solo sirve para WordPress?',
        a: 'La implementación estándar es para WordPress. Si su sitio está en otra plataforma, se evalúa y se cotiza aparte.',
      },
      {
        q: '¿Qué es el consentimiento por acción afirmativa?',
        a: 'Es que el usuario tenga que aceptar de forma activa, sin casillas premarcadas ni aceptación tácita. El formulario no debe guardar datos hasta que la persona autorice.',
      },
      {
        q: '¿Cuánto demora?',
        a: 'Depende de la cantidad de formularios y de la complejidad del sitio. Un sitio simple puede estar listo en pocos días; uno con varias integraciones requiere más trabajo.',
      },
    ],
    relatedTitle: 'Servicios relacionados',
    related: [
      {
        title: 'Mantención web',
        text: 'Para mantener el sitio actualizado y seguro después de la adecuación.',
        href: '/mantencion-web/',
      },
      {
        title: 'Seguridad informática',
        text: 'Si el sitio ya presenta un problema de seguridad activo.',
        href: '/seguridad-informatica/',
      },
      {
        title: 'Sitio corporativo',
        text: 'Si necesita un sitio nuevo que nazca con la privacidad bien configurada.',
        href: '/sitios-web/sitio-corporativo/',
      },
    ],
    mockup: 'ley',
    accent: 'cy',
    ctaLabel: 'Revisar mi sitio',
    ctaHref: 'https://wa.me/56954132014?text=Hola%2C%20quiero%20adecuar%20mi%20sitio%20a%20la%20Ley%2021.719',
    secondaryLabel: 'Escribir por correo',
    secondaryHref: 'mailto:hola@fractalhost.cl?subject=Adecuaci%C3%B3n%20Ley%2021.719',
  },
  {
    slug: 'migracion',
    kind: 'servicio',
    name: 'Migración',
    h1: 'Migración de sitio y correos sin cortes',
    metaTitle: 'Migración de sitio y correos sin cortes | Fractal Host',
    metaDescription:
      'Movemos su sitio, correos y bases de datos de cPanel a cPanel, gratis y sin cortes. Solo necesitamos los accesos de su hosting actual.',
    kicker: 'Cambio de proveedor sin drama',
    intro:
      'Movemos su sitio, correos y bases de datos desde cPanel a cPanel. Gratis, con los accesos de su hosting actual y coordinando el cambio de DNS para que no pierda visitas ni mensajes.',
    heroBullets: [
      'Migración gratuita',
      'Sitio, correos y bases de datos',
      'Coordinamos el cambio de DNS',
    ],
    specs: [
      { label: 'Costo', value: '$0' },
      { label: 'Origen', value: 'cPanel' },
      { label: 'Destino', value: 'cPanel o Ferozo' },
      { label: 'Checklist', value: 'Guiada' },
    ],
    audienceTitle: 'Para quién es la migración',
    audience: [
      {
        title: 'Sitios en cPanel',
        text: 'Su proveedor actual usa cPanel y quiere cambiar a Fractal Host sin rehacer el sitio.',
        icon: 'server',
      },
      {
        title: 'Negocios con correos activos',
        text: 'Necesita mover las casillas sin perder mensajes ni dejar a los clientes sin respuesta.',
        icon: 'mail',
      },
      {
        title: 'Quien quiere ordenar el DNS',
        text: 'Tiene el dominio en NIC Chile u otro registrador y no quiere tocar configuraciones técnicas.',
        icon: 'globe',
      },
    ],
    featuresTitle: 'Qué incluye la migración',
    features: [
      {
        title: 'Sitio web',
        text: 'Movemos archivos, temas, plugins y configuraciones desde el hosting de origen.',
        icon: 'layers',
      },
      {
        title: 'Correos',
        text: 'Trasladamos las cuentas y los mensajes existentes, con las credenciales de acceso.',
        icon: 'mail',
      },
      {
        title: 'Bases de datos',
        text: 'Exportamos e importamos las bases de datos para que el sitio siga funcionando igual.',
        icon: 'database',
      },
      {
        title: 'DNS',
        text: 'Coordinamos el cambio en NIC Chile o el registrador para que el dominio apunte al nuevo servidor.',
        icon: 'globe',
      },
      {
        title: 'Pruebas',
        text: 'Revisamos sitio, correos, formularios y SSL antes de dar la migración por terminada.',
        icon: 'check',
      },
      {
        title: 'Checklist guiada',
        text: 'Le indicamos qué datos necesitamos y en qué orden, para que no tenga que adivinar.',
        icon: 'file',
      },
    ],
    processTitle: 'Cómo se hace la migración',
    process: [
      {
        n: '01',
        title: 'Nos entrega los accesos',
        text: 'Necesitamos el acceso al hosting actual y al dominio. Si no los tiene, lo ayudamos a ubicarlos.',
      },
      {
        n: '02',
        title: 'Agendamos',
        text: 'Elegimos un día y hora de poca actividad para mover el sitio y los correos.',
      },
      {
        n: '03',
        title: 'Migramos',
        text: 'Copiamos archivos, bases de datos y correos. Después cambiamos el DNS y monitoreamos.',
      },
      {
        n: '04',
        title: 'Verificamos',
        text: 'Probamos el sitio, los formularios, el correo y el SSL. Le confirmamos que todo quedó operativo.',
      },
    ],
    notIncludedTitle: 'Qué no incluye',
    notIncluded: [
      'Configuración de Outlook o Gmail en los dispositivos del cliente, o respaldos locales.',
      'Trabajo en terreno para descargar correos pesados o limpiar casillas.',
      'Desarrollo, rediseño o cambios de contenido durante la migración.',
      'Migración desde paneles que no sean cPanel, salvo evaluación aparte.',
    ],
    faqs: [
      {
        q: '¿Qué necesita para migrar?',
        a: 'El acceso al panel del hosting actual (usuario y contraseña) y el acceso al dominio en NIC Chile o el registrador. Si no sabe dónde están, lo revisamos juntos.',
      },
      {
        q: '¿Cuánto demora?',
        a: 'Depende del tamaño del sitio y de las casillas. Un sitio pequeño puede migrarse en pocas horas; uno con muchos correos o bases de datos grandes requiere más tiempo.',
      },
      {
        q: '¿Se cae el sitio durante la migración?',
        a: 'Trabajamos para que el cambio sea lo más transparente posible. Hay un periodo de propagación de DNS en el que algunos visitantes pueden ver el sitio antiguo. Coordinamos el horario para reducir el impacto.',
      },
      {
        q: '¿Qué pasa con los correos que llegan durante el cambio?',
        a: 'Mientras la cuenta antigua siga activa, revisamos el webmail para que ningún mensaje quede sin ver. Después de la propagación, todo llega al servidor nuevo.',
      },
      {
        q: '¿Qué no incluye?',
        a: 'La configuración de Outlook o Gmail en sus dispositivos y los respaldos locales no están incluidos por defecto. La excepción es un sitio pequeño o hasta dos casillas, que apoyamos en remoto sin costo.',
      },
      {
        q: '¿Puedo migrar desde Plesk o Ferozo?',
        a: 'Desde Ferozo a Ferozo o a cPanel es posible. Desde Plesk u otros paneles se evalúa según los accesos y las herramientas disponibles.',
      },
    ],
    relatedTitle: 'Servicios relacionados',
    related: [
      {
        title: 'Hosting Global',
        text: 'El destino cPanel para la mayoría de los sitios WordPress.',
        href: '/hosting-global/',
      },
      {
        title: 'Hosting Cono Sur',
        text: 'Si busca menor latencia para visitantes de Chile.',
        href: '/hosting-cono-sur/',
      },
      {
        title: 'Correo corporativo',
        text: 'Para dejar las cuentas configuradas después de la migración.',
        href: '/correo-corporativo/',
      },
    ],
    mockup: 'migracion',
    accent: 'cy',
    ctaLabel: 'Preparar mi migración',
    ctaHref: '/migraciones.html',
    secondaryLabel: 'Hablar por WhatsApp',
    secondaryHref: 'https://wa.me/56954132014?text=Hola%2C%20quiero%20migrar%20mi%20sitio%20a%20Fractal%20Host',
  },
];

export const todasLasPaginas: PageData[] = [...paginasSitios, ...paginasServicios];

export const paginasPorSlug = new Map(todasLasPaginas.map((p) => [p.slug, p]));
