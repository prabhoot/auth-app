import React, { useEffect } from "react";
import LoginPage from "./LoginPage.js";
import App from "./App.js";
const { useGlobalContext } = require("../context/globalContext");
function Main() {
  const { getMe,getAllUsers,user } = useGlobalContext();
  useEffect(() => {
    getMe();
  }, []);
  useEffect(() => {
    getAllUsers();
  }, [user]);

  const { isAuthenticated } = useGlobalContext();
  return isAuthenticated ? <App /> : <LoginPage />;
}
export default Main;
