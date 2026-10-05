import { useState } from "react";
import "./index.css";

function App() {
  // Stores all students
  const [students, setStudents] = useState([]);

  // Stores form values
  const [formData, setFormData] = useState({
    name: "",
    branch: "",
    marks: "",
  });

  // Stores which student is being edited
  const [editIndex, setEditIndex] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add or update student
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formData.name.trim() === "" ||
      formData.branch.trim() === "" ||
      formData.marks === ""
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (editIndex === null) {
      // CREATE
      setStudents([...students, formData]);
      alert("Student added successfully.");
    } else {
      // UPDATE
      const updatedStudents = [...students];

      updatedStudents[editIndex] = formData;

      setStudents(updatedStudents);

      setEditIndex(null);

      alert("Student updated successfully.");
    }

    // Clear form
    setFormData({
      name: "",
      branch: "",
      marks: "",
    });
  };

  // Load student data into form
  const handleEdit = (index) => {
    setFormData(students[index]);
    setEditIndex(index);
  };

  // Delete student
  const handleDelete = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) {
      return;
    }

    const updatedStudents = students.filter(
      (_, i) => i !== index
    );

    setStudents(updatedStudents);

    // If deleted student was being edited
    if (editIndex === index) {
      setEditIndex(null);

      setFormData({
        name: "",
        branch: "",
        marks: "",
      });
    }

    alert("Student deleted successfully.");
  };

  // Cancel edit
  const handleCancel = () => {
    setEditIndex(null);

    setFormData({
      name: "",
      branch: "",
      marks: "",
    });
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <span className="badge">WDF EXPERIMENT 09</span>

        <h1>Student Management</h1>

        <p>
          Manage student records using Create, Read,
          Update and Delete operations.
        </p>
      </header>

      {/* Form */}
      <section className="form-card">
        <div className="section-title">
          <div>
            <h2>
              {editIndex === null
                ? "Add Student"
                : "Update Student"}
            </h2>

            <p>
              {editIndex === null
                ? "Enter student details below."
                : "Modify the selected student's details."}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="field">
              <label>Student Name</label>

              <input
                type="text"
                name="name"
                placeholder="Enter student name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="field">
              <label>Branch</label>

              <select
                name="branch"
                value={formData.branch}
                onChange={handleChange}
              >
                <option value="">Select branch</option>
                <option value="CSE">CSE</option>
                <option value="IT">IT</option>
                <option value="ECE">ECE</option>
                <option value="EEE">EEE</option>
                <option value="MECH">MECH</option>
              </select>
            </div>

            <div className="field">
              <label>Marks</label>

              <input
                type="number"
                name="marks"
                placeholder="Enter marks"
                min="0"
                max="100"
                value={formData.marks}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="primary-btn">
              {editIndex === null
                ? "Add Student"
                : "Update Student"}
            </button>

            {editIndex !== null && (
              <button
                type="button"
                className="secondary-btn"
                onClick={handleCancel}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      {/* Student table */}
      <section className="table-card">
        <div className="table-header">
          <div>
            <h2>Student Records</h2>

            <p>
              Total Students:{" "}
              <strong>{students.length}</strong>
            </p>
          </div>
        </div>

        {students.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">+</div>

            <h3>No Students Added</h3>

            <p>
              Add your first student using the form above.
            </p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Branch</th>
                  <th>Marks</th>
                  <th>Performance</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {students.map((student, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>

                    <td>
                      <strong>{student.name}</strong>
                    </td>

                    <td>
                      <span className="branch">
                        {student.branch}
                      </span>
                    </td>

                    <td>{student.marks}</td>

                    <td>
                      <span
                        className={
                          Number(student.marks) >= 80
                            ? "performance excellent"
                            : Number(student.marks) >= 50
                            ? "performance average"
                            : "performance low"
                        }
                      >
                        {Number(student.marks) >= 80
                          ? "Excellent"
                          : Number(student.marks) >= 50
                          ? "Average"
                          : "Needs Improvement"}
                      </span>
                    </td>

                    <td>
                      <div className="actions">
                        <button
                          className="edit-btn"
                          onClick={() =>
                            handleEdit(index)
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() =>
                            handleDelete(index)
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <footer>
        React CRUD Application • WDF Experiment 09
      </footer>
    </div>
  );
}

export default App;