import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../api/api";
import VehicleCard from "../components/VehicleCard";

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const location = useLocation();
  
  // Get search params from URL
  const query = new URLSearchParams(location.search);
  const capacityRequired = query.get("capacityRequired");
  const fromPincode = query.get("fromPincode");
  const toPincode = query.get("toPincode");
  const startTime = query.get("startTime");

  useEffect(() => {
    if (capacityRequired && fromPincode && toPincode && startTime) {
      api.get("/vehicles/available", {
        params: { capacityRequired, fromPincode, toPincode, startTime }
      })
        .then(res => setVehicles(res.data))
        .catch(err => console.error(err));
    }
  }, [capacityRequired, fromPincode, toPincode, startTime]);

  const handleBook = ()=>{
    
  }

  return (
    <div className="container py-4">
      <h2 className="mb-3">Available Vehicles</h2>
      <div className="row">
        {vehicles.map(v => (
          <div key={v._id} className="col-md-4">
            <VehicleCard vehicle={v} onBook={handleBook} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vehicles;
