import { useState } from "react";
import api from "../api/api";

export default function BookingForm({ vehicleId, onBooked }) {
  const [form, setForm] = useState({
    fromPincode: "",
    toPincode: "",
    startTime: "",
    customerId: "CUST123"
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post("/bookings", { ...form, vehicleId })
      .then(res => {
        alert("Booking successful!");
        if (onBooked) onBooked(res.data);
      })
      .catch(err => alert(err.response?.data?.message || "Error"));
  };

  return (
    <form onSubmit={handleSubmit} className="card p-3 shadow-sm">
      <h5>Book Vehicle</h5>
      <input type="text" className="form-control mb-2" name="fromPincode" placeholder="From Pincode" onChange={handleChange}/>
      <input type="text" className="form-control mb-2" name="toPincode" placeholder="To Pincode" onChange={handleChange}/>
      <input type="datetime-local" className="form-control mb-2" name="startTime" onChange={handleChange}/>
      <button type="submit" className="btn btn-success w-100">Confirm Booking</button>
    </form>
  );
}
