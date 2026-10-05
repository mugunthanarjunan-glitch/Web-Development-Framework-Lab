import { useEffect, useState } from "react";
import "./index.css";

function App() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);

  // Load notes from localStorage when the app starts
  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes"));

    if (storedNotes) {
      setNotes(storedNotes);
    }
  }, []);

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Add a new note
  const addNote = () => {
    if (!note.trim()) {
      return;
    }

    setNotes([note, ...notes]);
    setNote("");
  };

  // Delete a note
  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  // Clear all notes
  const clearAllNotes = () => {
    if (notes.length === 0) {
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete all notes?"
    );

    if (confirmDelete) {
      setNotes([]);
    }
  };

  // Add note using Ctrl + Enter
  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === "Enter") {
      addNote();
    }
  };

  return (
    <div className="app">
      <header className="header">
        <div>
          <span className="badge">WDF • EXP 10</span>
          <h1>Note<span>Vault</span></h1>
          <p>Simple notes that stay saved in your browser.</p>
        </div>

        <div className="note-count">
          <strong>{notes.length}</strong>
          <span>{notes.length === 1 ? "Note" : "Notes"}</span>
        </div>
      </header>

      <main className="container">

        {/* Add Note Section */}
        <section className="note-editor">
          <div className="section-title">
            <div>
              <h2>Create a Note</h2>
              <p>Write something you want to remember.</p>
            </div>
          </div>

          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your note here..."
          />

          <div className="editor-footer">
            <span>Tip: Press Ctrl + Enter to add</span>

            <button onClick={addNote}>
              + Add Note
            </button>
          </div>
        </section>

        {/* Notes Section */}
        <section className="notes-section">
          <div className="notes-header">
            <div>
              <h2>Your Notes</h2>
              <p>Your notes are automatically saved locally.</p>
            </div>

            {notes.length > 0 && (
              <button
                className="clear-btn"
                onClick={clearAllNotes}
              >
                Clear All
              </button>
            )}
          </div>

          {notes.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <h3>No notes yet</h3>
              <p>
                Create your first note using the box above.
              </p>
            </div>
          ) : (
            <div className="notes-list">
              {notes.map((item, index) => (
                <article className="note-card" key={index}>
                  <div className="note-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <p>{item}</p>

                  <button
                    className="delete-btn"
                    onClick={() => deleteNote(index)}
                  >
                    Delete
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>

      </main>

      <footer>
        React • useState • useEffect • localStorage
      </footer>
    </div>
  );
}

export default App;