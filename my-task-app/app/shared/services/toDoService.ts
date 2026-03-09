import { Task } from "@/app/models/interfaces";

const taskList: Task[] = [
  {
    id: "1",
    title: "Iemācīties React pamatus",
    description: "Iziet cauri dokumentācijai un saprast komponentes.",
    type: "Mācības",
    createdOn: "2023-10-01T00:00:00.000Z",
    status: "done",
  },
  {
    id: "2",
    title: "Uztaisīt Task List aplikāciju",
    description: "Izveidot sarakstu, pievienošanu un dzēšanu.",
    type: "Projekts",
    createdOn: "2023-10-27T10:00:00.000Z",
    status: "in-progress",
  },
  {
    id: "3",
    title: "Nopirkt pienu",
    description: "Veikalā Rimi ir atlaides.",
    type: "Personīgi",
    createdOn: "2023-10-28T12:00:00.000Z",
    status: "todo",
  },
];
const toDoService = {
  getAllToDos(): Task[] {
    return taskList;
  },
  addToDo(newTask: Task) {
    taskList.push(newTask);
  },
  getToDo(id: string) {
    return taskList.find((item) => item.id === id);
  },
  updateTask(id: string, task: Partial<Task>) {
    const taskIndex = taskList.findIndex((item) => item.id === id);
    const taskToUpdate = taskList[taskIndex];

    delete task.id;

    const newTask = {
      ...taskToUpdate,
      ...task,
    };

    taskList[taskIndex] = newTask;
    return newTask;
  },
  deleteTask(id: string) {
    const taskIndex = taskList.findIndex((item) => item.id === id);

    if (taskIndex === -1) return false;

    taskList.splice(taskIndex, 1);
    return true;
  },
};

export default toDoService;
