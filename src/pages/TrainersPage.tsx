import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Star, Users, Edit, Trash2, MoreVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { trainers as initialTrainers, type Trainer } from '@/data/mockData'
import { TrainerModal } from '@/components/trainers/TrainerModal'
import { toast } from 'sonner'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

// Generate consistent colors based on name
const getAvatarColor = (name: string) => {
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-red-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500',
  ]
  const index = name.charCodeAt(0) % colors.length
  return colors[index]
}

export function TrainersPage() {
  const [trainers, setTrainers] = useState<Trainer[]>(initialTrainers)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTrainer, setEditingTrainer] = useState<Trainer | null>(null)

  const handleAddTrainer = (data: Omit<Trainer, 'id'>) => {
    const newTrainer: Trainer = {
      ...data,
      id: String(Date.now()),
    }
    setTrainers([newTrainer, ...trainers])
    toast.success('Trainer added successfully')
  }

  const handleEditTrainer = (data: Omit<Trainer, 'id'>) => {
    if (!editingTrainer) return
    setTrainers(trainers.map((t) => 
      t.id === editingTrainer.id ? { ...data, id: editingTrainer.id } : t
    ))
    toast.success('Trainer updated successfully')
  }

  const handleDeleteTrainer = (id: string) => {
    setTrainers(trainers.filter((t) => t.id !== id))
    toast.success('Trainer removed successfully')
  }

  const openEditModal = (trainer: Trainer) => {
    setEditingTrainer(trainer)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingTrainer(null)
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-3 md:space-y-4 pb-4 -mx-4 md:mx-0"
    >
      {/* Header - Desktop only */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-4 md:px-0 hidden lg:flex">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">Trainers</h1>
          <p className="text-base text-muted-foreground">Manage your gym trainers</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto shadow-none h-9 md:h-10">
          <Plus className="mr-2 h-4 w-4" />
          Add Trainer
        </Button>
      </div>

      {/* Mobile Add Button */}
      <div className="lg:hidden px-4 md:px-0">
        <Button onClick={() => setIsModalOpen(true)} className="w-full shadow-none h-9">
          <Plus className="mr-2 h-4 w-4" />
          Add Trainer
        </Button>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block">
        <Card className="rounded-xl border-border/40 shadow-none overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-border/30">
                <TableHead className="text-xs font-medium">Trainer</TableHead>
                <TableHead className="text-xs font-medium">Specialization</TableHead>
                <TableHead className="text-xs font-medium">Experience</TableHead>
                <TableHead className="text-xs font-medium">Rating</TableHead>
                <TableHead className="text-xs font-medium">Clients</TableHead>
                <TableHead className="text-xs font-medium text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence>
                {trainers.map((trainer) => (
                  <TableRow key={trainer.id} className="border-border/30 hover:bg-muted/30">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className={`flex h-9 w-9 items-center justify-center rounded-full ${getAvatarColor(trainer.name)} text-xs font-bold text-white flex-shrink-0`}>
                          {trainer.name.split(' ').map((n) => n[0]).join('')}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-sm">{trainer.name}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-primary/80">{trainer.specialization}</TableCell>
                    <TableCell className="text-sm">{trainer.experience}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{trainer.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5 text-muted-foreground/60" />
                        <span className="text-sm">{trainer.clients}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openEditModal(trainer)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDeleteTrainer(trainer.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </AnimatePresence>
            </TableBody>
          </Table>
        </Card>
      </div>

      {/* Mobile/Tablet Card View */}
      <div className="space-y-2 px-4 md:px-0 lg:hidden">
        {trainers.map((trainer) => (
          <motion.div key={trainer.id} variants={itemVariants}>
            <Card className="rounded-lg md:rounded-xl border-border/30 shadow-none hover:border-border/60 transition-colors">
              <CardContent className="p-3 md:p-4">
                <div className="flex items-start justify-between gap-3">
                  {/* Trainer Info */}
                  <div className="flex items-center gap-2.5 md:gap-3 flex-1 min-w-0">
                    <div className={`flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full ${getAvatarColor(trainer.name)} text-sm md:text-base font-bold text-white flex-shrink-0`}>
                      {trainer.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm md:text-base truncate">{trainer.name}</p>
                      <p className="text-xs md:text-sm text-primary/80 truncate">{trainer.specialization}</p>
                      <p className="text-xs text-muted-foreground/70 hidden md:block">{trainer.experience} experience</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 flex-shrink-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openEditModal(trainer)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDeleteTrainer(trainer.id)}
                        className="text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Stats */}
                <div className="mt-3 flex items-center gap-4 text-xs md:text-sm pt-3 border-t border-border/30">
                  <div className="flex items-center gap-1.5">
                    <Star className="h-3.5 w-3.5 md:h-4 md:w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{trainer.rating}</span>
                  </div>
                  <div className="h-3 w-px bg-border/50" />
                  <div className="flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 md:h-4 md:w-4 text-muted-foreground/60" />
                    <span className="text-muted-foreground/70">{trainer.clients} clients</span>
                  </div>
                  <div className="h-3 w-px bg-border/50 md:hidden" />
                  <div className="md:hidden text-muted-foreground/70 text-xs">{trainer.experience}</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {trainers.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center px-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <Users className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-base md:text-lg font-semibold">No trainers yet</h3>
          <p className="mt-2 text-sm text-muted-foreground/70">Add your first trainer to get started</p>
          <Button onClick={() => setIsModalOpen(true)} className="mt-4 shadow-none">
            <Plus className="mr-2 h-4 w-4" />
            Add Trainer
          </Button>
        </div>
      )}

      {/* Trainer Modal */}
      <TrainerModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={editingTrainer ? handleEditTrainer : handleAddTrainer}
        trainer={editingTrainer}
      />
    </motion.div>
  )
}
