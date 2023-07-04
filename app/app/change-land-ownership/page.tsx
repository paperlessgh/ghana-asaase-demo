"use client"

import { Separator } from "@/components/ui/separator"
import { ChangeLandOwnershipArea } from "./change-land-ownership-area"

export default function ChangeLandOwnershipPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Change Land Ownership</h3>
        <p className="text-sm text-muted-foreground">
          Change the ownership of a land from an individual to another
          individual using the Ghana Post GPS Address of the land and the Ghana
          Card IDs of the individuals involed.
        </p>
      </div>
      <Separator />
      <ChangeLandOwnershipArea />
    </div>
  )
}
