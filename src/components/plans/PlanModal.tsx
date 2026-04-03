import { useState, useEffect } from 'react'
import { X, Plus } from 'lucide-react'
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
import { Switch } from '@/components/ui/switch'
import type { Plan } from '@/data/mockData'

interface PlanModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: Omit<Plan, 'id'>) => void
  plan?: Plan | null
}

export function PlanModal({ isOpen, onClose, onSubmit, plan }: PlanModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    duration: '1 Month',
    benefits: [''],
    popular: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (plan) {
      setFormData({
        name: plan.name,
        price: String(plan.price),
        duration: plan.duration,
        benefits: plan.benefits,
        popular: plan.popular || false,
      })
    } else {
      setFormData({
        name: '',
        price: '',
        duration: '1 Month',
        benefits: [''],
        popular: false,
      })
    }
    setErrors({})
  }, [plan, isOpen])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name) newErrors.name = 'Name is required'
    if (!formData.price) {
      newErrors.price = 'Price is required'
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = 'Price must be a positive number'
    }
    if (formData.benefits.filter((b) => b.trim()).length === 0) {
      newErrors.benefits = 'At least one benefit is required'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    onSubmit({
      name: formData.name,
      price: Number(formData.price),
      duration: formData.duration,
      benefits: formData.benefits.filter((b) => b.trim()),
      popular: formData.popular,
    })
    onClose()
  }

  const addBenefit = () => {
    setFormData({ ...formData, benefits: [...formData.benefits, ''] })
  }

  const removeBenefit = (index: number) => {
    setFormData({
      ...formData,
      benefits: formData.benefits.filter((_, i) => i !== index),
    })
  }

  const updateBenefit = (index: number, value: string) => {
    const newBenefits = [...formData.benefits]
    newBenefits[index] = value
    setFormData({ ...formData, benefits: newBenefits })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[85vh] overflow-hidden flex flex-col p-0 gap-0 rounded-t-3xl sm:rounded-2xl bottom-0 top-auto sm:top-1/2 translate-y-0 sm:-translate-y-1/2">
        {/* Mobile handle */}
        <div className="flex justify-center pt-3 pb-2 sm:hidden">
          <div className="w-12 h-1 bg-muted-foreground/30 rounded-full" />
        </div>
        
        <DialogHeader className="px-6 pt-4 pb-3 sm:pt-6 space-y-1">
          <DialogTitle className="text-lg sm:text-xl">{plan ? 'Edit Plan' : 'Add New Plan'}</DialogTitle>
          <DialogDescription className="text-sm">
            {plan ? 'Update plan details' : 'Create a new membership plan'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm">Plan Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Premium"
                className="h-11 text-base"
              />
              {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="price" className="text-sm">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="79"
                  min={0}
                  className="h-11 text-base"
                />
                {errors.price && <p className="text-sm text-destructive">{errors.price}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration" className="text-sm">Duration</Label>
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="1 Month"
                  className="h-11 text-base"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm">Benefits</Label>
                <Button type="button" variant="ghost" size="sm" onClick={addBenefit} className="h-8 text-xs">
                  <Plus className="mr-1 h-3 w-3" />
                  Add
                </Button>
              </div>
              <div className="space-y-2">
                {formData.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={benefit}
                      onChange={(e) => updateBenefit(index, e.target.value)}
                      placeholder="Enter benefit"
                      className="h-11 text-base"
                    />
                    {formData.benefits.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeBenefit(index)}
                        className="h-11 w-11 shrink-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              {errors.benefits && <p className="text-sm text-destructive">{errors.benefits}</p>}
            </div>

            <div className="flex items-center justify-between rounded-xl border border-border/40 p-4 bg-muted/30">
              <div>
                <Label htmlFor="popular" className="text-sm font-medium">Mark as Popular</Label>
                <p className="text-xs text-muted-foreground mt-0.5">Highlight this plan to users</p>
              </div>
              <Switch
                id="popular"
                checked={formData.popular}
                onCheckedChange={(checked) => setFormData({ ...formData, popular: checked })}
              />
            </div>
          </div>

          <DialogFooter className="px-6 py-4 border-t border-border/40 flex-row gap-2 sm:gap-0 bg-muted/20">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 sm:flex-none h-11 shadow-none">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 sm:flex-none h-11 shadow-none">
              {plan ? 'Update' : 'Create'} Plan
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
