const apiBase = import.meta.env.VITE_API_URL?.replace(/\/+$/, '') || ''

export function apiPath(path) {
  if (!path.startsWith('/')) {
    path = `/${path}`
  }
  return `${apiBase}${path}`
}
