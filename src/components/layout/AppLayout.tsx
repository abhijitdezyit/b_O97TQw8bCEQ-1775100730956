import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { MobileNav } from './MobileNav'
import { Header } from './Header'

export function AppLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden lg:flex h-screen bg-background overflow-hidden">
        {/* Desktop Sidebar - Fixed */}
        <Sidebar 
          className="fixed left-0 top-0 bottom-0 z-40" 
          isCollapsed={isSidebarCollapsed}
          onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
        
        {/* Main Content */}
        <div className={`flex flex-1 flex-col transition-all duration-300 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
          {/* Header - Fixed */}
          <Header />
          
          {/* Scrollable Content */}
          <main className="flex-1 overflow-y-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden flex flex-col bg-background" style={{ height: '100dvh' }}>
        {/* Header with safe area */}
        <Header />
        
        {/* Scrollable Content */}
        <main 
          className="flex-1 overflow-y-auto p-4 bg-background"
          style={{ 
            paddingBottom: 'calc(5rem + env(safe-area-inset-bottom))',
            paddingLeft: 'calc(1rem + env(safe-area-inset-left))',
            paddingRight: 'calc(1rem + env(safe-area-inset-right))'
          }}
        >
          <Outlet />
        </main>
        
        {/* Mobile Bottom Navigation - Fixed with safe area */}
        <MobileNav />
      </div>
    </>
  )
}
