import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import ScannerSetup from './components/ScannerSetup';
import Inventory from './components/Inventory';
import Reports from './components/Reports';
import NotFound from './pages/NotFound';
// import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [scannerInfo, setScannerInfo] = useState(null);

  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route 
            path="/login" 
            element={<Login setIsAuthenticated={setIsAuthenticated} />} 
          />
          
          <Route
            path="/scanner-setup"
            element={
              <PrivateRoute>
                <ScannerSetup setScannerInfo={setScannerInfo} />
              </PrivateRoute>
            }
          />
          <Route
            path="/inventory"
            element={
              <PrivateRoute>
                <Inventory scannerInfo={scannerInfo} />
              </PrivateRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <PrivateRoute>
                <Reports />
              </PrivateRoute>
            }
          />
          <Route
            path="/"
            element={<Navigate to="/login" />}
          />

          <Route 
            path="*" 
            element={<NotFound />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;