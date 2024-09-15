import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./Components/user/Register";
import Login from "./Components/user/Login";
import { AuthProvider } from "./Components/user/AuthContext";
import TasksLists from "./Components/tasklist/TaskLists";
import UpdateTaskForm from "./Components/tasklist/UpdateTask";
import Navbar from "./Components/navbar/Navbar";
import TaskCreate from "./Components/tasklist/TaskCreate";
import TaskDetail from "./Components/tasklist/TaskDetail";

function App() {
  const [selectedTask, setSelectedTask] = useState(null);

  const handleCloseUpdate = () => {
    setSelectedTask(null);
  };

  return (
    <AuthProvider>
      <Navbar handleCloseUpdate={handleCloseUpdate} />
      <Routes>
        <Route
          path="/"
          element={
            <TasksLists
              selectedTask={selectedTask}
              setSelectedTask={setSelectedTask}
              handleCloseUpdate={handleCloseUpdate}
            />
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/update-task" element={<UpdateTaskForm />} />
        <Route path="/create-task" element={<TaskCreate />} />
        <Route path="/task/:taskId" element={<TaskDetail />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
