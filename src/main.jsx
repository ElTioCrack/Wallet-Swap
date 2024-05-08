import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AuthProvider from "./auth/AuthProvider.jsx";

import App from "./App.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import CreateWalletPage from "./pages/authentication/CreateWalletPage.jsx";
import AccessWalletPage from "./pages/authentication/AccessWalletPage.jsx";
import HelloWorldPage from "./pages/HelloWordPage.jsx";
import WalletPage from "./pages/authentication/WalletPage.jsx";

import "./index.css";
import Example from "./pages/Example.jsx";
import Component from "./pages/component.jsx";

const route = createBrowserRouter([
  {
    path: "/example",
    element: <Example />,
  },
  {
    path: "/component",
    element: <Component />,
  },
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
    path: "/createwallet",
    element: <CreateWalletPage />,
  },
  {
    path: "/accesswallet",
    element: <AccessWalletPage />,
  },
  {
    path: "/wallet",
    // element: <ProtectedRoute />,
    children: [
      {
        path: "/wallet",
        element: <WalletPage />,
      },
    ],
  },
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
