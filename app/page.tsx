"use client"

import Link from "next/link"
import { Cloud, Eye, Fingerprint, Lock } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Web3WalletButton from "@/components/web3-wallet-button"

const benefits = [
  {
    name: "Decentralized",
    description:
      "Decentralizing land ownership will help reduce the number of land disputes. As no one entity will have control over the management land ownership.",
    icon: Cloud,
  },
  {
    name: "Transparent",
    description:
      "The blockchain is a public ledger, which means all transactions are public and can be verified by anyone. This will help reduce corruption in the land sector.",
    icon: Eye,
  },
  {
    name: "Secure",
    description:
      "The blockchain is a distributed ledger, which means it is stored on multiple computers. This will help reduce the risk of data loss.",
    icon: Lock,
  },
  {
    name: "Immutable",
    description:
      "Once a transaction is recorded on the blockchain, it cannot be changed. This will help reduce the number of land disputes.",
    icon: Fingerprint,
  },
]

export default function IndexPage() {
  return (
    <>
      <section className="container flex min-h-[480px] flex-col items-center justify-center gap-y-10 pb-8 pt-6 md:gap-y-10 md:py-16">
        <div className="flex max-w-[980px] flex-col items-center justify-center gap-6 text-center md:gap-8">
          <h1 className="text-2xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-4xl">
            Ghana Asaase (Ghana Lands) <br className="hidden sm:inline" />
            Built on Blockchain to decentralize land ownership
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground">
            Ghana Asaase is a decentralized application (DApp) built on the
            Ethereum blockchain to decentralize land ownership in Ghana. It is a
            project by{" "}
            <Link
              href="https://twitter.com/ghanaasaase"
              target="_blank"
              rel="noreferrer"
              className="font-bold text-primary"
            >
              Ghana Asaase
            </Link>
            .
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Web3WalletButton>Connect Wallet</Web3WalletButton>
          <Link
            target="_blank"
            rel="noreferrer"
            href="/app/lookup-land"
            className={buttonVariants({ variant: "outline" })}
          >
            Explore App
          </Link>
        </div>
      </section>
      <Separator />
      <section>
        <div className="py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-3xl md:text-4xl">
                Benefits of using Ghana Asaase
              </h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                We have curated a list of benefits of using blockchain to manage
                land ownership compared to the traditional way of managing land
                ownership.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                {benefits.map((feature) => (
                  <div key={feature.name} className="relative pl-16">
                    <dt className="text-base font-semibold leading-7">
                      <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                        <feature.icon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </div>
                      {feature.name}
                    </dt>
                    <dd className="mt-2 text-base leading-7 text-muted-foreground">
                      {feature.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>
      <Separator />
      <footer className="w-full p-4 shadow md:flex md:items-center md:justify-between md:p-6">
        <span className="text-sm sm:text-center">
          © 2023 <b>Ghana Asaase</b>. All Rights Reserved.
        </span>
        <ul className="mt-3 hidden text-sm font-medium text-muted-foreground  md:flex md:flex-wrap md:items-center">
          <li>
            <Link
              href="/app/lookup-land"
              className="mr-4 hover:underline md:mr-6"
            >
              Explore App
            </Link>
          </li>
        </ul>
      </footer>
    </>
  )
}
