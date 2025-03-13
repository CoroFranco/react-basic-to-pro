"use client"

import { useState } from "react"

// Datos de ejemplo
const teamMembers = [
  { id: 1, name: "Alex Smith", role: "Product Manager", avatar: "/placeholder.svg?height=40&width=40", status: "online" },
  { id: 2, name: "Maria Garcia", role: "UI/UX Designer", avatar: "/placeholder.svg?height=40&width=40", status: "online" },
  { id: 3, name: "John Doe", role: "Frontend Developer", avatar: "/placeholder.svg?height=40&width=40", status: "offline" },
  { id: 4, name: "Sarah Johnson", role: "Backend Developer", avatar: "/placeholder.svg?height=40&width=40", status: "away" },
  { id: 5, name: "David Lee", role: "QA Engineer", avatar: "/placeholder.svg?height=40&width=40", status: "online" },
]

const teamProjects = [
  { id: 1, name: "Marketing Website Redesign", progress: 75, members: 4 },
  { id: 2, name: "Mobile App Development", progress: 45, members: 3 },
  { id: 3, name: "CRM Integration", progress: 90, members: 2 },
]

export default function Teams() {
  const [inviteEmail, setInviteEmail] = useState("")
  const [activeTab, setActiveTab] = useState("members")
  
  return (
    <div className="container mx-auto p-6 space-y-8 pt-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team Management</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage your team members and projects
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
            Invite Member
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab("members")}
            className={`py-4 px-1 text-sm font-medium border-b-2 ${
              activeTab === "members"
                ? "border-blue-500 text-blue-600 dark:text-blue-400"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
          >
            Members
          </button>
          <button
            onClick={() => setActiveTab("projects")}
            className={`py-4 px-1 text-sm font-medium border-b-2 ${
              activeTab === "projects"
                ? "border-blue-500 text-blue-600 dark:text-blue-400"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`py-4 px-1 text-sm font-medium border-b-2 ${
              activeTab === "analytics"
                ? "border-blue-500 text-blue-600 dark:text-blue-400"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
          >
            Analytics
          </button>
        </nav>
      </div>

      {/* Team Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="text-2xl font-bold">{teamMembers.length}</div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Team Members</p>
        </div>
        <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="text-2xl font-bold">{teamProjects.length}</div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Active Projects</p>
        </div>
        <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="text-2xl font-bold">68%</div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Overall Completion</p>
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === "members" && (
        <div className="bg-white dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold">Team Members</h2>
          </div>
          
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {teamMembers.map((member) => (
              <div key={member.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                      <img src={member.avatar || "/placeholder.svg"} alt={member.name} className="h-full w-full object-cover" />
                    </div>
                    <div className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white dark:border-neutral-800 ${
                      member.status === "online" ? "bg-green-500" : 
                      member.status === "away" ? "bg-yellow-500" : "bg-gray-500"
                    }`}></div>
                  </div>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{member.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                    Message
                  </button>
                  <button className="p-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Invite Form */}
          <div className="p-4 bg-gray-50 dark:bg-neutral-900 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email address"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
              />
              <button 
                className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 disabled:opacity-50"
                disabled={!inviteEmail.includes('@')}
              >
                Send Invite
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "projects" && (
        <div className="bg-white dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold">Team Projects</h2>
          </div>
          
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {teamProjects.map((project) => (
              <div key={project.id} className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h3 className="font-medium">{project.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{project.members} team members</p>
                  </div>
                  <button className="text-sm text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                    View Details
                  </button>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-2">
                  <div 
                    className="bg-blue-500 dark:bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Progress</span>
                  <span className="text-xs font-medium">{project.progress}%</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 bg-gray-50 dark:bg-neutral-900 border-t border-gray-200 dark:border-gray-700">
            <button className="w-full py-2 text-sm text-center text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
              + Create New Project
            </button>
          </div>
        </div>
      )}

      {activeTab === "analytics" && (
        <div className="bg-white dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm p-4">
          <h2 className="text-lg font-semibold mb-4">Team Analytics</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-2">Task Completion Rate</h3>
              <div className="h-40 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-end p-4 gap-2">
                <div className="flex-1 bg-blue-500 dark:bg-blue-600 h-[60%]" title="Week 1"></div>
                <div className="flex-1 bg-blue-500 dark:bg-blue-600 h-[75%]" title="Week 2"></div>
                <div className="flex-1 bg-blue-500 dark:bg-blue-600 h-[45%]" title="Week 3"></div>
                <div className="flex-1 bg-blue-500 dark:bg-blue-600 h-[80%]" title="Week 4"></div>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">Week 1</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Week 2</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Week 3</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Week 4</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Task Distribution by Member</h3>
              <div className="space-y-2">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                      <img src={member.avatar || "/placeholder.svg"} alt={member.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span>{member.name}</span>
                        <span>{Math.floor(Math.random() * 20) + 5} tasks</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <div 
                          className="bg-blue-500 dark:bg-blue-600 h-1.5 rounded-full" 
                          style={{ width: `${Math.floor(Math.random() * 80) + 20}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
