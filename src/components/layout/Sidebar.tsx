import {
  LayoutDashboard,
  Briefcase,
  Camera,
  Activity,
  AlertTriangle,
  BarChart3,
  FileText,
  Users,
  Settings,
  LogOut,
} from "lucide-react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Projects", href: "/projects", icon: Briefcase },
  { name: "Site Monitoring", href: "/monitoring", icon: Camera },
  { name: "Image Analysis", href: "/analysis", icon: Activity },
  { name: "Issues & Incidents", href: "/issues", icon: AlertTriangle },
  { name: "Progress Tracking", href: "/progress", icon: BarChart3 },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "Report History", href: "/report-history", icon: FileText },
  { name: "Team", href: "/team", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("auth")
    navigate("/login")
  }

  return (
    <div className="flex h-full w-64 flex-col border-r bg-construct-dark text-slate-300">
      <div className="flex h-16 items-center px-6 border-b border-slate-700">
        <div className="flex items-center gap-2 text-white font-bold text-lg">
          <div className="w-8 h-8 bg-construct-orange rounded flex items-center justify-center text-white">
            <span className="text-xl leading-none">C</span>
          </div>
          ConstructVision
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {navItems.map((item) => {
            const isActive =
              location.pathname === item.href ||
              (item.href !== "/" && location.pathname.startsWith(item.href))

            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-construct-orange text-white"
                    : "hover:bg-slate-800 hover:text-white"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-700">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </div>
  )
}
