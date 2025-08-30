
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";

const BookingConfirmation = () => {
  const { state } = useLocation();
  const booking = state || null;

  return (
    <Container className="py-4">
      <Card className="p-4 shadow-sm text-center">
        {!booking ? (
          <>
            <h4>No booking data available</h4>
            <Link to="/search-book"><Button className="mt-3">Back to Search</Button></Link>
          </>
        ) : (
          <>
            <h2 className="text-success">✅ Booking Confirmed</h2>
            <p><strong>Booking ID:</strong> {booking._id}</p>
            <p><strong>Vehicle:</strong> {booking.vehicleId}</p>
            <p><strong>From:</strong> {booking.fromPincode} → <strong>To:</strong> {booking.toPincode}</p>
            <p><strong>Start:</strong> {new Date(booking.startTime).toLocaleString()}</p>
            <p><strong>End:</strong> {new Date(booking.endTime).toLocaleString()}</p>
            <Link to="/"><Button className="mt-3">Go Home</Button></Link>
          </>
        )}
      </Card>
    </Container>
  );
}

export default BookingConfirmation