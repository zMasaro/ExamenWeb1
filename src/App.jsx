import React, { useState } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'tarea':
        setTaskName(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (taskName.trim() !== '') {
      if (editTaskId !== null) {
        const updatedTasks = tasks.map(task => {
          if (task.id === editTaskId) {
            return {
              ...task,
              name: taskName
            };
          }
          return task;
        });
        setTasks(updatedTasks);
        setEditTaskId(null);
      } else {
        const newTask = {
          name: taskName
        };
        setTasks([...tasks, newTask]);
      }
      setTaskName('');
    }
  };

  const handleEdit = (id) => {
    const taskToEdit = tasks.find(task => task.id === id);
    if (taskToEdit) {
      setTaskName(taskToEdit.name);
      setEditTaskId(id);
    }
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
    if (editTaskId === id) {
      setEditTaskId(null);
    }
  };

  return (
    <div className="container">
      <h1>Gestor de Tareas</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="tarea"
          placeholder="Ingrese la tarea aqui" 
          value={taskName} 
          onChange={handleChange} 
        />        
        
        <button type="submit">{editTaskId !== null ? 'Update Task' : 'Add Task'}</button>
      </form>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <div>
              {task.name}
              <button onClick={() => handleEdit(task.id)}>Completar</button>
              <button onClick={() => handleDelete(task.id)}>Delete</button>
            </div>
            
          </li>
        ))}
      </ul>
    </div>
  );
}



export default App
