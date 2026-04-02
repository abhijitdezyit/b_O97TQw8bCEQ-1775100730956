import { useEffect, useState } from 'react'

interface SafeAreaInsets {
  top: number
  right: number
  bottom: number
  left: number
}

export function useSafeArea(): SafeAreaInsets {
  const [insets, setInsets] = useState<SafeAreaInsets>({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  })

  useEffect(() => {
    const updateInsets = () => {
      // Try to get CSS env values first
      const root = document.documentElement
      const style = getComputedStyle(root)
      
      const topEnv = style.getPropertyValue('--sat') || '0px'
      const rightEnv = style.getPropertyValue('--sar') || '0px'
      const bottomEnv = style.getPropertyValue('--sab') || '0px'
      const leftEnv = style.getPropertyValue('--sal') || '0px'
      
      const top = parseInt(topEnv) || 0
      const right = parseInt(rightEnv) || 0
      const bottom = parseInt(bottomEnv) || 0
      const left = parseInt(leftEnv) || 0

      // If env values are 0, estimate based on device characteristics
      if (top === 0 && bottom === 0) {
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
        const hasNotch = window.screen.height > 800 && isMobile
        
        // Estimate safe areas for common devices
        if (isMobile && !isStandalone) {
          // In browser mode on mobile, add estimated padding
          setInsets({
            top: hasNotch ? 44 : 24, // Status bar height
            right: 0,
            bottom: hasNotch ? 34 : 0, // Gesture bar height
            left: 0,
          })
        } else {
          setInsets({ top, right, bottom, left })
        }
      } else {
        setInsets({ top, right, bottom, left })
      }
    }

    updateInsets()
    window.addEventListener('resize', updateInsets)
    window.addEventListener('orientationchange', updateInsets)
    
    return () => {
      window.removeEventListener('resize', updateInsets)
      window.removeEventListener('orientationchange', updateInsets)
    }
  }, [])

  return insets
}
