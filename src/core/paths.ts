/** Resolves media and app assets below Vite's base path (also works on GitHub Pages). */
export function assetPath(path: string): string {
  const clean = path.replace(/^\/+/, '');
  return `${import.meta.env.BASE_URL}${clean}`;
}
