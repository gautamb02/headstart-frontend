import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Signup from "./pages/signup";
import Home from "./pages/home";
import Login from "./pages/login";
import NotFound from "./pages/NotFound";
import { OrganizationProvider } from "./context/organization/context";
import Members from "./pages/members";
import ProtectedLayout from "./ProtectedLayout";
import { RolesProvider } from "./context/roles/context";
import Chat from "./pages/chat";
import Settings from "./pages/settings";

// Simple authentication check
const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

// Protected route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <ProtectedLayout>{children}</ProtectedLayout>;
};

// Redirect if already authenticated
const RedirectIfAuthenticated: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  if (isAuthenticated()) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

const LogOut = () => {
  localStorage.removeItem("token");
  return <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <OrganizationProvider>
      <RolesProvider>
        <Router>
          <Routes>
            <Route
              path="/signup"
              element={
                <RedirectIfAuthenticated>
                  <Signup />
                </RedirectIfAuthenticated>
              }
            />
            <Route
              path="/login"
              element={
                <RedirectIfAuthenticated>
                  <Login />
                </RedirectIfAuthenticated>
              }
            />
            <Route path="/logout" element={<LogOut />} />
            <Route path="/notfound" element={<NotFound />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/members"
              element={
                <ProtectedRoute>
                  <Members />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chat"
              element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/notfound" />} />
          </Routes>
        </Router>
      </RolesProvider>
    </OrganizationProvider>

  );
};

export default App;
