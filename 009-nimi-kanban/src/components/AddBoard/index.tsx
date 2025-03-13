import { useState } from "react"
import { Plus } from 'lucide-react' // Assuming you have lucide-react for icons

interface AddBoardProps {
  onAddBoard: (title: string) => void
}

export default function AddBoard({ onAddBoard }: AddBoardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [newBoardTitle, setNewBoardTitle] = useState("")

  const handleAddBoard = () => {
    if (newBoardTitle.trim()) {
      onAddBoard(newBoardTitle)
      setNewBoardTitle("")
      setIsEditing(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddBoard()
    } else if (e.key === 'Escape') {
      setIsEditing(false)
    }
  }

  if (!isEditing) {
    return (
      <div
        className="bg-white/50 dark:bg-neutral-800/50 rounded-xl min-h-[200px] md:min-h-[250px] w-full p-4 
          flex flex-col items-center justify-center cursor-pointer 
          border-2 border-dashed border-gray-300 dark:border-neutral-700 
          hover:bg-gray-50 dark:hover:bg-neutral-700 hover:border-gray-400 dark:hover:border-neutral-600
          transition-all duration-200 ease-in-out group"
        onClick={() => setIsEditing(true)}
        role="button"
        aria-label="Add new column"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setIsEditing(true)}
      >
        <div className="flex flex-col items-center gap-3 transform group-hover:scale-105 transition-transform duration-200">
          <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center
            group-hover:bg-blue-200 dark:group-hover:bg-blue-800/40 transition-colors">
            <Plus className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <span className="text-lg font-medium text-gray-800 dark:text-gray-200">Add Column</span>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-[200px]">
            Create a new column to organize your tasks
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl w-full p-5 flex flex-col
      shadow-[0_3px_10px_rgb(0,0,0,0.05)] dark:shadow-[0_3px_10px_rgb(0,0,0,0.2)]
      border border-gray-100 dark:border-neutral-700 transition-all duration-200">
      <div className="flex justify-between items-center relative mb-5 pb-3 border-b border-gray-100 dark:border-neutral-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">New Column</h3>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="mb-6">
          <label htmlFor="board-title" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Column Name
          </label>
          <input
            id="board-title"
            type="text"
            value={newBoardTitle}
            onChange={(e) => setNewBoardTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter column name..."
            className="w-full p-2.5 rounded-md border border-gray-200 dark:border-neutral-700 
              bg-white dark:bg-neutral-900 text-gray-800 dark:text-white
              placeholder:text-gray-400 dark:placeholder:text-gray-500
              focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/50
              transition-all"
            autoFocus
          />
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Give your column a clear name to identify its purpose
          </p>
        </div>

        <div className="mt-auto flex justify-end space-x-3">
          <button
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300
              bg-gray-100 dark:bg-neutral-700 
              hover:bg-gray-200 dark:hover:bg-neutral-600
              focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500
              transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAddBoard}
            disabled={!newBoardTitle.trim()}
            className="px-4 py-2 rounded-md text-sm font-medium text-white
              bg-blue-500 dark:bg-blue-600
              hover:bg-blue-600 dark:hover:bg-blue-700
              disabled:opacity-50 disabled:cursor-not-allowed
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-800
              transition-colors"
          >
            Add Column
          </button>
        </div>
      </div>
    </div>
  )
}
