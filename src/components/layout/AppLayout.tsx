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
      <div className="lg:hidden flex flex-col h-screen bg-background">
        {/* Header */}
        <Header />
        
        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 pb-20">
          <Outlet />
        </main>
        
        {/* Mobile Bottom Navigation - Fixed */}
        <MobileNav />
      </div>
    </>
  )
}
