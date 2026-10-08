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
      {
        q: '¿En qué servidor está mi sitio?',
        a: `En un servidor LiteSpeed con discos SSD NVMe. En Estados Unidos para los planes estándar, o en un cloud server del Cono Sur si eliges Enlace Nacional Patagonia.`,
      },
      {
        q: '¿Puedo moverme entre planes después de contratar?',
        a: `Sí. Puedes subir o bajar de plan sin perder correos, bases de datos ni archivos; ajustamos la diferencia y aplicamos el cambio sin mayores cortes.`,
      },
      {
        q: '¿Los respaldos ya van incluidos?',
        a: `Sí. Todos nuestros planes incluyen respaldo diario y hasta 15 copias disponibles en tu Área de Clientes para restaurar cuando necesites.`,
      },    ],
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
      {
        q: '¿Puedo editar mi sitio después de entregado?',
        a: `Sí. Desarrollamos tu sitio en WordPress, pensado para que actualices textos e imágenes sin conocimientos técnicos. Además te capacitamos para que quede listo.`,
      },    ],
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
      {
        q: '¿Cómo reviso mi correo corporativo?',
        a: `Puedes usar el webmail incluido en tu panel de control, u configurar la cuenta en Gmail, Outlook, Thunderbird o la app de correo de tu celular.`,
      },
      {
        q: '¿Puedo usarlo en varios dispositivos?',
        a: `Sí. Con IMAP revisas el mismo correo desde tu celular, computador y otros equipos sin perder mensajes.`,
      },
      {
        q: '¿Qué es IMAP y POP3?',
        a: `IMAP te permite revisar el mismo correo desde varios equipos sin perder mensajes; POP3 lo descarga a tu computador. Lo habitual es IMAP.`,
      },
      {
        q: '¿Incluye antispam?',
        a: `Sí, y también configuramos autenticación como SPF y DKIM para que tus correos lleguen mejor.`,
      },
      {
        q: '¿Puedo crear alias (info@, ventas@)?',
        a: `Sí. Los alias reciben en la misma casilla principal sin consumir otra cuenta.`,
      },
      {
        q: '¿Puedo reenviar los correos a mi Gmail?',
        a: `Sí, podemos crear un reenvío para que tu correo con tu dominio llegue a tu cuenta externa preferida.`,
      },
      {
        q: '¿Cómo cambio la contraseña del correo?',
        a: `Desde el panel de control, o nos lo pides y lo hacemos por ti.`,
      },
      {
        q: '¿Qué hago si no puedo acceder?',
        a: `Escríbenos por WhatsApp o correo y te ayudamos a recuperar el acceso.`,
      },
      {
        q: '¿Pueden ayudarme a configurarlo en Outlook o Gmail?',
        a: `Sí. Te ayudamos a dejarlo configurado en las apps que usas.`,
      },    ],
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
      {
        q: '¿Puedo registrar mi dominio con ustedes aunque no contrate hosting?',
        a: `Sí. Podemos asistirte con el registro directamente en NIC Chile; queda siempre a tu nombre.`,
      },
      {
        q: '¿Cuánto tarda en activarse el dominio?',
        a: `El registro en NIC Chile normalmente toma entre 24 y 48 horas hábiles.`,
      },
      {
        q: '¿Qué es el código EPP?',
        a: `Es el código de seguridad que usas para transferir tu dominio a otro registrador; lo encuentras en tu panel o lo solicitamos por ti.`,
      },
      {
        q: '¿Puedo transferir mi dominio a otra empresa?',
        a: `Sí. Desbloqueas el dominio y usas el código EPP para autorizar la transferencia.`,
      },
      {
        q: '¿Qué pasa cuando el dominio vence?',
        a: `Tienes un período de gracia para renovarlo; si pasa más tiempo, puede quedar libre y otra persona registrarlo.`,
      },
      {
        q: '¿Puedo usar mi dominio con varios servicios?',
        a: `Sí. Puedes crear subdominios distintos para cada servicio, por ejemplo tienda y correo.`,
      },
      {
        q: '¿Puedo renovar por varios años?',
        a: `Sí. Puedes renovar períodos más largos para evitar el trámite anual.`,
      },
      {
        q: '¿Puedo cambiar los datos de contacto de mi dominio?',
        a: `Sí. Se gestiona en tu cuenta de NIC Chile; podemos guiarte con el cambio.`,
      },    ],
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
      {
        q: '¿Con qué frecuencia actualizan plugins y temas?',
        a: `Revisamos periódicamente y aplicamos primero las actualizaciones de seguridad; el resto las programamos para no afectar tu sitio.`,
      },
      {
        q: '¿Qué monitoreo hacen?',
        a: `Revisamos disponibilidad y señales de seguridad; si tu sitio deja de responder o detectamos algo extraño, te avisamos para que lo revisemos.`,
      },
      {
        q: '¿Puedo pedir un respaldo bajo demanda?',
        a: `Sí. Puedes solicitar un respaldo extra cuando lo necesites, e incluso descargar las últimas copias desde tu Área de Clientes.`,
      },
      {
        q: '¿La mantención cubre cambios de diseño grandes?',
        a: `Cubre actualizaciones, respaldos y soporte; los cambios de diseño mayores se cotizan aparte como desarrollo.`,
      },
      {
        q: '¿Qué pasa si una actualización falla?',
        a: `Probamos los cambios y, si algo falla, revertimos usando el respaldo del día anterior; si se retrasa, te avisamos sin que tu sitio quede caído.`,
      },
      {
        q: '¿Qué incluye el plan de seguridad?',
        a: `Detección de malware, protección SSL, monitoreo 24/7 y soporte directo para resolver incidentes.`,
      },    ],
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
      {
        q: '¿Cuánto demora la migración?',
        a: `Depende del tamaño del sitio. Normalmente entre 1 y 3 días hábiles; te avisamos cuando todo queda listo.`,
      },
      {
        q: '¿Qué datos incluye la migración?',
        a: `Archivos del sitio, base de datos y correos, siempre que tengas acceso de administrador al hosting actual (cPanel o similar).`,
      },
      {
        q: '¿Pierdo los correos durante la migración?',
        a: `No. Configuramos el correo en paralelo y copiamos el contenido para que sigas recibiendo también en ambos.`,
      },
      {
        q: '¿Puedo seguir usando mi hosting actual mientras tanto?',
        a: `Sí. Solo cambiamos las DNS cuando ya está todo probado en tu nuevo hosting.`,
      },
      {
        q: '¿Qué pasa si algo no funciona igual que antes?',
        a: `Ajustamos configuraciones hasta que quede equivalente; si no lo logramos, te lo indicamos antes de cambiar las DNS.`,
      },
      {
        q: '¿Puedo migrar un sitio que no está en cPanel?',
        a: `En la mayoría de los casos sí, pero puede requerir más configuración manual; lo revisamos antes de aceptar la migración.`,
      },
      {
        q: '¿Hay costo por migrar?',
        a: `Cuando traes tu hosting con nosotros, la migración desde cPanel va sin costo.`,
      },
      {
        q: '¿Puedo migrar después?',
        a: `Claro. Solo coordina con nosotros una fecha.`,
      },    ],
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
      {
        q: '¿Qué medios de pago aceptan?',
        a: `Flow en línea (tarjetas, MACH, BCI, banca.me y más) o transferencia bancaria.`,
      },
      {
        q: '¿Puedo pagar en dólares?',
        a: `No. Los valores están en pesos chilenos (CLP).`,
      },
      {
        q: '¿Emiten factura?',
        a: `Emitimos boleta de honorarios como corresponde al servicio; no emitimos factura como venta de producto.`,
      },
      {
        q: '¿Puedo dividir el pago en cuotas?',
        a: `Sí. Con tarjeta de crédito puedes pagar en hasta 3 cuotas sin interés.`,
      },
      {
        q: '¿Envían un comprobante al pagar?',
        a: `Sí. Emmite boleta de honorarios y te la enviamos por correo al completar el pago.`,
      },    ],
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
      {
        q: '¿Cuál es el horario de atención?',
        a: `Lunes a viernes de 9:30 a 20:00 h y sábado de 11:00 a 16:00 h, hora de Punta Arenas.`,
      },
      {
        q: '¿Atienden emergencias fuera de horario?',
        a: `Sí, para emergencias de servidor o caída podemos atenderte con coordinación previa.`,
      },
      {
        q: '¿Puedo abrir un ticket?',
        a: `Sí. Desde tu Área de Clientes puedes crear un ticket y dar seguimiento.`,
      },
      {
        q: '¿Responden por WhatsApp?',
        a: `Sí, es nuestro canal principal para responder más rápido.`,
      },
      {
        q: '¿Puedo pedir una videollamada?',
        a: `Sí. Puedes agendar 15 minutos desde el enlace que está en varias partes de esta página.`,
      },
      {
        q: '¿Cómo hago una queja o sugerencia?',
        a: `Escríbenos por WhatsApp, correo o crea un ticket; lo revisamos y te respondemos.`,
      },    ],
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
      {
        q: '¿Hace cuánto tiempo están?',
        a: `Llevamos más de 13 años en hosting y desarrollo web.`,
      },
      {
        q: '¿Dónde están ubicados?',
        a: `En Punta Arenas, Región de Magallanes, Chile. Atendemos en toda la región y también a la distancia.`,
      },
      {
        q: '¿Atienden solo en la Patagonia?',
        a: `No. Atendemos a todo Chile e incluso al extranjero; el trabajo a distancia es parte de nuestro día a día.`,
      },
      {
        q: '¿Qué diferencia hay entre Fractal Host y Triángulo Web?',
        a: `Fractal Host se centra en hosting y soporte técnico; Triángulo Web en el desarrollo. Trabajan juntas para darte el mejor resultado.`,
      },
      {
        q: '¿Puedo pedir una cotización sin compromiso?',
        a: `Sí. Usa el botón "Cotizar sitio web" y te lleva a la cotización; te respondemos en menos de 24 horas hábiles.`,
      },
      {
        q: '¿Ofrecen servicio después de la entrega?',
        a: `Sí. El primer año de hosting y dominio .cl va incluido cuando desarrollamos tu sitio.`,
      },
      {
        q: '¿Cómo me contacto si no veo lo que necesito?',
        a: `Escríbenos por WhatsApp o llena el formulario de contacto.`,
      },    ],
  },
];

export const faqCategories: FaqCategory[] = raw.map((c) => ({
  ...c,
  items: c.items.filter((i) => !EXCLUDED_QUESTIONS.includes(i.q)),
}));

/** Todas las preguntas en plano (útil para búsqueda o sitemap). */
export const faqs: [string, string][] = faqCategories.flatMap((c) => c.items.map((i) => [i.q, i.a] as [string, string]));
