"use client"

// react
import { useState } from "react"

// imports
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

// components
import { Button } from "@/components/ui/button"
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
const landOwnerLookupFormSchema = z.object({
  ghanaCardId: z
    .string()
    .min(2, {
      message: "Land owner Ghana Card ID must be at least 2 characters.",
    })
    .max(30, {
      message:
        "Land owner Ghana Card ID must not be longer than 30 characters.",
    }),
})

// form types
type LandOwnerLookupFormValues = z.infer<typeof landOwnerLookupFormSchema>

// form default values
const defaultValues: Partial<LandOwnerLookupFormValues> = {}

export function LookupLandOwnerArea() {
  // state 
  const [landOwnerGhanaCardId, setLandOwnerGhanaCardId] = useState<string>("")

  // form hooks
  const form = useForm<LandOwnerLookupFormValues>({
    resolver: zodResolver(landOwnerLookupFormSchema),
    defaultValues,
  })

  // form handlers
  function onSubmit(data: LandOwnerLookupFormValues) {
    if (!data?.ghanaCardId) return

    setLandOwnerGhanaCardId(`GHA-${data.ghanaCardId}`)

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="ghanaCardId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Land Owner Ghana Card ID</FormLabel>
              <FormControl>
                <div className="grid grid-cols-[auto_1fr] items-center gap-x-2">
                  <div className="flex h-full items-center rounded border bg-slate-200 px-2.5 dark:bg-slate-800">
                    GHA - 
                  </div>
                  <Input placeholder="Eg: 123456723-8" {...field} />
                </div>
              </FormControl>
              <FormDescription>
                This is the Ghana Card ID of the land owner you want to lookup.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Start Lookup</Button>
      </form>
    </Form>
  )
}
