/**
 * Helper to resolve dynamic URLs between localhost in development and
 * custom subdomains in production.
 */
export function getCompanyAdminUrl(path: string = ''): string {
  const cleanPath = path ? (path.startsWith('/') ? path : `/${path}`) : '';
  if (typeof window !== 'undefined') {
    const isLocal =
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1';
    if (isLocal) {
      return `http://localhost:5179${cleanPath === '/' ? '' : cleanPath}`;
    }
  }
  return `https://admin.thekada.in${cleanPath === '/' ? '' : cleanPath}`;
}
