import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, UserCheck, Clock, LogIn, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { attendanceRecords as initialRecords, members, type AttendanceRecord } from '@/data/mockData'
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

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export function AttendancePage() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 3, 15)) // April 2024
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date(2024, 3, 15))
  const [records, setRecords] = useState<AttendanceRecord[]>(initialRecords)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  
  const firstDayOfMonth = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  
  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }
  
  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const isToday = (day: number) => {
    const today = new Date()
    return day === today.getDate() && month === today.getMonth() && year === today.getFullYear()
  }

  const isSelected = (day: number) => {
    if (!selectedDate) return false
    return day === selectedDate.getDate() && month === selectedDate.getMonth() && year === selectedDate.getFullYear()
  }

  const getAttendanceForDate = (date: Date | null) => {
    if (!date) return []
    const dateStr = date.toISOString().split('T')[0]
    return records.filter((r) => r.date === dateStr)
  }

  const markAttendance = () => {
    const now = new Date()
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
    const dateStr = selectedDate?.toISOString().split('T')[0] || now.toISOString().split('T')[0]
    
    // Pick a random active member for demo
    const activeMembers = members.filter((m) => m.status === 'active')
    const randomMember = activeMembers[Math.floor(Math.random() * activeMembers.length)]
    
    const newRecord: AttendanceRecord = {
      id: String(Date.now()),
      memberId: randomMember.id,
      memberName: randomMember.name,
      date: dateStr,
      checkIn: timeStr,
    }
    
    setRecords([newRecord, ...records])
    toast.success(`Attendance marked for ${randomMember.name}`)
  }

  const todayAttendance = getAttendanceForDate(selectedDate)

  // Generate calendar days
  const calendarDays: (number | null)[] = []
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null)
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i)
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header - Desktop only */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between hidden lg:flex">
        <div>
          <h1 className="text-2xl font-bold lg:text-3xl">Attendance</h1>
          <p className="text-muted-foreground">Track daily member attendance</p>
        </div>
        <Button onClick={markAttendance} className="w-full sm:w-auto">
          <UserCheck className="mr-2 h-4 w-4" />
          Mark Attendance
        </Button>
      </div>

      {/* Mobile Mark Attendance Button */}
      <div className="lg:hidden">
        <Button onClick={markAttendance} className="w-full">
          <UserCheck className="mr-2 h-4 w-4" />
          Mark Attendance
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Calendar */}
        <motion.div variants={itemVariants}>
          <Card className="rounded-2xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{months[month]} {year}</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={prevMonth}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={nextMonth}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Day headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {daysOfWeek.map((day) => (
                  <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => (
                  <button
                    key={index}
                    onClick={() => day && setSelectedDate(new Date(year, month, day))}
                    disabled={!day}
                    className={`
                      aspect-square flex items-center justify-center rounded-xl text-sm font-medium transition-colors
                      ${!day ? 'invisible' : ''}
                      ${isSelected(day!) ? 'bg-primary text-primary-foreground' : ''}
                      ${isToday(day!) && !isSelected(day!) ? 'bg-primary/10 text-primary' : ''}
                      ${!isSelected(day!) && !isToday(day!) ? 'hover:bg-muted' : ''}
                    `}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Today's Attendance */}
        <motion.div variants={itemVariants}>
          <Card className="rounded-2xl h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                {selectedDate ? `${months[selectedDate.getMonth()]} ${selectedDate.getDate()}, ${selectedDate.getFullYear()}` : 'Select a date'}
              </CardTitle>
              <CardDescription>
                {todayAttendance.length} member{todayAttendance.length !== 1 ? 's' : ''} checked in
              </CardDescription>
            </CardHeader>
            <CardContent>
              {todayAttendance.length > 0 ? (
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                  {todayAttendance.map((record) => (
                    <div
                      key={record.id}
                      className="flex items-center justify-between rounded-xl border border-border p-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                          {record.memberName.split(' ').map((n) => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-medium">{record.memberName}</p>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <LogIn className="h-3 w-3" />
                              {record.checkIn}
                            </span>
                            {record.checkOut && (
                              <span className="flex items-center gap-1">
                                <LogOut className="h-3 w-3" />
                                {record.checkOut}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      {!record.checkOut && (
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          In Gym
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                    <UserCheck className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="mt-4 text-muted-foreground">No attendance records for this date</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Stats */}
      <motion.div variants={itemVariants}>
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 dark:bg-green-900/30">
                  <UserCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{todayAttendance.length}</p>
                  <p className="text-sm text-muted-foreground">Checked In Today</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/30">
                  <LogIn className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{todayAttendance.filter((r) => !r.checkOut).length}</p>
                  <p className="text-sm text-muted-foreground">Currently In Gym</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 dark:bg-orange-900/30">
                  <Clock className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">2.5h</p>
                  <p className="text-sm text-muted-foreground">Avg. Session Time</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </motion.div>
  )
}
