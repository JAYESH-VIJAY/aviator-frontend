import axios from "axios";
// Create an Axios instance with a base URL
const baseURL = process.env.REACT_APP_API_URL;
if (!baseURL) {
  console.log(
    ">BaseURL error,please check your env file or visit api/ClientFunction.jsx file to see more details...,Thanks!..."
  );
}
const api = axios.create({
  baseURL: baseURL, // Add the protocol (http or https) before the hostname
});

const handleRequest = async (method, url, data = null, customHeaders = {}) => {
  try {
    const response = await api({
      method,
      url,
      data,
      headers: {
        // Add your custom headers here
        // For example, you can add an authorization header like this:
        // 'Authorization': 'Bearer your_token'
        ...customHeaders,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error in ${method} request to ${url}:`, error.message);
    return { success: false, err: error.message };
  }
};

export const fetchData = (url) => handleRequest("get", url);

export const postData = (url, data) => handleRequest("post", url, data);

export const updateData = (url, data) => handleRequest("put", url, data);

export const deleteData = (url, data) => handleRequest("delete", url, data);

export const requestData = (method, url, data) =>
  handleRequest(method, url, data);
