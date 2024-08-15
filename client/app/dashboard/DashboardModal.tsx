import React from "react";
import Modal from "../components/Modal";

interface DashboardModalProps {
  isModalOpen: any;
  editingTaskId: any;
  handleFormSubmit: any;
  taskData: any;
  setTaskData: any;
  setIsModalOpen: any;
}

const DashboardModal = ({
  isModalOpen,
  editingTaskId,
  handleFormSubmit,
  taskData,
  setTaskData,
  setIsModalOpen,
}: DashboardModalProps) => {
  return (
    <Modal isOpen={isModalOpen}>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-4">
          {editingTaskId ? "Edit Task" : "Add New Task"}
        </h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-300"
            >
              Task Title:
            </label>
            <input
              type="text"
              name="title"
              value={taskData.title}
              onChange={(e) =>
                setTaskData({ ...taskData, title: e.target.value })
              }
              required
              className="mt-1 px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg w-full"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-300"
            >
              Task Description:
            </label>
            <textarea
              name="description"
              value={taskData.description}
              onChange={(e) =>
                setTaskData({ ...taskData, description: e.target.value })
              }
              className="mt-1 px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg w-full"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-300"
            >
              Task Category:
            </label>
            <input
              type="text"
              name="category"
              value={taskData.category}
              onChange={(e) =>
                setTaskData({ ...taskData, category: e.target.value })
              }
              required
              className="mt-1 px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg w-full"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="dueDate"
              className="block text-sm font-medium text-gray-300"
            >
              Due Date:
            </label>
            <input
              type="date"
              name="dueDate"
              value={taskData.dueDate}
              onChange={(e) =>
                setTaskData({ ...taskData, dueDate: e.target.value })
              }
              required
              className="mt-1 px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg w-full"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
            >
              {editingTaskId ? "Update Task" : "Create Task"}
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default DashboardModal;
