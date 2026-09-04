// Theme helper for ATS Studio 3D

export function getTheme() {
  if (typeof window === 'undefined') return 'dark'
  const saved = localStorage.getItem('theme')
  if (saved === 'dark' || saved === 'light') return saved
  // Dark mode is strictly preferred first
  return 'dark'
}


export function setTheme(theme) {
  if (typeof document === 'undefined') return
  const isDark = theme === 'dark'
  document.documentElement.classList.toggle('dark', isDark)
  try {
    localStorage.setItem('theme', theme)
  } catch (e) {
    console.warn('Unable to persist theme:', e)
  }
  // Dispatch custom event for 3D canvas and other reactive listeners
  window.dispatchEvent(new CustomEvent('themechange', { detail: { theme, isDark } }))
}

export function toggleTheme() {
  const current = getTheme()
  const next = current === 'dark' ? 'light' : 'dark'
  setTheme(next)
  return next
}

export function initTheme() {
  const theme = getTheme()
  setTheme(theme)
  return theme
}
