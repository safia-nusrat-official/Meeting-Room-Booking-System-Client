import { Separator } from "@/components/ui/separator"
import { Link } from "react-router-dom"

export function QuickAccess() {
  return (
    <div>
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">At a glance</h4>
        <p className="text-sm text-muted-foreground">
          An open-source UI component library.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 font-medium items-center space-x-4 text-sm">
        <Link to="/admin/create-room">Create Rooms</Link>
        <Separator orientation="vertical" />
        <Link to="/admin/create-slot">Create Slots</Link>
        <Separator orientation="vertical" />
        <Link to="/admin/bookings-list">Delete Bookings</Link>
      </div>
    </div>
  )
}
