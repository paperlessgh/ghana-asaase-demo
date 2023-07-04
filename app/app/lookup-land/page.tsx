"use client"

import { Separator } from "@/components/ui/separator"
import { LookupLandArea } from "./lookup-land-area"

export default function LookupLandPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Check Land Owner</h3>
        <p className="text-sm text-muted-foreground">
          Check the owner of a land using the Ghana Post GPS Address of the land.
        </p>
      </div>
      <Separator />
      <LookupLandArea />
    </div>
  )
}
