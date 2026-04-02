import { useEffect, useState } from 'react'

export function SafeAreaDebug() {
  const [safeAreas, setSafeAreas] = useState({
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
  })
  const [show, setShow] = useState(false)

  useEffect(() => {
    const updateSafeAreas = () => {
      const root = document.documentElement
      const style = getComputedStyle(root)
      
      setSafeAreas({
        top: style.getPropertyValue('--sat') || 'not set',
        right: style.getPropertyValue('--sar') || 'not set',
        bottom: style.getPropertyValue('--sab') || 'not set',
        left: style.getPropertyValue('--sal') || 'not set',
      })
    }

    updateSafeAreas()
    window.addEventListener('resize', updateSafeAreas)
    return () => window.removeEventListener('resize', updateSafeAreas)
  }, [])

  // Toggle with triple tap on screen
  useEffect(() => {
    let tapCount = 0
    let tapTimer: ReturnType<typeof setTimeout>

    const handleTap = () => {
      tapCount++
      clearTimeout(tapTimer)
      
      if (tapCount === 3) {
        setShow(prev => !prev)
        tapCount = 0
      }
      
      tapTimer = setTimeout(() => {
        tapCount = 0
      }, 500)
    }

    document.addEventListener('click', handleTap)
    return () => document.removeEventListener('click', handleTap)
  }, [])

  if (!show) return null

  return (
    <div className="fixed top-4 left-4 right-4 z-[9999] bg-black/90 text-white p-4 rounded-lg text-xs font-mono lg:hidden">
      <div className="flex justify-between items-center mb-2">
        <strong>Safe Area Debug</strong>
        <button 
          onClick={() => setShow(false)}
          className="text-white/70 hover:text-white"
        >
          ✕
        </button>
      </div>
      <div className="space-y-1">
        <div>Top: {safeAreas.top}</div>
        <div>Right: {safeAreas.right}</div>
        <div>Bottom: {safeAreas.bottom}</div>
        <div>Left: {safeAreas.left}</div>
        <div className="mt-2 pt-2 border-t border-white/20">
          Viewport: {window.innerWidth}x{window.innerHeight}
        </div>
        <div>
          Display: {window.matchMedia('(display-mode: standalone)').matches ? 'PWA' : 'Browser'}
        </div>
      </div>
      <div className="mt-2 text-white/50 text-[10px]">
        Triple-tap anywhere to toggle
      </div>
    </div>
  )
}
