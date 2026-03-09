"use client";
import Link from "next/link";
import { useState } from "react";
import toDoService from "../../services/toDoService";

export default function TaskList() {
  const [tasks, setTasks] = useState(toDoService.getAllToDos());

  const deleteTask = (id: string) => {
    toDoService.deleteTask(id);
    setTasks([...toDoService.getAllToDos()]);
  };

  const secondTodo = toDoService.getToDo("2");
  console.log(secondTodo);

  return (
    <div className="flex flex-col gap-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="border p-4 shadow rounded flex justify-between items-center"
        >
          <div>
            <strong>{task.title}</strong>
            <p>{task.status}</p>
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => deleteTask(task.id)}
              className="bg-red-500 text-white px-2 py-1 rounded text-sm"
            >
              Delete
            </button>
            <Link
              href={`/edit-task/${task.id}`}
              className="bg-blue-500 text-white px-2 py-1 rounded text-sm text-center"
            >
              Edit
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
