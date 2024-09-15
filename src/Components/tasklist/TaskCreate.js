import React, { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../user/AuthContext";
import { BASE_URL_TASKS } from "../config/Config";
import { useNavigate } from "react-router-dom";
import "./css/task_create.css";

const TaskCreate = () => {
  const { authToken } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const navigate = useNavigate();

  const handleCreate = async () => {
    try {
      await axios.post(
        `${BASE_URL_TASKS}create/`,
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

      navigate("/");
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div className="create-task-container">
      <h2>Create New Task</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="input-field"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="textarea-field"
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
        <button className="save-btn" onClick={handleCreate}>
          Create
        </button>
        <button className="cancel-btn" onClick={() => navigate("/")}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default TaskCreate;
