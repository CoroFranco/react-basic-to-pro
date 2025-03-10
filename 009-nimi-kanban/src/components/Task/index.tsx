import { useSortable } from "@dnd-kit/sortable";
import { TaskType } from "../Board";
import { CSS } from '@dnd-kit/utilities';

interface TaskProps {
  task: TaskType
}

export default function Task ({task}: TaskProps){
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white p-3 rounded-md shadow-sm cursor-grab active:cursor-grabbing mb-2 hover:shadow-md transition-shadow"
    >
      <h4 className="font-medium">{task.title}</h4>
      <div className="flex justify-between text-xs text-gray-500 mt-2">
        <span>{new Date(task.createdAt).toLocaleDateString()}</span>
        <span className={`px-2 py-1 rounded-full ${
          task.status === "todo" ? "bg-gray-100" : 
          task.status === "in-progress" ? "bg-blue-100 text-blue-800" : 
          "bg-green-100 text-green-800"
        }`}>
          {task.status}
        </span>
      </div>
      <div className="mt-2 text-xs text-gray-400">
        Arrastra para reordenar
      </div>
    </div>
  );
};

