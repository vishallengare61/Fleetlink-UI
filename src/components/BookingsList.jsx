import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function BookingsList() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/bookings`);
      setBookings(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await axios.delete(`${API_BASE_URL}/bookings/${bookingId}`);
        setBookings(bookings.filter(booking => booking._id !== bookingId));
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to cancel booking');
      }
    }
  };

  if (loading) return <div>Loading bookings...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="bookings-container">
      <h2>All Bookings</h2>
      
      {bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        <div className="bookings-list">
          {bookings.map(booking => (
            <div key={booking._id} className="booking-card">
              <h4>Booking #{booking._id.slice(-6)}</h4>
              <p>Vehicle: {booking.vehicleId?.name || 'Unknown Vehicle'}</p>
              <p>From: {booking.fromPincode} to {booking.toPincode}</p>
              <p>Start: {new Date(booking.startTime).toLocaleString()}</p>
              <p>End: {new Date(booking.endTime).toLocaleString()}</p>
              <p>Duration: {booking.estimatedRideDurationHours} hours</p>
              <p>Customer: {booking.customerId}</p>
              <button 
                onClick={() => handleDelete(booking._id)}
                className="cancel-btn"
              >
                Cancel Booking
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookingsList;