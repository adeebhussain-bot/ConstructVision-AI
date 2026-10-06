import { useParams, Link } from "react-router-dom"
import { projects } from "@/data/mock"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { MapPin, User, Building, ChevronRight } from "lucide-react"

export default function ProjectDetails() {
  const { id } = useParams()
  const project = projects.find(p => p.id === id) || projects[0]

  return (
    <div className="space-y-6">
      <div className="flex items-center text-sm text-slate-500">
        <Link to="/projects" className="hover:text-construct-orange">Projects</Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span className="text-slate-900 font-medium">{project.name}</span>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-lg border shadow-sm">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">{project.name}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {project.location}</span>
            <span className="flex items-center gap-1"><User className="h-4 w-4" /> {project.manager}</span>
            <span className="flex items-center gap-1"><Building className="h-4 w-4" /> {project.client}</span>
          </div>
        </div>
        <div className="text-right">
          <Badge variant={project.status === "On Track" ? "success" : project.status === "Attention" ? "warning" : project.status === "Delayed" ? "destructive" : "default"} className="mb-2 text-sm px-3 py-1">
            {project.status}
          </Badge>
          <div className="text-sm font-medium">Expected: {project.expectedCompletion}</div>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="images">Site Images</TabsTrigger>
          <TabsTrigger value="issues">Issues</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Project Milestones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative border-l border-slate-200 ml-3 space-y-8 pb-4">
                  {[
                    { phase: "Foundation", status: "completed", percent: 100 },
                    { phase: "Structural", status: "in-progress", percent: 75 },
                    { phase: "MEP Installation", status: "pending", percent: 0 },
                    { phase: "Finishing", status: "pending", percent: 0 },
                    { phase: "Inspection", status: "pending", percent: 0 },
                    { phase: "Handover", status: "pending", percent: 0 }
                  ].map((milestone, idx) => (
                    <div key={idx} className="relative pl-6">
                      <div className={`absolute -left-1.5 top-1.5 h-3 w-3 rounded-full border-2 border-white ${milestone.status === 'completed' ? 'bg-construct-green' : milestone.status === 'in-progress' ? 'bg-construct-orange' : 'bg-slate-300'}`}></div>
                      <div className="flex justify-between mb-1">
                        <span className={`font-medium ${milestone.status === 'completed' ? 'text-slate-900' : milestone.status === 'in-progress' ? 'text-construct-orange' : 'text-slate-500'}`}>
                          {milestone.phase}
                        </span>
                        <span className="text-sm text-slate-500">{milestone.percent}%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${milestone.status === 'completed' ? 'bg-construct-green' : 'bg-construct-orange'}`} 
                          style={{ width: `${milestone.percent}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-slate-500 font-medium">Overall Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold mb-2">{project.progress}%</div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${project.progress > 75 ? 'bg-construct-green' : project.progress < 40 ? 'bg-construct-red' : 'bg-construct-orange'}`} 
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-slate-500 font-medium">Budget Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-1">On Track</div>
                  <div className="text-sm text-slate-500">42% of budget utilized</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-slate-500 font-medium">Site Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-construct-green mb-1">94%</div>
                  <div className="text-sm text-slate-500">2 open safety issues</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="progress">
          <Card>
            <CardContent className="p-12 text-center text-slate-500">
              Detailed progress tracking view...
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="images">
          <Card>
            <CardContent className="p-12 text-center text-slate-500">
              Site images gallery...
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
