import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Search, Filter, MoreVertical, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { members as initialMembers, type Member } from '@/data/mockData'
import { MemberModal } from '@/components/members/MemberModal'
import { MobileAddAction } from '@/components/MobileAddAction'
import { toast } from 'sonner'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function MembersPage() {
  const [members, setMembers] = useState<Member[]>(initialMembers)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingMember, setEditingMember] = useState<Member | null>(null)
  const itemsPerPage = 5

  const filteredMembers = members.filter((member) => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage)
  const paginatedMembers = filteredMembers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleAddMember = (data: Omit<Member, 'id'>) => {
    const newMember: Member = {
      ...data,
      id: String(Date.now()),
    }
    setMembers([newMember, ...members])
    toast.success('Member added successfully')
  }

  const handleEditMember = (data: Omit<Member, 'id'>) => {
    if (!editingMember) return
    setMembers(members.map((m) => 
      m.id === editingMember.id ? { ...data, id: editingMember.id } : m
    ))
    toast.success('Member updated successfully')
  }

  const handleDeleteMember = (id: string) => {
    setMembers(members.filter((m) => m.id !== id))
    toast.success('Member deleted successfully')
  }

  const openEditModal = (member: Member) => {
    setEditingMember(member)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingMember(null)
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
          <h1 className="text-2xl lg:text-3xl font-bold">Members</h1>
          <p className="text-base text-muted-foreground">Manage your gym members</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto shadow-none h-9 md:h-10">
          <Plus className="mr-2 h-4 w-4" />
          Add Member
        </Button>
      </div>

      {/* Filters */}
      <motion.div variants={itemVariants} className="px-4 md:px-0">
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
            <Input
              placeholder="Search members..."
              className="pl-10 h-10 md:h-10 text-sm border-border/40 shadow-none rounded-lg bg-card"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-36 h-10 text-sm border-border/40 shadow-none rounded-lg bg-card">
              <Filter className="mr-2 h-3.5 w-3.5" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* Desktop Table View */}
      <div className="hidden lg:block">
        <Card className="rounded-xl border-border/40 shadow-none overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-border/30">
                <TableHead className="text-xs font-medium">Member</TableHead>
                <TableHead className="text-xs font-medium">Age</TableHead>
                <TableHead className="text-xs font-medium">Plan</TableHead>
                <TableHead className="text-xs font-medium">Join Date</TableHead>
                <TableHead className="text-xs font-medium">Status</TableHead>
                <TableHead className="text-xs font-medium text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence>
                {paginatedMembers.map((member) => (
                  <TableRow key={member.id} className="border-border/30 hover:bg-muted/30">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary flex-shrink-0">
                          {member.name.split(' ').map((n) => n[0]).join('')}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-sm">{member.name}</p>
                          <p className="text-xs text-muted-foreground/70 truncate">{member.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{member.age}</TableCell>
                    <TableCell className="text-sm">{member.plan}</TableCell>
                    <TableCell className="text-sm">{member.joinDate}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                        member.status === 'active' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                          : member.status === 'inactive'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {member.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openEditModal(member)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDeleteMember(member.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
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
        <AnimatePresence>
          {paginatedMembers.map((member) => (
            <motion.div
              key={member.id}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Card className="rounded-lg md:rounded-xl border-border/30 shadow-none hover:border-border/60 transition-colors">
                <CardContent className="p-3 md:p-4">
                  <div className="flex items-start justify-between gap-3">
                    {/* Member Info */}
                    <div className="flex items-center gap-2.5 md:gap-3 flex-1 min-w-0">
                      <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-primary/10 text-xs md:text-sm font-semibold text-primary flex-shrink-0">
                        {member.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-sm md:text-base truncate">{member.name}</p>
                        <p className="text-xs md:text-sm text-muted-foreground/70 truncate">{member.email}</p>
                      </div>
                    </div>

                    {/* Status & Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={`inline-flex items-center rounded-full px-2 md:px-2.5 py-0.5 text-[10px] md:text-xs font-medium ${
                        member.status === 'active' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                          : member.status === 'inactive'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {member.status}
                      </span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openEditModal(member)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDeleteMember(member.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {/* Member Details */}
                  <div className="mt-3 grid grid-cols-3 gap-3 text-xs md:text-sm pt-3 border-t border-border/30">
                    <div>
                      <p className="text-muted-foreground/60 mb-0.5 text-[10px] md:text-xs">Age</p>
                      <p className="font-medium">{member.age}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground/60 mb-0.5 text-[10px] md:text-xs">Plan</p>
                      <p className="font-medium truncate">{member.plan}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground/60 mb-0.5 text-[10px] md:text-xs">Joined</p>
                      <p className="font-medium">{member.joinDate}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div variants={itemVariants} className="flex items-center justify-between px-4 md:px-0">
          <p className="text-xs md:text-sm text-muted-foreground/70">
            {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, filteredMembers.length)} of {filteredMembers.length}
          </p>
          <div className="flex items-center gap-1 md:gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="h-8 w-8 md:h-9 md:w-9 shadow-none border-border/40"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setCurrentPage(page)}
                  className="h-8 w-8 md:h-9 md:w-9 shadow-none border-border/40 text-xs md:text-sm"
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="h-8 w-8 md:h-9 md:w-9 shadow-none border-border/40"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      )}

      {/* Member Modal */}
      <MemberModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={editingMember ? handleEditMember : handleAddMember}
        member={editingMember}
      />
      
      {/* Mobile Add Action - Unique animated button */}
      <MobileAddAction onClick={() => setIsModalOpen(true)} label="Add Member" />
    </motion.div>
  )
}
