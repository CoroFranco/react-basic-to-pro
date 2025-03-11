"use client"

import { useState } from "react"
import { useDroppable } from "@dnd-kit/core"
import { Points } from "../Icons"
import Task from "../Task"


export interface TaskType {
  id: `${string}-${string}-${string}-${string}-${string}`
  title: string
  status: "todo" | "in-progress" | "done"
  createdAt: number
}

interface BoardProps {
  id: string
  title: string
  tasks: TaskType[]
  onAddTask: (title: string) => void
  activeTaskId: string | null
  isOver?: boolean
}

export default function Board({ id, title, tasks, onAddTask, activeTaskId, isOver: isColumnOver = false }: BoardProps) {
  const [taskTitle, setTaskTitle] = useState<string>("")
  const [isInputFocused, setIsInputFocused] = useState(false)

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

  return (
    <div
      ref={setNodeRef}
      className={`
        bg-white rounded-xl min-h-[600px] w-[300px] p-4 flex flex-col shadow-md
        ${isOver ? "ring-2 ring-primary/70 bg-gray-50 scale-[1.02]" : ""}
        ${isColumnOver ? "ring-2 ring-primary/50 bg-gray-50/50" : ""}
        ${isInputFocused ? "ring-1 ring-primary/30" : ""}
        transition-all duration-200 ease-in-out
      `}
    >
      <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
        <h3 className="text-lg font-semibold">
          {title}
          <span className="ml-2 text-sm font-normal text-gray-500">({tasks.length})</span>
        </h3>
        <button className="hover:bg-gray-100 p-1 rounded-md transition-all duration-300">
          <Points />
        </button>
      </div>

      <div
        className={`
        flex-1 rounded-md transition-colors duration-300 ease-in-out
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
          className="w-full p-2 rounded-md border border-gray-200 mb-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow duration-200"
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
        />
        <button
          type="submit"
          disabled={!taskTitle.trim()}
          className="w-full bg-primary text-primary-foreground rounded-md py-2 text-sm font-medium 
            hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add Task
        </button>
      </form>
    </div>
  )
}

