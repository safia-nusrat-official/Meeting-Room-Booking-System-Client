import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowUpRight, X } from "lucide-react"

const activities = [
  {
    name: "Danilo Sousa",
    action: "Approved invoice #3461",
    date: "June 21, 11:34 am",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    name: "Zahra Ambessa",
    action: "Purchased 15 office chairs and 2 drum sets",
    date: "June 21, 9:43 am",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    name: "Zahra Ambessa",
    action: "Responded to your comment #7514",
    date: "June 21, 9:41 am",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    name: "Jasper Eriksson",
    action: "Created 4 invoices",
    date: "June 20, 4:55 pm",
    avatar: "/placeholder.svg?height=32&width=32",
  },
//   {
//     name: "Travis Ross",
//     action: "Updated client details for Acme Co.",
//     date: "June 20, 3:30 pm",
//     avatar: "/placeholder.svg?height=32&width=32",
//   },
//   {
//     name: "Gizela Kavková",
//     action: "Created a new report",
//     date: "June 20, 3:22 pm",
//     avatar: "/placeholder.svg?height=32&width=32",
//   },
]

export default function RecentActivities() {
  return (
    <Card className="w-full rounded-sm col-span-5 bg-white shadow-none">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold text-gray-800">Recent activity</CardTitle>
        <div className="flex space-x-2">
          <ArrowUpRight className="h-5 w-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
          <X className="h-5 w-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
        </div>
      </CardHeader>
      <CardDescription className="px-6 text-gray-600">
        Review what has happened over the past days.
      </CardDescription>
      <CardContent className="px-6 py-4">
        <ul className="space-y-4">
          {activities.map((activity, index) => (
            <li key={index} className="flex items-start justify-between border-t border-gray-200 pt-4 first:border-t-0 first:pt-0">
              <div className="flex items-start space-x-4">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={activity.avatar} alt={activity.name} />
                  <AvatarFallback className="bg-gray-200 text-gray-600">{activity.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none text-gray-800">{activity.name}</p>
                  <p className="text-sm text-gray-600">{activity.action}</p>
                </div>
              </div>
              <p className="text-sm text-gray-500">{activity.date}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}