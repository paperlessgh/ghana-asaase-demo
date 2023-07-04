"use client"

import { Separator } from "@/components/ui/separator"
import { LookupLandOwnerArea } from "./lookup-land-owner-area"

export default function LookupLandOwnerPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Check Lands Owned By An Individual</h3>
        <p className="text-sm text-muted-foreground">
          Check the lands owned by an individual using the {"individual's"} Ghana Card Number.
        </p>
      </div>
      <Separator />
      <LookupLandOwnerArea />
    </div>
  )
}
