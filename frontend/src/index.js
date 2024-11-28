import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App";
import { GlobalProvider } from "./context/globalContext";
import { GlobalStyle } from "./styles/GlobalStyle";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Auth0Provider } from "@auth0/auth0-react";

import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import PageNotFound from "./pages/PageNotFound";
import Main from "./pages/Main.js";
<script src="https://cdn.lordicon.com/lordicon.js"></script>;

const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter([
  { path: "/", element: <Main /> },
  { path: "*", element: <PageNotFound /> },
]);

root.render(
  <>
    {/* <StrictMode> */}
      <GlobalStyle />
        <GlobalProvider>
          <RouterProvider router={router}>
            <Main />
          </RouterProvider>
        </GlobalProvider>
        <ToastContainer />
    {/* </StrictMode> */}
  </>
);
