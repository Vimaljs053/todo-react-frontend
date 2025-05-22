import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState('');

  const API = "https://todo-api-z2c5.onrender.com";

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

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API}/todos/${id}`);
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const toggleComplete = async (todo) => {
    const updatedTodo = { ...todo, completed: !todo.completed };

    try {
      await axios.put(`${API}/todos/${todo.id}`, updatedTodo);
      fetchTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const editTodo = async (todo) => {
    const updatedTodo = {
      ...todo,
      title: editedText,
    };

    try {
      await axios.put(`${API}/todos/${todo.id}`, updatedTodo);
      setEditingId(null);
      fetchTodos();
    } catch (error) {
      console.error("Error editing todo:", error);
    }
  };

  const clearAllTodos = async () => {
    try {
      await Promise.all(todos.map(todo => axios.delete(`${API}/todos/${todo.id}`)));
      fetchTodos();
    } catch (error) {
      console.error("Error clearing all todos:", error);
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

            {editingId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  style={{ flexGrow: 1, marginRight: '10px' }}
                />
                <button onClick={() => editTodo(todo)}>Save</button>
              </>
            ) : (
              <>
                <span
                  style={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    flexGrow: 1,
                  }}
                >
                  {todo.title}
                </span>
                <button
                  onClick={() => {
                    setEditingId(todo.id);
                    setEditedText(todo.title);
                  }}
                >
                  ✏️
                </button>
              </>
            )}

            <button onClick={() => deleteTodo(todo.id)}>❌</button>
          </li>
        ))}
      </ul>

      {todos.length > 0 && (
        <button
          onClick={clearAllTodos}
          style={{
            backgroundColor: '#ff3333',
            color: 'white',
            padding: '10px',
            marginTop: '10px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            width: '100%',
            fontWeight: 'bold'
          }}
        >
          Clear All Tasks
        </button>
      )}
    </div>
  );
}

export default App;




