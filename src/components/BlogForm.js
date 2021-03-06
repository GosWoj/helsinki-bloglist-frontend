import React, { useState } from "react";

const BlogForm = ({ addBlog, setNotification }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title && author && url) {
      addBlog({ title, author, url });
      setNotification(`Blog "${title}" by ${author} added!`);
      setTitle("");
      setAuthor("");
      setUrl("");
      setTimeout(() => {
        setNotification("");
      }, 5000);
    } else {
      setNotification("All fields are required!");
      setTimeout(() => {
        setNotification("");
      }, 5000);
    }
  };

  return (
    <div>
      <h2>Add a new blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Title:
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            name="author"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          Url:
          <input
            type="text"
            name="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <button type="submit" id="add-blog-button">
          Add
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
