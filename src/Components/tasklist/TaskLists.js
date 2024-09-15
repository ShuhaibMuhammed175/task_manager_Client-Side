import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../user/AuthContext";
import { BASE_URL_TASKS } from "../config/Config";
import TaskList from "./TaskList";
import UpdateTaskForm from "./UpdateTask";
import "./css/tasks.css";

const TaskLists = ({ handleCloseUpdate, setSelectedTask, selectedTask }) => {
  const { authToken } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [noTasksMessage, setNoTasksMessage] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);

      try {
        if (!authToken || !authToken.access) {
          setError("There is an issue with your login. Please log in again.");
          setLoading(false);
          return;
        }

        const url = statusFilter
          ? `${BASE_URL_TASKS}filter/?status=${statusFilter}`
          : `${BASE_URL_TASKS}`;

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${authToken.access}`,
          },
        });

        if (response.data.message === "No tasks found") {
          setNoTasksMessage("No tasks found.");
          setTasks([]);
        } else {
          setTasks(response.data);
          setNoTasksMessage(
            response.data.length === 0 ? "No tasks found." : null
          );
        }
      } catch (error) {
        setError("Failed to fetch tasks. Please try again. If the issue persists, please logout and login.");
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [authToken, statusFilter]);

  const handleUpdate = (task) => {
    setSelectedTask(task);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL_TASKS}${id}/delete/`, {
        headers: {
          Authorization: `Bearer ${authToken.access}`,
        },
      });
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      setError("Failed to delete task.");
      console.error("Error deleting task:", error);
    }
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  return (
    <div className="tasks-table-container">
      {loading && <p>Loading tasks...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && !selectedTask && (
        <>
          <div className="task-buttons">
            <button
              className="all-btn"
              onClick={() => handleStatusFilter(null)}
            >
              All
            </button>
            <button
              className="completed-btn"
              onClick={() => handleStatusFilter("completed")}
            >
              Completed
            </button>
            <button
              className="pending-btn"
              onClick={() => handleStatusFilter("pending")}
            >
              Pending
            </button>
          </div>

          {noTasksMessage && tasks.length === 0 && <p>{noTasksMessage}</p>}
          {tasks.length > 0 && (
            <TaskList
              tasks={tasks}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
            />
          )}
        </>
      )}

      {selectedTask && (
        <UpdateTaskForm
          task={selectedTask}
          onClose={handleCloseUpdate}
          onTaskUpdated={handleTaskUpdated}
        />
      )}
    </div>
  );
};

export default TaskLists;
