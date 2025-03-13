"use client"

import { useState } from "react"

// Datos de ejemplo - En una aplicación real, estos vendrían de tu backend
const projectStats = [
  { name: "Marketing Website", progress: 75, tasks: { completed: 15, total: 20 } },
  { name: "Mobile App", progress: 45, tasks: { completed: 9, total: 20 } },
  { name: "CRM Integration", progress: 90, tasks: { completed: 18, total: 20 } },
]

const recentActivity = [
  { user: "Alex Smith", action: "completed task", item: "Update homepage design", time: "2 hours ago", avatar: "/placeholder.svg?height=32&width=32" },
  { user: "Maria Garcia", action: "added", item: "New onboarding flow task", time: "5 hours ago", avatar: "/placeholder.svg?height=32&width=32" },
  { user: "John Doe", action: "moved", item: "API integration", time: "Yesterday", avatar: "/placeholder.svg?height=32&width=32" },
  { user: "Sarah Johnson", action: "commented on", item: "User testing", time: "Yesterday", avatar: "/placeholder.svg?height=32&width=32" },
]

const upcomingTasks = [
  { title: "Finalize design system", dueDate: "Today", priority: "High", assignee: "You" },
  { title: "Review Q3 marketing plan", dueDate: "Tomorrow", priority: "Medium", assignee: "Maria G." },
  { title: "Prepare sprint demo", dueDate: "In 2 days", priority: "High", assignee: "You" },
]

export default function Boards() {
  const [timeframe, setTimeframe] = useState("week")
  
  return (
    <div className="container mx-auto p-6 space-y-8 pt-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Overview of your projects and tasks
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-sm border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800">
            Last 30 Days
          </button>
          <button className="px-3 py-1.5 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
            New Task
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Tasks</p>
          </div>
          <div className="text-2xl font-bold">128</div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            +14% from last month
          </p>
        </div>
        
        <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Completed</p>
          </div>
          <div className="text-2xl font-bold">75</div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            58% completion rate
          </p>
        </div>
        
        <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Overdue</p>
          </div>
          <div className="text-2xl font-bold">12</div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            -3 from last week
          </p>
        </div>
        
        <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Team Members</p>
          </div>
          <div className="text-2xl font-bold">8</div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Active across 5 projects
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-4 md:grid-cols-7">
        {/* Project Progress */}
        <div className="md:col-span-4 bg-white dark:bg-neutral-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Project Progress</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Track the progress of your active projects
            </p>
          </div>
          
          <div className="space-y-6">
            {projectStats.map((project, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{project.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {project.tasks.completed}/{project.tasks.total} tasks
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-500 dark:bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
            <button className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              View All Projects →
            </button>
          </div>
        </div>

        {/* Task Distribution */}
        <div className="md:col-span-3 bg-white dark:bg-neutral-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Task Distribution</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Breakdown of tasks by status
            </p>
          </div>
          
          <div className="flex gap-2 mb-4">
            <button 
              className={`px-3 py-1 text-sm rounded-md ${timeframe === 'week' ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
              onClick={() => setTimeframe("week")}
            >
              Week
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-md ${timeframe === 'month' ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
              onClick={() => setTimeframe("month")}
            >
              Month
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-md ${timeframe === 'year' ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
              onClick={() => setTimeframe("year")}
            >
              Year
            </button>
          </div>
          
          <div className="flex items-center justify-center py-6">
            <div className="relative flex h-40 w-40 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white dark:bg-neutral-900">
                <div className="flex flex-col items-center justify-center">
                  <div className="text-xl font-bold">58%</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Completed</div>
                </div>
              </div>
              {/* Aquí iría un gráfico real en producción */}
              <div className="absolute inset-0 overflow-hidden rounded-full">
                <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Recent Activity */}
        <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Latest updates from your team
            </p>
          </div>
          
          <div className="space-y-4">
            {recentActivity.map((activity, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  <img src={activity.avatar || "/placeholder.svg"} alt={activity.user} className="h-full w-full object-cover" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm leading-none">
                    <span className="font-semibold">{activity.user}</span> {activity.action}{" "}
                    <span className="text-gray-600 dark:text-gray-300">{activity.item}</span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
            <button className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              View All Activity →
            </button>
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Upcoming Tasks</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Tasks due soon
            </p>
          </div>
          
          <div className="space-y-4">
            {upcomingTasks.map((task, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">{task.title}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Due: {task.dueDate}</p>
                    <div className={`px-1.5 py-0.5 rounded-full text-xs ${
                      task.priority === "High" 
                        ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" 
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                    }`}>
                      {task.priority}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-sm">{task.assignee}</div>
                  <button className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17L17 7"></path>
                      <path d="M7 7h10v10"></path>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
            <button className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              View All Tasks →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
