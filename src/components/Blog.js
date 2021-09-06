import React, { useState } from "react";

const Blog = ({ blog }) => {
  const [visibility, setVisibility] = useState(false);

  const toggleVisibility = () => {
    setVisibility(!visibility);
  };

  return (
    <div className="blog">
      {blog.title}
      <button onClick={toggleVisibility}>{visibility ? "Hide" : "View"}</button>
      {visibility ? (
        <div>
          <p>{blog.url}</p>
          <p>
            {blog.likes} <button>Like</button>
          </p>
          <p>{blog.author}</p>
        </div>
      ) : null}
    </div>
  );
};

export default Blog;
