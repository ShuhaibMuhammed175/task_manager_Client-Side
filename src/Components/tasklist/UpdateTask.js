import React, { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../user/AuthContext";
import { BASE_URL_TASKS } from "../config/Config";
import "./css/task_update.css";

const TaskUpdate = ({ task, onClose, onTaskUpdated }) => {
  const { authToken } = useContext(AuthContext);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status ? "completed" : "pending");

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `${BASE_URL_TASKS}${task.id}/update/`,
        {
          title,
          description,
          status: status === "completed",
        },
        {
          headers: {
            Authorization: `Bearer ${authToken.access}`,
          },
        }
      );

      onTaskUpdated(response.data);

      onClose();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="update-task-container">
      <h2>Update Task</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="status-select"
      >
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
      <div className="button-container">
        <button className="save-btn" onClick={handleSave}>
          Save
        </button>
        <button className="cancel-btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default TaskUpdate;
