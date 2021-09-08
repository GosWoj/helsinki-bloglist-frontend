import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "../components/Blog";

test("<Blog /> displays only title when rendered", () => {
  const blog = {
    author: "Test Testing",
    title: "Testing with react",
    url: "www.google.com",
    likes: 99,
  };

  const component = render(<Blog blog={blog} />);

  expect(component.container).toHaveTextContent("Testing with react");
  expect(component.container).not.toHaveTextContent("www.google.com");
  expect(component.container).not.toHaveTextContent(99);
});

test("<Blog /> displays details when button is clicked", () => {
  const blog = {
    author: "Test Testing",
    title: "Testing with react",
    url: "www.google.com",
    likes: 99,
    user: {
      username: "test",
    },
  };

  const user = {
    username: "test1",
  };

  const component = render(<Blog blog={blog} user={user} />);

  const button = component.getByText("View");
  fireEvent.click(button);

  expect(component.container).toHaveTextContent("Test Testing");
  expect(component.container).toHaveTextContent(99);
});
