import { useState } from "react"
import { Link } from "react-router-dom"
import { projects } from "@/data/mock"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Plus, Filter, MapPin, User, Calendar } from "lucide-react"

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState("")
  
  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Projects</h1>
          <p className="text-muted-foreground mt-1">Manage and track all construction projects.</p>
        </div>
        <Button className="bg-construct-orange hover:bg-orange-600 text-white">
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      <div className="flex items-center gap-4 bg-white p-4 rounded-lg border shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects by name or location..."
            className="pl-9 bg-slate-50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map(project => (
          <Link key={project.id} to={`/projects/${project.id}`}>
            <Card className="hover:border-construct-orange hover:shadow-md transition-all cursor-pointer h-full">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900">{project.name}</h3>
                    <div className="flex items-center text-sm text-slate-500 mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      {project.location}
                    </div>
                  </div>
                  <Badge variant={project.status === "On Track" ? "success" : project.status === "Attention" ? "warning" : project.status === "Delayed" ? "destructive" : "default"}>
                    {project.status}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 flex items-center gap-2">
                      <User className="h-4 w-4" /> Manager
                    </span>
                    <span className="font-medium text-slate-900">{project.manager}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 flex items-center gap-2">
                      <Calendar className="h-4 w-4" /> Completion
                    </span>
                    <span className="font-medium text-slate-900">{project.expectedCompletion}</span>
                  </div>

                  <div className="pt-3 border-t mt-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">{project.phase}</span>
                      <span className="font-bold">{project.progress}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${project.progress > 75 ? 'bg-construct-green' : project.progress < 40 ? 'bg-construct-red' : 'bg-construct-orange'}`} 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
