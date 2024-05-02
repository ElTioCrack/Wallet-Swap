import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AuthProvider from "./auth/AuthProvider.jsx";

import App from "./App.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import CreateWalletPage from "./pages/authentication/CreateWalletPage.jsx";
import RegisterPage from "./pages/authentication/RegisterPage.jsx";
import HelloWorldPage from "./pages/HelloWordPage.jsx";

import "./index.css";
import Example from "./pages/Example.jsx";
import Component from "./pages/component.jsx";

const route = createBrowserRouter([
  {
    path: "/helloworld",
    element: <HelloWorldPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/example",
    element: <Example />,
  },
  {
    path: "/component",
    element: <Component />,
  },
  {
    path: "/createwallet",
    element: <CreateWalletPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  // {
  //   path: "/",
  //   element: <ProtectedRoute />,
  //   children: [
  //     {
  //       path: "/dashboard",
  //       element: <Dashboard />,
  //     },
  //   ],
  // },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <React.StrictMode>
      <AuthProvider>
        <RouterProvider router={route} />
      </AuthProvider>
    </React.StrictMode>
  </>
);
