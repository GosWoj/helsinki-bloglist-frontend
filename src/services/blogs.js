import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const addBlog = async (blog) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  try {
    const request = await axios.post(baseUrl, blog, config);

    return request.data;
  } catch (error) {
    console.log(error);
  }
};

const addLike = async (blog, id) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const blogUrl = `${baseUrl}/${id}`;

  try {
    const request = await axios.put(blogUrl, blog, config);

    return request.data;
  } catch (error) {
    console.log(error);
  }
};

const deleteBlog = async (id) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const blogUrl = `${baseUrl}/${id}`;

  try {
    const response = await axios.delete(blogUrl, config);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const blogService = {
  getAll,
  addBlog,
  addLike,
  deleteBlog,
  setToken,
};

export default blogService;
