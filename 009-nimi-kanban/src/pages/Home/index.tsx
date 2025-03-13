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
import AddBoard from "../../components/AddBoard"

type TaskType = {
  id: `${string}-${string}-${string}-${string}-${string}`
  title: string
  status: string
  createdAt: number
}

type BoardType = { id: string, title: string }

export default function Home() {
  const [boards, setBoards] = useState<BoardType[]>([
    { id: "board-1", title: "To Do" }
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
  const getBoardStatus = (boardId: string): string => {
    // Buscamos el tablero por su ID
    const board = boards.find(b => b.id === boardId);
    
    // Si no se encuentra el tablero, devolvemos 'todo' como valor predeterminado
    if (!board) return "todo";
    
    // Extraemos el índice del tablero (el número después de 'board-')
    const boardIndex = parseInt(boardId.split('-')[1]);
    
    // Los primeros 3 tableros mantienen sus status predeterminados
    if (boardIndex === 1) return "todo";
    if (boardIndex === 2) return "in-progress";
    if (boardIndex === 3) return "done";
    
    // Para tableros adicionales, creamos un status basado en su título
    // Convertimos el título a minúsculas y reemplazamos espacios con guiones
    return board.title.toLowerCase().replace(/\s+/g, '-');
  }

  // Helper para obtener el ID del tablero a partir del status
  const getBoardIdFromStatus = (status: string): string => {
    // Para los estados predeterminados, usamos los IDs fijos
    if (status === "todo") return "board-1";
    if (status === "in-progress") return "board-2";
    if (status === "done") return "board-3";
    
    // Para estados personalizados, buscamos el tablero correspondiente
    const board = boards.find(b => 
      b.title.toLowerCase().replace(/\s+/g, '-') === status
    );
    
    // Si encontramos el tablero, devolvemos su ID
    if (board) return board.id;
    
    // Si no encontramos un tablero, devolvemos el tablero "To Do" por defecto
    return "board-1";
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

  const handleUpdateColumnTitle = (boardId: string, newTitle: string) => {
    setBoards(boards.map(board => 
      board.id === boardId ? { ...board, title: newTitle } : board
    ));
  };

  // Función completa para añadir un nuevo tablero
  const addBoard = (title: string) => {
    if (!title.trim()) return;
    
    // Crear un nuevo ID para el tablero
    const newBoardId = `board-${boards.length + 1}`;
    
    // Crear un nuevo tablero
    const newBoard: BoardType = {
      id: newBoardId,
      title: title
    };
    
    // Actualizar los tableros
    setBoards(prevBoards => [...prevBoards, newBoard]);
  }

  // Función para eliminar un tablero
  const deleteBoard = (boardId: string) => {
    // Verificar si el tablero tiene tareas
    const boardTasks = tasks.filter(task => getBoardIdFromStatus(task.status) === boardId);
    
    // Si el tablero tiene tareas, moverlas al tablero "To Do"
    if (boardTasks.length > 0) {
      setTasks(prevTasks => 
        prevTasks.map(task => 
          getBoardIdFromStatus(task.status) === boardId 
            ? { ...task, status: "todo" } 
            : task
        )
      );
    }
    
    // Eliminar el tablero
    setBoards(prevBoards => prevBoards.filter(board => board.id !== boardId));
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetectionStrategy}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <main className="min-h-[calc(100vh-64px)] dark:text-white text-gray-800 transition-colors duration-300 ease-in-out">
        <h1 className="pt-16 md:pt-20 text-3xl font-bold text-center mb-10 dark:text-white text-gray-800">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-800 dark:from-purple-200 dark:to-blue-600">
            Kanban Board
          </span>
        </h1>
        
        <div className="flex flex-col md:flex-row gap-6 md:gap-10 px-4 md:px-8 max-w-[1400px] mx-auto">
          <div className="flex-1 overflow-x-auto p-6">
            <div className="flex gap-6 min-w-max pb-4">
              {boards.map((board) => {
                // Filtramos las tareas para este tablero
                const boardTasks = tasks.filter((task) => {
                  const boardStatus = getBoardStatus(board.id);
                  return task.status === boardStatus;
                })

                return (
                  <SortableContext
                    key={board.id}
                    items={boardTasks.map((task) => task.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <Board
                      onUpdateTitle={handleUpdateColumnTitle}
                      id={board.id}
                      title={board.title}
                      tasks={boardTasks}
                      onAddTask={(title) => addTask(title, board.id)}
                      activeTaskId={activeTaskId}
                      isOver={currentContainer === board.id && sourceContainer !== board.id}
                      onDeleteBoard={boards.length > 1 ? () => deleteBoard(board.id) : undefined}
                    />
                  </SortableContext>
                )
              })}
            </div>
          </div>
          
          <div className="md:w-64 mb-6 md:mb-0">
            <AddBoard onAddBoard={addBoard}/>
          </div>
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
