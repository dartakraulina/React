"use client";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import toDoService from "../shared/services/toDoService";
import { Task } from "../models/interfaces";

export default function AddTask() {
  const router = useRouter();

  const Submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const title = formData.get("title") as Task["title"];
    const description = formData.get("description") as Task["description"];
    const type = formData.get("type") as Task["type"];
    const status = formData.get("status") as Task["status"];

    const tasks = toDoService.getAllToDos();
    const maxId =
      tasks.length > 0 ? Math.max(...tasks.map((task) => Number(task.id))) : 0;
    const nextId = maxId + 1;

    const newTask: Task = {
      id: nextId.toString(),
      title,
      description,
      type,
      status,
      createdOn: new Date().toISOString(),
    };

    toDoService.addToDo(newTask);

    console.log(newTask);
    router.push("/");
  };
  return (
    <div className="p-10">
      <form onSubmit={Submit}>
        <button>Back</button>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" required />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input type="text" id="description" name="description" required />
        </div>
        <div>
          <label htmlFor="type">Type</label>
          <input type="text" id="type" name="type" required />
        </div>

        <div>
          <label htmlFor="status">Status</label>
          <select name="status" id="status">
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <button>Submit</button>
      </form>
    </div>
  );
  /*
  title: string;
  description: string;
  type: string;
  createdOn: string;
  status: "todo" | "in-progress" | "done";
*/
}
