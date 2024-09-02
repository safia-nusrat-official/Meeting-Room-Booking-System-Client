import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Link } from "react-router-dom"

export function QuickAccess() {
  return (
    <div>
      <div className="space-y-1">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      <p className="text-sm text-muted-foreground">
          Manage Rooms, Bookings, Slots, Users at a glance.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 font-medium items-center space-x-4 text-sm">
        <Link to="/admin/create-room"><Button variant="link">Create Rooms</Button></Link>
        <Separator orientation="vertical" />
        <Link to="/admin/create-slot">Create Slots</Link>
        <Separator orientation="vertical" />
        <Link to="/admin/bookings-list">Delete Bookings</Link>
      </div>
    </div>
  )
}
