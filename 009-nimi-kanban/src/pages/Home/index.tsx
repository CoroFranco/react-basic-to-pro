"use client"

import {
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
  PointerSensor,
  type UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { rectIntersection, pointerWithin } from "@dnd-kit/core"
import { DragOverlay } from "@dnd-kit/core"
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable"
import { useState } from "react"

import { KeyboardSensor } from "@dnd-kit/core"
import Board from "../../components/Board"
import Task from "../../components/Task"

type TaskType = {
  id: `${string}-${string}-${string}-${string}-${string}`
  title: string
  status: "todo" | "in-progress" | "done"
  createdAt: number
}

export default function Home() {
  const [boards, setBoards] = useState([
    { id: "board-1", title: "To Do" },
    { id: "board-2", title: "In Progress" },
    { id: "board-3", title: "Done" },
  ])

  const [tasks, setTasks] = useState<TaskType[]>([])
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null)
  const [activeTask, setActiveTask] = useState<TaskType | null>(null)
  // Añadimos un estado para rastrear el contenedor de origen
  const [sourceContainer, setSourceContainer] = useState<UniqueIdentifier | null>(null)
  // Añadimos un estado para rastrear el contenedor actual durante el arrastre
  const [currentContainer, setCurrentContainer] = useState<UniqueIdentifier | null>(null)

  // Sensores mejorados para una experiencia más natural
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3, // Reducido para una activación más sensible
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates, // Mejor soporte para teclado
    }),
  )

  // Función mejorada para detectar colisiones
  const collisionDetectionStrategy = (args: any) => {
    // Primero verificamos si hay una colisión directa con un elemento
    const pointerCollisions = pointerWithin(args)

    if (pointerCollisions.length > 0) {
      // Si hay colisiones, devolvemos la primera
      return pointerCollisions
    }

    // Si no hay colisiones directas, verificamos intersecciones de rectángulos
    const intersections = rectIntersection(args)

    // Si hay intersecciones, devolvemos la primera
    return intersections
  }

  // Manejador de inicio de arrastre mejorado
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const activeId = active.id as string

    // Guardamos el ID de la tarea activa
    setActiveTaskId(activeId)

    // Guardamos la tarea completa para el overlay
    const task = tasks.find((t) => t.id === activeId)
    if (task) {
      setActiveTask(task)

      // Guardamos el contenedor de origen (el status actual de la tarea)
      const boardId = getBoardIdFromStatus(task.status)
      setSourceContainer(boardId)
      setCurrentContainer(boardId)
    }
  }

  // Nuevo manejador para el evento onDragOver
  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event

    if (!over || !active) return

    const activeId = active.id
    const overId = over.id

    // Obtenemos la tarea activa
    const activeTask = tasks.find((t) => t.id === activeId)
    if (!activeTask) return

    // Si estamos sobre una tarea
    if (over.data.current?.type === "task") {
      const overTask = tasks.find((t) => t.id === overId)
      if (!overTask) return

      // Si la tarea activa y la tarea sobre la que estamos tienen diferentes status
      if (activeTask.status !== overTask.status) {
        // Actualizamos el contenedor actual
        const newBoardId = getBoardIdFromStatus(overTask.status)

        // Solo actualizamos si el contenedor ha cambiado
        if (currentContainer !== newBoardId) {
          setCurrentContainer(newBoardId)
        }

        // Actualizamos temporalmente el status de la tarea activa para la animación
        setTasks((tasks) => {
          return tasks.map((task) => (task.id === activeId ? { ...task, status: overTask.status } : task))
        })
      }
    }
    // Si estamos sobre un tablero
    else if (over.data.current?.type === "board") {
      const boardId = overId as string
      const newStatus = getBoardStatus(boardId)

      // Solo actualizamos si el status ha cambiado
      if (activeTask.status !== newStatus) {
        // Actualizamos el contenedor actual
        if (currentContainer !== boardId) {
          setCurrentContainer(boardId)
        }

        // Actualizamos temporalmente el status de la tarea activa para la animación
        setTasks((tasks) => {
          return tasks.map((task) => (task.id === activeId ? { ...task, status: newStatus } : task))
        })
      }
    }
  }

  // Manejador de fin de arrastre mejorado
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    // Reseteamos los estados activos
    setActiveTaskId(null)
    setActiveTask(null)
    setSourceContainer(null)
    setCurrentContainer(null)

    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    // Si el elemento sobre el que soltamos es una tarea
    if (over.data.current?.type === "task") {
      const activeTask = tasks.find((t) => t.id === activeId)
      const overTask = tasks.find((t) => t.id === overId)

      if (!activeTask || !overTask) return

      // Si estamos moviendo entre diferentes columnas
      if (activeTask.status !== overTask.status) {
        setTasks((tasks) => {
          const activeIndex = tasks.findIndex((t) => t.id === activeId)
          const overIndex = tasks.findIndex((t) => t.id === overId)

          // Primero actualizamos el status de la tarea activa
          const updatedTasks = [...tasks]
          updatedTasks[activeIndex] = {
            ...updatedTasks[activeIndex],
            status: overTask.status,
          }

          // Luego reordenamos las tareas para mantener la animación
          return arrayMove(updatedTasks, activeIndex, overIndex)
        })
      }
      // Si estamos reordenando dentro de la misma columna
      else {
        setTasks((tasks) => {
          const oldIndex = tasks.findIndex((t) => t.id === activeId)
          const newIndex = tasks.findIndex((t) => t.id === overId)

          return arrayMove(tasks, oldIndex, newIndex)
        })
      }
    }

    // Si el elemento sobre el que soltamos es un tablero
    else if (over.data.current?.type === "board") {
      const boardId = overId
      const status = getBoardStatus(boardId)
      const activeTask = tasks.find((t) => t.id === activeId)

      if (!activeTask) return

      // Si el status es diferente, actualizamos la tarea
      if (activeTask.status !== status) {
        setTasks((tasks) => {
          // Encontramos todas las tareas en el tablero de destino
          const tasksInTargetBoard = tasks.filter((t) => t.status === status)

          // Creamos una nueva lista sin la tarea activa
          const tasksWithoutActive = tasks.filter((t) => t.id !== activeId)

          // Creamos la tarea actualizada
          const updatedTask = { ...activeTask, status }

          // Añadimos la tarea al principio del tablero de destino
          return [...tasksWithoutActive, updatedTask].sort((a, b) => {
            // Mantenemos el orden original, pero movemos la tarea actualizada al principio de su nuevo tablero
            if (a.id === activeId) return -1
            if (b.id === activeId) return 1
            if (a.status !== b.status) return 0
            return 0
          })
        })
      }
    }
  }

  // Helper para obtener el status a partir del ID del tablero
  const getBoardStatus = (boardId: string): "todo" | "in-progress" | "done" => {
    switch (boardId) {
      case "board-1":
        return "todo"
      case "board-2":
        return "in-progress"
      case "board-3":
        return "done"
      default:
        return "todo"
    }
  }

  // Helper para obtener el ID del tablero a partir del status
  const getBoardIdFromStatus = (status: "todo" | "in-progress" | "done"): string => {
    switch (status) {
      case "todo":
        return "board-1"
      case "in-progress":
        return "board-2"
      case "done":
        return "board-3"
      default:
        return "board-1"
    }
  }

  // Añadir una nueva tarea a un tablero específico
  const addTask = (title: string, boardId: string) => {
    if (!title.trim()) return

    const newTask: TaskType = {
      id: crypto.randomUUID() as `${string}-${string}-${string}-${string}-${string}`,
      title,
      status: getBoardStatus(boardId),
      createdAt: Date.now(),
    }

    setTasks((prevTasks) => [...prevTasks, newTask])
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetectionStrategy}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <main className="min-h-screen bg-gray-50">
        <h1 className="pt-[90px] text-3xl font-bold text-center mb-8">Kanban Board</h1>

        <div className="flex justify-center gap-6 px-4 pb-10">
          {boards.map((board) => {
            // Filtramos las tareas para este tablero
            const boardTasks = tasks.filter((task) => {
              if (board.id === "board-1") return task.status === "todo"
              if (board.id === "board-2") return task.status === "in-progress"
              if (board.id === "board-3") return task.status === "done"
              return false
            })

            return (
              <SortableContext
                key={board.id}
                items={boardTasks.map((task) => task.id)}
                strategy={verticalListSortingStrategy}
              >
                <Board
                  id={board.id}
                  title={board.title}
                  tasks={boardTasks}
                  onAddTask={(title) => addTask(title, board.id)}
                  activeTaskId={activeTaskId}
                  isOver={currentContainer === board.id && sourceContainer !== board.id}
                />
              </SortableContext>
            )
          })}
        </div>

        {/* DragOverlay mejorado para animaciones más suaves */}
        <DragOverlay
          dropAnimation={{
            duration: 300,
            easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)",
          }}
        >
          {activeTask ? <Task task={activeTask} isDragging={true} /> : null}
        </DragOverlay>
      </main>
    </DndContext>
  )
}

