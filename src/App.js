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
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("bloglistUser");

    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      setName(user.name);
      blogService.setToken(user.token);
    } else {
      setUser(null);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("bloglistUser", JSON.stringify(user));
      setUser(user);
      setName(user.name);
      blogService.setToken(user.token);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    window.localStorage.removeItem("bloglistUser");
    setUser(null);
    setName("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      blogService.addBlog({ title, author, url });
      setTitle("");
      setAuthor("");
      setUrl("");
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
          <button onClick={handleLogout}>Logout</button>
          <h2>Add a new blog</h2>
          <form onSubmit={handleSubmit}>
            <div>
              Title:
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              Author:
              <input
                type="text"
                name="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            <div>
              Url:
              <input
                type="text"
                name="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <button type="submit">Add</button>
          </form>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
