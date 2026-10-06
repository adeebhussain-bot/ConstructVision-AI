import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, FileText, Download, Eye, Trash2, Calendar, Building } from "lucide-react"

export default function ReportHistory() {
  const [reports, setReports] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('reportHistory') || '[]')
    setReports(history)
  }, [])

  const handleDelete = (id: string) => {
    const updated = reports.filter(r => r.id !== id)
    setReports(updated)
    localStorage.setItem('reportHistory', JSON.stringify(updated))
  }

  const filteredReports = reports.filter(r => 
    r.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Report History</h1>
          <p className="text-muted-foreground mt-1">Access past visual site inspections and evaluation reports.</p>
        </div>
        <Link to="/analysis">
          <Button className="bg-construct-orange hover:bg-orange-600 text-white">
            New Evaluation
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-4 bg-white p-4 rounded-lg border shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by project name or report ID..."
            className="pl-9 bg-slate-50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 bg-slate-50 uppercase border-b">
              <tr>
                <th className="px-6 py-4 font-medium">Report ID</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Project</th>
                <th className="px-6 py-4 font-medium">Score</th>
                <th className="px-6 py-4 font-medium">Risk Level</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((report) => {
                const dateObj = new Date(report.date)
                const dateStr = dateObj.toLocaleDateString()
                const timeStr = dateObj.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
                
                return (
                  <tr key={report.id} className="bg-white border-b hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-slate-600">{report.id.split('-')[0]}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-slate-900">{dateStr}</span>
                        <span className="text-xs text-slate-500">{timeStr}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium flex items-center gap-2">
                      <Building className="h-4 w-4 text-slate-400" />
                      {report.project}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900">{report.score}/100</div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={report.risk === 'High' ? 'destructive' : report.risk === 'Moderate' ? 'warning' : 'success'}>
                        {report.risk}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-medium text-slate-600">{report.status}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link to={`/reports/${report.id}`}>
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0" title="View Report">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-construct-orange border-orange-200 hover:bg-orange-50 hover:text-construct-orange" title="Download Data">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDelete(report.id)} className="h-8 w-8 p-0 text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600" title="Delete">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {filteredReports.length === 0 && (
            <div className="text-center py-16 flex flex-col items-center">
              <FileText className="h-12 w-12 text-slate-300 mb-3" />
              <h3 className="text-lg font-medium text-slate-900">No reports found</h3>
              <p className="text-slate-500 max-w-sm mt-1">
                {searchTerm ? "No reports match your search criteria." : "Run an image analysis to generate your first site inspection report."}
              </p>
              {!searchTerm && (
                <Link to="/analysis">
                  <Button className="mt-4 bg-construct-dark text-white">Start Evaluation</Button>
                </Link>
              )}
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
