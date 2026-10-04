import { useState } from "react";
import "./index.css";

function App() {
  const [tasks, setTasks] = useState([]);

  const [taskName, setTaskName] = useState("");
  const [status, setStatus] = useState("Pending");

  const [search, setSearch] = useState("");

  // Add task
  const handleAddTask = (e) => {
    e.preventDefault();

    if (!taskName.trim()) {
      return;
    }

    const newTask = {
      id: Date.now(),
      name: taskName.trim(),
      status,
    };

    setTasks((currentTasks) => [
      newTask,
      ...currentTasks,
    ]);

    setTaskName("");
    setStatus("Pending");
  };

  // Update task status
  const updateTaskStatus = (id, newStatus) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? { ...task, status: newStatus }
          : task
      )
    );
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks((currentTasks) =>
      currentTasks.filter(
        (task) => task.id !== id
      )
    );
  };

  // Search
  const filteredTasks = tasks.filter((task) =>
    task.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Counters
  const pendingCount = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const progressCount = tasks.filter(
    (task) => task.status === "InProgress"
  ).length;

  const completedCount = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const getStatusLabel = (status) => {
    if (status === "InProgress") {
      return "In Progress";
    }

    return status;
  };

  return (
    <div className="app">

      {/* ================= HEADER ================= */}

      <header className="header">

        <div className="header-content">

          <div className="logo">
            <span>◆</span>
            TaskFlow
          </div>

          <p>
            Project Management Dashboard
          </p>

        </div>

      </header>


      {/* ================= HERO ================= */}

      <section className="hero">

        <div className="hero-content">

          <p className="hero-label">
            PROJECT MANAGEMENT
          </p>

          <h1>
            Plan. Track.
            <br />
            Get things done.
          </h1>

          <p className="hero-description">
            Manage your project tasks and keep track
            of their progress from one simple dashboard.
          </p>

        </div>

      </section>


      {/* ================= MAIN ================= */}

      <main className="container">


        {/* ================= SUMMARY ================= */}

        <section className="summary-section">

          <div className="section-heading">

            <div>

              <p className="section-label">
                PROJECT OVERVIEW
              </p>

              <h2>
                Task Summary
              </h2>

            </div>

            <span className="total-tasks">
              {tasks.length} total tasks
            </span>

          </div>


          <div className="summary-grid">


            {/* Pending */}

            <div className="summary-card">

              <div className="summary-icon pending-icon">
                ○
              </div>

              <div>

                <span>
                  Pending
                </span>

                <strong>
                  {pendingCount}
                </strong>

              </div>

            </div>


            {/* In Progress */}

            <div className="summary-card">

              <div className="summary-icon progress-icon">
                ◐
              </div>

              <div>

                <span>
                  In Progress
                </span>

                <strong>
                  {progressCount}
                </strong>

              </div>

            </div>


            {/* Completed */}

            <div className="summary-card">

              <div className="summary-icon completed-icon">
                ✓
              </div>

              <div>

                <span>
                  Completed
                </span>

                <strong>
                  {completedCount}
                </strong>

              </div>

            </div>

          </div>

        </section>


        {/* ================= ADD TASK ================= */}

        <section className="add-section">

          <div className="section-heading">

            <div>

              <p className="section-label">
                NEW TASK
              </p>

              <h2>
                Add a Task
              </h2>

            </div>

          </div>


          <form
            className="task-form"
            onSubmit={handleAddTask}
          >

            <div className="form-group">

              <label>
                Task Name
              </label>

              <input
                type="text"
                placeholder="e.g. Design homepage"
                value={taskName}
                onChange={(e) =>
                  setTaskName(e.target.value)
                }
                required
              />

            </div>


            <div className="form-group">

              <label>
                Status
              </label>

              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value)
                }
              >

                <option value="Pending">
                  Pending
                </option>

                <option value="InProgress">
                  In Progress
                </option>

                <option value="Completed">
                  Completed
                </option>

              </select>

            </div>


            <button
              type="submit"
              className="add-btn"
            >
              Add Task →
            </button>

          </form>

        </section>


        {/* ================= TASKS ================= */}

        <section className="tasks-section">

          <div className="section-heading">

            <div>

              <p className="section-label">
                WORK ITEMS
              </p>

              <h2>
                All Tasks
              </h2>

            </div>

          </div>


          {/* Search */}

          <div className="search-box">

            <span>
              ⌕
            </span>

            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>


          {/* Task List */}

          {filteredTasks.length === 0 ? (

            <div className="empty-state">

              <div className="empty-icon">
                ✓
              </div>

              <h3>
                No tasks found
              </h3>

              <p>
                Add a task to start managing
                your project.
              </p>

            </div>

          ) : (

            <div className="task-list">

              {filteredTasks.map((task) => (

                <div
                  className="task-card"
                  key={task.id}
                >

                  {/* Task icon */}

                  <div
                    className={`task-icon ${task.status.toLowerCase()}`}
                  >
                    {task.status === "Completed"
                      ? "✓"
                      : task.status === "InProgress"
                      ? "◐"
                      : "○"}
                  </div>


                  {/* Task information */}

                  <div className="task-info">

                    <h3>
                      {task.name}
                    </h3>

                    <span>
                      Task #{task.id}
                    </span>

                  </div>


                  {/* Status */}

                  <div className="status-area">

                    <span
                      className={`status-badge ${task.status.toLowerCase()}`}
                    >
                      {getStatusLabel(
                        task.status
                      )}
                    </span>


                    <select
                      value={task.status}
                      onChange={(e) =>
                        updateTaskStatus(
                          task.id,
                          e.target.value
                        )
                      }
                    >

                      <option value="Pending">
                        Pending
                      </option>

                      <option value="InProgress">
                        In Progress
                      </option>

                      <option value="Completed">
                        Completed
                      </option>

                    </select>

                  </div>


                  {/* Delete */}

                  <button
                    className="delete-btn"
                    type="button"
                    onClick={() =>
                      deleteTask(task.id)
                    }
                  >
                    Delete
                  </button>

                </div>

              ))}

            </div>

          )}

        </section>

      </main>


      {/* ================= FOOTER ================= */}

      <footer>

        <p>
          TaskFlow • Experiment 07
        </p>

      </footer>

    </div>
  );
}

export default App;