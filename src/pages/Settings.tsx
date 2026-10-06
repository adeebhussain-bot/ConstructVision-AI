import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export default function Settings() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage application preferences and account settings.</p>
        </div>
        <Button className="bg-construct-orange hover:bg-orange-600 text-white">
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="profile">
        <TabsList className="mb-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card className="max-w-2xl">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal information and contact details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input defaultValue="Admin User" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input defaultValue="admin@constructvision.ai" type="email" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Role</label>
                <Input defaultValue="Project Manager" disabled className="bg-slate-50 text-slate-500" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone Number</label>
                <Input defaultValue="+1 (555) 0123-4567" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card className="max-w-2xl">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose what updates you want to receive.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { title: "Critical Safety Issues", desc: "Receive immediate alerts for high-severity safety violations." },
                { title: "Daily Progress Summary", desc: "Get a daily digest of project progress updates." },
                { title: "New Inspection Reports", desc: "Be notified when a new site inspection is completed." },
                { title: "Project Milestones", desc: "Alerts when project milestones are reached or delayed." }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start justify-between">
                  <div>
                    <div className="font-medium text-slate-900">{item.title}</div>
                    <div className="text-sm text-slate-500">{item.desc}</div>
                  </div>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                    <input type="checkbox" name="toggle" id={`toggle-${idx}`} className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer" defaultChecked={idx < 2} />
                    <label htmlFor={`toggle-${idx}`} className="toggle-label block overflow-hidden h-5 rounded-full bg-slate-300 cursor-pointer"></label>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card className="max-w-2xl">
            <CardContent className="p-6 text-center text-slate-500 py-12">
              Security settings are managed by your organization administrator.
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card className="max-w-2xl">
            <CardContent className="p-6 text-center text-slate-500 py-12">
              Application preferences.
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <style>{`
        .toggle-checkbox:checked { right: 0; border-color: #F97316; }
        .toggle-checkbox:checked + .toggle-label { background-color: #F97316; }
        .toggle-checkbox { right: 20px; z-index: 1; border-color: #CBD5E1; transition: all 0.3s; }
        .toggle-label { transition: all 0.3s; }
      `}</style>
    </div>
  )
}
