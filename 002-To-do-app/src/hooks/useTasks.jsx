import { useState } from "react"

export default function useTasks () {
  const [inputTask, setInputTask] = useState('')
  const [tasks, setTasks] = useState([])
  const [inProgress, setInProgress] = useState([])

  const handleClick = () => {
    if(inputTask === '') return
    setTasks(prevTasks => [...prevTasks, inputTask])
    setInputTask('')
    console.log(tasks)
  }

  const handleChange = (e) => {
    const newTask = e.target.value
    setInputTask(newTask)
  }
  
  const handleDragStart = (e, task) => {
    e.dataTransfer.setData('task', JSON.stringify(task))
  }

  const handleDrop = (e, listType) => {
    e.preventDefault();
    const task = JSON.parse(e.dataTransfer.getData("task")); // Extraemos la tarea
    if (listType === 'inProgress') {
      setInProgress((prev) => [...prev, task]);
      setTasks((prev) => prev.filter((t) => t !== task));
    } else if (listType === 'toDo') {
      setTasks((prev) => [...prev, task]);
      setInProgress((prev) => prev.filter((t) => t !== task));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault(); 
  };

  return {tasks, inProgress, handleClick, handleChange, handleDragStart, handleDrop, handleDragOver}
}
