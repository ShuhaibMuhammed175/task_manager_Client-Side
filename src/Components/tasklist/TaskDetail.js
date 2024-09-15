import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../user/AuthContext";
import { BASE_URL_TASKS } from "../config/Config";
import { useParams, useNavigate } from "react-router-dom";
import "./css/task_detail.css";

const TaskDetail = () => {
  const { taskId } = useParams();
  const { authToken } = useContext(AuthContext);
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`${BASE_URL_TASKS}${taskId}/`, {
          headers: {
            Authorization: `Bearer ${authToken.access}`,
          },
        });
        setTask(response.data);
      } catch (error) {
        setError("Failed to fetch task details.");
        console.error("Error fetching task details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId, authToken]);

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="task-detail-container">
      {loading && <p>Loading task details...</p>}
      {error && <p>{error}</p>}
      {task && (
        <>
          <h2>{task.title}</h2>
          <p className="status-label">Description:</p>
          <p>{task.description}</p>
          <p className="status-label">Status:</p>
          <p className="status-value">
            {task.status ? "Completed" : "Pending"}
          </p>
          <button className="back-btn" onClick={handleBack}>
            Back to Task List
          </button>
        </>
      )}
    </div>
  );
};

export default TaskDetail;
