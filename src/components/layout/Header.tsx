import { Bell, Search, Dumbbell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ThemeToggle } from '@/components/ThemeToggle'
import { useLocation } from 'react-router-dom'

const pageNames: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/members': 'Members',
  '/plans': 'Plans',
  '/trainers': 'Trainers',
  '/attendance': 'Attendance',
  '/payments': 'Payments',
  '/settings': 'Settings',
}

export function Header() {
  const location = useLocation()
  const pageName = pageNames[location.pathname] || 'GymFlow'

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-background px-4 lg:px-6 lg:rounded-tl-2xl sticky top-0 z-30 lg:static">
      {/* Page Title on Mobile / Logo on Desktop */}
      <div className="flex items-center gap-3">
        {/* Logo with Tagline - Desktop only */}
        <div className="hidden lg:flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Dumbbell className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <span className="text-sm font-bold">GymFlow</span>
            <p className="text-[10px] text-muted-foreground/70">Fitness Management</p>
          </div>
        </div>
        
        {/* Page Title - Mobile only */}
        <h1 className="text-lg font-bold lg:hidden">{pageName}</h1>
      </div>

      {/* Search - Hidden on mobile */}
      <div className="hidden lg:flex flex-1 max-w-md ml-6">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search members, trainers..."
            className="w-full pl-10 bg-muted/50 border-0 focus-visible:ring-1"
          />
        </div>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative h-9 w-9">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
        </Button>
        <ThemeToggle />
        {/* Avatar - Hidden on mobile (shown in bottom nav) */}
        <div className="hidden lg:flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
          JD
        </div>
      </div>
    </header>
  )
}
