import React, { useEffect } from "react";
import LoginPage from "./LoginPage.js";
import App from "./App.js";
import useAuth from "../hooks/useAuth.js";
const { useGlobalContext } = require("../context/globalContext");
function Main() {
  const { getMe } = useGlobalContext();
  const isAuthenticated=useAuth();
  useEffect(() => {
    getMe();
  }, [isAuthenticated]);

  return isAuthenticated ? <App /> : <LoginPage />;
}
export default Main;
