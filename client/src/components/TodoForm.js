// src/components/TodoForm.js
import React, { useState } from 'react';

function TodoForm({ setTodos }) {
  const [desc, setDesc] = useState('');  // Ensure the state starts with an empty string

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTodo = {
      desc,
      completed: false,
    };

    fetch('http://localhost:3000/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo),
    })
      .then((response) => response.json())
      .then((data) => {
        setTodos((prevTodos) => [...prevTodos, data.newTodo.rows[0]]);
        window.location.reload()
        setDesc('');  // Clear the input field
      })
      .catch((error) => console.error('Error adding todo:', error));
  };
  

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        className="w-full px-3 py-2 border rounded"
        placeholder="Add a new todo"
        value={desc}  // Controlled input with defined value
        onChange={(e) => setDesc(e.target.value)}
        required
      />
      <button
        type="submit"
        className="w-full mt-2 px-3 py-2 bg-blue-500 text-white rounded"
      >
        Add Todo
      </button>
    </form>
  );
}

export default TodoForm;
