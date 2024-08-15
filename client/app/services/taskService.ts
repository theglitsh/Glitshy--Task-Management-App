import axios from "axios";
import { Task } from "../types/task";

const API_URL = "http://localhost:5000/tasks";

export const fetchTasks = async (): Promise<Task[]> => {
  const token = localStorage.getItem("token");
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const createTask = async (
  taskData: Omit<Task, "_id">
): Promise<Task> => {
  const token = localStorage.getItem("token");
  const response = await axios.post(API_URL, taskData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateTask = async (
  taskId: string,
  taskData: Partial<Task>
): Promise<Task> => {
  const token = localStorage.getItem("token");
  const response = await axios.put(`${API_URL}/${taskId}`, taskData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteTask = async (taskId: string): Promise<void> => {
  const token = localStorage.getItem("token");
  await axios.delete(`${API_URL}/${taskId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const markTaskAsCompleted = async (
  taskId: string,
  completed: boolean
): Promise<Task> => {
  const token = localStorage.getItem("token");
  const response = await axios.put(
    `${API_URL}/${taskId}/complete`,
    { completed },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
