import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { projects, issues, siteActivity } from "@/data/mock"
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'
import { Link } from "react-router-dom"
import { HardHat, Activity, AlertTriangle, CheckCircle2 } from "lucide-react"

const progressData = [
  { name: 'Week 1', planned: 10, actual: 12 },
  { name: 'Week 2', planned: 25, actual: 23 },
  { name: 'Week 3', planned: 40, actual: 38 },
  { name: 'Week 4', planned: 55, actual: 50 },
  { name: 'Week 5', planned: 70, actual: 68 },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <HardHat className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.length}</div>
            <p className="text-xs text-muted-foreground">+1 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Project Progress</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68.4%</div>
            <p className="text-xs text-muted-foreground">Average across all projects</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-construct-red" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">-4 since yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Site Health</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-construct-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">Overall compliance score</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Project Overview</CardTitle>
            <CardDescription>Status and progress of active construction sites.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projects.map(project => (
                <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg bg-white shadow-sm hover:border-slate-300 transition-colors">
                  <div className="flex flex-col gap-1 w-1/3">
                    <Link to={`/projects/${project.id}`} className="font-semibold text-slate-900 hover:text-construct-orange hover:underline">{project.name}</Link>
                    <span className="text-sm text-slate-500">{project.location}</span>
                  </div>
                  <div className="flex flex-col gap-1 w-1/4">
                    <span className="text-sm font-medium">{project.phase}</span>
                    <span className="text-xs text-slate-500">Current Phase</span>
                  </div>
                  <div className="flex items-center gap-4 w-1/3">
                    <div className="w-full">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span>{project.progress}%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${project.progress > 75 ? 'bg-construct-green' : project.progress < 40 ? 'bg-construct-red' : 'bg-construct-orange'}`} 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="w-24 text-right">
                    <Badge variant={project.status === "On Track" ? "success" : project.status === "Attention" ? "warning" : project.status === "Delayed" ? "destructive" : "default"}>
                      {project.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Progress Analytics</CardTitle>
            <CardDescription>Planned vs Actual progress over time.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="planned" stroke="#94A3B8" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="actual" stroke="#F97316" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Critical Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {issues.slice(0,4).map(issue => (
                <div key={issue.id} className="flex items-start justify-between p-3 border-b last:border-0 pb-3">
                  <div className="flex flex-col gap-1">
                    <span className="font-medium text-sm">{issue.title}</span>
                    <span className="text-xs text-slate-500">{issue.projectName} • {issue.detected}</span>
                  </div>
                  <Badge variant={issue.severity === "Critical" ? "destructive" : issue.severity === "High" ? "warning" : "secondary"}>
                    {issue.severity}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Site Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {siteActivity.map((activity, i) => (
                <div key={activity.id} className="flex gap-4 relative">
                  {i !== siteActivity.length - 1 && (
                    <div className="absolute left-1.5 top-6 bottom-[-16px] w-px bg-slate-200"></div>
                  )}
                  <div className={`w-3 h-3 rounded-full mt-1 z-10 flex-shrink-0 ${activity.type === 'issue' ? 'bg-construct-red' : activity.type === 'progress' ? 'bg-construct-green' : 'bg-construct-orange'}`}></div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-slate-500 font-medium">{activity.time}</span>
                    <span className="text-sm text-slate-700">{activity.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
