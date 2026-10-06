import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { HardHat } from "lucide-react"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (email === "admin@constructvision.ai" && password === "admin123") {
      localStorage.setItem("auth", "true")
      navigate("/")
    } else {
      setError("Invalid credentials. Try admin@constructvision.ai / admin123")
    }
  }

  return (
    <div className="flex h-screen w-full bg-slate-50">
      <div className="hidden lg:flex w-1/2 bg-construct-dark flex-col justify-between p-12 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-construct-orange to-transparent"></div>
        <div className="z-10">
          <div className="flex items-center gap-3 font-bold text-2xl mb-8">
            <div className="w-10 h-10 bg-construct-orange rounded-md flex items-center justify-center text-white">
              <span className="text-2xl leading-none">C</span>
            </div>
            ConstructVision AI
          </div>
          <h1 className="text-4xl font-bold leading-tight mt-12 max-w-md">
            Construction intelligence for better site decisions.
          </h1>
          <p className="mt-6 text-slate-400 max-w-md text-lg">
            Monitor progress, analyze site images, identify potential issues, and maintain perfect project records with our computer-vision powered platform.
          </p>
        </div>
        
        <div className="z-10 flex items-center gap-4 text-sm text-slate-400">
          <HardHat className="h-5 w-5" />
          Enterprise Grade Construction Management
        </div>
      </div>
      
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Welcome back</h2>
            <p className="mt-2 text-sm text-slate-500">
              Please enter your details to sign in.
            </p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none" htmlFor="email">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@constructvision.ai"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium leading-none" htmlFor="password">
                    Password
                  </label>
                  <a href="#" className="text-sm text-construct-orange hover:underline font-medium">
                    Forgot password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            
            {error && (
              <div className="text-sm text-construct-red bg-red-50 p-3 rounded-md border border-red-100">
                {error}
              </div>
            )}
            
            <div className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                id="remember" 
                className="h-4 w-4 rounded border-slate-300 text-construct-orange focus:ring-construct-orange" 
              />
              <label htmlFor="remember" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-600">
                Remember me for 30 days
              </label>
            </div>
            
            <Button type="submit" className="w-full bg-construct-dark hover:bg-slate-800 text-white h-11 text-base">
              Sign in
            </Button>
          </form>
          
          <div className="text-center text-sm text-slate-500 mt-8">
            Mock Login: <span className="font-mono text-slate-900">admin@constructvision.ai / admin123</span>
          </div>
        </div>
      </div>
    </div>
  )
}
