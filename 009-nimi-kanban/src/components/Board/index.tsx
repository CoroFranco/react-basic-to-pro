import { useState } from "react";
import { Points } from "../Icons";
import Task from "../Task";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove
} from "@dnd-kit/sortable";


export interface TaskType {
  id: `${string}-${string}-${string}-${string}-${string}`;
  title: string;
  status: "todo" | "in-progress" | "done";
  createdAt: number;
}

export default function Board() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [taskTitle, setTaskTitle] = useState<string>("");

  // Configuración de sensores para dnd-kit
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const addTask = () => {
    if (!taskTitle.trim()) return;

    const newTask: TaskType = {
      id: crypto.randomUUID() as `${string}-${string}-${string}-${string}-${string}`,
      title: taskTitle,
      status: "todo",
      createdAt: Date.now(),
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setTaskTitle("");
  };

  // Manejador para cuando termina el arrastre
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;
    
    if (active.id !== over.id) {
      setTasks((tasks) => {
        const oldIndex = tasks.findIndex((task) => task.id === active.id);
        const newIndex = tasks.findIndex((task) => task.id === over.id);
        
        return arrayMove(tasks, oldIndex, newIndex);
      });
    }
  };

  return (
    <section className="flex justify-around gap-6 overflow-x-hidden">
      <div className="bg-black/10 rounded-xl min-h-[800px] w-[300px] p-4 flex flex-col h-full shadow-md">
        <div className="flex justify-between mb-3">
          <h3 className="text-lg font-semibold ">Board 1</h3>
          <button className="hover:bg-black/20 px-2 rounded-md transition-all duration-500">
            <Points />
          </button>
        </div>
        <div className="flex flex-col flex-1 gap-2 overflow-y-auto p-2 overflow-x-hidden">
          <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={tasks.map(task => task.id)}
              strategy={verticalListSortingStrategy}
            >
              {tasks.map((task) => (
                <Task key={task.id} task={task} />
              ))}
            </SortableContext>
          </DndContext>
        </div>
        <form
          className="pt-4 border-t border-black/10 mt-2 px-2"
          onSubmit={(e) => {
            e.preventDefault();
            addTask();
          }}
        >
          <input
            onChange={(e) => setTaskTitle(e.target.value)}
            value={taskTitle}
            placeholder="Create, update task..."
            type="text"
            className="w-full p-2 rounded-md border border-gray-300 mb-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <button className="w-full bg-primary text-primary-foreground rounded-md py-2 text-sm font-medium hover:bg-primary/90 transition-colors">
            Add Task
          </button>
        </form>
      </div>
    </section>
  );
}
