import React from "react";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { Link } from "react-router-dom";
import TaskActions from "./TaskActions";
import "./css/task_row.css";

const TaskRow = ({ task, handleUpdate, handleDelete }) => {
  return (
    <tr>
      <td>
        <Link to={`/task/${task.id}`} className="task-link">
          {task.title}
        </Link>
      </td>
      <td>
        <Link to={`/task/${task.id}`} className="task-link">
          {task.description}
        </Link>
      </td>
      <td>{task.status ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}</td>
      <td>
        <TaskActions
          taskId={task.id}
          task={task}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
        />
      </td>
    </tr>
  );
};

export default TaskRow;
