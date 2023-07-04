import { Separator } from "@/components/ui/separator"
import { AssignLandArea } from "./assign-land-area"

export default function RegisterLandPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Assign Land</h3>
        <p className="text-sm text-muted-foreground">
          Assign a land to an individual using the {"individual's"} Ghana Card Number.
        </p>
      </div>
      <Separator />
      <AssignLandArea />
    </div>
  )
}
