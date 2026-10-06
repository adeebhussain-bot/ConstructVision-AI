import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Layout } from "@/components/layout/Layout"
import Login from "@/pages/Login"
import Dashboard from "@/pages/Dashboard"
import Projects from "@/pages/Projects"
import ProjectDetails from "@/pages/ProjectDetails"
import SiteMonitoring from "@/pages/SiteMonitoring"
import ImageAnalysis from "@/pages/ImageAnalysis"
import Issues from "@/pages/Issues"
import ProgressTracking from "@/pages/ProgressTracking"
import Reports from "@/pages/Reports"
import ReportView from "@/pages/ReportView"
import ReportHistory from "@/pages/ReportHistory"
import Team from "@/pages/Team"
import Settings from "@/pages/Settings"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/monitoring" element={<SiteMonitoring />} />
          <Route path="/analysis" element={<ImageAnalysis />} />
          <Route path="/issues" element={<Issues />} />
          <Route path="/progress" element={<ProgressTracking />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/reports/:id" element={<ReportView />} />
          <Route path="/report-history" element={<ReportHistory />} />
          <Route path="/team" element={<Team />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
