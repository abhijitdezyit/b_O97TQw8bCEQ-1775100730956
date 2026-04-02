import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { User, Bell, Moon, Sun, Monitor, Shield, LogOut, Camera, Save, CreditCard, Layers, Users, UserCheck, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { useTheme } from '@/providers/ThemeProvider'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const navigate = useNavigate()
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@gymflow.com',
    phone: '+1 (555) 123-4567',
    role: 'Admin',
  })
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: false,
  })
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
    }

    const handler = (e: Event) => {
      e.preventDefault()
      console.log('PWA: beforeinstallprompt event fired')
      setDeferredPrompt(e as BeforeInstallPromptEvent)
    }

    const installedHandler = () => {
      console.log('PWA: App installed')
      setIsInstalled(true)
    }

    window.addEventListener('beforeinstallprompt', handler)
    window.addEventListener('appinstalled', installedHandler)

    // Debug info
    console.log('PWA Debug Info:', {
      isStandalone: window.matchMedia('(display-mode: standalone)').matches,
      isHTTPS: window.location.protocol === 'https:',
      isLocalhost: window.location.hostname === 'localhost',
      userAgent: navigator.userAgent
    })

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
      window.removeEventListener('appinstalled', installedHandler)
    }
  }, [])

  const handleSaveProfile = () => {
    toast.success('Profile updated successfully')
  }

  const handleLogout = () => {
    toast.success('Logged out successfully')
    navigate('/login')
  }

  const handleInstallPWA = async () => {
    if (!deferredPrompt) {
      // Check if already installed
      if (isInstalled) {
        toast.info('App is already installed!')
        return
      }
      
      // Show instructions for manual installation
      toast.info('To install: Click the browser menu (⋮) and select "Install app" or "Add to Home Screen"', {
        duration: 5000
      })
      return
    }

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    
    if (outcome === 'accepted') {
      toast.success('App installed successfully!')
      setDeferredPrompt(null)
    } else {
      toast.info('Installation cancelled')
    }
  }

  return (
    <>
      {/* Desktop View - Original Design */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="hidden lg:block space-y-6 max-w-3xl"
      >
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold lg:text-3xl">Settings</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>

        {/* Profile Section */}
        <motion.div variants={itemVariants}>
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile
              </CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                    JD
                  </div>
                  <button className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-background border border-border shadow-sm hover:bg-muted transition-colors">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <div>
                  <p className="font-medium">{profile.name}</p>
                  <p className="text-sm text-muted-foreground">{profile.role}</p>
                </div>
              </div>

              <Separator />

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" value={profile.role} disabled className="bg-muted" />
                </div>
              </div>

              <Button onClick={handleSaveProfile}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Theme Section */}
        <motion.div variants={itemVariants}>
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sun className="h-5 w-5" />
                Appearance
              </CardTitle>
              <CardDescription>Customize how the app looks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-3">
                <button
                  onClick={() => setTheme('light')}
                  className={`flex flex-col items-center gap-3 rounded-xl border-2 p-4 transition-colors ${
                    theme === 'light' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-background border border-border shadow-sm">
                    <Sun className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-medium">Light</span>
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`flex flex-col items-center gap-3 rounded-xl border-2 p-4 transition-colors ${
                    theme === 'dark' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-700">
                    <Moon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-sm font-medium">Dark</span>
                </button>
                <button
                  onClick={() => setTheme('system')}
                  className={`flex flex-col items-center gap-3 rounded-xl border-2 p-4 transition-colors ${
                    theme === 'system' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-background to-zinc-900 border border-border">
                    <Monitor className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-medium">System</span>
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Notifications Section */}
        <motion.div variants={itemVariants}>
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
              <CardDescription>Configure how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive updates via email</p>
                </div>
                <Switch
                  checked={notifications.email}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                />
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive push notifications on your device</p>
                </div>
                <Switch
                  checked={notifications.push}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                />
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div>
                  <p className="font-medium">SMS Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive text messages for important alerts</p>
                </div>
                <Switch
                  checked={notifications.sms}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                />
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div>
                  <p className="font-medium">Marketing Emails</p>
                  <p className="text-sm text-muted-foreground">Receive promotional content and updates</p>
                </div>
                <Switch
                  checked={notifications.marketing}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, marketing: checked })}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Security Section */}
        <motion.div variants={itemVariants}>
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security
              </CardTitle>
              <CardDescription>Manage your account security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div>
                  <p className="font-medium">Change Password</p>
                  <p className="text-sm text-muted-foreground">Update your password regularly for security</p>
                </div>
                <Button variant="outline" size="sm">
                  Update
                </Button>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                </div>
                <Button variant="outline" size="sm">
                  Enable
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* PWA Install Section */}
        {!isInstalled && (
          <motion.div variants={itemVariants}>
            <Card className="rounded-2xl border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Download className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Install GymFlow App</p>
                      <p className="text-sm text-muted-foreground">Get quick access and work offline</p>
                    </div>
                  </div>
                  <Button onClick={handleInstallPWA}>
                    <Download className="mr-2 h-4 w-4" />
                    {deferredPrompt ? 'Install App' : 'How to Install'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Logout Section */}
        <motion.div variants={itemVariants}>
          <Card className="rounded-2xl border-destructive/20">
            <CardContent className="p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-medium text-destructive">Sign Out</p>
                  <p className="text-sm text-muted-foreground">Sign out of your account on this device</p>
                </div>
                <Button variant="destructive" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Mobile/Tablet View - Phone Style */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="lg:hidden space-y-4 pb-4 -mx-4"
      >
        {/* Header - Desktop only */}
        <div className="px-4 hidden lg:block">
          <h1 className="text-2xl lg:text-3xl font-bold">Settings</h1>
          <p className="text-base text-muted-foreground">Manage your account and preferences</p>
        </div>

        {/* Profile Card */}
        <motion.div variants={itemVariants} className="px-4">
          <Card className="rounded-xl border-border/40 shadow-none">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                    JD
                  </div>
                  <button className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-background border border-border shadow-sm hover:bg-muted transition-colors">
                    <Camera className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-base truncate">{profile.name}</p>
                  <p className="text-sm text-muted-foreground/70">{profile.role}</p>
                  <p className="text-xs text-muted-foreground/60 truncate">{profile.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Account Section */}
        <motion.div variants={itemVariants} className="space-y-2">
          <div className="px-4">
            <h2 className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider mb-2">Account</h2>
          </div>
          <div className="bg-card border-y border-border/40 divide-y divide-border/30">
            <div className="px-4 py-3 flex items-center justify-between hover:bg-muted/30 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Edit Profile</p>
                  <p className="text-xs text-muted-foreground/70">Update your information</p>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 flex items-center justify-between hover:bg-muted/30 transition-colors cursor-pointer">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10">
                  <CreditCard className="h-4 w-4 text-emerald-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">Membership Plan</p>
                  <p className="text-xs text-muted-foreground/70">Premium • Expires Dec 2024</p>
                </div>
              </div>
              <div className="text-xs font-medium text-emerald-500">Active</div>
            </div>
            <div className="px-4 py-3 flex items-center justify-between hover:bg-muted/30 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10">
                  <Shield className="h-4 w-4 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Security</p>
                  <p className="text-xs text-muted-foreground/70">Password & 2FA</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Admin Section */}
        <motion.div variants={itemVariants} className="space-y-2">
          <div className="px-4">
            <h2 className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider mb-2">Admin</h2>
          </div>
          <div className="bg-card border-y border-border/40 divide-y divide-border/30">
            <div className="px-4 py-3 flex items-center justify-between hover:bg-muted/30 transition-colors cursor-pointer" onClick={() => navigate('/plans')}>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10">
                  <Layers className="h-4 w-4 text-violet-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Manage Plans</p>
                  <p className="text-xs text-muted-foreground/70">Create & edit membership plans</p>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 flex items-center justify-between hover:bg-muted/30 transition-colors cursor-pointer" onClick={() => navigate('/members')}>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10">
                  <Users className="h-4 w-4 text-cyan-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Manage Members</p>
                  <p className="text-xs text-muted-foreground/70">View & manage gym members</p>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 flex items-center justify-between hover:bg-muted/30 transition-colors cursor-pointer" onClick={() => navigate('/trainers')}>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10">
                  <UserCheck className="h-4 w-4 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Manage Trainers</p>
                  <p className="text-xs text-muted-foreground/70">View & manage trainers</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Appearance Section */}
        <motion.div variants={itemVariants} className="space-y-2">
          <div className="px-4">
            <h2 className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider mb-2">Appearance</h2>
          </div>
          <div className="bg-card border-y border-border/40">
            <div className="px-4 py-3">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10">
                    <Sun className="h-4 w-4 text-amber-500" />
                  </div>
                  <p className="text-sm font-medium">Theme</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setTheme('light')}
                  className={`flex flex-col items-center gap-2 rounded-lg border p-3 transition-colors ${
                    theme === 'light' ? 'border-primary bg-primary/5' : 'border-border/40 hover:border-border'
                  }`}
                >
                  <Sun className="h-5 w-5" />
                  <span className="text-xs font-medium">Light</span>
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`flex flex-col items-center gap-2 rounded-lg border p-3 transition-colors ${
                    theme === 'dark' ? 'border-primary bg-primary/5' : 'border-border/40 hover:border-border'
                  }`}
                >
                  <Moon className="h-5 w-5" />
                  <span className="text-xs font-medium">Dark</span>
                </button>
                <button
                  onClick={() => setTheme('system')}
                  className={`flex flex-col items-center gap-2 rounded-lg border p-3 transition-colors ${
                    theme === 'system' ? 'border-primary bg-primary/5' : 'border-border/40 hover:border-border'
                  }`}
                >
                  <Monitor className="h-5 w-5" />
                  <span className="text-xs font-medium">System</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* PWA Install Section - Mobile */}
        {!isInstalled && (
          <motion.div variants={itemVariants} className="px-4">
            <Card className="rounded-xl border-primary/30 bg-primary/5 shadow-none">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 flex-shrink-0">
                    <Download className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold">Install GymFlow</p>
                    <p className="text-xs text-muted-foreground/70">Quick access & offline mode</p>
                  </div>
                  <Button size="sm" onClick={handleInstallPWA}>
                    {deferredPrompt ? 'Install' : 'How to'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Notifications Section */}
        <motion.div variants={itemVariants} className="space-y-2">
          <div className="px-4">
            <h2 className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider mb-2">Notifications</h2>
          </div>
          <div className="bg-card border-y border-border/40 divide-y divide-border/30">
            <div className="px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/10 flex-shrink-0">
                  <Bell className="h-4 w-4 text-green-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-xs text-muted-foreground/70">Receive updates via email</p>
                </div>
              </div>
              <Switch
                checked={notifications.email}
                onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
              />
            </div>
            <div className="px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 flex-shrink-0">
                  <Bell className="h-4 w-4 text-purple-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">Push</p>
                  <p className="text-xs text-muted-foreground/70">Device notifications</p>
                </div>
              </div>
              <Switch
                checked={notifications.push}
                onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
              />
            </div>
            <div className="px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 flex-shrink-0">
                  <Bell className="h-4 w-4 text-blue-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">SMS</p>
                  <p className="text-xs text-muted-foreground/70">Text messages</p>
                </div>
              </div>
              <Switch
                checked={notifications.sms}
                onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
              />
            </div>
            <div className="px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-500/10 flex-shrink-0">
                  <Bell className="h-4 w-4 text-pink-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">Marketing</p>
                  <p className="text-xs text-muted-foreground/70">Promotional content</p>
                </div>
              </div>
              <Switch
                checked={notifications.marketing}
                onCheckedChange={(checked) => setNotifications({ ...notifications, marketing: checked })}
              />
            </div>
          </div>
        </motion.div>

        {/* Danger Zone */}
        <motion.div variants={itemVariants} className="space-y-2">
          <div className="px-4">
            <h2 className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider mb-2">Account Actions</h2>
          </div>
          <div className="bg-card border-y border-border/40">
            <button 
              onClick={handleLogout}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10">
                  <LogOut className="h-4 w-4 text-red-500" />
                </div>
                <p className="text-sm font-medium text-red-500">Sign Out</p>
              </div>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </>
  )
}
