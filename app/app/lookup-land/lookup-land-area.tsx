"use client"

// react
import { useEffect, useState } from "react"
// abi
import ghAbi from "@/abi/gh_abi.json"
// imports
import { zodResolver } from "@hookform/resolvers/zod"
import { RefreshCw } from "lucide-react"
import { useForm } from "react-hook-form"
import { useContractRead } from "wagmi"
import { polygonMumbai } from "wagmi/chains"
import * as z from "zod"

// components
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { toast } from "@/components/ui/use-toast"

// form schema
const landLookupFormSchema = z.object({
  landPostalCode: z
    .string()
    .min(2, {
      message: "Land postal code must be at least 2 characters.",
    })
    .max(30, {
      message: "Land postal code must not be longer than 30 characters.",
    }),
})

// form types
type LandLookupFormValues = z.infer<typeof landLookupFormSchema>

// form default values
const defaultValues: Partial<LandLookupFormValues> = {}

// abi 
const abi = [...ghAbi.abi] as const

export function LookupLandArea() {
  // state
  const [landPostalCode, setLandPostalCode] = useState<string>("")
  const [dialogOpen, setDialogOpen] = useState(false)

  // contract hooks
  const { data, error, isError, isLoading, isSuccess } = useContractRead({
    address: process.env.CONTRACT_ADDRESS as `0x${string}`,
    // abi of the contract
    abi: abi,
    // chainId of the network your contract is deployed
    chainId: polygonMumbai.id,
    // name of the function you want to call
    functionName: "landOwner",
    // arguments of the function you want to call
    args: [landPostalCode],
  })

  // form hooks
  const form = useForm<LandLookupFormValues>({
    resolver: zodResolver(landLookupFormSchema),
    defaultValues,
  })

  // effects
  useEffect(() => {
    if (!landPostalCode) {
      return
    }

    if (isError || (isSuccess && !data)) {
      const err = error as Error & { shortMessage: string }
      toast({
        className: "bg-red-600",
        title: "Error!",
        description: (
          <p className="text-white">
            {err ? (
              err?.shortMessage
            ) : (
              <>
                Could not find the land owner for the land with postal code{" "}
                <b>{landPostalCode}</b>. Please try again.
              </>
            )}
          </p>
        ),
      })
      return
    }

    if (isSuccess) {
      setDialogOpen(true)
      return
    }
  }, [data, error, isSuccess, isError, landPostalCode])

  // form handlers
  function onSubmit(formData: LandLookupFormValues) {
    if (!formData?.landPostalCode) return

    if (formData.landPostalCode === landPostalCode) {
      if (isError || (isSuccess && !data)) {
        const err = error as Error & { shortMessage: string }
        toast({
          className: "bg-red-600",
          title: "Error!",
          description: (
            <p className="text-white">
              {err ? (
                err?.shortMessage
              ) : (
                <>
                  Could not find the land owner for the land with postal code{" "}
                  <b>{landPostalCode}</b>. Please try again.
                </>
              )}
            </p>
          ),
        })
        return
      }

      if (isSuccess) {
        setDialogOpen(true)
        return
      }
    }

    setLandPostalCode(formData.landPostalCode)
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="landPostalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Land Postal Code</FormLabel>
                <FormControl>
                  <Input placeholder="Eg: GS-4567-8792" {...field} />
                </FormControl>
                <FormDescription>
                  This is the Ghana post GPS address of the land you want to
                  lookup.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Looking
                up...
              </>
            ) : (
              "Start Lookup"
            )}
          </Button>
        </form>
      </Form>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-5">Land Owner Found</DialogTitle>
            <DialogDescription className="space-y-2">
              <p>
                Below is the details land owner for the land with postal code{" "}
                <b>{landPostalCode}</b>:
              </p>
              <p>
                Ghana Card ID: <b>{String(data)}</b>
              </p>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}
