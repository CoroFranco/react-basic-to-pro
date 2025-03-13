"use client"

import { useState } from "react"

export default function Config() {
  const [activeTab, setActiveTab] = useState("profile")
  const [darkMode, setDarkMode] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  
  return (
    <div className="container mx-auto p-6 space-y-8 pt-20">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid md:grid-cols-[250px_1fr] gap-6">
        {/* Sidebar */}
        <div className="bg-white dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm p-4 h-fit">
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab("profile")}
              className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                activeTab === "profile"
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab("notifications")}
              className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                activeTab === "notifications"
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              Notifications
            </button>
            <button
              onClick={() => setActiveTab("appearance")}
              className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                activeTab === "appearance"
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              Appearance
            </button>
            <button
              onClick={() => setActiveTab("integrations")}
              className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                activeTab === "integrations"
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              Integrations
            </button>
            <button
              onClick={() => setActiveTab("account")}
              className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                activeTab === "account"
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              Account
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm p-6">
          {activeTab === "profile" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    <img src="/placeholder.svg?height=80&width=80" alt="Profile" className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <button className="px-3 py-1.5 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
                      Change Avatar
                    </button>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      JPG, GIF or PNG. Max size 2MB.
                    </p>
                  </div>
                </div>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      defaultValue="John"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      defaultValue="Doe"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    defaultValue="john.doe@example.com"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                  />
                </div>
                
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    rows={4}
                    defaultValue="Product Manager with 5+ years of experience in SaaS products."
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                  />
                </div>
                
                <div className="flex justify-end">
                  <button className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
              
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Notifications</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Task Assignments</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Get notified when you are assigned to a task</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={emailNotifications} 
                        onChange={() => setEmailNotifications(!emailNotifications)} 
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Task Updates</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Get notified when a task you're assigned to is updated</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={true} className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Push Notifications</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Enable Push Notifications</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Receive notifications on your device</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={pushNotifications} 
                        onChange={() => setPushNotifications(!pushNotifications)} 
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "appearance" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Appearance Settings</h2>
              
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Theme</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Dark Mode</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Switch between light and dark themes</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={darkMode} 
                        onChange={() => setDarkMode(!darkMode)} 
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Color Scheme</h3>
                  
                  <div className="grid grid-cols-4 gap-3">
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-10 w-10 rounded-full bg-blue-500 ring-2 ring-offset-2 ring-blue-500"></div>
                      <span className="text-xs">Blue</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-10 w-10 rounded-full bg-purple-500"></div>
                      <span className="text-xs">Purple</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-10 w-10 rounded-full bg-green-500"></div>
                      <span className="text-xs">Green</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-10 w-10 rounded-full bg-orange-500"></div>
                      <span className="text-xs">Orange</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "integrations" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Integrations</h2>
              
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/30 rounded-md flex items-center justify-center">
                        <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M9 7L7 12L12 17L17 12L15 7H9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Slack</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Receive notifications in your Slack workspace</p>
                      </div>
                    </div>
                    <button className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600">
                      Connect
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/30 rounded-md flex items-center justify-center">
                        <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M7 9L12 12L17 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Google Calendar</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Sync your tasks with Google Calendar</p>
                      </div>
                    </div>
                    <button className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600">
                      Connect
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/30 rounded-md flex items-center justify-center">
                        <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M6 9H2V21H6V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">GitHub</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Link your GitHub repositories</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-green-600 dark:text-green-400 font-medium">Connected</span>
                      <button className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600">
                        Disconnect
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "account" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
              
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Change Password</h3>
                  
                  <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Current Password
                    </label>
                    <input
                      type="password"
                      id="currentPassword"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                    />
                  </div>
                  
                  <div className="pt-2">
                    <button className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
                      Update Password
                    </button>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Danger Zone</h3>
                  
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-red-800 dark:text-red-400">Delete Account</h4>
                    <p className="text-xs text-red-700 dark:text-red-300 mt-1 mb-3">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <button className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
