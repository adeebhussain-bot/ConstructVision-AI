import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Filter, Calendar as CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

const progressData = [
  { name: 'Metro Tower', planned: 80, actual: 72 },
  { name: 'Green Heights', planned: 65, actual: 54 },
  { name: 'Tech Park II', planned: 80, actual: 81 },
  { name: 'Riverside', planned: 45, actual: 32 },
]

const categoriesData = [
  { name: 'Foundation', completion: 100 },
  { name: 'Structure', completion: 75 },
  { name: 'Electrical', completion: 40 },
  { name: 'Plumbing', completion: 35 },
  { name: 'HVAC', completion: 20 },
  { name: 'Finishing', completion: 5 },
]

export default function ProgressTracking() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Progress Tracking</h1>
          <p className="text-muted-foreground mt-1">Visualize project progression against planned schedules.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <CalendarIcon className="h-4 w-4 mr-2" />
            Date Range
          </Button>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            All Projects
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-medium text-slate-500 mb-1">Overall Progress</div>
            <div className="text-3xl font-bold text-slate-900">68.4%</div>
            <div className="text-sm text-construct-orange font-medium mt-1">-3.2% vs planned</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-medium text-slate-500 mb-1">On Schedule</div>
            <div className="text-3xl font-bold text-slate-900">2</div>
            <div className="text-sm text-slate-500 mt-1">Out of 4 projects</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-medium text-slate-500 mb-1">Delayed Tasks</div>
            <div className="text-3xl font-bold text-construct-red">14</div>
            <div className="text-sm text-slate-500 mt-1">Requiring immediate action</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-medium text-slate-500 mb-1">Productivity Index</div>
            <div className="text-3xl font-bold text-construct-green">0.92</div>
            <div className="text-sm text-slate-500 mt-1">Schedule performance index</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Planned vs Actual Progress</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={progressData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Legend />
                <Bar dataKey="planned" name="Planned %" fill="#94A3B8" radius={[4, 4, 0, 0]} barSize={30} />
                <Bar dataKey="actual" name="Actual %" fill="#F97316" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Work Category Completion</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoriesData} layout="vertical" margin={{ top: 20, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                <XAxis type="number" axisLine={false} tickLine={false} domain={[0, 100]} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Bar dataKey="completion" name="Completion %" fill="#10B981" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
