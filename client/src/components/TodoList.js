import React, { useEffect, useState } from 'react';
import TodoItem from './TodoItem'; // Assuming this is the component that renders individual todos

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const response = await fetch('http://localhost:3000/todos');
    const data = await response.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      {todos.map((todo) => (
        <TodoItem key={todo.todo_id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
