import type React from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { TaskType } from "../Board"
  

interface TaskProps {
  task: TaskType
  isDragging?: boolean
}

const Task: React.FC<TaskProps> = ({ task, isDragging = false }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "task",
      task,
    },
  })

  // Mejoramos los estilos para una mejor experiencia visual
  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || "transform 200ms ease, opacity 200ms ease",
    opacity: isSortableDragging ? 0.2 : 1, // Cambiamos a 0.2 para que sea visible pero tenue
    zIndex: isDragging ? 999 : "auto",
    position: isDragging ? "relative" : ("static" as any),
    backgroundColor: isDragging ? "#f3f4f6" : "white",
    boxShadow: isDragging
      ? "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
      : isSortableDragging
        ? "none"
        : "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        p-3 mb-2 bg-white rounded-md border border-gray-200 cursor-grab
        ${isDragging ? "scale-105" : ""}
        ${isSortableDragging ? "opacity-20" : ""}
        transition-all duration-200 ease-in-out
      `}
    >
      <h3 className="font-medium">{task.title}</h3>
      <p className="text-xs text-gray-500 mt-1">{new Date(task.createdAt).toLocaleDateString()}</p>
    </div>
  )
}

export default Task

