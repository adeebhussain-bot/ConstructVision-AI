import { useState } from "react"
import { teamMembers } from "@/data/mock"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, UserPlus, Mail, Phone, MoreVertical } from "lucide-react"

export default function Team() {
  const [searchTerm, setSearchTerm] = useState("")
  
  const filteredTeam = teamMembers.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Team</h1>
          <p className="text-muted-foreground mt-1">Manage project members, roles, and permissions.</p>
        </div>
        <Button className="bg-construct-orange hover:bg-orange-600 text-white">
          <UserPlus className="h-4 w-4 mr-2" />
          Add Member
        </Button>
      </div>

      <div className="flex items-center gap-4 bg-white p-4 rounded-lg border shadow-sm mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search team members by name or role..."
            className="pl-9 bg-slate-50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredTeam.map(member => (
          <Card key={member.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-slate-50 p-6 flex flex-col items-center justify-center text-center relative border-b">
                <button className="absolute top-3 right-3 text-slate-400 hover:text-slate-700">
                  <MoreVertical className="h-5 w-5" />
                </button>
                <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 text-2xl font-semibold mb-4 border-4 border-white shadow-sm relative">
                  {member.name.split(' ').map(n => n[0]).join('')}
                  <span className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${member.status === 'Active' ? 'bg-construct-green' : 'bg-slate-400'}`}></span>
                </div>
                <h3 className="font-bold text-lg text-slate-900">{member.name}</h3>
                <p className="text-construct-orange font-medium text-sm">{member.role}</p>
              </div>
              
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">Project</span>
                  <span className="font-medium text-slate-900 truncate max-w-[120px]">{member.project}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">Last Active</span>
                  <span className="text-slate-900">{member.lastActive}</span>
                </div>
                
                <div className="pt-3 flex gap-2 border-t mt-3">
                  <Button variant="outline" size="sm" className="flex-1 text-xs h-8">
                    <Mail className="h-3 w-3 mr-1" /> Email
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 text-xs h-8">
                    <Phone className="h-3 w-3 mr-1" /> Call
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
