import { useState, useEffect, useCallback } from 'react'
import type { ThemeMode } from '../types'

export function useTheme(defaultTheme: ThemeMode = 'dark') {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    try {
      const stored = localStorage.getItem('tkdv_admin_theme')
      if (stored === 'dark' || stored === 'light') {
        return stored
      }
    } catch (e) {
      console.error('Failed to read theme from localStorage:', e)
    }
    return defaultTheme
  })

  useEffect(() => {
    try {
      localStorage.setItem('tkdv_admin_theme', theme)
      if (theme === 'dark') {
        document.documentElement.classList.add('dark')
        document.documentElement.classList.remove('light')
      } else {
        document.documentElement.classList.add('light')
        document.documentElement.classList.remove('dark')
      }
    } catch (e) {
      console.error('Failed to save theme to localStorage:', e)
    }
  }, [theme])

  const toggleTheme = useCallback(() => {
    setThemeState(prev => (prev === 'dark' ? 'light' : 'dark'))
  }, [])

  const setTheme = useCallback((newTheme: ThemeMode) => {
    setThemeState(newTheme)
  }, [])

  return {
    theme,
    isDark: theme === 'dark',
    toggleTheme,
    setTheme
  }
}
