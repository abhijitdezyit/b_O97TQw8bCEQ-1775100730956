import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { Trainer } from '@/data/mockData'

interface TrainerModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: Omit<Trainer, 'id'>) => void
  trainer?: Trainer | null
}

const specializations = [
  'Strength Training',
  'Yoga & Pilates',
  'CrossFit',
  'Cardio & HIIT',
  'Boxing',
  'Nutrition & Weight Loss',
  'Swimming',
  'Martial Arts',
]

export function TrainerModal({ isOpen, onClose, onSubmit, trainer }: TrainerModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    specialization: 'Strength Training',
    experience: '',
    rating: '5.0',
    clients: '0',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (trainer) {
      setFormData({
        name: trainer.name,
        specialization: trainer.specialization,
        experience: trainer.experience,
        rating: String(trainer.rating),
        clients: String(trainer.clients),
      })
    } else {
      setFormData({
        name: '',
        specialization: 'Strength Training',
        experience: '',
        rating: '5.0',
        clients: '0',
      })
    }
    setErrors({})
  }, [trainer, isOpen])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name) newErrors.name = 'Name is required'
    if (!formData.experience) newErrors.experience = 'Experience is required'
    if (!formData.rating || isNaN(Number(formData.rating)) || Number(formData.rating) < 0 || Number(formData.rating) > 5) {
      newErrors.rating = 'Rating must be between 0 and 5'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    onSubmit({
      name: formData.name,
      specialization: formData.specialization,
      experience: formData.experience,
      rating: Number(formData.rating),
      clients: Number(formData.clients),
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-w-full w-full bottom-0 top-auto translate-y-0 sm:top-[50%] sm:bottom-auto sm:translate-y-[-50%] data-[state=open]:slide-in-from-bottom sm:data-[state=open]:slide-in-from-bottom-0 rounded-t-2xl sm:rounded-2xl border-border/40 p-0 gap-0 max-h-[90vh] flex flex-col m-0 sm:m-4">
        <DialogHeader className="text-left px-4 pt-4 pb-3 border-b border-border/30">
          <div className="w-12 h-1 bg-muted-foreground/20 rounded-full mx-auto mb-3 sm:hidden" />
          <DialogTitle className="text-base md:text-lg">{trainer ? 'Edit Trainer' : 'Add New Trainer'}</DialogTitle>
          <DialogDescription className="text-xs md:text-sm text-muted-foreground/70">
            {trainer ? 'Update trainer information' : 'Enter the details for the new trainer'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="space-y-3 md:space-y-4 px-4 py-4 overflow-y-auto flex-1">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-xs md:text-sm font-medium">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Marcus Thompson"
                className="h-11 text-sm border-border/40 shadow-none rounded-lg"
              />
              {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="specialization" className="text-xs md:text-sm font-medium">Specialization</Label>
              <Select 
                value={formData.specialization} 
                onValueChange={(value) => setFormData({ ...formData, specialization: value })}
              >
                <SelectTrigger className="h-11 text-sm border-border/40 shadow-none rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {specializations.map((spec) => (
                    <SelectItem key={spec} value={spec}>
                      {spec}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="experience" className="text-xs md:text-sm font-medium">Experience</Label>
              <Input
                id="experience"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                placeholder="5 years"
                className="h-11 text-sm border-border/40 shadow-none rounded-lg"
              />
              {errors.experience && <p className="text-xs text-destructive mt-1">{errors.experience}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="rating" className="text-xs md:text-sm font-medium">Rating (0-5)</Label>
                <Input
                  id="rating"
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                  className="h-11 text-sm border-border/40 shadow-none rounded-lg"
                />
                {errors.rating && <p className="text-xs text-destructive mt-1">{errors.rating}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="clients" className="text-xs md:text-sm font-medium">Clients</Label>
                <Input
                  id="clients"
                  type="number"
                  min="0"
                  value={formData.clients}
                  onChange={(e) => setFormData({ ...formData, clients: e.target.value })}
                  className="h-11 text-sm border-border/40 shadow-none rounded-lg"
                />
              </div>
            </div>
          </div>

          <DialogFooter className="flex-row gap-2 p-4 border-t border-border/30 bg-muted/30">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 h-11 shadow-none border-border/40 rounded-lg">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 h-11 shadow-none rounded-lg">
              {trainer ? 'Update' : 'Add'} Trainer
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
