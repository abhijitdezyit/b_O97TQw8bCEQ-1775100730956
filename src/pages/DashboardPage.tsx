import { motion } from 'framer-motion'
import { Users, CreditCard, DollarSign, UserCheck, TrendingUp, TrendingDown, Activity } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { dashboardStats, revenueData, membershipDistribution, members } from '@/data/mockData'
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'

const statsCards = [
  {
    title: 'Total Members',
    value: dashboardStats.totalMembers,
    change: dashboardStats.memberGrowth,
    icon: Users,
    trend: 'up',
  },
  {
    title: 'Active Plans',
    value: dashboardStats.activePlans,
    change: 5.2,
    icon: CreditCard,
    trend: 'up',
  },
  {
    title: 'Monthly Revenue',
    value: `$${dashboardStats.monthlyRevenue.toLocaleString()}`,
    change: dashboardStats.revenueGrowth,
    icon: DollarSign,
    trend: 'up',
  },
  {
    title: 'Total Trainers',
    value: dashboardStats.totalTrainers,
    change: -2.1,
    icon: UserCheck,
    trend: 'down',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function DashboardPage() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-3 md:space-y-6 pb-4 -mx-4 md:mx-0"
    >
      {/* Page Header - Desktop only */}
      <div className="px-4 md:px-1 hidden lg:block">
        <h1 className="text-2xl lg:text-3xl font-bold">Dashboard</h1>
        <p className="text-base text-muted-foreground">Welcome back! Here&apos;s your gym overview.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-2 md:gap-4 lg:grid-cols-4 px-4 md:px-0">
        {statsCards.map((stat) => (
          <motion.div key={stat.title} variants={itemVariants}>
            <Card className="rounded-lg md:rounded-2xl border-border/40 shadow-none">
              <CardContent className="p-3 md:p-6">
                <div className="flex items-start justify-between">
                  <div className="hidden md:flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className={`md:hidden flex items-center gap-0.5 text-xs font-medium ${
                    stat.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                    {stat.trend === 'up' ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {Math.abs(stat.change)}%
                  </div>
                  <div className={`hidden md:flex items-center gap-1 text-sm font-medium ${
                    stat.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                    {stat.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    {Math.abs(stat.change)}%
                  </div>
                </div>
                <div className="mt-2 md:mt-4">
                  <p className="text-xl md:text-3xl font-bold">{stat.value}</p>
                  <p className="text-xs md:text-sm text-muted-foreground/80 mt-0.5">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid gap-3 md:gap-6 lg:grid-cols-2 px-4 md:px-0">
        {/* Revenue Chart */}
        <motion.div variants={itemVariants}>
          <Card className="rounded-lg md:rounded-2xl border-border/40 shadow-none">
            <CardHeader className="pb-2 md:pb-6 px-3 pt-3 md:px-6 md:pt-6">
              <CardTitle className="text-sm md:text-lg">Revenue Overview</CardTitle>
              <CardDescription className="text-xs md:text-sm">Last 6 months</CardDescription>
            </CardHeader>
            <CardContent className="px-1 md:px-6 pb-3 md:pb-6">
              <div className="h-[200px] md:h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <XAxis 
                      dataKey="month" 
                      stroke="currentColor"
                      strokeOpacity={0.2}
                      tick={{ fill: 'currentColor', fillOpacity: 0.6, fontSize: 10 }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis 
                      stroke="currentColor"
                      strokeOpacity={0.2}
                      tick={{ fill: 'currentColor', fillOpacity: 0.6, fontSize: 10 }}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `$${value / 1000}k`}
                      width={32}
                    />
                    <Tooltip 
                      formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
                      contentStyle={{
                        backgroundColor: 'var(--background)',
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                        fontSize: '11px',
                      }}
                    />
                    <Bar 
                      dataKey="revenue" 
                      fill="var(--primary)"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Membership Distribution */}
        <motion.div variants={itemVariants}>
          <Card className="rounded-lg md:rounded-2xl border-border/40 shadow-none">
            <CardHeader className="pb-2 md:pb-6 px-3 pt-3 md:px-6 md:pt-6">
              <CardTitle className="text-sm md:text-lg">Membership Plans</CardTitle>
              <CardDescription className="text-xs md:text-sm">Distribution by type</CardDescription>
            </CardHeader>
            <CardContent className="px-3 pb-3 md:px-6 md:pb-6">
              <div className="h-[200px] md:h-[280px] flex flex-col md:flex-row items-center gap-3 md:gap-4">
                <div className="w-full md:w-1/2 h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={membershipDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={70}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {membershipDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: number) => [`${value}%`, '']}
                        contentStyle={{
                          backgroundColor: 'var(--background)',
                          border: '1px solid var(--border)',
                          borderRadius: '8px',
                          fontSize: '11px',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex md:flex-col gap-2 flex-wrap justify-center md:justify-start">
                  {membershipDistribution.map((item) => (
                    <div key={item.name} className="flex items-center gap-1.5">
                      <div 
                        className="h-2 w-2 rounded-full flex-shrink-0" 
                        style={{ backgroundColor: item.fill }}
                      />
                      <span className="text-xs text-muted-foreground/80 whitespace-nowrap">{item.name}</span>
                      <span className="text-xs font-medium">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div variants={itemVariants} className="px-4 md:px-0">
        <Card className="rounded-lg md:rounded-2xl border-border/40 shadow-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2 md:pb-6 px-3 pt-3 md:px-6 md:pt-6">
            <div>
              <CardTitle className="text-sm md:text-lg">Recent Members</CardTitle>
              <CardDescription className="text-xs md:text-sm hidden md:block">Latest registrations</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="px-3 pb-3 md:px-6 md:pb-6">
            <div className="space-y-2 md:space-y-3">
              {members.slice(0, 5).map((member) => (
                <div 
                  key={member.id} 
                  className="flex items-center justify-between rounded-lg md:rounded-xl border border-border/30 p-2.5 md:p-4 hover:border-border/60 transition-colors"
                >
                  <div className="flex items-center gap-2.5 md:gap-3 flex-1 min-w-0">
                    <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary flex-shrink-0">
                      {member.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-xs md:text-base truncate">{member.name}</p>
                      <p className="text-xs text-muted-foreground/70 truncate hidden md:block">{member.email}</p>
                      <p className="text-[10px] md:text-xs text-muted-foreground/70 md:hidden">{member.plan}</p>
                    </div>
                  </div>
                  <div className="flex-shrink-0 ml-2">
                    <span className={`inline-flex items-center rounded-full px-1.5 md:px-2.5 py-0.5 text-[9px] md:text-xs font-medium ${
                      member.status === 'active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : member.status === 'inactive'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {member.status}
                    </span>
                    <p className="mt-1 text-[10px] md:text-xs text-muted-foreground/70 text-right hidden md:block">{member.plan}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
