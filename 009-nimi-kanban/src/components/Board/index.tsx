"use client"

import { useState } from "react"
import { useDroppable } from "@dnd-kit/core"
import { Points } from "../Icons"
import Task from "../Task"

export interface TaskType {
  id: `${string}-${string}-${string}-${string}-${string}`
  title: string
  status: string
  createdAt: number
}

interface BoardProps {
  id: string
  title: string
  tasks: TaskType[]
  onAddTask: (title: string) => void
  onUpdateTitle?: (id: string, newTitle: string) => void
  activeTaskId: string | null
  isOver?: boolean
  onDeleteBoard: undefined | ((id:string) => void)
}

export default function Board({
  id,
  title,
  tasks,
  onAddTask,
  onUpdateTitle,
  isOver: isColumnOver = false,
  onDeleteBoard,
}: BoardProps) {
  const [taskTitle, setTaskTitle] = useState<string>("")
  const [isInputFocused, setIsInputFocused] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [newColumnTitle, setNewColumnTitle] = useState(title)

  // Mejoramos el droppable para mejor feedback visual
  const { setNodeRef, isOver } = useDroppable({
    id,
    data: {
      type: "board",
      accepts: ["task"],
    },
  })

  const handleAddTask = () => {
    onAddTask(taskTitle)
    setTaskTitle("")
  }

  const handleUpdateTitle = () => {
    if (onUpdateTitle && newColumnTitle.trim()) {
      onUpdateTitle(id, newColumnTitle)
      setIsEditModalOpen(false)
    }
  }

  return (
    <div
      ref={setNodeRef}
      className={`
        bg-white dark:bg-neutral-800 rounded-xl min-h-[600px] min-w-[300px] md:min-w-[320px] p-5 flex flex-col
        transition-all duration-200 ease-in-out
        ${isOver ? "ring-2 ring-blue-500/70 dark:ring-blue-400/70 bg-blue-50 dark:bg-blue-900/10" : ""}
        ${isColumnOver ? "ring-2 ring-purple-500/50 dark:ring-purple-400/50 bg-purple-50/50 dark:bg-purple-900/10" : ""}
        ${isInputFocused ? "ring-1 ring-blue-400/30 dark:ring-blue-300/30" : ""}
        shadow-[0_3px_10px_rgb(0,0,0,0.05)] dark:shadow-[0_3px_10px_rgb(0,0,0,0.2)]
      `}
    >
      <div className="flex justify-between items-center relative mb-4 pb-3 border-b border-gray-100 dark:border-neutral-700">
        <h3 className="text-lg font-semibold flex items-center">
          <span className="truncate max-w-[180px]">{title}</span>
          <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-neutral-700 px-2 py-0.5 rounded-full">
            {tasks.length}
          </span>
        </h3>
        <button
          className="hover:bg-gray-100 dark:hover:bg-neutral-700 p-1.5 rounded-md transition-colors"
          onClick={() => setIsEditModalOpen(!isEditModalOpen)}
          aria-label="Column options"
        >
          <Points />
        </button>

        {isEditModalOpen && (
          <div className="absolute z-10 bg-white dark:bg-neutral-800 right-0 top-full mt-1 p-4 rounded-lg border border-gray-200 dark:border-neutral-700 shadow-lg w-[220px] flex flex-col gap-3">
            {onDeleteBoard && (
              <button 
                onClick={() => {
                  onDeleteBoard(id);
                  setIsEditModalOpen(false);
                }}
                className="text-red-600 dark:text-red-400 p-2 rounded-md border border-red-200 dark:border-red-900/50 text-sm font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left"
              >
                Delete Column
              </button>
            )}
            
            <div className="space-y-2">
              <label className="text-gray-700 dark:text-gray-300 text-sm font-medium" htmlFor={`column-title-${id}`}>
                Column Title
              </label>
              <input
                id={`column-title-${id}`}
                type="text"
                value={newColumnTitle}
                onChange={(e) => setNewColumnTitle(e.target.value)}
                className="w-full p-2 rounded-md border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-gray-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/50"
                placeholder="Column name"
              />
            </div>
            
            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-3 py-1.5 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateTitle}
                className="px-3 py-1.5 text-sm bg-blue-500 dark:bg-blue-600 text-white rounded-md hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>

      <div
        className={`
          flex-1 rounded-md transition-all duration-200 ease-in-out overflow-y-auto max-h-[400px] scrollbar-thin
          ${isOver && tasks.length === 0 ? "bg-blue-50 dark:bg-blue-900/10 border-2 border-dashed border-blue-200 dark:border-blue-800/30" : ""}
          ${isOver ? "pt-2 pb-2" : ""}
        `}
      >
        {tasks.length > 0 ? (
          <div className="space-y-3 mb-2 p-0.5">
            {tasks.map((task) => (
              <Task key={task.id} task={task} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-20 text-sm text-gray-400 dark:text-gray-500 italic">
            {isOver ? "Drop task here" : "No tasks yet"}
          </div>
        )}
      </div>

      <form
        className="pt-4 border-t border-gray-100 dark:border-neutral-700 mt-4"
        onSubmit={(e) => {
          e.preventDefault()
          handleAddTask()
        }}
      >
        <input
          onChange={(e) => setTaskTitle(e.target.value)}
          value={taskTitle}
          placeholder="Add a new task..."
          type="text"
          className="w-full p-2.5 rounded-md border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 
            text-gray-800 dark:text-white mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/50 
            placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-all"
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
        />
        <button
          type="submit"
          disabled={!taskTitle.trim()}
          className="w-full bg-gray-100 dark:bg-neutral-700 hover:bg-gray-200 dark:hover:bg-neutral-600 
            rounded-md py-2.5 text-sm font-medium text-gray-800 dark:text-white
            transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add Task
        </button>
      </form>
    </div>
  )
}
