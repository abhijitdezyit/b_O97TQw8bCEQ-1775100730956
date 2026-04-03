import { Plus } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface FloatingActionButtonProps {
  onClick: () => void
  label?: string
  className?: string
}

export function FloatingActionButton({ onClick, label = 'Add', className }: FloatingActionButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className={cn(
        'fixed bottom-24 right-6 z-50',
        'flex items-center gap-2 px-5 py-4',
        'bg-gradient-to-r from-primary to-primary/90',
        'text-primary-foreground font-semibold',
        'rounded-full shadow-lg shadow-primary/50',
        'backdrop-blur-sm',
        'hover:shadow-xl hover:shadow-primary/60',
        'active:shadow-md',
        'transition-all duration-200',
        'lg:bottom-8',
        className
      )}
      style={{
        background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.85) 100%)',
      }}
    >
      <motion.div
        animate={{ rotate: 0 }}
        whileHover={{ rotate: 90 }}
        transition={{ duration: 0.2 }}
      >
        <Plus className="h-6 w-6" strokeWidth={2.5} />
      </motion.div>
      <span className="text-sm tracking-wide">{label}</span>
    </motion.button>
  )
}

// Compact version (icon only)
export function FloatingActionButtonCompact({ onClick, className }: Omit<FloatingActionButtonProps, 'label'>) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className={cn(
        'fixed bottom-24 right-6 z-50',
        'flex items-center justify-center',
        'w-14 h-14',
        'bg-gradient-to-br from-primary via-primary to-primary/90',
        'text-primary-foreground',
        'rounded-full shadow-lg shadow-primary/50',
        'backdrop-blur-sm',
        'hover:shadow-xl hover:shadow-primary/60',
        'active:shadow-md',
        'transition-all duration-200',
        'lg:bottom-8',
        'group',
        className
      )}
    >
      <motion.div
        animate={{ rotate: 0 }}
        whileHover={{ rotate: 90 }}
        transition={{ duration: 0.2 }}
      >
        <Plus className="h-7 w-7 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
      </motion.div>
      
      {/* Ripple effect */}
      <span className="absolute inset-0 rounded-full bg-primary/20 animate-ping opacity-0 group-hover:opacity-100" />
    </motion.button>
  )
}
