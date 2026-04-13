import { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask === "") return;

    setTasks([...tasks, { text: newTask, completed: false }]);
    setNewTask("");
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div>
      <h1>Task Manager</h1>
  
      <input
        type="text"
        placeholder="Nueva tarea"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
  
      <button onClick={addTask}>Agregar</button>
  
      <ul>
        {tasks.map((task, index) => (
          <li
          key={index}
          onClick={() => {
            const updatedTasks = [...tasks];
            updatedTasks[index].completed = !updatedTasks[index].completed;
            setTasks(updatedTasks);
          }}
          style={{
            textDecoration: task.completed ? "line-through" : "none",
            cursor: "pointer",
          }}
        >
          {task.text}
          <button
  onClick={(e) => {
    e.stopPropagation();
    const filteredTasks = tasks.filter((_, i) => i !== index);
    setTasks(filteredTasks);
  }}
>
  🗑️
</button>
        </li>
        ))}
      </ul>
  
    </div>
  );
}

export default App;