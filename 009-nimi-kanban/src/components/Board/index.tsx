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
        bg-white dark:bg-neutral-900 rounded-xl min-h-[600px] dark:shadow-gray-400 min-w-[400px] p-4 flex flex-col shadow-md
        ${isOver ? "ring-2 ring-black/70 bg-gray-50" : ""}
        ${isColumnOver ? "ring-2 ring-primary/50 bg-gray-50/50" : ""}
        ${isInputFocused ? "ring-1 ring-primary/30" : ""}
         ease-in-out
      `}
    >
      <div className="flex justify-between items-center relative mb-4 pb-2 border-b border-gray-100">
        <h3 className="text-lg font-semibold">
          {title}
          <span className="ml-2 text-sm font-normal dark:text-gray-300 text-gray-500">({tasks.length})</span>
        </h3>
        <button
          className="hover:bg-gray-100 dark:hover:bg-neutral-700 p-1 rounded-md"
          onClick={() => setIsEditModalOpen(!isEditModalOpen)}
        >
          <Points />
        </button>

        {isEditModalOpen && (
          <div className="absolute z-10 bg-neutral-800 text-white bottom-[-170px] right-0 p-3 font-medium rounded-xl border-white/40 border-1 shadow-lg w-[200px] flex flex-col">
            <label className="text-red-700 p-2 rounded-md border text-sm "  htmlFor="">Delete</label>
            <label className="text-white/50" htmlFor="">Change title</label>
            <input
              type="text"
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              className="w-full p-2 mb-2 rounded-md border border-neutral-600 bg-neutral-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Column name"
            />
            <div className="flex justify-between">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-3 py-1 text-sm rounded-md hover:bg-neutral-700"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateTitle}
                className="px-3 py-1 text-sm bg-primary rounded-md hover:bg-primary/90"
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>

      <div
        className={`
        flex-1 rounded-md transition-colors ease-in-out
        ${isOver && tasks.length === 0 ? "bg-primary/5 border-2 border-dashed border-primary/20" : ""}
        ${isOver ? "pt-2 pb-2" : ""}
      `}
      >
        {tasks.length > 0 ? (
          <div className="space-y-2 mb-2">
            {tasks.map((task) => (
              <Task key={task.id} task={task} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-16 text-sm text-gray-400 italic">
            {isOver ? "Drop here" : "No tasks yet"}
          </div>
        )}
      </div>

      <form
        className="pt-3 border-t border-gray-100 mt-3"
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
          className="w-full p-2 placeholder:text-black/50 dark:placeholder:text-white/50 rounded-md border border-gray-200 mb-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow "
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
        />
        <button
          type="submit"
          disabled={!taskTitle.trim()}
          className="w-full bg-neutral-300 dark:bg-neutral-500 rounded-md py-2 text-sm font-medium 
            hover:bg-neutral-300/90 disabled:opacity-50 disabled:cursor-grab"
        >
          Add Task
        </button>
      </form>
    </div>
  )
}

