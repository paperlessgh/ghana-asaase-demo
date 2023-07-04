"use client"

// styles
import "@/styles/globals.css"
// react
import { useEffect, useState } from "react"
import { Web3Modal } from "@web3modal/react"
// wallet connect
import { WagmiConfig } from "wagmi"

// config
import { siteConfig } from "@/config/site"
// lib
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { ethereumClient, projectId, wagmiConfig } from "@/lib/web3-modal-config"
// ui
import { Toaster } from "@/components/ui/toaster"
// components
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

// types
interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
  }, [])

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          {ready ? (
            <WagmiConfig config={wagmiConfig}>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
              >
                <div className="relative flex min-h-screen flex-col">
                  <SiteHeader />
                  <div className="flex-1">{children}</div>
                </div>
                <TailwindIndicator />
              </ThemeProvider>
            </WagmiConfig>
          ) : null}
          <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
          <Toaster />
        </body>
      </html>
    </>
  )
}
