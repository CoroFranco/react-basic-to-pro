import { useState } from "react";
import useTasks from "../hooks/useTasks";
import { DndContext } from "@dnd-kit/core";
import List from "./List";
import { Task } from "./Task";

export default function Board() {
  const containers = ['To Do', 'In Progress', 'Completed'];
  const {
    tasks,
    inputTask,
    handleClick,
    handleChange,
    moveTask
  } = useTasks(containers);

  function handleDragEnd(event) {
    const { over, active } = event;
    if (over && active.id !== over.id) {
      const activeContainer = containers.find(container => 
        tasks[container].some(task => task.id === active.id)
      );
      const overContainer = over.id;
      
      if (activeContainer !== overContainer) {
        moveTask(active.id, activeContainer, overContainer);
      }
    }
  }

  return (
    <div className='flex-1 flex flex-col gap-10 p-6 bg-gray-900 text-white'>
      <header className='flex flex-col gap-4'>
        <h1 className='text-3xl font-bold'>My Tasks</h1>
        <div className='flex gap-4'>
          <input 
            value={inputTask} 
            onChange={handleChange} 
            className='flex-1 bg-gray-800 py-2 px-4 rounded-2xl focus:outline-none outline-purple-600 focus:border-purple-600 focus:border-1' 
            type="text" 
          />
          <button 
            onClick={handleClick} 
            className='px-4 py-2 bg-purple-500 rounded-2xl hover:bg-purple-600 hover:opacity-90 hover:cursor-pointer'
          >
            + Add Task
          </button>
        </div>
      </header>
      <main className='grid grid-cols-1 h-screen md:grid-cols-3 gap-6 rounded-xl'>
        <DndContext onDragEnd={handleDragEnd}>          
          {containers.map((container) => (
            <List 
              key={container} 
              title={container} 
              props={{ 
                id: container, 
                children: tasks[container].map(task => (
                  <Task key={task.id} id={task.id}>{task.content}</Task>
                ))
              }} 
            />
          ))}
        </DndContext>
      </main>
    </div>
  );
}
