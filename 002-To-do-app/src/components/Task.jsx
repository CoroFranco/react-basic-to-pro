import React from 'react';
import {useDraggable} from '@dnd-kit/core';

export function Task(props) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: props.id,
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  
  return (
    <div className='bg-gray-400 w-full px-2 py-2 rounded-lg hover:cursor-grab' ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <h3>{props.children}</h3>
      <p>{props.id}</p>
    </div>
  );
}
