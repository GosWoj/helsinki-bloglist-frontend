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

const blogService = {
  getAll,
  addBlog,
  setToken,
};

export default blogService;
