import React, { useState } from 'react';
import './App.css';
import TaskList from './Components/taskList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskEmail, setTaskEmail] = useState('');
  const [taskPhone, setTaskPhone] = useState('');
  const [taskType, setTaskType] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setTaskName(value);
        break;
      case 'email':
        setTaskEmail(value);
        break;
      case 'phone':
        setTaskPhone(value);
        break;
      case 'type':
        setTaskType(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (taskName.trim() !== '' && taskEmail.trim() !== '' && taskPhone.trim() !== '' && taskType.trim() !== '') {
      if (editTaskId !== null) {
        const updatedTasks = tasks.map(task => {
          if (task.id === editTaskId) {
            return {
              ...task,
              name: taskName,
              email: taskEmail,
              phone: taskPhone,
              type: taskType
            };
          }
          return task;
        });
        setTasks(updatedTasks);
        setEditTaskId(null);
      } else {
        const newTask = {
          id: Date.now(),
          name: taskName,
          email: taskEmail,
          phone: taskPhone,
          type: taskType
        };
        setTasks([...tasks, newTask]);
      }
      setTaskName('');
      setTaskEmail('');
      setTaskPhone('');
      setTaskType('');
    }
  };

  const handleEdit = (id) => {
    const taskToEdit = tasks.find(task => task.id === id);
    if (taskToEdit) {
      setTaskName(taskToEdit.name);
      setTaskEmail(taskToEdit.email);
      setTaskPhone(taskToEdit.phone);
      setTaskType(taskToEdit.type);
      setEditTaskId(id);
    }
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
    if (editTaskId === id) {
      setEditTaskId(null);
    }
  };
  const homewors = [{ id: 1 , text: "hola" },{ id: 2 , text: "hola" }];
  return (
    <div className="container">
      <h1>Task Manager</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={taskName}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={taskEmail}
          onChange={handleChange}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={taskPhone}
          onChange={handleChange}
        />
        <select
          name="type"
          value={taskType}
          onChange={handleChange}
        >
          <option value="">Select Type</option>
          <option value="Personal">Personal</option>
          <option value="Work">Work</option>
          <option value="Other">Other</option>
        </select>
        <button type="submit">{editTaskId !== null ? 'Update Task' : 'Add Task'}</button>
      </form>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <div>
              <strong>Name:</strong> {task.name}<br />
              <strong>Email:</strong> {task.email}<br />
              <strong>Phone:</strong> {task.phone}<br />
              <strong>Type:</strong> {task.type}
            </div>
            <div>
              <button onClick={() => handleEdit(task.id)}>Edit</button>
              <button onClick={() => handleDelete(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      <TaskList tasks={homewors}>

      </TaskList>

    </div>


  );
}



export default App
