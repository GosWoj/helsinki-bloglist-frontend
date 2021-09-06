import React, { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, user }) => {
  const [visibility, setVisibility] = useState(false);

  const toggleVisibility = () => {
    setVisibility(!visibility);
  };

  const handleLike = (e) => {
    e.preventDefault();

    const blogObject = {
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1,
    };

    try {
      blogService.addLike(blogObject, blog.id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();

    if (window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)) {
      try {
        blogService.deleteBlog(blog.id);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="blog">
      {blog.title}
      <button onClick={toggleVisibility}>{visibility ? "Hide" : "View"}</button>
      {visibility ? (
        <div>
          <p>{blog.url}</p>
          <p>
            {blog.likes}
            <button onClick={handleLike}>Like</button>
          </p>
          <p>{blog.author}</p>
          {blog.user.username === user.username ? (
            <button onClick={handleDelete} className="button-delete">
              Remove
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default Blog;
