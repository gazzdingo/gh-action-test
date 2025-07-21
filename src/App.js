import React from 'react';
import { GrowthBookProvider } from '@growthbook/growthbook-react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { gb } from './growthbook';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import './App.css';

function App() {
  return (
    <GrowthBookProvider growthbook={gb}>
      <Router>
        <div className="App">
          <nav className="navbar">
            <div className="nav-brand">
              <h1>GrowthBook Test App</h1>
            </div>
            <div className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/settings">Settings</Link>
            </div>
          </nav>
          
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
          
          <footer className="footer">
            <p>GrowthBook Feature Flag Test Application</p>
          </footer>
        </div>
      </Router>
    </GrowthBookProvider>
  );
}

export default App;
