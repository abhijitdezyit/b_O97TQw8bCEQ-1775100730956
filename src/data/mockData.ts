export interface Member {
  id: string
  name: string
  email: string
  age: number
  plan: string
  joinDate: string
  status: 'active' | 'inactive' | 'expired'
  avatar?: string
}

export interface Plan {
  id: string
  name: string
  price: number
  duration: string
  benefits: string[]
  popular?: boolean
}

export interface Trainer {
  id: string
  name: string
  specialization: string
  experience: string
  avatar?: string
  rating: number
  clients: number
}

export interface Payment {
  id: string
  memberId: string
  memberName: string
  amount: number
  date: string
  status: 'paid' | 'pending' | 'overdue'
  plan: string
}

export interface AttendanceRecord {
  id: string
  memberId: string
  memberName: string
  date: string
  checkIn: string
  checkOut?: string
}

export const members: Member[] = [
  { id: '1', name: 'Alex Johnson', email: 'alex@email.com', age: 28, plan: 'Premium', joinDate: '2024-01-15', status: 'active' },
  { id: '2', name: 'Sarah Williams', email: 'sarah@email.com', age: 32, plan: 'Basic', joinDate: '2024-02-20', status: 'active' },
  { id: '3', name: 'Mike Chen', email: 'mike@email.com', age: 25, plan: 'Premium', joinDate: '2024-03-10', status: 'active' },
  { id: '4', name: 'Emma Davis', email: 'emma@email.com', age: 29, plan: 'Standard', joinDate: '2024-01-05', status: 'inactive' },
  { id: '5', name: 'James Wilson', email: 'james@email.com', age: 35, plan: 'Premium', joinDate: '2023-12-01', status: 'active' },
  { id: '6', name: 'Lisa Anderson', email: 'lisa@email.com', age: 27, plan: 'Basic', joinDate: '2024-04-01', status: 'active' },
  { id: '7', name: 'David Brown', email: 'david@email.com', age: 31, plan: 'Standard', joinDate: '2024-02-14', status: 'expired' },
  { id: '8', name: 'Jennifer Taylor', email: 'jen@email.com', age: 24, plan: 'Premium', joinDate: '2024-03-25', status: 'active' },
]

export const plans: Plan[] = [
  {
    id: '1',
    name: 'Basic',
    price: 29,
    duration: '1 Month',
    benefits: ['Access to gym equipment', 'Locker room access', 'Free WiFi'],
  },
  {
    id: '2',
    name: 'Standard',
    price: 49,
    duration: '1 Month',
    benefits: ['All Basic benefits', 'Group fitness classes', '1 Personal training session', 'Sauna access'],
  },
  {
    id: '3',
    name: 'Premium',
    price: 79,
    duration: '1 Month',
    benefits: ['All Standard benefits', 'Unlimited personal training', 'Nutrition consultation', 'Priority booking', 'Guest passes (2/month)'],
    popular: true,
  },
  {
    id: '4',
    name: 'Annual',
    price: 699,
    duration: '12 Months',
    benefits: ['All Premium benefits', '2 months free', 'Exclusive member events', 'Merchandise discount'],
  },
]

export const trainers: Trainer[] = [
  { id: '1', name: 'Marcus Thompson', specialization: 'Strength Training', experience: '8 years', rating: 4.9, clients: 45 },
  { id: '2', name: 'Sofia Rodriguez', specialization: 'Yoga & Pilates', experience: '6 years', rating: 4.8, clients: 38 },
  { id: '3', name: 'Ryan Kim', specialization: 'CrossFit', experience: '5 years', rating: 4.7, clients: 32 },
  { id: '4', name: 'Amanda Foster', specialization: 'Cardio & HIIT', experience: '7 years', rating: 4.9, clients: 52 },
  { id: '5', name: 'Derek Williams', specialization: 'Boxing', experience: '10 years', rating: 5.0, clients: 28 },
  { id: '6', name: 'Nina Patel', specialization: 'Nutrition & Weight Loss', experience: '4 years', rating: 4.6, clients: 41 },
]

export const payments: Payment[] = [
  { id: '1', memberId: '1', memberName: 'Alex Johnson', amount: 79, date: '2024-04-01', status: 'paid', plan: 'Premium' },
  { id: '2', memberId: '2', memberName: 'Sarah Williams', amount: 29, date: '2024-04-01', status: 'paid', plan: 'Basic' },
  { id: '3', memberId: '3', memberName: 'Mike Chen', amount: 79, date: '2024-04-05', status: 'pending', plan: 'Premium' },
  { id: '4', memberId: '4', memberName: 'Emma Davis', amount: 49, date: '2024-03-15', status: 'overdue', plan: 'Standard' },
  { id: '5', memberId: '5', memberName: 'James Wilson', amount: 79, date: '2024-04-01', status: 'paid', plan: 'Premium' },
  { id: '6', memberId: '6', memberName: 'Lisa Anderson', amount: 29, date: '2024-04-10', status: 'pending', plan: 'Basic' },
]

export const attendanceRecords: AttendanceRecord[] = [
  { id: '1', memberId: '1', memberName: 'Alex Johnson', date: '2024-04-15', checkIn: '08:30', checkOut: '10:15' },
  { id: '2', memberId: '3', memberName: 'Mike Chen', date: '2024-04-15', checkIn: '09:00', checkOut: '11:30' },
  { id: '3', memberId: '5', memberName: 'James Wilson', date: '2024-04-15', checkIn: '07:15', checkOut: '08:45' },
  { id: '4', memberId: '8', memberName: 'Jennifer Taylor', date: '2024-04-15', checkIn: '17:30', checkOut: '19:00' },
  { id: '5', memberId: '2', memberName: 'Sarah Williams', date: '2024-04-15', checkIn: '18:00' },
  { id: '6', memberId: '6', memberName: 'Lisa Anderson', date: '2024-04-15', checkIn: '16:45', checkOut: '18:30' },
]

export const dashboardStats = {
  totalMembers: 248,
  activePlans: 186,
  monthlyRevenue: 14520,
  totalTrainers: 12,
  memberGrowth: 12.5,
  revenueGrowth: 8.3,
}

export const revenueData = [
  { month: 'Jan', revenue: 12400 },
  { month: 'Feb', revenue: 11800 },
  { month: 'Mar', revenue: 13200 },
  { month: 'Apr', revenue: 14520 },
  { month: 'May', revenue: 13800 },
  { month: 'Jun', revenue: 15200 },
]

export const membershipDistribution = [
  { name: 'Basic', value: 45, fill: 'var(--chart-1)' },
  { name: 'Standard', value: 30, fill: 'var(--chart-2)' },
  { name: 'Premium', value: 20, fill: 'var(--chart-3)' },
  { name: 'Annual', value: 5, fill: 'var(--chart-4)' },
]
