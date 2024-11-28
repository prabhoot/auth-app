import React, { useContext, useState, createContext, useEffect } from "react";
import axios from "../utils/axiosConfig.utils.js";
const GlobalContext = createContext();
export const GlobalProvider = ({ children }) => {
  const BASE_URL = "http://localhost:4000";
  const [user, setUser] = useState();
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [success, setSuccess] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  useEffect(() => {
    console.log(user);
  }, [user,[]]);
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

  const getMe = async () => {
    setLoading(true);
    const token = getToken();
    if (token) {
      try {
        const response = await axios.get(`${BASE_URL}/auth/me`);
        setUser(response.data.data);
        setIsAuthenticated(true);
        console.log("User fetched successfully:", response.data.data);
      } catch (error) {
        console.error(
          "Error fetching user:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    } else {
      console.log("NO TOKEN FOUND");
    }
  };

  const getAllUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/users`);
      // Assuming setAllUsers is a state setter function
      setAllUsers(response.data);
    } catch (error) {
      console.error(
        "Error fetching users:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const getUsersById = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/users/${id}`);
      setAllUsers(response.data);
      console.log("Users fetched successfully:", response.data);
    } catch (error) {
      console.error(
        "Error fetching users:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${BASE_URL}/users/${id}`);
        window.location.href = "/";
      console.log(`User with id ${id} deleted successfully.`);
    } catch (error) {
      console.error(
        "Error deleting user:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (id, updatedData) => {
    try {
      setLoading(true);
      const response = await axios.put(`${BASE_URL}/users/${id}`, updatedData);
      // console.log("User updated successfully:", response.data);
      setUser(response.data.data);
    } catch (error) {
      console.error(
        "Error updating user:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const usersUpdateByAdmin = async (id, updatedData) => {
    try {
      setLoading(true);
      const response = await axios.put(
        `${BASE_URL}/users/UpdateByAdmin/${id}`,
        updatedData
      );
      setAllUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id ? { ...user, ...response.data } : user
        )
      );
      console.log("User updated successfully:", response.data);
    } catch (error) {
      console.error(
        "Error updating user:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // const updateCustomer = async (customer) => {
  //   try {
  //     console.log(`customer at update is: ${customer}`);
  //     const response = await axios.post(
  //       `${BASE_URL}update/customer/${id}`,
  //       { customer: customer },
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${localStorage.getItem('token')}`,
  //         },
  //       }
  //     );
  //     getCustomers();
  //   } catch (err) {
  //     setError(err.response.data.message);
  //   }
  // };

  // const totalCustomers = () => {
  //   return customers.data?.length;
  // };

  // const addOrder = async (customer) => {
  //   try {
  //     await axios.post(
  //       `${BASE_URL}orders`,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       },
  //       customer
  //     );
  //     getOrders();
  //   } catch (err) {
  //     setError(err.response.data.message);
  //   }
  // };

  // const getOrders = async () => {
  //   const response = await axios.get(`${BASE_URL}orders`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //     },
  //   });
  //   setOrders(response.data);
  //   console.log(response.data);
  // };

  // const deleteOrder = async (id) => {
  //   await axios.delete(`${BASE_URL}orders/${id}`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //     },
  //   });
  //   getOrders();
  // };

  // const totalOrders = () => {
  //   return orders.data?.length;
  // };
  const register = async (customer) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customer), // Convert the customer object to JSON
      });

      // Handle HTTP errors (non-2xx responses)
      if (!response.ok) {
        const errorData = await response.json(); // Parse error response body
        throw new Error(errorData.message || "Registration failed"); // Rethrow with message
      }

      const data = await response.json(); // Parse success response body
      console.log("Registration successful:", data);
      return data; // Return only the necessary data
    } catch (error) {
      console.error("Registration error:", error.message);
      throw error; // Re-throw error for caller to handle
    }
  };
  const login = async (customer) => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customer), // Convert the customer object to JSON
      });

      // Handle HTTP errors (non-2xx responses)
      if (!response.ok) {
        const errorData = await response.json(); // Parse error response body
        throw new Error(errorData.message || "Login failed"); // Rethrow with message
      }

      const data = await response.json(); // Parse success response body
      console.log("Login successful:", data);
      localStorage.setItem("token", data.token); // Store the token in localStorage
      setUser(data.data); // Set the current user in the context
      return data; // Return the parsed response data
    } catch (error) {
      console.error("Login error:", error.message);
      throw error; // Re-throw error for caller to handle
    }
  };

  // const id =localStorage.getItem("userId") || ""
  const logout = () => {
    localStorage.removeItem("token"); // Remove the token from localStorage
    console.log("User logged out successfully");
    window.location.href = "/"; // Redirect user to login or home page
  };

  return (
    <GlobalContext.Provider
      value={{
        error,
        setError,
        success,
        setSuccess,
        BASE_URL,
        isAuthenticated,
        setIsAuthenticated,
        loading,
        setLoading,
        user,
        setUser,
        login,
        logout,
        allUsers,
        setAllUsers,
        register,
        getAllUsers,
        getUsersById,
        deleteUser,
        updateUser,
        usersUpdateByAdmin,
        getMe,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
