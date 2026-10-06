import { Bell, Search, User } from "lucide-react"
import { Input } from "@/components/ui/input"

export function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <div className="flex items-center gap-4 w-96">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search projects, issues..."
            className="w-full pl-9 bg-slate-50 border-none"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-slate-500 hover:text-slate-900 transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-construct-red border-2 border-white"></span>
        </button>
        
        <div className="h-8 w-px bg-border mx-2"></div>
        
        <div className="flex items-center gap-3">
          <div className="flex flex-col text-right">
            <span className="text-sm font-medium">Admin User</span>
            <span className="text-xs text-muted-foreground">Project Manager</span>
          </div>
          <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
            <User className="h-5 w-5 text-slate-500" />
          </div>
        </div>
      </div>
    </header>
  )
}
