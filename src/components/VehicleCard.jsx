import React from "react";
import { Card, Button } from "react-bootstrap";
import { Truck } from "lucide-react";

const VehicleCard = ({ vehicle, onBook }) => {
  const isBooked = vehicle.isBooked;

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Card.Title className="d-flex align-items-center">
          <Truck size={18} className="me-2" /> {vehicle.name}
        </Card.Title>

        <Card.Text className="mb-1">Capacity: {vehicle.capacityKg} kg</Card.Text>
        <Card.Text className="mb-1">Tyres: {vehicle.tyres}</Card.Text>

        {vehicle.estimatedRideDurationHours !== undefined && (
          <Card.Text className="text-muted">
            Estimated Ride: {vehicle.estimatedRideDurationHours} hrs
          </Card.Text>
        )}

        {onBook && (
          <Button
            variant={isBooked ? "secondary" : "primary"}
            disabled={isBooked}
            onClick={() => !isBooked && onBook(vehicle)}
          >
            {isBooked ? "Already Booked" : "Book Now"}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default VehicleCard;
