"use client"

// react
import { useState } from "react"
// next
import Link from "next/link"
// abi
import ghAbi from "@/abi/gh_abi.json"
// imports
import { zodResolver } from "@hookform/resolvers/zod"
import { RefreshCw } from "lucide-react"
import { useForm } from "react-hook-form"
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useAccount,
} from "wagmi"
import { sepolia } from "wagmi/chains"
import * as z from "zod"

// components
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ToastAction } from "@/components/ui/toast"
import { toast } from "@/components/ui/use-toast"
import Web3WalletButton from "@/components/web3-wallet-button"

// form schema
const assignLandFormSchema = z.object({
  ghanaCardId: z
    .string()
    .min(2, {
      message: "Land owner Ghana Card ID must be at least 2 characters.",
    })
    .max(30, {
      message:
        "Land owner Ghana Card ID must not be longer than 30 characters.",
    }),
  landPostalCode: z
    .string()
    .min(2, {
      message: "Land postal code must be at least 2 characters.",
    })
    .max(30, {
      message: "Land postal code must not be longer than 30 characters.",
    }),
})

// form schema types
type AssignLandFormValues = z.infer<typeof assignLandFormSchema>

// form default values
const defaultValues: Partial<AssignLandFormValues> = {}

// abi 
const abi = [...ghAbi.abi] as const

export function AssignLandArea() {
  // state
  const [assignLandValues, setAssignLandValues] =
    useState<Partial<AssignLandFormValues>>()
  const [dialogOpen, setDialogOpen] = useState(false)

  // account hooks
  const { isConnected } = useAccount()

  //  prepared contract config
  const { config: assignLandConfig } = usePrepareContractWrite({
    address: process.env.CONTRACT_ADDRESS as `0x${string}`,
    abi: abi,
    chainId: sepolia.id,
    functionName: "assignOwnership",
    args: [
      assignLandValues?.landPostalCode,
      `GHA-${assignLandValues?.ghanaCardId}`,
    ],
  })

  // contract hooks
  const {
    data: loData,
    isLoading: loIsLoading,
    isSuccess: loIsSuccess,
  } = useContractRead({
    address: process.env.CONTRACT_ADDRESS as `0x${string}`,
    abi: abi,
    chainId: sepolia.id,
    functionName: "landOwner",
    args: [assignLandValues?.landPostalCode],
  })
  const {
    data,
    isLoading,
    writeAsync: assignOwnershipWriteAsync,
  } = useContractWrite(assignLandConfig)

  // form hooks
  const form = useForm<AssignLandFormValues>({
    resolver: zodResolver(assignLandFormSchema),
    defaultValues,
    mode: "onSubmit",
  })

  // form handlers
  async function onSubmit(data: AssignLandFormValues) {
    if (!assignLandValues?.ghanaCardId || !assignLandValues?.landPostalCode)
      return

    if (loData && loIsSuccess) {
      if (loData === `GHA-${assignLandValues?.ghanaCardId}`) {
        toast({
          className: "bg-amber-600",
          title: "Error!",
          description: (
            <p className="text-white">
              Land has already been assigned to the owner you are assigning to.
            </p>
          ),
        })
      } else {
        toast({
          className: "bg-amber-600",
          title: "Error!",
          description: (
            <p className="text-white">
              Land has already been assigned to an owner with Ghana Card ID:{" "}
              <b>{loData as string}</b>.
              <br />
              Try changing ownership instead.
            </p>
          ),
        })
      }
      return;
    }

    if (assignOwnershipWriteAsync) {
      try {
        const result = await assignOwnershipWriteAsync()

        if (!result)
          throw new Error("Something went wrong while assigning land.")

        setDialogOpen(true)
      } catch (error) {
        const err = error as Error & { shortMessage?: string }
        toast({
          className: "bg-red-600",
          title: "Error!",
          description: (
            <p className="text-white">
              {err?.shortMessage ??
                "Something went wrong while assigning land."}
            </p>
          ),
          action: (
            <ToastAction
              altText="Try Again"
              className={buttonVariants({ variant: "secondary" })}
              onClick={() => {
                onSubmit(data)
              }}
            >
              Try Again
            </ToastAction>
          ),
        })
      }
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="ghanaCardId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Owner Ghana Card ID</FormLabel>
                <FormControl>
                  <div className="grid grid-cols-[auto_1fr] items-center gap-x-2">
                    <div className="flex h-full items-center rounded border bg-slate-200 px-2.5 dark:bg-slate-800">
                      GHA -
                    </div>
                    <Input
                      placeholder="Eg: 123456723-8"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e)
                        if (
                          !e.target?.value ||
                          typeof e.target?.value !== "string"
                        )
                          return
                        setAssignLandValues((prev) => ({
                          ...(prev ?? {}),
                          ghanaCardId: e.target?.value,
                        }))
                      }}
                    />
                  </div>
                </FormControl>
                <FormDescription>
                  This is the Ghana Card ID of the new land owner to be assigned
                  to the land.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="landPostalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Land Postal Code{" "}
                  {loIsLoading && (
                    <span className="inline-flex gap-x-1.5">
                      <RefreshCw className="ml-1.5 inline-block h-2 w-2 animate-spin" />
                      <small>
                        <em>Looking up land owner...</em>
                      </small>
                    </span>
                  )}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Eg: GS-4567-8792"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e)
                      if (
                        !e.target?.value ||
                        typeof e.target?.value !== "string"
                      )
                        return
                      setAssignLandValues((prev) => ({
                        ...(prev ?? {}),
                        landPostalCode: e.target?.value,
                      }))
                    }}
                  />
                </FormControl>
                <FormDescription>
                  This is the Ghana post GPS address of the land you want to
                  lookup.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {
            isConnected ? (
              <Button type="submit" disabled={isLoading || loIsLoading}>
            {isLoading ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />{" "}
                Registering...
              </>
            ) : (
              "Register"
            )}
          </Button>
            ) : (
              <Web3WalletButton>
                Connect Wallet
              </Web3WalletButton>
            )
          }
        </form>
      </Form>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-5">
              Land Registration Successful
            </DialogTitle>
            <DialogDescription className="space-y-2">
              <p>
                You have successfully registered the land with the following
                details:
              </p>
              <div className="space-y-2">
                <p>
                  <span className="font-semibold">Land Postal Code:</span>{" "}
                  {assignLandValues?.landPostalCode}
                </p>
                <p>
                  <span className="font-semibold">
                    Land Owner Ghana Card ID:
                  </span>{" "}
                  {assignLandValues?.ghanaCardId}
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Link
              href={`https://sepolia.etherscan.io/tx/${data?.hash}`}
              className={buttonVariants({ variant: "ghost" })}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Transaction
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
