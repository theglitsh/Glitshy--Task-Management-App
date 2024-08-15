import React from "react";
import { Task } from "../types/task";

interface TaskItemProps {
  task: Task;
  setTaskData: any;
  setEditingTaskId: any;
  setIsModalOpen: any;
  handleDeleteTask: any;
  handleToggleComplete: (taskId: string, completed: boolean) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  setTaskData,
  setEditingTaskId,
  setIsModalOpen,
  handleDeleteTask,
  handleToggleComplete,
}) => {
  // Function to format the date to YYYY-MM-DD for the input field
  const formatDate = (date: Date) => {
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  };

  return (
    <div
      key={task._id}
      className="bg-gray-700 p-6 rounded-lg shadow-lg flex flex-col justify-between"
      style={{ minHeight: "200px" }}
    >
      <div>
        <h3
          className={`text-2xl font-bold mb-2 ${
            task.completed ? "line-through text-gray-400" : ""
          }`}
        >
          {task.title}
        </h3>
        <p className="text-gray-400 mb-4">
          {task.description || "No description provided."}
        </p>
        <p className="text-gray-500 text-sm mb-2">Category: {task.category}</p>
        <p className="text-gray-500 text-sm mb-4">
          Due Date: {new Date(task.dueDate).toLocaleDateString()}
        </p>
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => {
            setTaskData({
              ...task,
              dueDate: formatDate(new Date(task.dueDate)),
            });
            setEditingTaskId(task._id);
            setIsModalOpen(true);
          }}
          className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-4 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => handleDeleteTask(task._id)}
          className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded"
        >
          Delete
        </button>
        <button
          onClick={() => handleToggleComplete(task._id, !task.completed)}
          className={`py-1 px-4 rounded ${
            task.completed ? "bg-gray-500" : "bg-green-500"
          } text-white`}
        >
          {task.completed ? "Mark Incomplete" : "Mark Completed"}
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
