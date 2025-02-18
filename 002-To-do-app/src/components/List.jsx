import React from 'react';
import {useDroppable} from '@dnd-kit/core';
import useTasks from "../hooks/useTasks";

export default function List ({props, title}) {
  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
  });
  return (
    <section 
    className='px-6 py-4 bg-gray-800 w-full flex flex-col gap-6'>
      <header className='font-bold text-xl'>
      <h3>{title}</h3>
      </header>
      <footer ref={setNodeRef}  className='h-full w-full'>       
        <div  className={`rounded-sm flex flex-col gap-2`} style={{ filter: 'none !important' }}>
              {props.children}
        </div>
      </footer>
    </section>
  )
}
