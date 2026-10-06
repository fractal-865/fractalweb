export interface FaqItem {
  q: string;
  a: string; // HTML de la respuesta
}

export interface FaqCategory {
  id: string;
  title: string;
  items: FaqItem[];
}

/** Preguntas que jamás deben aparecer en el sitio (en cualquier categoría). */
const EXCLUDED_QUESTIONS = ['¿Qué planes tienen y cuánto cuestan?'];

/** Cuántas preguntas muestra cada categoría antes de ofrecer "Cargar más". */
export const FAQ_PAGE_SIZE = 12;

const raw: FaqCategory[] = [
  {
    id: 'hosting',
    title: 'Hosting',
    items: [
      {
        q: '¿Qué es el hosting y por qué lo necesito?',
        a: `Es el servidor donde vive tu sitio web, encendido las 24 horas para que cualquiera pueda abrirlo cuando quiera. Ahí se guardan los archivos, la base de datos y los correos. Sin hosting, tu sitio no tiene dónde estar.`,
      },
      {
        q: '¿Cuál es la diferencia entre dominio y hosting?',
        a: `Piensa en una casa. El dominio es la dirección (tuempresa.cl), el hosting es el terreno donde está construida, y tu sitio web es la casa. Son dos servicios distintos, cada uno con su propia renovación: el dominio se registra en NIC Chile y el hosting lo contratas con nosotros. Para quien quiera el detalle técnico, el dominio se conecta al hosting mediante los DNS (los nuestros son ns1.fractalhost.cl y ns2.fractalhost.cl).`,
      },
      {
        q: '¿Cuánto me va a costar mi hosting el primer año si hago mi sitio web con ustedes?',
        a: `Nada. Si desarrollamos tu sitio, el primer año de hosting profesional va incluido sin costo, y el dominio .cl también. La única excepción son los proyectos de muy alta envergadura o los ecommerce complejos que necesitan infraestructura externa especializada. En ese caso lo indicamos de forma explícita en la cotización.`,
      },
      {
        q: '¿Y cuánto cuesta el segundo año?',
        a: `Pagas la renovación anual del plan que tengas. Un plan base ronda los $39.990 al año, y el valor sube según el espacio que necesites, hasta $259.990 (Master 3). Si renuevas por 2 años tienes un 6% de descuento, y por 3 años un 12%. El dominio .cl se renueva aparte (valor referencial de $18.990 al año). Todos los valores son líquidos: a la boleta de honorarios se suma el 15,25%, que declaras tú ante el SII (más detalle en la sección de pagos).`,
      },
      {
        q: '¿El plan más básico me sirve si recién empiezo y no sé nada de tecnología?',
        a: `Sí. Starter 1 está pensado para ese primer paso: espacio suficiente para un sitio básico, 3 cuentas de correo corporativo y 3 bases de datos. Así no pagas por recursos que todavía no usas. Si no sabes cuánto espacio necesitas, cuéntanos qué tienes y te recomendamos el plan.`,
      },
      {
        q: '¿Por qué conviene tener mi sitio con ustedes y no armarlo en Wix?',
        a: `<p>Wix funciona como un arriendo: pagas una suscripción mes a mes o año a año, y tu sitio vive dentro de su plataforma. Si dejas de pagar, se apaga, y no puedes llevártelo a otro proveedor. Además, cada función extra (tienda, reservas, más espacio) suele subir el plan, y el correo con tu dominio suele ser un cobro aparte.</p><p>Con nosotros, el primer año de hosting y el dominio .cl van incluidos, el correo corporativo viene con tu plan, y desde el segundo año pagas solo la renovación del hosting. Cuando terminas de pagar el proyecto, el diseño, la base de datos y el código son tuyos, y te los puedes llevar adonde quieras. Tu sitio corre en WordPress sobre LiteSpeed Enterprise y discos SSD NVMe, que lo hacen cargar rápido, y si algo falla hablas con quien lo administra. Con el tiempo, la suscripción de Wix termina costando más que un hosting como este.</p>`,
      },
      {
        q: '¿Qué diferencia hay entre el hosting en Estados Unidos y "Enlace Nacional Patagonia"?',
        a: `<p>Los planes estándar están en un Datacenter en Estados Unidos, y funcionan muy bien para la mayoría de los sitios. Enlace Nacional Patagonia es un Cloud Server en un data center del Cono Sur, mucho más cerca de Chile. Eso significa entre 150 y 200 milisegundos menos de ping, o sea, tu sitio carga más rápido para quienes lo visitan desde Chile. Usa el panel Ferozo, en español y sin opciones que nunca vas a usar.</p><p>Planes: Austral (1,5 GB) $49.990, Glaciar (2,5 GB) $69.990, Fiordo (4 GB) $89.990 y Fiordo Extra (8 GB) $129.990, todos al año. Todos incluyen SSL gratis y respaldo diario con 15 días disponibles para descarga.</p>`,
      },
      {
        q: '¿Cómo administro mi hosting, mis correos y mi sitio web?',
        a: `Desde un panel de control, en un solo lugar y sin saber programación. En los planes del Datacenter USA usas cPanel, y en Enlace Nacional, Ferozo. Desde ahí creas tus correos, gestionas tus archivos y entras a tu WordPress. Todo se gestiona desde tu <a href="https://clientes.fractalhost.cl/" target="_blank" rel="noopener noreferrer">Área de Clientes</a>.`,
      },
      {
        q: '¿Qué pasa si mi sitio o mi negocio crece y necesito más espacio?',
        a: `Subes a un plan mayor (Pro o Master) sin cambiar de proveedor y sin migraciones complicadas. Empiezas con lo que necesitas hoy y creces cuando haga falta.`,
      },
    ],
  },
  {
    id: 'sitios-web',
    title: 'Sitios web',
    items: [
      {
        q: '¿Qué tipos de sitio hacen?',
        a: `Sitios estáticos (tarjeta digital, landing page, one-page), corporativos administrables, tiendas online (ecommerce), venta de entradas con QR, sistemas de reservas, corredoras de propiedades y sitios completamente a medida.`,
      },
      {
        q: '¿Qué incluye un sitio web?',
        a: `Diseño adaptado a celulares, el primer año de hosting y de dominio .cl sin costo, correo corporativo y 30 días de garantía para corregir errores desde el día de la entrega.`,
      },
      {
        q: '¿Cuánto demora en estar listo?',
        a: `Depende del tamaño. Un sitio simple o one-page, de 3 a 7 días. Un sitio corporativo, de 1 a 3 semanas. Una tienda online, de 15 a 45 días. Son plazos referenciales: preferimos que quede bien antes que apurarlo. Corren desde que nos entregas la información base y el anticipo.`,
      },
      {
        q: '¿Cómo es el proceso?',
        a: `Nos entregas el contenido base. Te mostramos una propuesta funcional en un enlace de prueba (siempre el mismo), donde revisas los avances y nos dejas tus observaciones. Al final publicamos, probamos formularios, menús y la versión móvil, y te enviamos los accesos de administración y de correo.`,
      },
      {
        q: '¿Tengo que escribir los textos y buscar las fotos?',
        a: `Los textos no. Tú nos cuentas sobre tu negocio, y nosotros los adaptamos y pulimos para que suenen profesionales (con apoyo de IA cuando ayuda). Las imágenes las aportas tú, salvo que cotices aparte que las busquemos o generemos nosotros.`,
      },
      {
        q: '¿Puedo pedir cambios cuando me muestren el diseño?',
        a: `Sí. Tienes rondas de revisión ilimitadas dentro del plazo estándar del proyecto, todas centralizadas en el mismo enlace de prueba.`,
      },
      {
        q: '¿Qué pasa si me demoro en responder?',
        a: `Esperamos tu respuesta dentro de 10 días después de cada avance. Si el proyecto queda detenido más de 30 días por causas ajenas a nosotros, pasa a "Standby": lo archivamos para liberar espacio y, para retomarlo, coordinamos de nuevo disponibilidad y plazos.`,
      },
      {
        q: '¿Me enseñan a usar y administrar mi sitio?',
        a: `Sí. En vez de entregarte un manual que nadie lee, hacemos una clase personalizada en línea, donde aprendes a usar WordPress en tiempo real y resuelves tus dudas al instante. Si estás en Punta Arenas, también la podemos hacer presencial.`,
      },
      {
        q: '¿El sitio queda a mi nombre?',
        a: `Sí. Cuando se paga el proyecto completo, el diseño, la base de datos y el código fuente son 100% tuyos.`,
      },
      {
        q: '¿Aparece el nombre de Fractal Host o Triángulo Web en mi sitio?',
        a: `Por defecto va un pequeño enlace de créditos en el pie de página. Si prefieres que no esté, nos lo dices y lo sacamos sin costo.`,
      },
      {
        q: '¿Dónde puedo ver ejemplos de sus trabajos?',
        a: `En <a href="https://trianguloweb.cl/" target="_blank" rel="noopener noreferrer">trianguloweb.cl</a>. Algunos proyectos: <a href="https://museomaggiorinoborgatello.cl/" target="_blank" rel="noopener noreferrer">Museo Maggiorino Borgatello</a>, <a href="https://fpymemagallanes.cl/" target="_blank" rel="noopener noreferrer">Fpyme Magallanes</a>, <a href="https://propiedadeswurth.cl/" target="_blank" rel="noopener noreferrer">Propiedades Wurth</a> y <a href="https://epaustral.cl/" target="_blank" rel="noopener noreferrer">EP Austral</a>.`,
      },
    ],
  },
  {
    id: 'correo',
    title: 'Correo corporativo',
    items: [
      {
        q: '¿Cómo funciona el correo corporativo que incluyen los planes?',
        a: `Dejas de usar un @gmail.com o @hotmail.com para tu negocio y pasas a tener un correo con el nombre de tu empresa (por ejemplo, contacto@tuempresa.cl), que da más confianza a tus clientes. Va incluido con tu plan de hosting: nosotros lo configuramos y probamos sin costo. Lo usas desde la app que ya conoces (Gmail, Outlook, Thunderbird o el celular), sin tocar configuraciones técnicas. Funciona con SMTP, IMAP y POP3.`,
      },
      {
        q: '¿Cuántas casillas puedo tener?',
        a: `Depende del plan: desde 3 en Starter 1 hasta ilimitadas desde Pro 2.`,
      },
      {
        q: '¿Puedo usar la interfaz de Gmail con mi propio dominio?',
        a: `Sí, con Google Workspace. La licencia de Google la pagas directo a ellos. Nosotros hacemos toda la parte técnica, que funciona a través de nuestros servidores: activación y verificación de tu dominio, configuración antispam (registros como SPF y DKIM), pruebas de envío y recepción, soporte inicial y una revisión anual. Para esto necesitas un plan de hosting anual activo con nosotros.`,
      },
    ],
  },
  {
    id: 'dominio',
    title: 'Dominio .cl',
    items: [
      {
        q: '¿Qué es un dominio .cl y cómo lo obtengo?',
        a: `Es el nombre único de tu empresa en Internet (tuempresa.cl). Se registra en NIC Chile, y si hacemos tu sitio, nosotros hacemos todo el trámite para que quede a tu nombre desde el primer día.`,
      },
      {
        q: '¿Cómo sé si el que quiero está disponible?',
        a: `Lo revisas gratis en <a href="https://www.nic.cl/" target="_blank" rel="noopener noreferrer">nic.cl</a>. Si necesitas ayuda, <a href="https://wa.me/56954132014" target="_blank" rel="noopener noreferrer">escríbenos por WhatsApp</a>.`,
      },
      {
        q: '¿Cuánto cuesta mantenerlo?',
        a: `El primer año va incluido si hacemos tu sitio. Desde el segundo, el valor referencial es de $18.990 al año, que se paga directamente a NIC Chile (salvo que lo administremos nosotros).`,
      },
      {
        q: '¿Y si ya tengo un dominio?',
        a: `Lo sigues usando. Solo ajustamos la delegación de DNS hacia nuestros servidores.`,
      },
    ],
  },
  {
    id: 'mantencion',
    title: 'Mantención y seguridad',
    items: [
      {
        q: '¿Por qué mi sitio necesita mantención?',
        a: `WordPress, los plugins y el servidor se actualizan constantemente, y cada versión sin actualizar es una posible puerta de entrada para un ataque. Un sitio sin mantención no se cae de un día para otro: se vuelve lento y vulnerable, y suele fallar en el peor momento.`,
      },
      {
        q: '¿La mantención es gratis?',
        a: `Las actualizaciones de plantillas y plugins son gratis si tu sitio lo creamos nosotros y lo mantienes en nuestro servidor.`,
      },
      {
        q: '¿Y si mi sitio no lo hicieron ustedes?',
        a: `También podemos mantenerlo, con nuestro Servicio de Mantención Web, que es de pago e independiente del hosting. Incluye actualizaciones probadas antes de aplicarlas, respaldos, monitoreo de seguridad 24/7, SSL vigente, revisión de rendimiento, reparación si hay un ataque, administración de usuarios y roles, ajustes menores de diseño y soporte directo.`,
      },
      {
        q: '¿Cómo cuidan la seguridad de mi sitio?',
        a: `Con un certificado SSL (el candadito que ven tus visitantes) y monitoreo 24/7 para detectar amenazas antes de que afecten tu sitio. Si el sitio lo hicimos nosotros y lo tienes con nosotros, cualquier vulneración la resolvemos sin costo adicional, y hablas directo con quien administra tu servidor, por WhatsApp, correo o asistencia remota.`,
      },
      {
        q: '¿Qué hago si mi sitio fue hackeado?',
        a: `Escríbenos de inmediato. Hacemos un respaldo antes de tocar nada, eliminamos el código malicioso, cambiamos contraseñas, reinstalamos WordPress y los plugins infectados, actualizamos todo y, si Google marcó tu sitio como peligroso, pedimos que lo saquen de la lista negra. Al final te explicamos qué encontramos y qué hicimos. Para sitios hechos por otros, existe el servicio de Seguridad Informática (de pago, salvo en sitios simples alojados con nosotros, donde va incluido).`,
      },
      {
        q: '¿Pueden recuperar contenido perdido?',
        a: `Solo si estaba respaldado antes del ataque. Por eso el respaldo es siempre el primer paso.`,
      },
    ],
  },
  {
    id: 'migracion',
    title: 'Migración',
    items: [
      {
        q: 'Ya tengo un sitio en otro proveedor, ¿pueden traerlo?',
        a: `Sí. La migración es gratuita y sin cortes de servicio: movemos tu sitio, correos y bases de datos, siempre que tu proveedor actual use cPanel. <a href="https://wa.me/56954132014" target="_blank" rel="noopener noreferrer">Escríbenos por WhatsApp</a> para coordinarla.`,
      },
      {
        q: '¿Qué necesitan de mí?',
        a: `Acceso al panel de tu hosting actual (URL, usuario y contraseña) y acceso a la administración de tu dominio (tu cuenta de NIC Chile o el proveedor donde lo compraste). También nos ayuda saber cuánto espacio ocupan tus correos y si los lees por IMAP o POP3.`,
      },
      {
        q: '¿Por qué importa si uso IMAP o POP3?',
        a: `Con IMAP tus correos quedan en el servidor, así que migrar es más seguro. Con POP3 se descargan a tu computador y hay que cuidar que no se pierdan en el traspaso.`,
      },
      {
        q: '¿Qué no incluye la migración?',
        a: `Configurar Outlook o Gmail en tus dispositivos, limpiar casillas llenas o hacer respaldos locales. Eso tiene costo aparte o requiere un técnico en terreno. Si tu sitio es pequeño o tienes hasta 2 casillas, te ayudamos sin costo de forma remota.`,
      },
    ],
  },
  {
    id: 'pagos',
    title: 'Pagos y facturación',
    items: [
      {
        q: '¿Qué documento emiten?',
        a: `Siempre Boleta de Honorarios, porque entregamos un servicio profesional de administración y soporte técnico. No vendemos el servidor como producto, así que no emitimos factura.`,
      },
      {
        q: '¿Qué significa "líquido, sin retención" y "+15,25%"?',
        a: `El monto que cotizamos es el valor exacto que nos transfieres. Al emitir la boleta se suma el impuesto legal del 15,25%, pero ese impuesto no aumenta lo que nos pagas: lo declaras y pagas tú (o tu empresa) directamente al SII.`,
      },
      {
        q: '¿Cómo puedo pagar?',
        a: `En línea con Flow (tarjetas de crédito y débito, Khipu, ETPay, MACH, BCI, banca.me, Onepay) o por transferencia bancaria. Con tarjeta de crédito, hasta en 3 cuotas sin interés.`,
      },
      {
        q: '¿La activación es inmediata?',
        a: `Con pago en línea, sí. Con transferencia es manual: nos avisas con el comprobante y activamos el servicio.`,
      },
      {
        q: '¿Cuáles son los datos para transferir?',
        a: `Te los indicamos junto con la cotización o al momento de pagar en tu Área de Clientes.`,
      },
      {
        q: '¿Debo pagar todo el proyecto al inicio?',
        a: `No. Pedimos un anticipo: 50% en sitios simples o corporativos y 30% en proyectos grandes (ecommerce o desarrollos complejos). El pago del anticipo equivale a aceptar la cotización, sin firmar nada más.`,
      },
      {
        q: '¿Me devuelven el anticipo si me arrepiento?',
        a: `Lo devolvemos solo si nosotros incumplimos los plazos ofrecidos. Si cancelas por razones ajenas a nuestro trabajo, evaluamos un reembolso parcial según el avance real, pero no hay devolución total si el diseño ya empezó.`,
      },
    ],
  },
  {
    id: 'soporte',
    title: 'Renovación y soporte',
    items: [
      {
        q: '¿Qué pasa si no renuevo mi hosting a tiempo?',
        a: `Te enviamos correos de recordatorio 15 días antes del vencimiento. Si pasan 15 días del vencimiento sin renovar, el servicio se suspende. A los 120 días sin pago se considera abandonado y el sitio se elimina de forma permanente.`,
      },
      {
        q: '¿Con quién hablo si tengo un problema?',
        a: `Con nosotros, quienes administramos tu hosting y construimos tu sitio. No hay call center, ni bot, ni ticket que rebote entre áreas.`,
      },
      {
        q: '¿Por qué canales puedo pedir ayuda?',
        a: `<ul><li>WhatsApp: <a href="https://wa.me/56954132014" target="_blank" rel="noopener noreferrer">+56 9 5413 2014</a></li><li>Correo: <a href="mailto:hola@fractalhost.cl">hola@fractalhost.cl</a> (canal oficial para temas de desarrollo web)</li><li>Tickets: <a href="https://clientes.fractalhost.cl/supporttickets.php" target="_blank" rel="noopener noreferrer">clientes.fractalhost.cl/supporttickets.php</a></li><li>Asistencia remota: TeamViewer o AnyDesk</li><li>Videollamada de 15 minutos: <a href="https://calendar.app.google/W9CqbvXdKMzcAWHN8" target="_blank" rel="noopener noreferrer">agenda aquí</a></li></ul>`,
      },
      {
        q: '¿Cuánto demoran en responder?',
        a: `Lo habitual es entre 2 y 3 horas en horario de oficina, y en todos los casos respondemos en menos de 24 horas hábiles.`,
      },
      {
        q: '¿Qué pasa si mi sitio falla después del lanzamiento?',
        a: `Depende del origen. Si falla por un error del código original, lo corregimos sin costo (30 días de garantía desde la entrega). Si falla por una edición errónea tuya o de terceros, lo solucionamos igual, pero puede tener costo si el daño es grave. Si es una interrupción del servidor y lo administramos nosotros, te asistimos de inmediato. Pase lo que pase, te ayudamos.`,
      },
      {
        q: '¿Dónde veo si hay algún problema con los servidores?',
        a: `En la <a href="https://clientes.fractalhost.cl/serverstatus.php" target="_blank" rel="noopener noreferrer">página de estado</a>.`,
      },
    ],
  },
  {
    id: 'nosotros',
    title: 'Sobre nosotros',
    items: [
      {
        q: '¿Qué es Fractal Host y quién está detrás?',
        a: `Somos una empresa de hosting y desarrollo web de Punta Arenas. Partimos hace 13 años, hoy alojamos más de 35 sitios y hemos desarrollado más de 150 proyectos para museos, municipalidades, colegios, universidades, la Armada de Chile, pymes y emprendedores.`,
      },
      {
        q: '¿Atienden solo en la Patagonia?',
        a: `No. Nacimos en Magallanes, pero atendemos a todo Chile e incluso al extranjero. Llevamos años trabajando a distancia, mucho antes de que fuera lo habitual.`,
      },
      {
        q: '¿Cómo puedo contactarlos?',
        a: `Por WhatsApp (<a href="https://wa.me/56954132014" target="_blank" rel="noopener noreferrer">+56 9 5413 2014</a>), correo (<a href="mailto:hola@fractalhost.cl">hola@fractalhost.cl</a>), o en <a href="https://fractalhost.cl/" target="_blank" rel="noopener noreferrer">fractalhost.cl</a> y <a href="https://trianguloweb.cl/" target="_blank" rel="noopener noreferrer">trianguloweb.cl</a>. Fuera de horario, si tienes una emergencia (como una caída), escríbenos y vemos la situación.`,
      },
      {
        q: '¿Puedo visitarlos presencialmente?',
        a: `Trabajamos sobre todo a distancia, pero si necesitas una reunión o una clase presencial, coordinamos una cita en Punta Arenas.`,
      },
      {
        q: '¿No encontraste lo que buscabas?',
        a: `<a href="https://wa.me/56954132014" target="_blank" rel="noopener noreferrer">Escríbenos por WhatsApp</a> o envía un correo a <a href="mailto:hola@fractalhost.cl">hola@fractalhost.cl</a>.`,
      },
    ],
  },
];

export const faqCategories: FaqCategory[] = raw.map((c) => ({
  ...c,
  items: c.items.filter((i) => !EXCLUDED_QUESTIONS.includes(i.q)),
}));

/** Todas las preguntas en plano (útil para búsqueda o sitemap). */
export const faqs: [string, string][] = faqCategories.flatMap((c) => c.items.map((i) => [i.q, i.a] as [string, string]));
