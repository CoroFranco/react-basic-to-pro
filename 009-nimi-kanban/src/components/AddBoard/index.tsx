import { useState } from "react"

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

  if (!isEditing) {
    return (
      <div
        className="bg-white dark:bg-neutral-900 rounded-xl min-h-[600px] dark:shadow-gray-400 min-w-[400px] p-4 flex flex-col shadow-xl items-center justify-center cursor-pointer border-2 border-dashed border-gray-300 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors"
        onClick={() => setIsEditing(true)}
      >
        <div className="flex flex-col items-center">
          <span className="text-5xl mb-3">+</span>
          <span className="text-lg font-medium">Add column</span>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-xl min-h-[600px] dark:shadow-gray-400 min-w-[400px] p-4 flex flex-col shadow-xl">
      <div className="flex justify-between items-center relative mb-4 pb-2 border-b border-gray-100">
        <h3 className="text-lg font-semibold">New Column</h3>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="mb-4">
          <label htmlFor="board-title" className="block text-sm font-medium mb-1">
            Name:
          </label>
          <input
            id="board-title"
            type="text"
            value={newBoardTitle}
            onChange={(e) => setNewBoardTitle(e.target.value)}
            placeholder="Ingrese un nombre..."
            className="w-full p-2 placeholder:text-black/50 dark:placeholder:text-white/50 rounded-md border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
            autoFocus
          />
        </div>

        <div className="mt-auto flex justify-end space-x-2">
          <button
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 rounded-md text-sm bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600"
          >
            Cancel
          </button>
          <button
            onClick={handleAddBoard}
            disabled={!newBoardTitle.trim()}
            className="px-4 py-2 rounded-md text-sm bg-neutral-300 dark:bg-neutral-500 hover:bg-neutral-300/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  )
}

