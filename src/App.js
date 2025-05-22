import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Make sure you have this for styling

function App() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");

  const API = "https://todo-api-z2c5.onrender.com"; // Change to Render URL after deployment

  // Fetch all todos
  const fetchTodos = async () => {
    const response = await axios.get(`${API}/todos/`);
    setTodos(response.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add a new todo
  const addTodo = async () => {
    if (todoText.trim() === "") return;

    const newTodo = {
      id: Date.now(),
      title: todoText,
      completed: false
    };

    await axios.post(`${API}/todos/`, newTodo);
    setTodoText("");
    fetchTodos();
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    await axios.delete(`${API}/todos/${id}`);
    fetchTodos();
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
            {todo.title}
            <button onClick={() => deleteTodo(todo.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;




