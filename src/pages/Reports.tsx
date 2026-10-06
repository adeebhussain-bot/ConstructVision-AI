import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileText, FileSpreadsheet, Plus } from "lucide-react"

const reports = [
  { id: 1, title: "Daily Site Report - Metro Tower", date: "Oct 6, 2026", type: "PDF", size: "2.4 MB" },
  { id: 2, title: "Weekly Progress - Green Heights", date: "Oct 5, 2026", type: "PDF", size: "4.1 MB" },
  { id: 3, title: "Safety Inspection Summary", date: "Oct 4, 2026", type: "CSV", size: "156 KB" },
  { id: 4, title: "Monthly Project Summary", date: "Oct 1, 2026", type: "PDF", size: "8.5 MB" },
  { id: 5, title: "Issue Log Export", date: "Sep 30, 2026", type: "CSV", size: "320 KB" },
]

export default function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Reports</h1>
          <p className="text-muted-foreground mt-1">Generate and download project reports and exports.</p>
        </div>
        <Button className="bg-construct-orange hover:bg-orange-600 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Generate Report
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card className="cursor-pointer hover:border-construct-orange transition-colors">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
              <FileText className="h-6 w-6 text-slate-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-slate-900">Daily Site Report</h3>
              <p className="text-sm text-slate-500 mt-1">Summary of day's activities, weather, and progress.</p>
            </div>
            <Button variant="outline" className="w-full mt-2">Generate</Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:border-construct-orange transition-colors">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
              <FileSpreadsheet className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-slate-900">Progress Report</h3>
              <p className="text-sm text-slate-500 mt-1">Detailed breakdown of planned vs actual progress.</p>
            </div>
            <Button variant="outline" className="w-full mt-2">Generate</Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:border-construct-orange transition-colors">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
              <FileText className="h-6 w-6 text-construct-red" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-slate-900">Safety & Issues</h3>
              <p className="text-sm text-slate-500 mt-1">Log of all safety violations and reported issues.</p>
            </div>
            <Button variant="outline" className="w-full mt-2">Generate</Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
          <CardDescription>Previously generated reports available for download.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg bg-white hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded ${report.type === 'PDF' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                    {report.type === 'PDF' ? <FileText className="h-5 w-5" /> : <FileSpreadsheet className="h-5 w-5" />}
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900">{report.title}</h4>
                    <p className="text-xs text-slate-500">Generated on {report.date} • {report.size}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="hover:text-construct-orange hover:bg-orange-50">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
