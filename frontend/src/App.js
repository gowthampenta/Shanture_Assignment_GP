import React from "react";
import Task from "./components/Task";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import { saveAs } from "file-saver";
import "./App.css";

function App() {
  const [tasks, setTasks] = React.useState([]);
  const [newTask, setNewTask] = React.useState("");

  React.useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/tasks");
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async () => {
    if (newTask.trim()) {
      try {
        const res = await axios.post("http://localhost:5000/tasks", {
          description: newTask,
        });
        setTasks([...tasks, res.data]);
        setNewTask("");
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  const markTaskAsCompleted = async (task) => {
    try {
      await axios.put(`http://localhost:5000/tasks/${task.id}`, {
        completed: !task.completed,
        description: task.description,
      });
      fetchTasks();
    } catch (error) {
      console.error("Error marking task as completed:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const downloadTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/download", {
        responseType: "blob",
      });
      saveAs(res.data, "tasks.pdf");
    } catch (error) {
      console.error("Error downloading tasks:", error);
    }
  };

  return (
    <div className="App">
      <img
        src="https://res.cloudinary.com/dzbev5zdy/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1718730037/shanture_logo_wfecdv.jpg"
        alt="Shanture logo"
        className="logo"
      />
      <h1>To-Do List</h1>
      <div className="main-container">
        <TextField
          label="New Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addTask()}
          className="input-container"
        />
        <div className="buttons-container">
          <Button
            onClick={addTask}
            variant="contained"
            color="primary"
            className="button"
            type="button"
          >
            Add Task
          </Button>
          <Button
            onClick={downloadTasks}
            variant="contained"
            color="secondary"
            className="button"
            type="button"
          >
            Download PDF
          </Button>
        </div>
      </div>
      <ul>
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onToggleComplete={() => markTaskAsCompleted(task)}
            onDelete={() => deleteTask(task.id)}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
