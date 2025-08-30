import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddVehicle from './components/AddVehicle';
import BookingsList from './components/BookingsList';
import './index.css';
import SearchBook from './components/SearchAndBook';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <h1>FleetLink Logistics</h1>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/add-vehicle">Add Vehicle</Link></li>
            <li><Link to="/search-book">Search & Book</Link></li>
            <li><Link to="/bookings">View Bookings</Link></li>
          </ul>
        </nav>

        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-vehicle" element={<AddVehicle />} />
            <Route path="/search-book" element={<SearchBook />} />
            <Route path="/bookings" element={<BookingsList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="home">
      <h2>Welcome to FleetLink</h2>
      <p>Manage your logistics vehicle bookings efficiently</p>
    </div>
  );
}

export default App;