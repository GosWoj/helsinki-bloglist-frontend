import React, { useState } from "react";

const Blog = ({ blog, user, handleLike, handleDelete }) => {
  const [visibility, setVisibility] = useState(false);

  const toggleVisibility = () => {
    setVisibility(!visibility);
  };

  const handleClick = (e) => {
    e.preventDefault();

    handleLike(
      {
        author: blog.author,
        title: blog.title,
        url: blog.url,
        likes: blog.likes + 1,
      },
      blog.id
    );
  };

  const handleRemove = (e) => {
    e.preventDefault();

    if (window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)) {
      handleDelete(blog.id);
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
            <button onClick={handleClick}>Like</button>
          </p>
          <p>{blog.author}</p>
          {blog.user.username === user.username ? (
            <button onClick={handleRemove} className="button-delete">
              Remove
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default Blog;
