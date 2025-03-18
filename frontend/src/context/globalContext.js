import { toast } from "react-toastify";
import React, { useContext, useState, createContext, useEffect } from "react";
import axios from "../utils/axiosConfig.utils.js";
const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const BASE_URL =
    process.env?.BASE_URL || "https://auth-app-cba7.onrender.com";

  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [user, setUser] = useState();
  const [isUpdateForm, setIsUpdateForm] = useState(false);

  const [me, setMe] = useState();
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [success, setSuccess] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [inputState, setInputState] = useState({
    name: "",
    email: "",
    date: "",
    role: "",
    password: "",
    newPassword: "",
    description: "",
  });

  // Effect to log user info on user change
  // useEffect(() => {
  //   console.log(user);
  // }, [user]);

  // Token handling utility

  const getToken = () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }
      return token;
    } catch (error) {
      console.log("Error retrieving token:", error.message);
      return null;
    }
  };

  const getMe = async () => {
    setLoading(true);
    const token = getToken();

    if (!token) {
      console.log("NO TOKEN FOUND");
      setIsAuthenticated(false); // Ensure user is marked as unauthenticated
      setMe(null);
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get(`${BASE_URL}/auth/me`);
      // setMe(response.data.data);
      setIsAuthenticated(true);
      console.log("User logged in:", response.data.data);
      setMe(response.data.data);
    } catch (error) {
      console.log(
        "Error fetching user:",
        error.response?.data || error.message
      );

      // Handle authentication failure
      setIsAuthenticated(false);
      setMe(null);
      // Notify user
      toast.error("Authentication failed. Please log in again.");
    } finally {
      setLoading(false);
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
        body: JSON.stringify(customer),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }
      const data = await response.json();
      localStorage.setItem("token", data.token);
      setMe(data.data);
      return data;
    } catch (error) {
      toast.error(error.message);
      console.log("Login error:", error.message);
      throw error;
    } finally {
      toast.success(`Welcome! ${me.name}`);
      toast.info(`Your role is  ${me.role}. Thank you!`);
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setMe(null);
    toast("User logged out successfully");
    window.location.href = "/";
  };
  const getAllUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/users`);
      // Assuming setAllUsers is a state setter function
      setAllUsers(response.data);
    } catch (error) {
      toast.error(
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
      // setUser(response.data);
      return response;
      console.log("Users fetched successfully:", response.data);
    } catch (error) {
      console.log(
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
      await getAllUsers();
      // Update the allUsers state by excluding the user with the deleted id

      // setAllUsers([
      //   ...allUsers.filter(user => user.id !== id)
      // ]);

      // Redirect the user to the homepage
      // window.location.href = "/";

      console.log(`User with id ${id} deleted successfully.`);
    } catch (error) {
      console.log(
        "Error deleting user:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const updateHandler = async (id) => {
    try {
      setIsUpdateForm(true);
      if (id === me._id) {
        getMe();
      }
      const response = await getUsersById(id);
      const userData = response.data.data;
      setUser(userData);
      // Fetch user details
      if (
        userData &&
        userData.name &&
        userData.email &&
        userData.role &&
        userData.permissions[0]
      ) {
        setInputState({
          name: userData.name,
          role: userData.role,
          email: userData.email,
          description: userData.permissions[0],
        });
      }
    } catch (error) {
      console.log("Failed to fetch user data:", error);
    }
  };

  const updateUser = async (id, updatedData) => {
    try {
      setLoading(true);
      const response = await axios.put(`${BASE_URL}/users/${id}`, updatedData);
      // console.log("User updated successfully:", response.data);
      setMe(response.data.data);
    } catch (error) {
      console.log(
        "Error updating user:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const updateUserFromAdmin = async (id, updatedData) => {
    try {
      setLoading(true);
      const response = await axios.put(
        `${BASE_URL}/users/UpdateByAdmin/${id}`,
        updatedData
      );

      console.log("API Response Data:", response.data); // Debug log

      if (!response.data) {
        throw new Error("No user data received from server");
      }
      const responseUsers = getAllUsers();
      setAllUsers(responseUsers.data);
      // setAllUsers((prevUsers) => {
      //   const filteredUsers = prevUsers.filter(user => String(user._id) !== String(id)); // Remove the old user
      //   const updatedUser = { ...prevUsers.find(user => String(user._id) === String(id)), ...response.data };
      //   return responseUsers; // Add updated user back
      // });

      console.log("User updated successfully:", response.data);
    } catch (error) {
      console.log(
        "Error updating user:",
        error.response?.data || error.message
      );
    } finally {
      setIsUpdateForm(false);
      setInputState({
        name: "",
        email: "",
        date: "",
        role: "",
        password: "",
        newPassword: "",
        description: "",
      });
      setLoading(false);
    }
  };

  const register = async (customer) => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customer),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }
      if (isAuthenticated) {
        const data = await getAllUsers();
        setAllUsers(data.data);
      }

      const temp = await response.json();
      console.log("Registration successful:", temp);
      return temp;
    } catch (error) {
      console.log("Registration error:", error.message);
      throw error;
    } finally {
      setInputState({
        name: "",
        email: "",
        date: "",
        role: "",
        password: "",
        newPassword: "",
        description: "",
      });
      setLoading(false);
    }
  };

  // Incomes and expenses-related functions
  const addIncome = async (income) => {
    try {
      await axios.post(`${BASE_URL}/add-income`, income);
      getIncomes();
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const getIncomes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/get-incomes`);
      setIncomes(response.data);
    } catch (err) {
      setError(err.response?.data?.message);
    }
  };

  const deleteIncome = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/delete-income/${id}`);
      getIncomes();
    } catch (err) {
      setError(err.response?.data?.message);
    }
  };

  const totalIncome = () => {
    return incomes.reduce((total, income) => total + income.amount, 0);
  };

  const addExpense = async (expense) => {
    try {
      await axios.post(`${BASE_URL}/add-expense`, expense);
      getExpenses();
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const getExpenses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/get-expenses`);
      setExpenses(response.data);
    } catch (err) {
      setError(err.response?.data?.message);
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/delete-expense/${id}`);
      getExpenses();
    } catch (err) {
      setError(err.response?.data?.message);
    }
  };

  const totalExpenses = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  const totalBalance = () => {
    return totalIncome() - totalExpenses();
  };

  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return history.slice(0, 3);
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
        register,
        addIncome,
        getIncomes,
        incomes,
        deleteIncome,
        totalIncome,
        addExpense,
        getExpenses,
        expenses,
        deleteExpense,
        totalExpenses,
        totalBalance,
        transactionHistory,
        allUsers,
        setAllUsers,
        register,
        getAllUsers,
        getUsersById,
        deleteUser,
        updateUser,
        getMe,
        me,
        inputState,
        setInputState,
        isUpdateForm,
        updateUserFromAdmin,
        setIsUpdateForm,
        updateHandler,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
