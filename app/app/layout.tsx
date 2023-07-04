"use client"

// import { Metadata } from "next"

import { Separator } from "@/components/ui/separator"
import { SidebarNav } from "@/components/sidebar-nav"

// export const metadata: Metadata = {
//   title: "Forms",
//   description: "Advanced form example using react-hook-form and Zod.",
// }

const sidebarNavItems = [
  {
    title: "Lookup Land",
    href: "/app/lookup-land",
  },
  {
    title: "Lookup Land Owner",
    href: "/app/lookup-land-owner",
  },
  {
    title: "Register Land",
    href: "/app/register-land",
  },
  {
    title: "Change Land Ownership",
    href: "/app/change-land-ownership",
  },
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="container">
      <div className="space-y-6 py-10 pb-16 md:block md:p-10">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Application</h2>
          <p className="text-muted-foreground">
            Manage and lookup land and ownership info
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </div>
  )
}
