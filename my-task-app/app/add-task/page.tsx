"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import toDoService from "../shared/services/toDoService";
import { Task } from "../models/interfaces";

type FormInputs = {
  title: Task["title"];
  description: Task["description"];
  type: Task["type"];
  status: Task["status"];
};

export default function AddTask() {
  const router = useRouter();

  // Use form inicializācija: atgriež objektu ar funkcijām formas pārvaldībai.
  const {
    register, //funkcija HTML ievades lauku sasaistei ar bibliotēkas stāvokli un validāciju.
    handleSubmit, //apstrādā pogas nospiešanu, veic validāciju un aptur lapas pārlādi.
    formState: { errors }, //objekts formState iekšienē, kurā glabājas validācijas kļūdas
  } = useForm<FormInputs>();

  // Iesniegšana notiek tikai tad, ja nav validācijas kļūdu. Data mainīgajā automatiski uzrādas visas formā ierakstītās vērtības
  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    const tasks = toDoService.getAllToDos();
    const maxId =
      tasks.length > 0 ? Math.max(...tasks.map((t) => Number(t.id))) : 0;

    const newTask: Task = {
      id: (maxId + 1).toString(),
      title: data.title, // Dati nāk pa tiešo no argumenta (data)
      description: data.description,
      type: data.type,
      status: data.status,
      createdOn: new Date().toISOString(),
    };

    toDoService.addToDo(newTask);
    router.push("/");
  };
  return (
    <div className="p-10">
      {/* handleSubmit ir onSumbit funkcija. To nospiežot
      notiek iekšējā validācija. Ja kļūdu nav , tad dati tiek padoti
      uz onSubmit*/}
      <form onSubmit={handleSubmit(onSubmit)}>
        <button type="button" onClick={() => router.back()}>
          Back
        </button>

        {/* Title Lauks */}
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
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/* Description Lauks */}
        <div>
          <label>Description</label>
          <input
            type="text"
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>

        {/* Type Lauks */}
        <div>
          <label>Type</label>
          <input
            type="text"
            {...register("type", { required: "Type is required" })}
          />
          {errors.type && <p className="text-red-500">{errors.type.message}</p>}
        </div>

        {/* Status Lauks */}
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
