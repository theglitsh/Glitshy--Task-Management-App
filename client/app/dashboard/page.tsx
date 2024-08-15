"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import TaskList from "../components/TaskList";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
  markTaskAsCompleted,
} from "../services/taskService";
import { Task } from "../types/task";
import DashboardModal from "./DashboardModal";
import useAuthCheck from "../hooks/useAuthCheck";

const Dashboard = () => {
  const { logout } = useAuthCheck();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskData, setTaskData] = useState<any>({
    title: "",
    description: "",
    category: "",
    dueDate: "",
  });
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState("");
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    const fetchUserTasks = async () => {
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks);
    };
    fetchUserTasks();
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTaskId) {
      await updateTask(editingTaskId, taskData);
    } else {
      await createTask(taskData);
    }
    setIsModalOpen(false);
    setTaskData({ title: "", description: "", category: "", dueDate: "" });
    const fetchedTasks = await fetchTasks();
    setTasks(fetchedTasks);
  };

  const handleDeleteTask = async (taskId: string) => {
    await deleteTask(taskId);
    const fetchedTasks = await fetchTasks();
    setTasks(fetchedTasks);
  };

  const handleToggleComplete = async (taskId: string, completed: boolean) => {
    await markTaskAsCompleted(taskId, completed);
    const fetchedTasks = await fetchTasks();
    setTasks(fetchedTasks);
  };

  // Sorting logic
  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortOption === "category") {
      return a.category.localeCompare(b.category);
    } else if (sortOption === "dueDate") {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    return 0;
  });

  return (
    <>
      <Navbar logout={logout} />
      <div className="container mx-auto p-4">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-white mb-4 sm:mb-0">
            Dashboard
          </h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            Add New Task
          </button>
        </div>

        <div className="flex flex-col sm:flex-row justify-between mb-6">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="bg-gray-800 text-white p-2 rounded-lg mb-4 sm:mb-0 sm:mr-4"
          >
            <option value="">Sort by</option>
            <option value="category">Category</option>
            <option value="dueDate">Due Date</option>
          </select>
          <button
            onClick={() => setShowCompleted(!showCompleted)}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            {showCompleted ? "Show Incomplete Tasks" : "Show Completed Tasks"}
          </button>
        </div>

        <TaskList
          tasks={sortedTasks.filter((task) => task.completed === showCompleted)}
          setTaskData={setTaskData}
          setEditingTaskId={setEditingTaskId}
          setIsModalOpen={setIsModalOpen}
          handleDeleteTask={handleDeleteTask}
          handleToggleComplete={handleToggleComplete}
          showCompleted={showCompleted}
        />

        <DashboardModal
          editingTaskId={editingTaskId}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          handleFormSubmit={handleFormSubmit}
          setTaskData={setTaskData}
          taskData={taskData}
        />
      </div>
    </>
  );
};

export default Dashboard;
