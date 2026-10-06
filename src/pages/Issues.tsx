import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Modal } from "@/components/ui/modal"
import { issues as initialIssues } from "@/data/mock"
import { Search, Filter, AlertTriangle } from "lucide-react"

export default function Issues() {
  const [issues, setIssues] = useState(initialIssues)
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newIssue, setNewIssue] = useState({
    title: "",
    projectName: "",
    category: "Safety",
    severity: "Medium",
  })

  const filteredIssues = issues.filter(i => 
    i.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.projectName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCreateIssue = (e: React.FormEvent) => {
    e.preventDefault()
    const issue = {
      id: `ISS-0${issues.length + 42}`,
      projectId: "new",
      projectName: newIssue.projectName || "General",
      title: newIssue.title,
      category: newIssue.category,
      severity: newIssue.severity,
      detected: "Just now",
      status: "Open",
      assignee: "Unassigned"
    }
    setIssues([issue, ...issues])
    setIsModalOpen(false)
  }

  const handleStatusChange = (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === "Open" ? "Investigating" : currentStatus === "Investigating" ? "Resolved" : "Open"
    setIssues(issues.map(i => i.id === id ? { ...i, status: nextStatus } : i))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Issues & Incidents</h1>
          <p className="text-muted-foreground mt-1">Track and manage site problems, safety violations, and defects.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="bg-construct-red hover:bg-red-700 text-white">
          <AlertTriangle className="h-4 w-4 mr-2" />
          Report Issue
        </Button>
      </div>

      <div className="flex items-center gap-4 bg-white p-4 rounded-lg border shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search issues by title or project..."
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

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 bg-slate-50 uppercase border-b">
              <tr>
                <th className="px-6 py-4 font-medium">Issue ID</th>
                <th className="px-6 py-4 font-medium">Project</th>
                <th className="px-6 py-4 font-medium">Issue</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Severity</th>
                <th className="px-6 py-4 font-medium">Detected</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredIssues.map((issue) => (
                <tr key={issue.id} className="bg-white border-b hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{issue.id}</td>
                  <td className="px-6 py-4">{issue.projectName}</td>
                  <td className="px-6 py-4 font-medium">{issue.title}</td>
                  <td className="px-6 py-4">{issue.category}</td>
                  <td className="px-6 py-4">
                    <Badge variant={issue.severity === 'Critical' ? 'destructive' : issue.severity === 'High' ? 'warning' : 'secondary'}>
                      {issue.severity}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{issue.detected}</td>
                  <td className="px-6 py-4">
                    <Badge variant={issue.status === 'Resolved' ? 'success' : issue.status === 'Investigating' ? 'warning' : 'outline'}>
                      {issue.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleStatusChange(issue.id, issue.status)}
                    >
                      Update Status
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredIssues.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              No issues found.
            </div>
          )}
        </div>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Report New Issue">
        <form onSubmit={handleCreateIssue} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Issue Title</label>
            <Input 
              required
              value={newIssue.title}
              onChange={(e) => setNewIssue({...newIssue, title: e.target.value})}
              placeholder="E.g. Missing safety barrier" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Project</label>
            <Input 
              required
              value={newIssue.projectName}
              onChange={(e) => setNewIssue({...newIssue, projectName: e.target.value})}
              placeholder="Project Name" 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <select 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={newIssue.category}
                onChange={(e) => setNewIssue({...newIssue, category: e.target.value})}
              >
                <option>Safety</option>
                <option>Structural</option>
                <option>Material</option>
                <option>Equipment</option>
                <option>Quality</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Severity</label>
              <select 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={newIssue.severity}
                onChange={(e) => setNewIssue({...newIssue, severity: e.target.value})}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </select>
            </div>
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" className="bg-construct-red hover:bg-red-700 text-white">Create Issue</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
