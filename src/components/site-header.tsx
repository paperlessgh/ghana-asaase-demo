"use client"

import { Wallet } from "lucide-react"

import { siteConfig } from "@/config/site"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

import Web3WalletButton from "./web3-wallet-button"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Web3WalletButton>
              <span className="hidden md:inline">Connect Wallet</span>
              <Wallet className="h-5 w-5 md:hidden" />
            </Web3WalletButton>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
