export interface Plan {
  name: string;
  desc: string;
  tier: number;
  gb: string;
  tr: string;
  mail: string;
  db: string;
  base: number;
  feat: boolean;
  url: string;
}

export const hostingGlobal: Record<'starter' | 'pro' | 'master', Plan[]> = {
  starter: [
    { name: 'Starter 1', desc: 'Ideal para partir: tu primer sitio con correo propio.', tier: 1, gb: '1,5GB', tr: '12GB', mail: '3', db: '2', base: 39990, feat: false, url: 'https://clientes.fractalhost.cl/store/planes/starter-1' },
    { name: 'Starter 2', desc: 'El equilibrio para emprendedores y pymes chicas.', tier: 2, gb: '2,5GB', tr: '35GB', mail: '6', db: '3', base: 49990, feat: true, url: 'https://clientes.fractalhost.cl/store/planes/starter-2' },
    { name: 'Starter 3', desc: 'Más espacio para crecer tranquilo.', tier: 3, gb: '4GB', tr: '90GB', mail: '12', db: '8', base: 67990, feat: false, url: 'https://clientes.fractalhost.cl/store/planes/starter-3' },
  ],
  pro: [
    { name: 'Pro 1', desc: 'Negocios con tráfico constante.', tier: 1, gb: '8GB', tr: '180GB', mail: '20', db: '15', base: 86990, feat: false, url: 'https://clientes.fractalhost.cl/store/planes/pro-1' },
    { name: 'Pro 2', desc: 'El favorito de las pymes: correos y BD ilimitados.', tier: 2, gb: '15GB', tr: '350GB', mail: 'Ilimitados', db: 'Ilimitadas', base: 109990, feat: true, url: 'https://clientes.fractalhost.cl/store/planes/pro-2' },
    { name: 'Pro 3', desc: 'Tiendas y sitios con mucho contenido.', tier: 3, gb: '30GB', tr: '600GB', mail: 'Ilimitados', db: 'Ilimitadas', base: 139990, feat: false, url: 'https://clientes.fractalhost.cl/store/planes/pro-3' },
  ],
  master: [
    { name: 'Master 1', desc: 'Proyectos grandes y agencias.', tier: 1, gb: '50GB', tr: 'Ilimitada', mail: 'Ilimitados', db: 'Ilimitadas', base: 179990, feat: false, url: 'https://clientes.fractalhost.cl/store/planes/master-1' },
    { name: 'Master 2', desc: 'Máximo rendimiento sin límites.', tier: 2, gb: '70GB', tr: 'Ilimitada', mail: 'Ilimitados', db: 'Ilimitadas', base: 219990, feat: true, url: 'https://clientes.fractalhost.cl/store/planes/master-2' },
    { name: 'Master 3', desc: 'Infraestructura dedicada a tu proyecto.', tier: 3, gb: '90GB', tr: 'Ilimitada', mail: 'Ilimitados', db: 'Ilimitadas', base: 259990, feat: false, url: 'https://clientes.fractalhost.cl/store/planes/master-3' },
  ],
};

export const hostingConoSur: Plan[] = [
  { name: 'Austral', desc: 'Presencia local rápida para partir.', tier: 1, gb: '1,5GB', tr: '15GB', mail: '3', db: '3', base: 49990, feat: false, url: 'https://clientes.fractalhost.cl/store/enlace-nacional-patagonia-cloud-server/austral' },
  { name: 'Glaciar', desc: 'Más espacio para un negocio en marcha.', tier: 2, gb: '2,5GB', tr: '35GB', mail: '5', db: 'Ilimitadas', base: 69990, feat: false, url: 'https://clientes.fractalhost.cl/store/enlace-nacional-patagonia-cloud-server/glaciar' },
  { name: 'Fiordo', desc: 'El equilibrio ideal para pymes de la zona.', tier: 3, gb: '4GB', tr: '90GB', mail: '12', db: '8', base: 89990, feat: true, url: 'https://clientes.fractalhost.cl/store/enlace-nacional-patagonia-cloud-server/fiordo' },
  { name: 'Fiordo Extra', desc: 'Máximo espacio y banda ilimitada.', tier: 4, gb: '8GB', tr: 'Ilimitada', mail: 'Ilimitados', db: '12', base: 129990, feat: false, url: 'https://clientes.fractalhost.cl/store/enlace-nacional-patagonia-cloud-server/fiordo-extra' },
];
