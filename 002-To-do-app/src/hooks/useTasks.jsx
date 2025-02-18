import { useState } from "react";

export default function useTasks(containers) {
  const [inputTask, setInputTask] = useState('');
  const [tasks, setTasks] = useState(
    containers.reduce((acc, container) => ({...acc, [container]: []}), {})
  );

  const handleClick = () => {
    if (inputTask === '') return;
    setTasks(prevTasks => ({
      ...prevTasks,
      'To Do': [...prevTasks['To Do'], { id: Date.now().toString(), content: inputTask }]
    }));
    setInputTask('');
  };

  const handleChange = (e) => {
    setInputTask(e.target.value);
  };

  const moveTask = (taskId, fromContainer, toContainer) => {
    setTasks(prevTasks => {
      const taskToMove = prevTasks[fromContainer].find(task => task.id === taskId);
      return {
        ...prevTasks,
        [fromContainer]: prevTasks[fromContainer].filter(task => task.id !== taskId),
        [toContainer]: [...prevTasks[toContainer], taskToMove]
      };
    });
  };

  return {
    tasks,
    inputTask,
    handleClick,
    handleChange,
    moveTask
  };
}
