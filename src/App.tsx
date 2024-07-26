import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './pages/signup';
import Home from './pages/home';
import Login from './pages/login';
import NotFound from './pages/NotFound';


// Simple authentication check
const isAuthenticated = () => {
  // In a real app, you'd check for a valid token in localStorage or a state management solution
  return localStorage.getItem('token') !== null;
};

// Protected route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <Router>
      <div>
       
        <Routes>
        
          <Route path="/signup" element={<Signup />} />
          <Route path="/notfound" element={<NotFound />} />
          <Route path="*" element={<Navigate to='/notfound'/>} />

          <Route path="/login" element={<Login />} />
          <Route 
            path="/" 
            element={
             
              <ProtectedRoute>
                <Home/>
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;