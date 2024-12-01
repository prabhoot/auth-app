import React, { useEffect } from "react";
import LoginPage from "./LoginPage.js";
import App from "./App.js";
const { useGlobalContext } = require("../context/globalContext");
function Main() {
  const { getMe,getAllUsers,user,isAuthenticated } = useGlobalContext();
  useEffect(() => {
    getMe();
  }, []);
  useEffect(() => {
    isAuthenticated && getAllUsers();
  }, [user]);

  return isAuthenticated ? <App /> : <LoginPage />;
}
export default Main;
