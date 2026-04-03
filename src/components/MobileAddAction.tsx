import { Plus } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MobileAddActionProps {
  onClick: () => void
  label?: string
}

export function MobileAddAction({ onClick, label }: MobileAddActionProps) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={cn(
        'lg:hidden fixed bottom-24 right-6 z-[110]',
        'w-14 h-14',
        'flex items-center justify-center',
        'bg-background/40 backdrop-blur-xl',
        'text-foreground',
        'rounded-full',
        'border border-border/50',
        'shadow-lg shadow-black/10',
        'hover:bg-background/60',
        'active:bg-background/70',
        'transition-colors duration-200',
        'group'
      )}
      aria-label={label || 'Add'}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />
      
      {/* Plus icon */}
      <motion.div
        whileHover={{ rotate: 90 }}
        transition={{ duration: 0.2 }}
        className="relative flex items-center justify-center w-8 h-8 rounded-full bg-primary/15 text-primary group-hover:bg-primary/20"
      >
        <Plus className="h-5 w-5" strokeWidth={2.5} />
      </motion.div>
      
      {/* Subtle ring on hover */}
      <div className="absolute inset-0 rounded-full ring-1 ring-primary/0 group-hover:ring-primary/20 transition-all duration-200" />
    </motion.button>
  )
}
