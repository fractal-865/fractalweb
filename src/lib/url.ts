export const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefija la base del sitio (vacía en cPanel, /fractalweb en GitHub Pages). */
export const link = (path: string) => (path.startsWith('/') ? `${base}${path}` : path);
