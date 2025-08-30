import { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function AddVehicle() {
  const [formData, setFormData] = useState({
    name: '',
    capacityKg: '',
    tyres: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await axios.post(`${API_BASE_URL}/vehicles`, {
        ...formData,
        capacityKg: parseFloat(formData.capacityKg),
        tyres: parseInt(formData.tyres)
      });

      setMessage('Vehicle added successfully!');
      setFormData({ name: '', capacityKg: '', tyres: '' });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add vehicle');
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Vehicle</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Capacity (KG):</label>
          <input
            type="number"
            name="capacityKg"
            value={formData.capacityKg}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
          />
        </div>

        <div className="form-group">
          <label>Tyres:</label>
          <input
            type="number"
            name="tyres"
            value={formData.tyres}
            onChange={handleChange}
            min="0"
            required
          />
        </div>

        <button type="submit">Add Vehicle</button>
      </form>

      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default AddVehicle;