import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Collaboration from './components/Collaboration';
import Dashboard from './components/Dashboard';
import Feedback from './components/Feedback';
import IdeaSubmission from './components/IdeaSubmission';
import Login from './components/Login';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './components/Register';
import Reward from './components/Reward';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <Navbar /> {/* Navbar for protected routes */}
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/collaboration" element={<Collaboration />} />
                  <Route path="/feedback" element={<Feedback />} />
                  <Route path="/idea-submission" element={<IdeaSubmission />} />
                  <Route path="/reward" element={<Reward />} />
                </Routes>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
