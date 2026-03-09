import Link from "next/link";
import TaskList from "./shared/components/taskList/TaskList"; //

export default function Home() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Task List App</h1>
      <TaskList />
      <Link
        href="/add-task"
        className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded"
      >
        Create_Task
      </Link>
    </div>
  );
}
