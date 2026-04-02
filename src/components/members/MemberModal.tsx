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
import type { Member } from '@/data/mockData'

interface MemberModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: Omit<Member, 'id'>) => void
  member?: Member | null
}

export function MemberModal({ isOpen, onClose, onSubmit, member }: MemberModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    plan: 'Basic',
    joinDate: new Date().toISOString().split('T')[0],
    status: 'active' as Member['status'],
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (member) {
      setFormData({
        name: member.name,
        email: member.email,
        age: String(member.age),
        plan: member.plan,
        joinDate: member.joinDate,
        status: member.status,
      })
    } else {
      setFormData({
        name: '',
        email: '',
        age: '',
        plan: 'Basic',
        joinDate: new Date().toISOString().split('T')[0],
        status: 'active',
      })
    }
    setErrors({})
  }, [member, isOpen])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name) newErrors.name = 'Name is required'
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }
    if (!formData.age) {
      newErrors.age = 'Age is required'
    } else if (isNaN(Number(formData.age)) || Number(formData.age) < 16) {
      newErrors.age = 'Age must be 16 or older'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    onSubmit({
      name: formData.name,
      email: formData.email,
      age: Number(formData.age),
      plan: formData.plan,
      joinDate: formData.joinDate,
      status: formData.status,
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-w-full w-full bottom-0 top-auto translate-y-0 sm:top-[50%] sm:bottom-auto sm:translate-y-[-50%] data-[state=open]:slide-in-from-bottom sm:data-[state=open]:slide-in-from-bottom-0 rounded-t-2xl sm:rounded-2xl border-border/40 p-0 gap-0 max-h-[90vh] flex flex-col m-0 sm:m-4">
        <DialogHeader className="text-left px-4 pt-4 pb-3 border-b border-border/30">
          <div className="w-12 h-1 bg-muted-foreground/20 rounded-full mx-auto mb-3 sm:hidden" />
          <DialogTitle className="text-base md:text-lg">{member ? 'Edit Member' : 'Add New Member'}</DialogTitle>
          <DialogDescription className="text-xs md:text-sm text-muted-foreground/70">
            {member ? 'Update member information' : 'Enter the details for the new member'}
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
                placeholder="John Doe"
                className="h-11 text-sm border-border/40 shadow-none rounded-lg"
              />
              {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs md:text-sm font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
                className="h-11 text-sm border-border/40 shadow-none rounded-lg"
              />
              {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="age" className="text-xs md:text-sm font-medium">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  placeholder="25"
                  min={16}
                  className="h-11 text-sm border-border/40 shadow-none rounded-lg"
                />
                {errors.age && <p className="text-xs text-destructive mt-1">{errors.age}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="plan" className="text-xs md:text-sm font-medium">Plan</Label>
                <Select value={formData.plan} onValueChange={(value) => setFormData({ ...formData, plan: value })}>
                  <SelectTrigger className="h-11 text-sm border-border/40 shadow-none rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Basic">Basic</SelectItem>
                    <SelectItem value="Standard">Standard</SelectItem>
                    <SelectItem value="Premium">Premium</SelectItem>
                    <SelectItem value="Annual">Annual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="joinDate" className="text-xs md:text-sm font-medium">Join Date</Label>
                <Input
                  id="joinDate"
                  type="date"
                  value={formData.joinDate}
                  onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
                  className="h-11 text-sm border-border/40 shadow-none rounded-lg"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="status" className="text-xs md:text-sm font-medium">Status</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(value: Member['status']) => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger className="h-11 text-sm border-border/40 shadow-none rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter className="flex-row gap-2 p-4 border-t border-border/30 bg-muted/30">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 h-11 shadow-none border-border/40 rounded-lg">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 h-11 shadow-none rounded-lg">
              {member ? 'Update' : 'Add'} Member
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
