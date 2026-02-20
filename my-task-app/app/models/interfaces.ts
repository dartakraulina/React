export interface Task {
  id: string;
  title: string;
  description: string;
  type: string;
  createdOn: string;
  status: "todo" | "in-progress" | "done";
}
