import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import * as loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    };
    fetchBlogs();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      setName(user.name);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {!user ? (
        <div>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div>
              Username:
              <input
                value={username}
                name="username"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              Password:
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <h3>{name} logged in</h3>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
