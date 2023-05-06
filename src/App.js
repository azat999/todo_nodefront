import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editTask, setEditTask] = useState('');
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addTask = async () => {
    if (newTask) {
      try {
        await axios.post('http://localhost:3000/tasks', { task: newTask });
        setNewTask('');
        fetchTasks();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const editTaskSubmit = async () => {
    if (editTask && editIndex !== -1) {
      try {
        await axios.put(`http://localhost:3000/tasks/${editIndex}`, { task: editTask });
        setEditTask('');
        setEditIndex(-1);
        fetchTasks();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const deleteTask = async (index) => {
    try {
      await axios.delete(`http://localhost:3000/tasks/${index}`);
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='App'>
      <h1>To-Do List</h1>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Введите задачу"
        />
        <button onClick={addTask} className='add_btn'>Добавить</button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {index === editIndex ? (
              <div>
                <input
                  type="text"
                  value={editTask}
                  onChange={(e) => setEditTask(e.target.value)}
                />
                <button onClick={editTaskSubmit} className='save_btn'>Сохранить</button>
              </div>
            ) : (
              <div>
                <span>{task}</span>
                <button onClick={() => setEditIndex(index)} className='redi_btn'>Редактировать</button>
                <button onClick={() => deleteTask(index)} className='delete_btn'>Удалить</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
