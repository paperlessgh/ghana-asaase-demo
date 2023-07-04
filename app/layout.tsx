"use client";

// styles
import "@/styles/globals.css";
// react
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Web3Modal } from "@web3modal/react";
// wallet connect
import { WagmiConfig } from "wagmi";

// config
import { siteConfig } from "@/config/site";
// lib
import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import {
  ethereumClient,
  projectId,
  wagmiConfig,
} from "@/lib/web3-modal-config";
// ui
import { Toaster } from "@/components/ui/toaster";
// components
import { SiteHeader } from "@/components/site-header";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "@/components/theme-provider";

// types
interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  // state
  const [ready, setReady] = useState(false);

  // hooks
  const { theme } = useTheme();
  const currentTheme = theme === "system" ? "dark" : theme;

  // effects
  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head>
          <title>{siteConfig.name}</title>
          <meta name="description" content={siteConfig.description} />
          {/* shortcut icon */}
          <link
            rel="shortcut icon"
            href={siteConfig.getLogoUrl(currentTheme)}
          />
          {/* favicon */}
          <link rel="icon" href={siteConfig.getLogoUrl(currentTheme)} />
        </head>
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
  );
}
