import React, { useState } from 'react';

function TodoItem({ todo, setTodos }) {
  const [isEditing, setIsEditing] = useState(false);
  const [desc, setDesc] = useState(todo.todo_desc || '');  // Ensure desc is not null

  const handleDelete = () => {
    fetch(`http://localhost:3000/todos/${todo.todo_id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setTodos((prevTodos) =>
          prevTodos.filter((t) => t.todo_id !== todo.todo_id)
        );
      })
      .catch((error) => console.error('Error deleting todo:', error));
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedTodo = {
      desc,
      completed: todo.todo_completed,
    };

      console.log('Updated Todo:', updatedTodo); // Log the data being sent
      console.log('Todo ID:', todo.todo_id);     // Log the todo ID being used in the request
    
      fetch(`http://localhost:3000/todos/${todo.todo_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
      })
        .then((response) => {
          window.location.reload()
          console.log('Response status:', response.status); // Log response status
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log('Updated Todo from server:', data);  // Log the updated data received from the server
    
          setTodos((prevTodos) =>
            prevTodos.map((t) =>
              t.todo_id === todo.todo_id ? { ...t, todo_desc: desc } : t
            )
          );
          setIsEditing(false);
          
        })
        .catch((error) => {
          console.error('Error updating todo:', error); // Log any errors encountered
        });
    };
    

  return (
    <li className="flex items-center justify-between mb-2">
      {isEditing ? (
        <form onSubmit={handleUpdate} className="flex-1 mr-2">
          <input
            type="text"
            className="w-full px-2 py-1 border rounded"
            value={desc === null ? '' : desc}  // Ensure value is not null
            onChange={(e) => setDesc(e.target.value)}
          />
        </form>
      ) : (
        <span className="flex-1">{todo.todo_desc}</span>
      )}
      <div className="flex space-x-2">
        <button
          onClick={(e) => {setIsEditing(!isEditing);if (isEditing) handleUpdate(e);}}
          className="px-2 py-1 bg-black text-white rounded"
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
        <button
          onClick={handleDelete}
          className="px-2 py-1 bg-red-500 text-white rounded"
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
