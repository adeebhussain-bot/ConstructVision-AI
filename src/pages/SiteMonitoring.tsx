import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"
import { Camera, Calendar, Clock } from "lucide-react"

const images = [
  { id: 1, url: "https://images.unsplash.com/photo-1541888081622-15cb2a061482?auto=format&fit=crop&w=600&q=80", date: "Oct 6, 2026", time: "10:45 AM", project: "Metro Tower", status: "Analyzed" },
  { id: 2, url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80", date: "Oct 6, 2026", time: "09:15 AM", project: "Green Heights", status: "Analyzed" },
  { id: 3, url: "https://images.unsplash.com/photo-1504307651254-35680f356f12?auto=format&fit=crop&w=600&q=80", date: "Oct 5, 2026", time: "16:30 PM", project: "Tech Park Phase II", status: "Issues Detected" },
  { id: 4, url: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80", date: "Oct 5, 2026", time: "11:20 AM", project: "Metro Tower", status: "Analyzed" },
  { id: 5, url: "https://images.unsplash.com/photo-1590496793907-4e3415e6b701?auto=format&fit=crop&w=600&q=80", date: "Oct 4, 2026", time: "14:10 PM", project: "Riverside Bridge", status: "Pending" },
  { id: 6, url: "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?auto=format&fit=crop&w=600&q=80", date: "Oct 4, 2026", time: "08:05 AM", project: "Green Heights", status: "Analyzed" },
]

export default function SiteMonitoring() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Site Monitoring</h1>
          <p className="text-muted-foreground mt-1">Review recent site captures and surveillance data.</p>
        </div>
        <Link to="/analysis">
          <Button className="bg-construct-orange hover:bg-orange-600 text-white">
            <Camera className="h-4 w-4 mr-2" />
            Upload New Image
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((img) => (
          <Card key={img.id} className="overflow-hidden group cursor-pointer hover:shadow-md transition-all border-slate-200">
            <div className="relative h-48 overflow-hidden bg-slate-100">
              <img 
                src={img.url} 
                alt="Site capture" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
              <div className="absolute top-3 right-3">
                <Badge variant={img.status === 'Analyzed' ? 'success' : img.status === 'Issues Detected' ? 'destructive' : 'secondary'} className="shadow-sm">
                  {img.status}
                </Badge>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="font-semibold text-slate-900 mb-2 truncate">{img.project}</div>
              <div className="flex justify-between items-center text-sm text-slate-500">
                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {img.date}</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {img.time}</span>
              </div>
              
              <Link to="/analysis" className="mt-4 w-full block">
                <Button variant="outline" className="w-full text-xs h-8">View Analysis</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
