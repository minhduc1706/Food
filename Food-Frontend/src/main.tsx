import React from "react";
import ReactDOM from "react-dom/client";

import "./globals.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRouter";
import Auth0ProviderWithNavigate from "./auth/Auth0ProviderWithNavigate";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Auth0ProviderWithNavigate>
        <AppRoutes />
      </Auth0ProviderWithNavigate>
    </Router>
  </React.StrictMode>
);
