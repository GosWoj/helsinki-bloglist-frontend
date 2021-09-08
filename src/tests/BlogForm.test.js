import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import BlogForm from "../components/BlogForm";

test("Correct values are passed on submit", () => {
  const newBlog = jest.fn();
  const mockNotification = jest.fn();

  const component = render(
    <BlogForm addBlog={newBlog} setNotification={mockNotification} />
  );

  const title = component.container.querySelector("#title");
  const author = component.container.querySelector("#author");
  const url = component.container.querySelector("#url");
  const form = component.container.querySelector("form");

  fireEvent.change(title, {
    target: {
      value: "Testing title",
    },
  });

  fireEvent.change(author, {
    target: {
      value: "Test von Test",
    },
  });

  fireEvent.change(url, {
    target: {
      value: "www.test.com",
    },
  });

  fireEvent.submit(form);

  const expectedResult = {
    title: "Testing title",
    author: "Test von Test",
    url: "www.test.com",
  };

  expect(newBlog.mock.calls[0][0]).toMatchObject(expectedResult);
});
