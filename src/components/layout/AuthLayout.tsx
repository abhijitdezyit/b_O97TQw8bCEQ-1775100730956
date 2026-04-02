import { Outlet } from 'react-router-dom'
import { Dumbbell } from 'lucide-react'

export function AuthLayout() {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary items-center justify-center p-12">
        <div className="max-w-md text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-foreground">
              <Dumbbell className="h-8 w-8 text-primary" />
            </div>
            <span className="text-4xl font-bold text-primary-foreground">GymFlow</span>
          </div>
          <h1 className="text-3xl font-bold text-primary-foreground mb-4">
            Manage Your Gym with Ease
          </h1>
          <p className="text-primary-foreground/80 text-lg">
            Streamline memberships, track attendance, manage trainers, and grow your fitness business all in one place.
          </p>
        </div>
      </div>
      
      {/* Right side - Auth Form */}
      <div className="flex flex-1 items-center justify-center p-6 lg:p-12 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="flex items-center justify-center gap-2 mb-8 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Dumbbell className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold">GymFlow</span>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
