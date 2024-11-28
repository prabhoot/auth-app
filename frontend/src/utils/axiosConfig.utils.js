import axios from "axios";

const getToken = () => {
  try {
    // Assuming the token is stored in localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found");
    }
    return token;
  } catch (error) {
    console.error("Error retrieving token:", error.message);
    return null;
  }
};

// Set up a request interceptor
axios.interceptors.request.use(
  (config) => {
    const token = getToken();
    config.headers = {
      ...config.headers, // Preserve any headers already set
      "Content-Type": "application/json", // Add default Content-Type
      engine: "v3", // Add custom engine header
    };
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add Authorization header if token exists
    }
    return config;
  },
  (error) => {
    // Handle errors before the request is sent
    return Promise.reject(error);
  }
);

// Export the configured Axios instance
export default axios;
