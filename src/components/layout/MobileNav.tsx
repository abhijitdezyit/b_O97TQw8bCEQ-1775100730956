import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Users,
  CreditCard,
  UserCheck,
  Settings,
  Home,
  UsersRound,
  Ticket,
  User,
  SettingsIcon,
  CalendarCheck,
} from 'lucide-react'

const navItems = [
  { to: '/dashboard', icon: Home, label: 'Home' },
  { to: '/members', icon: UsersRound, label: 'Members' },
  { to: '/attendance', icon: CalendarCheck, label: 'Attendance' },
  { to: '/trainers', icon: UserCheck, label: 'Trainers' },
  { to: '/settings', icon: User, label: 'Profile' },
]

interface MobileNavProps {
  className?: string
}

export function MobileNav({ className }: MobileNavProps) {
  return (
    <nav
      className={cn(
        'fixed bottom-0 left-0 right-0 z-[100] border-t border-border/40 bg-background backdrop-blur-xl',
        className
      )}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className="flex flex-1 items-center justify-center"
          >
            {({ isActive }) => (
              <div className="flex flex-col items-center gap-1 py-2 px-4 relative">
                <item.icon 
                  className={cn(
                    "h-6 w-6 transition-all duration-200",
                    isActive 
                      ? "text-foreground scale-110 stroke-[2.5]" 
                      : "text-muted-foreground stroke-[2]"
                  )}
                  fill={isActive ? "currentColor" : "none"}
                />
                {isActive && (
                  <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-foreground" />
                )}
              </div>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
