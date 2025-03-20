import { ClientProvider } from '@/components/ClientProvider'
import { ThemeProvider } from '@/components/theme-provider'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'InvestNexus',
  description: 'InvestNexus',
  generator: 'InvestNexus',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClientProvider>
            {children}
          </ClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
