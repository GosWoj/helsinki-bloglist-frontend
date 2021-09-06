import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Toggle from "./components/Toggle";
import blogService from "./services/blogs";
import * as loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [notification, setNotification] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    };
    fetchBlogs();
  }, [blogs]);

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
      setError(true);
      setNotification("Wrong username or password!");

      setTimeout(() => {
        setNotification(null);
        setError(false);
      }, 5000);
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    window.localStorage.removeItem("bloglistUser");
    setUser(null);
    setName("");
  };

  const handleAddBlog = (blogObject) => {
    try {
      blogService.addBlog(blogObject);
    } catch (error) {
      console.log(error);
      setNotification("Something went wrong!");
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  return (
    <div>
      {!user ? (
        <div>
          <h2>Login</h2>
          <Notification notification={notification} error={error} />
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
          <h2>Blogs</h2>
          <Notification notification={notification} />
          <div>
            <h3>{name} logged in</h3>
          </div>
          <button onClick={handleLogout}>Logout</button>
          <Toggle buttonLabel="Add a new blog">
            <BlogForm
              addBlog={handleAddBlog}
              setNotification={setNotification}
            />
          </Toggle>
          <div>
            {blogs
              .sort((a, b) => b.likes - a.likes)
              .map((blog) => (
                <Blog key={blog.id} blog={blog} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
