import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Composants
import Navbar from './components/Navbar';
import Home from './pages/Home';
import StudentsList from './pages/Etudiants/StudentsList';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/etudiants" element={<StudentsList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;