import { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function SearchBook() {
  const [searchData, setSearchData] = useState({
    capacityRequired: '',
    fromPincode: '',
    toPincode: '',
    startTime: new Date()
  });
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSearchChange = (e) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value
    });
  };

  const handleDateChange = (date) => {
    setSearchData({
      ...searchData,
      startTime: date
    });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setVehicles([]);
    setMessage('');
    setError('');

    try {
      const response = await axios.get(`${API_BASE_URL}/vehicles/available`, {
        params: {
          capacityRequired: searchData.capacityRequired,
          fromPincode: searchData.fromPincode,
          toPincode: searchData.toPincode,
          startTime: searchData.startTime.toISOString()
        }
      });

      setVehicles(response.data);
      if (response.data.length === 0) {
        setMessage('No vehicles available for the specified criteria');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to search vehicles');
    } finally {
      setLoading(false);
    }
  };

  const handleBook = async (vehicleId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/bookings`, {
        vehicleId,
        fromPincode: searchData.fromPincode,
        toPincode: searchData.toPincode,
        startTime: searchData.startTime.toISOString(),
        customerId: 'cust-' + Math.random().toString(36).substr(2, 9) 
      });

      setMessage('Booking successful!');
      setVehicles([]); 
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create booking');
    }
  };

  return (
    <div className="search-container">
      <h2>Search & Book Vehicles</h2>
      
      <form onSubmit={handleSearch} className="search-form">
        <div className="form-group">
          <label>Capacity Required (KG):</label>
          <input
            type="number"
            name="capacityRequired"
            value={searchData.capacityRequired}
            onChange={handleSearchChange}
            min="0"
            step="0.01"
            required
          />
        </div>

        <div className="form-group">
          <label>From Pincode:</label>
          <input
            type="text"
            name="fromPincode"
            value={searchData.fromPincode}
            onChange={handleSearchChange}
            pattern="[0-9]{6}"
            required
          />
        </div>

        <div className="form-group">
          <label>To Pincode:</label>
          <input
            type="text"
            name="toPincode"
            value={searchData.toPincode}
            onChange={handleSearchChange}
            pattern="[0-9]{6}"
            required
          />
        </div>

        <div className="form-group">
          <label>Start Time:</label>
          <DatePicker
            selected={searchData.startTime}
            onChange={handleDateChange}
            showTimeSelect
            dateFormat="Pp"
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search Availability'}
        </button>
      </form>

      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}

      {vehicles.length > 0 && (
        <div className="results">
          <h3>Available Vehicles</h3>
          <div className="vehicle-list">
            {vehicles.map(vehicle => (
              <div key={vehicle._id} className="vehicle-card">
                <h4>{vehicle.name}</h4>
                <p>Capacity: {vehicle.capacityKg} KG</p>
                <p>Tyres: {vehicle.tyres}</p>
                <p>Estimated Ride Duration: {vehicle.estimatedRideDurationHours} hours</p>
                <button onClick={() => handleBook(vehicle._id)}>Book Now</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBook;