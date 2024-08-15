import React from "react";
import TaskItem from "./TaskItem";
import { Task } from "../types/task";

interface TaskListProps {
  tasks: Task[];
  setTaskData: any;
  setEditingTaskId: any;
  setIsModalOpen: any;
  handleDeleteTask: any;
  handleToggleComplete: (taskId: string, completed: boolean) => void;
  showCompleted: boolean;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  setTaskData,
  setEditingTaskId,
  setIsModalOpen,
  handleDeleteTask,
  handleToggleComplete,
  showCompleted,
}) => {
  if (tasks.length === 0) {
    return (
      <p className="text-white w-100 text-center">
        {showCompleted ? "No completed tasks yet." : "No incomplete tasks yet."}
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          setTaskData={setTaskData}
          setEditingTaskId={setEditingTaskId}
          setIsModalOpen={setIsModalOpen}
          handleDeleteTask={handleDeleteTask}
          handleToggleComplete={handleToggleComplete}
        />
      ))}
    </div>
  );
};

export default TaskList;
