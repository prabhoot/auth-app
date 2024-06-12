import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/App';
import { GlobalProvider } from './context/globalContext';
import { GlobalStyle } from './styles/GlobalStyle';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import Campaign from './pages/Campaign';
<script src='https://cdn.lordicon.com/lordicon.js'></script>;

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  { path: '/', element: <LoginPage/> },
  { path: '/dashboard', element: <App/> },
  { path: '/orders', element: <App/> },
  { path: '/customers', element: <App/> },
  { path: '/Campaign', element: <App/> },
  { path: '/auth/login', element: <LoginPage /> },
]);

root.render(
    <>
    <GlobalStyle />
    <GlobalProvider>
      <RouterProvider router={router}>
        <App/>
        <ToastContainer/>
      </RouterProvider>
    </GlobalProvider>
    </>
);
