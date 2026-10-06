import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Printer, ArrowLeft, Building2, Calendar, ShieldAlert } from "lucide-react"

export default function ReportView() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [report, setReport] = useState<any>(null)

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('reportHistory') || '[]')
    const found = history.find((r: any) => r.id === id)
    if (found) {
      setReport(found)
    }
  }, [id])

  if (!report) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <FileText className="h-16 w-16 text-slate-300 mb-4" />
        <h2 className="text-xl font-bold text-slate-900 mb-2">Report Not Found</h2>
        <p className="text-slate-500 mb-6">The requested inspection report does not exist or has been deleted.</p>
        <Button onClick={() => navigate('/analysis')}>New Evaluation</Button>
      </div>
    )
  }

  const { data } = report
  const reportDate = new Date(data.date).toLocaleDateString('en-US', { 
    year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
  })

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8 print:hidden">
        <Button variant="ghost" onClick={() => navigate(-1)} className="text-slate-500 hover:text-slate-900">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => window.print()}>
            <Printer className="h-4 w-4 mr-2" />
            Print Report
          </Button>
          <Button className="bg-construct-orange hover:bg-orange-600 text-white">
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>

      <div className="bg-white p-8 md:p-12 rounded-lg border shadow-sm print:shadow-none print:border-none print:p-0">
        {/* REPORT HEADER */}
        <div className="border-b-4 border-construct-dark pb-6 mb-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3 font-bold text-2xl text-construct-dark">
            <div className="w-12 h-12 bg-construct-orange rounded-md flex items-center justify-center text-white">
              <span className="text-3xl leading-none">C</span>
            </div>
            <div>
              <div className="tracking-tight">CONSTRUCTVISION AI</div>
              <div className="text-sm font-medium text-slate-500 tracking-widest mt-1 uppercase">Construction Site Inspection Report</div>
            </div>
          </div>
          <div className="text-right text-sm text-slate-500">
            <div className="font-mono bg-slate-100 px-3 py-1 rounded inline-block mb-1">ID: {data.analysis_id.split('-')[0]}</div>
            <div>Generated: {reportDate}</div>
          </div>
        </div>

        {/* PROJECT INFO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest border-b pb-2">Project Details</h3>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="text-slate-500 font-medium">Project Name:</div>
              <div className="col-span-2 font-semibold text-slate-900">{report.project}</div>
              
              <div className="text-slate-500 font-medium">Location:</div>
              <div className="col-span-2 text-slate-900">Not specified in demo</div>
              
              <div className="text-slate-500 font-medium">Inspection Date:</div>
              <div className="col-span-2 text-slate-900">{new Date(data.date).toLocaleDateString()}</div>
              
              <div className="text-slate-500 font-medium">Evaluated By:</div>
              <div className="col-span-2 text-slate-900 flex items-center gap-1">
                ConstructVision AI Vision Pipeline
                <Badge variant="outline" className="text-[10px] h-4 px-1 ml-1">Automated</Badge>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-50 rounded-lg p-5 border border-slate-200">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest border-b pb-2 mb-4">Executive Summary</h3>
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-600 font-medium">Overall Score</span>
              <span className="text-3xl font-bold text-slate-900">{data.overall_score}<span className="text-lg text-slate-400">/100</span></span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-600 font-medium">Risk Level</span>
              <Badge variant={data.risk_level === 'High' ? 'destructive' : data.risk_level === 'Moderate' ? 'warning' : 'success'} className="uppercase">
                {data.risk_level}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600 font-medium">Status</span>
              <span className="font-semibold text-sm">{data.status}</span>
            </div>
          </div>
        </div>

        {/* IMAGE & SCORES */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-10">
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest border-b pb-2">Analyzed Image</h3>
            <div className="bg-slate-100 rounded-lg overflow-hidden border">
              {report.imagePreview ? (
                <img src={report.imagePreview} alt="Analyzed site" className="w-full h-auto object-cover max-h-[400px]" />
              ) : (
                <div className="h-[300px] flex items-center justify-center text-slate-400">Image data unavailable</div>
              )}
            </div>
            <p className="text-xs text-slate-500 text-center">Original upload: {data.filename}</p>
          </div>
          
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest border-b pb-2">Evaluation Summary</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-slate-700">Safety Compliance</span>
                  <span className="font-bold">{data.safety.score}/100</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${data.safety.score > 80 ? 'bg-construct-green' : data.safety.score > 60 ? 'bg-yellow-500' : 'bg-construct-red'}`} style={{ width: `${data.safety.score}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-slate-700">Site Condition</span>
                  <span className="font-bold">{data.site_condition.score}/100</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${data.site_condition.score > 80 ? 'bg-construct-green' : data.site_condition.score > 60 ? 'bg-yellow-500' : 'bg-construct-red'}`} style={{ width: `${data.site_condition.score}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-slate-700">Site Activity</span>
                  <span className="font-bold">{data.activity.score}/100</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${data.activity.score > 80 ? 'bg-construct-green' : data.activity.score > 60 ? 'bg-yellow-500' : 'bg-construct-red'}`} style={{ width: `${data.activity.score}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-slate-700">Visual Progress Estimate</span>
                  <span className="font-bold">{data.progress.score}/100</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${data.progress.score > 80 ? 'bg-construct-green' : data.progress.score > 60 ? 'bg-blue-500' : 'bg-construct-orange'}`} style={{ width: `${data.progress.score}%` }}></div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded p-4 border mt-6">
              <h4 className="text-xs font-bold text-slate-500 uppercase mb-3">Detected Objects</h4>
              <div className="grid grid-cols-2 gap-y-2 text-sm">
                {data.detections.map((det: any, i: number) => (
                  <div key={i} className="flex justify-between">
                    <span className="text-slate-600 capitalize">{det.label.toLowerCase()}s:</span>
                    <span className="font-semibold">{det.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ISSUES */}
        <div className="mb-10">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest border-b pb-2 mb-4">Issues Identified</h3>
          {data.issues.length > 0 ? (
            <div className="space-y-4">
              {data.issues.map((issue: any, idx: number) => (
                <div key={idx} className="border border-slate-200 rounded-lg p-4 flex flex-col md:flex-row gap-4 md:items-start bg-white">
                  <div className="md:w-1/4">
                    <Badge variant={issue.severity === 'HIGH' || issue.severity === 'CRITICAL' ? 'destructive' : issue.severity === 'MEDIUM' ? 'warning' : 'secondary'} className="mb-2">
                      {issue.severity} SEVERITY
                    </Badge>
                    <div className="text-xs text-slate-500">Confidence: {issue.confidence}</div>
                    <div className="text-xs text-slate-500">Location: {issue.location}</div>
                  </div>
                  <div className="md:w-3/4">
                    <h4 className="font-bold text-slate-900 mb-1">{issue.title}</h4>
                    <p className="text-sm text-slate-600 mb-3"><span className="font-medium text-slate-800">Observation:</span> Visual indicators suggest a potential safety or compliance issue in the designated area.</p>
                    <div className="bg-orange-50 border border-orange-100 rounded p-3">
                      <span className="text-xs font-bold text-construct-orange uppercase tracking-wider block mb-1">Recommended Action</span>
                      <p className="text-sm text-slate-800 font-medium">{issue.recommendation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5" />
              <span className="font-medium">No significant issues or safety violations detected in this evaluation.</span>
            </div>
          )}
        </div>

        {/* RECOMMENDATIONS */}
        <div className="mb-10">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest border-b pb-2 mb-4">Final Recommendations</h3>
          <ul className="list-disc list-inside space-y-2 text-slate-700 bg-slate-50 p-6 rounded-lg border">
            {data.recommendations.map((rec: string, i: number) => (
              <li key={i} className="pl-2">{rec}</li>
            ))}
          </ul>
        </div>

        {/* FOOTER & LIMITATIONS */}
        <div className="mt-16 pt-8 border-t-2 border-slate-200 text-center space-y-4">
          <div className="flex justify-center text-slate-300">
            <ShieldAlert className="h-8 w-8" />
          </div>
          <h4 className="font-bold text-slate-800 text-sm tracking-widest uppercase">System Limitations</h4>
          <p className="text-xs text-slate-500 max-w-2xl mx-auto leading-relaxed">
            This report is generated from visual image analysis and should support, not replace, professional construction-site inspection. 
            All detected issues, scores, and progress estimates are based solely on visual indicators from a single perspective at a specific point in time. 
            Final assessment must always involve manual verification by certified personnel.
          </p>
          <div className="text-xs text-slate-400 pt-4">
            Report ID: {data.analysis_id} • ConstructVision AI © {new Date().getFullYear()}
          </div>
        </div>

      </div>
    </div>
  )
}
