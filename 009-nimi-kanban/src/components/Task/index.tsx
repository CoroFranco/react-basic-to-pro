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

  // Enhanced styles for better visual experience
  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || "transform 150ms cubic-bezier(0.4, 0, 0.2, 1), opacity 150ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1)",
    opacity: isSortableDragging ? 0.3 : 1,
    zIndex: isDragging ? 999 : "auto",
    position: isDragging ? "relative" : ("static" as any),
    boxShadow: isDragging
      ? "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      : isSortableDragging
        ? "none"
        : "0 1px 3px 0 rgba(0, 0, 0, 0.05)",
  }

  // Format the date in a more readable way
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    // If it's today
    if (date.toDateString() === today.toDateString()) {
      return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    // If it's yesterday
    if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    // Otherwise show the full date
    return date.toLocaleDateString(undefined, { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        p-3.5 bg-white dark:bg-neutral-700 rounded-lg border border-gray-100 dark:border-neutral-600
        hover:border-gray-200 dark:hover:border-neutral-500 cursor-grab active:cursor-grabbing
        group transition-colors duration-200
        ${isDragging ? "scale-105 rotate-1 cursor-grabbing shadow-xl" : ""}
        ${isSortableDragging ? "opacity-30" : ""}
      `}
    >
      <div className="flex flex-col gap-2">
        <h3 className="font-medium text-gray-800 dark:text-gray-100 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
          {task.title}
        </h3>
        
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
            {formatDate(task.createdAt)}
          </p>
          
          <div className="h-1.5 w-1.5 rounded-full bg-blue-500 dark:bg-blue-400 opacity-70"></div>
        </div>
      </div>
    </div>
  )
}

export default Task
