import { Routes, Route, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { Toaster } from '@/components/ui/sonner'
import { AppLayout } from '@/components/layout/AppLayout'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { PWAInstallPrompt } from '@/components/PWAInstallPrompt'
import { ThemeColorMeta } from '@/components/ThemeColorMeta'

// Lazy load pages for better performance
const LoginPage = lazy(() => import('@/pages/LoginPage').then(m => ({ default: m.LoginPage })))
const RegisterPage = lazy(() => import('@/pages/RegisterPage').then(m => ({ default: m.RegisterPage })))
const DashboardPage = lazy(() => import('@/pages/DashboardPage').then(m => ({ default: m.DashboardPage })))
const MembersPage = lazy(() => import('@/pages/MembersPage').then(m => ({ default: m.MembersPage })))
const PlansPage = lazy(() => import('@/pages/PlansPage').then(m => ({ default: m.PlansPage })))
const TrainersPage = lazy(() => import('@/pages/TrainersPage').then(m => ({ default: m.TrainersPage })))
const AttendancePage = lazy(() => import('@/pages/AttendancePage').then(m => ({ default: m.AttendancePage })))
const PaymentsPage = lazy(() => import('@/pages/PaymentsPage').then(m => ({ default: m.PaymentsPage })))
const SettingsPage = lazy(() => import('@/pages/SettingsPage').then(m => ({ default: m.SettingsPage })))

// Loading fallback component
function PageLoader() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="gymflow-theme">
      <ThemeColorMeta />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/members" element={<MembersPage />} />
            <Route path="/plans" element={<PlansPage />} />
            <Route path="/trainers" element={<TrainersPage />} />
            <Route path="/attendance" element={<AttendancePage />} />
            <Route path="/payments" element={<PaymentsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </Suspense>
      <Toaster position="top-right" />
      <PWAInstallPrompt />
    </ThemeProvider>
  )
}
