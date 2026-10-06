import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { projects } from "@/data/mock"
import { UploadCloud, CheckCircle2, AlertTriangle, Scan, Search, FileText, ChevronDown } from "lucide-react"

export default function ImageAnalysis() {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [projectId, setProjectId] = useState<string>(projects[0].id)
  const [showAnnotations, setShowAnnotations] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file (JPG, PNG).')
        return
      }
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
      setResults(null)
      setError(null)
    }
  }

  const handleAnalyze = async () => {
    if (!imageFile) return
    setIsAnalyzing(true)
    setError(null)

    const formData = new FormData()
    formData.append("image", imageFile)
    formData.append("project_id", projectId)

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) {
        throw new Error("Analysis failed or backend unavailable.")
      }

      const data = await res.json()
      setResults(data)

      // Save to report history in local storage
      const existingHistory = JSON.parse(localStorage.getItem('reportHistory') || '[]')
      const project = projects.find(p => p.id === projectId)?.name || 'Unknown Project'
      const reportMeta = {
        id: data.analysis_id,
        date: data.date,
        project: project,
        score: data.overall_score,
        risk: data.risk_level,
        issues: data.issues.length,
        status: data.status,
        data: data,
        imagePreview: imagePreview // Saving data URL for demo (in production, use uploaded URL)
      }
      localStorage.setItem('reportHistory', JSON.stringify([reportMeta, ...existingHistory]))

    } catch (err: any) {
      setError(err.message || "An error occurred during analysis.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleGenerateReport = () => {
    if (results) {
      navigate(`/reports/${results.analysis_id}`)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Image Analysis</h1>
          <p className="text-muted-foreground mt-1">Computer vision analysis for site safety and progress.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <select 
            className="flex h-10 w-full md:w-[200px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            disabled={isAnalyzing || results}
          >
            {projects.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/jpeg, image/png, image/jpg"
            onChange={handleFileChange}
          />
          <Button variant="outline" onClick={() => fileInputRef.current?.click()} disabled={isAnalyzing}>
            <UploadCloud className="h-4 w-4 mr-2" />
            Upload Image
          </Button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-md flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="relative border rounded-lg overflow-hidden bg-slate-100 flex items-center justify-center min-h-[500px]">
            {imagePreview ? (
              <div className="relative w-full h-full flex justify-center">
                <img src={imagePreview} alt="Site capture" className="max-w-full max-h-[650px] object-contain" />
                
                {/* Simulated annotations overlay */}
                {results && showAnnotations && (
                  <div className="absolute inset-0 pointer-events-none">
                    {/* Just some mock boxes to show detection */}
                    <div className="absolute top-[30%] left-[45%] w-[10%] h-[15%] border-2 border-construct-green bg-green-500/20 rounded">
                      <span className="absolute -top-6 left-0 bg-construct-green text-white text-xs px-1 whitespace-nowrap rounded-sm">PERSON/HELMET</span>
                    </div>
                    {results.issues.map((issue: any, idx: number) => (
                      <div key={idx} className={`absolute border-2 ${issue.severity === 'HIGH' ? 'border-construct-red bg-red-500/20' : 'border-yellow-500 bg-yellow-500/20'} rounded`}
                        style={{
                          top: `${20 + idx * 25}%`,
                          left: `${20 + idx * 15}%`,
                          width: '15%',
                          height: '20%'
                        }}
                      >
                        <span className={`absolute -top-6 left-0 text-white text-xs px-1 whitespace-nowrap rounded-sm ${issue.severity === 'HIGH' ? 'bg-construct-red' : 'bg-yellow-500'}`}>
                          {issue.title.substring(0, 15)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                
                {isAnalyzing && (
                  <div className="absolute inset-0 bg-slate-900/60 flex flex-col items-center justify-center text-white backdrop-blur-sm">
                    <Scan className="h-16 w-16 animate-pulse mb-6 text-construct-orange" />
                    <div className="text-xl font-medium tracking-wider mb-2">ANALYZING CONSTRUCTION SITE...</div>
                    <p className="text-slate-300 text-sm mb-6">Evaluating safety, progress, and activity</p>
                    <div className="w-64 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-construct-orange animate-[loading_1.5s_ease-in-out_infinite]"></div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-slate-400 flex flex-col items-center">
                <UploadCloud className="h-16 w-16 mb-4 opacity-50" />
                <p className="text-lg font-medium text-slate-600 mb-2">Drag & drop construction image</p>
                <p className="text-sm mb-6">Supports JPG, JPEG, PNG</p>
                <Button onClick={() => fileInputRef.current?.click()}>Browse Files</Button>
              </div>
            )}
          </div>
          
          {imagePreview && (
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-lg border shadow-sm gap-4">
              <div className="text-sm text-slate-600">
                <div className="font-medium text-slate-900 mb-1">{imageFile?.name || 'Image'}</div>
                {imageFile && `${(imageFile.size / 1024 / 1024).toFixed(2)} MB • `} 
                Ready for evaluation
              </div>
              
              <div className="flex gap-3 w-full sm:w-auto">
                {results && (
                  <Button variant="outline" onClick={() => setShowAnnotations(!showAnnotations)}>
                    {showAnnotations ? 'View Original' : 'View Analyzed'}
                  </Button>
                )}
                {!results && !isAnalyzing && (
                  <Button onClick={handleAnalyze} className="bg-construct-dark hover:bg-slate-800 text-white w-full sm:w-auto">
                    <Scan className="h-4 w-4 mr-2" />
                    Analyze Site
                  </Button>
                )}
                {results && (
                  <Button onClick={handleGenerateReport} className="bg-construct-orange hover:bg-orange-600 text-white w-full sm:w-auto">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <Card className="h-full bg-white shadow-sm">
            <CardHeader className="bg-slate-50 border-b pb-4">
              <CardTitle className="text-lg">Site Evaluation</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {!results ? (
                <div className="text-center text-slate-500 py-12 flex flex-col items-center">
                  <Scan className="h-12 w-12 text-slate-300 mb-3" />
                  <p>Upload an image and run analysis to see computer vision insights.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {results.demo_mode && (
                    <div className="bg-blue-50 border border-blue-200 text-blue-700 text-xs p-3 rounded-md text-center font-medium">
                      Demo Evaluation Mode — Results are indicative.
                    </div>
                  )}
                  
                  <div className="text-center border-b pb-6">
                    <div className="text-sm text-slate-500 font-medium mb-1 uppercase tracking-wider">Overall Score</div>
                    <div className="text-5xl font-bold text-slate-900 mb-2">
                      {results.overall_score}<span className="text-2xl text-slate-400">/100</span>
                    </div>
                    <Badge variant={results.overall_score >= 85 ? 'success' : results.overall_score >= 70 ? 'warning' : 'destructive'} className="text-xs px-3 py-1 uppercase tracking-wider">
                      {results.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="border rounded-lg p-3 bg-slate-50">
                      <div className="text-xs text-slate-500 font-medium mb-1">Safety</div>
                      <div className="text-xl font-bold flex items-end gap-1">
                        {results.safety.score}<span className="text-xs text-slate-400 font-normal mb-0.5">/100</span>
                      </div>
                    </div>
                    <div className="border rounded-lg p-3 bg-slate-50">
                      <div className="text-xs text-slate-500 font-medium mb-1">Site Condition</div>
                      <div className="text-xl font-bold flex items-end gap-1">
                        {results.site_condition.score}<span className="text-xs text-slate-400 font-normal mb-0.5">/100</span>
                      </div>
                    </div>
                    <div className="border rounded-lg p-3 bg-slate-50">
                      <div className="text-xs text-slate-500 font-medium mb-1">Activity</div>
                      <div className="text-xl font-bold flex items-end gap-1">
                        {results.activity.score}<span className="text-xs text-slate-400 font-normal mb-0.5">/100</span>
                      </div>
                    </div>
                    <div className="border rounded-lg p-3 bg-slate-50">
                      <div className="text-xs text-slate-500 font-medium mb-1">Visual Progress</div>
                      <div className="text-xl font-bold flex items-end gap-1">
                        {results.progress.score}<span className="text-xs text-slate-400 font-normal mb-0.5">/100</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider flex justify-between">
                      Detected Issues
                      <Badge variant="outline">{results.issues.length}</Badge>
                    </h3>
                    {results.issues.length > 0 ? (
                      <div className="space-y-3">
                        {results.issues.map((issue: any) => (
                          <div key={issue.id} className="p-3 border rounded-lg bg-white shadow-sm hover:border-slate-300 cursor-pointer">
                            <div className="flex justify-between items-start mb-2">
                              <span className="font-semibold text-sm text-slate-900">{issue.title}</span>
                              <Badge variant={issue.severity === 'HIGH' || issue.severity === 'CRITICAL' ? 'destructive' : issue.severity === 'MEDIUM' ? 'warning' : 'secondary'} className="text-[10px] h-5">
                                {issue.severity}
                              </Badge>
                            </div>
                            <div className="text-xs text-slate-500 mb-2">
                              Confidence: {issue.confidence} • Loc: {issue.location}
                            </div>
                            <div className="text-xs text-slate-700 bg-slate-50 p-2 rounded">
                              {issue.recommendation}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-sm text-slate-500 text-center py-4 bg-slate-50 rounded border border-dashed">
                        No critical issues detected.
                      </div>
                    )}
                  </div>
                  
                  <details className="text-xs text-slate-500 group">
                    <summary className="cursor-pointer font-medium flex items-center hover:text-slate-700">
                      View Scoring Methodology <ChevronDown className="h-3 w-3 ml-1 group-open:rotate-180 transition-transform" />
                    </summary>
                    <div className="mt-2 p-3 bg-slate-50 rounded border space-y-1">
                      <p>Overall Score = (Safety × 0.35) + (Condition × 0.25) + (Activity × 0.20) + (Progress × 0.20)</p>
                      <p>Safety is weighted heavily as it indicates PPE compliance and risk zones.</p>
                      <p className="mt-2 text-construct-orange italic">Note: Visual Progress is an estimate based on visible structural elements and does not replace schedule tracking.</p>
                    </div>
                  </details>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  )
}
