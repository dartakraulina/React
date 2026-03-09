"use client";
import { useRouter, useParams } from "next/navigation";
import toDoService from "../../shared/services/toDoService";
import { Task } from "@/app/models/interfaces";
import { useForm, SubmitHandler } from "react-hook-form";

type FormInputs = {
  title: Task["title"];
  description: Task["description"];
  type: Task["type"];
  status: Task["status"];
};

export default function EditTaskPage() {
  const router = useRouter();
  const params = useParams();
  const taskId = params.id as string;

  const allTasks = toDoService.getAllToDos();
  const currentTask = allTasks.find((task) => task.id === taskId);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      title: currentTask?.title,
      description: currentTask?.description,
      type: currentTask?.type,
      status: currentTask?.status,
    },
  });

  if (!currentTask) {
    return <div>Uzdevums netika atrasts!</div>;
  }

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    toDoService.updateTask(taskId, {
      title: data.title,
      description: data.description,
      type: data.type,
      status: data.status,
    });
    router.push("/");
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Rediģēt uzdevumu</h1>
      <p>
        <strong>{taskId}</strong>
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <button type="button" onClick={() => router.back()}>
          Back
        </button>
        <div>
          <label>Title</label>
          <input
            type="text"
            {...register("title", {
              required: "Title is required",
              minLength: { value: 3, message: "Must be at least 3 chars" },
            })}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label>Description</label>
          <input
            type="text"
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <label>Type</label>
          <input
            type="text"
            {...register("type", { required: "Type is required" })}
          />
          {errors.type && (
            <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
          )}
        </div>

        <div>
          <label>Status</label>
          <select {...register("status")}>
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
