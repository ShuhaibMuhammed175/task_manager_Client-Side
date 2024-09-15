import React from "react";
import "./css/tasks.css";
import TaskRow from "./TaskRow";

const TaskList = ({ tasks, handleUpdate, handleDelete }) => {
  return (
    <div className="tasks-table-container">
      <table className="tasks-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
