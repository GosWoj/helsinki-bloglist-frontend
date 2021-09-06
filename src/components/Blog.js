import React, { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog }) => {
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
        </div>
      ) : null}
    </div>
  );
};

export default Blog;
