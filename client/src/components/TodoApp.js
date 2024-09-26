// src/components/TodoApp.js
import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

function TodoApp() {
  const [todos, setTodos] = useState([]);

  // Fetch todos from the backend
  useEffect(() => {
    fetch('http://localhost:3000/todos')
      .then((response) => response.json())
      .then((data) => {setTodos(data)})
      .catch((error) => console.error('Error fetching todos:', error));
  }, []);

  return (
    <div className="w-full max-w-md p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Todo List</h1>
      <TodoForm setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default TodoApp;
