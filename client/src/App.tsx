import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import Dashboard from './dashboard/Dashboard';
import HomePage from './homePage/homePage';
import StatsHome from './stats/StatsHome';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/stats" element={<StatsHome />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
