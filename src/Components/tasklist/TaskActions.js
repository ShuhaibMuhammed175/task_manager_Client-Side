import React from "react";
import { MdDeleteSweep, MdOutlineUpdate } from "react-icons/md";

const TaskActions = ({ task, handleUpdate, handleDelete }) => {
  return (
    <>
      <button
        className="action-btn update-btn"
        onClick={() => handleUpdate(task)}
      >
        <MdOutlineUpdate />
      </button>
      <button
        className="action-btn delete-btn"
        onClick={() => handleDelete(task.id)}
      >
        <MdDeleteSweep />
      </button>
    </>
  );
};

export default TaskActions;
