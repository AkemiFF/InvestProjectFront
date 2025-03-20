'use client'

import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (<NextThemesProvider
    {...props}
    // Forcer le stockage dans localStorage
    storageKey="investnexus-theme"
    // Désactiver les transitions pendant le changement
    disableTransitionOnChange
  >
    {children}
  </NextThemesProvider>)
}
