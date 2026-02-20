// app/edit-task/[id]/page.tsx
"use client";
import { FormEvent } from "react";
import { useRouter, useParams } from "next/navigation";
import toDoService from "../../shared/services/toDoService";
import { Task } from "@/app/models/interfaces";

export default function EditTaskPage() {
  const router = useRouter();
  const params = useParams();
  const taskId = params.id as string;

  const allTasks = toDoService.getAllToDos();
  const currentTask = allTasks.find((task) => task.id === taskId);

  const Submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const title = formData.get("title") as Task["title"];
    const description = formData.get("description") as Task["description"];
    const type = formData.get("type") as Task["type"];
    const status = formData.get("status") as Task["status"];

    toDoService.updateTask(taskId, {
      title,
      description,
      type,
      status,
    });
    router.push("/");
  };

  if (!currentTask) {
    return <div>Uzdevums netika atrasts!</div>;
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Rediģēt uzdevumu</h1>
      <p>
        <strong>{taskId}</strong>
      </p>
      <form onSubmit={Submit}>
        <button>Back</button>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={currentTask.title}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            defaultValue={currentTask.description}
            required
          />
        </div>
        <div>
          <label htmlFor="type">Type</label>
          <input
            type="text"
            id="type"
            name="type"
            defaultValue={currentTask.type}
            required
          />
        </div>

        <div>
          <label htmlFor="status">Status</label>
          <select name="status" id="status" defaultValue={currentTask.status}>
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <button>Submit</button>
      </form>
    </div>
  );
}
