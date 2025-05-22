import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState('');

  const API = "https://todo-api-z2c5.onrender.com"; // ✅ Your live backend URL

  // Fetch all todos
  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${API}/todos/`);
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add new todo
  const addTodo = async () => {
    if (!todoText.trim()) return;

    const newTodo = {
      id: Date.now(),
      title: todoText,
      completed: false,
    };

    try {
      await axios.post(`${API}/todos/`, newTodo);
      setTodoText('');
      fetchTodos();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API}/todos/${id}`);
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // Toggle task completion
  const toggleComplete = async (todo) => {
    const updatedTodo = { ...todo, completed: !todo.completed };

    try {
      await axios.put(`${API}/todos/${todo.id}`, updatedTodo);
      fetchTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <div className="todo-container">
      <div className="todo-header">To-Do List</div>

      <div className="todo-input">
        <input
          type="text"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          placeholder="Enter a new task..."
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo)}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;





