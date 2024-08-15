export interface Task {
  _id: string;
  title: string;
  description: string;
  category: string;
  dueDate: string;
  user: string;
  completed: boolean;
}
