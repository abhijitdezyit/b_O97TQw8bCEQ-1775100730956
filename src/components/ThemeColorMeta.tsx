import { useEffect } from 'react'
import { useTheme } from '@/providers/ThemeProvider'

export function ThemeColorMeta() {
  const { theme } = useTheme()

  useEffect(() => {
    // Get the actual resolved theme (light or dark)
    const resolvedTheme = theme === 'system' 
      ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      : theme

    // Update theme-color meta tag
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', resolvedTheme === 'dark' ? '#0f172a' : '#ffffff')
    }

    // Update apple status bar style
    const metaAppleStatusBar = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]')
    if (metaAppleStatusBar) {
      metaAppleStatusBar.setAttribute('content', resolvedTheme === 'dark' ? 'black-translucent' : 'default')
    }
  }, [theme])

  return null
}
