import { useState } from "react";
import "./index.css";

function App() {
  const [username, setUsername] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);

  const handlePost = () => {
    if (username.trim() && content.trim()) {
      const newPost = {
        id: Date.now(),
        user: username,
        text: content,
        time: new Date().toLocaleString(),
      };

      setPosts([newPost, ...posts]);
      setContent("");
    }
  };

  const handleDelete = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <div className="app">

      {/* Header */}
      <header className="header">
        <div className="logo">
          <span>●</span> MiniBlog
        </div>

        <p>Share your thoughts with everyone</p>
      </header>

      {/* Post Box */}
      <section className="post-box">

        <h2>Create a Post</h2>

        <input
          type="text"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <textarea
          placeholder="What's on your mind?"
          rows="4"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        <div className="post-actions">
          <span>{content.length} characters</span>

          <button onClick={handlePost}>
            Post
          </button>
        </div>

      </section>

      {/* Posts */}
      <section className="feed">

        <div className="feed-header">
          <h2>Latest Posts</h2>
          <span>{posts.length} posts</span>
        </div>

        {posts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">✦</div>

            <h3>No posts yet</h3>

            <p>
              Be the first person to share something!
            </p>
          </div>
        ) : (
          <div className="posts-list">

            {posts.map((post) => (
              <article className="post" key={post.id}>

                <div className="post-top">

                  <div className="user-info">

                    <div className="avatar">
                      {post.user.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <h3>{post.user}</h3>
                      <span>{post.time}</span>
                    </div>

                  </div>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(post.id)}
                  >
                    Delete
                  </button>

                </div>

                <p className="post-content">
                  {post.text}
                </p>

              </article>
            ))}

          </div>
        )}

      </section>

      {/* Footer */}
      <footer>
        <p>MiniBlog • Experiment 03</p>
      </footer>

    </div>
  );
}

export default App;