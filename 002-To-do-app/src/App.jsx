import { useState } from 'react'
import './App.css'

function App() {
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
      if(inProgress.includes(task)) return
      setInProgress((prev) => [...prev, task]);
      setTasks((prev) => prev.filter((t) => t !== task));
    } else if (listType === 'toDo') {
      if(tasks.includes(task)) return
      setTasks((prev) => [...prev, task]);
      setInProgress((prev) => prev.filter((t) => t !== task));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault(); 
  };
  
  return (
    <div className='flex h-screen'>
      <aside className='flex gap-6 p-6 flex-col bg-gray-800 text-white w-64'>
        <h2 className='font-bold text-2xl'>Task-nimi</h2>
        <nav>
          <ul className='flex gap-2 flex-col'>
            <li className=''><a className='px-4 py-2 hover:bg-white hover:text-gray-800 transition-all duration-100 ease-in inline-flex w-full rounded-xl' href="/">+ Boards</a></li>
            <li><a className='px-4 py-2 hover:bg-white hover:text-gray-800 transition-all ease-in inline-flex w-full rounded-xl' href="/">+ Tasks</a></li>
            <li><a className='px-4 py-2 hover:bg-white hover:text-gray-800 transition-all ease-in inline-flex w-full rounded-xl' href="/">+ Settings</a></li>
          </ul>
        </nav>
      </aside>
      <div className='flex-1 flex flex-col gap-10 p-6 bg-gray-900 text-white'>
      <header className='flex flex-col gap-4'>
        <h1 className='text-3xl font-bold'>My Tasks</h1>
        <div className='flex gap-4'>
          <input value={inputTask} onChange={handleChange} className='flex-1 bg-gray-800 py-2 px-4 rounded-2xl focus:outline-none outline-purple-600 focus:border-purple-600 focus:border-1' type="text" />
          <button onClick={handleClick} className='px-4 py-2 bg-purple-500 rounded-2xl hover:bg-purple-600 hover:opacity-90 hover:cursor-pointer'>+ Add Task</button>
        </div>
      </header>
      <main className='grid grid-cols-1 md:grid-cols-3 gap-6 rounded-xl'>
        <section 
        onDragOver={handleDragOver} 
        onDrop={(e) => handleDrop(e, 'toDo')}  
        className='px-6 py-4 bg-gray-800 w-full h-full flex flex-col gap-6'>
          <header className='font-bold text-xl'>
          <h3>To Do</h3>
          </header>
          <footer  className='flex flex-col gap-2'>
            { 
              tasks.map((task, i) => (
                <div draggable onDragStart={(e) => handleDragStart(e, task)} key={i} className='px-4 py-2 bg-gray-600 rounded-sm'>
                <p>{task}</p>
            </div>
              ))
            }

          </footer>
        </section>
        <section
        onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 'inProgress')}
        className='px-6 py-4 bg-gray-800 w-full h-full flex flex-col gap-6'>
          <header className='font-bold text-xl'>
          <h3>In Progress</h3>
          </header>
          <footer  className='flex flex-col gap-2'>
          { 
              inProgress.map((task, i) => (
                <div draggable onDragStart={(e) => handleDragStart(e, task)} key={i} className='px-4 py-2 bg-gray-600 rounded-sm'>
                <p>{task}</p>
            </div>
              ))
            }
          </footer>
        </section>
        
      </main>
      </div>
      
    </div>
  )
}

export default App
