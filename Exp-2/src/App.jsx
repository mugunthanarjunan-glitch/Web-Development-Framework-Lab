import { useState } from "react";
import "./index.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  // Add a new todo
  const handleAddTodo = () => {
    if (newTodo.trim() === "") {
      return;
    }

    const todo = {
      id: Date.now(),
      text: newTodo.trim(),
      checked: false
    };

    setTodos([...todos, todo]);
    setNewTodo("");
  };

  // Delete a todo
  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter(
      (todo) => todo.id !== id
    );

    setTodos(updatedTodos);
  };

  // Toggle completion
  const handleToggleTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          checked: !todo.checked
        };
      }

      return todo;
    });

    setTodos(updatedTodos);
  };

  // Allow Enter key to add task
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleAddTodo();
    }
  };

  return (
    <div className="app">

      <div className="todo-container">

        <div className="header">
          <p className="subtitle">WDF - EXPERIMENT 2</p>

          <h1>To-Do List</h1>

          <p className="description">
            Manage your daily tasks easily.
          </p>
        </div>


        {/* Add Todo */}

        <div className="todo-input">

          <input
            type="text"
            placeholder="Enter a new task..."
            value={newTodo}
            onChange={(event) =>
              setNewTodo(event.target.value)
            }
            onKeyDown={handleKeyDown}
          />

          <button onClick={handleAddTodo}>
            Add
          </button>

        </div>


        {/* Todo information */}

        <div className="todo-info">

          <span>
            Total Tasks: {todos.length}
          </span>

          <span>
            Completed: {
              todos.filter(
                (todo) => todo.checked
              ).length
            }
          </span>

        </div>


        {/* Todo list */}

        <div className="todo-list">

          {todos.length === 0 ? (

            <div className="empty-state">

              <div className="empty-icon">
                ✓
              </div>

              <h3>No tasks available</h3>

              <p>
                Add a new task to get started.
              </p>

            </div>

          ) : (

            todos.map((todo) => (

              <div
                className={`todo-item ${
                  todo.checked ? "completed" : ""
                }`}
                key={todo.id}
              >

                <div className="todo-left">

                  <input
                    type="checkbox"
                    checked={todo.checked}
                    onChange={() =>
                      handleToggleTodo(todo.id)
                    }
                  />

                  <span>
                    {todo.text}
                  </span>

                </div>


                <button
                  className="delete-btn"
                  onClick={() =>
                    handleDeleteTodo(todo.id)
                  }
                >
                  Delete
                </button>

              </div>

            ))

          )}

        </div>

      </div>

    </div>
  );
}

export default App;