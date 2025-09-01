import { useState } from 'react';
export default function SearchAndBook() {
  const [form, setForm] = useState({ capacityRequired: '', fromPincode: '', toPincode: '', startTime: '' });
  const [vehicles, setVehicles] = useState([]);
  const [rideDuration, setRideDuration] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const search = async () => {
    const query = new URLSearchParams(form).toString();
    const res = await fetch(`http://localhost:5000/api/vehicles/available?${query}`);
    const data = await res.json();
    if (res.ok) {
      setVehicles(data.availableVehicles);
      setRideDuration(data.estimatedRideDurationHours);
      setMessage('');
    } else {
      setMessage(data.error);
      setVehicles([]);
    }
  };

  const book = async (vehicleId,vehiclename) => {
    const res = await fetch('http://localhost:5000/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, vehicleId,vehiclename, customerId: 'demoCustomer123' })
    });
    const data = await res.json();
    setMessage(res.ok ? 'Booking successful!' : data.error);
  };

  return (
    <div  className="card">
      <h3>Search & Book Vehicle</h3>
      <div className="form">
        <input name="capacityRequired" placeholder="Capacity Required (kg)" onChange={handleChange} />
        <input name="fromPincode" placeholder="From Pincode" onChange={handleChange} />
        <input name="toPincode" placeholder="To Pincode" onChange={handleChange} />
        <input name="startTime" type="datetime-local" onChange={handleChange} />
        <button onClick={search}>Search Availability</button>
      </div>

      {vehicles.length > 0 && (
        <div>
          <h4>Available Vehicles (Estimated Ride Duration: {rideDuration} hrs)</h4>
          {vehicles.map(v => (
            <div key={v._id} className="vehicle-card">
              <p><strong>{v.name}</strong></p>
              <p>Capacity: {v.capacityKg} kg</p>
              <p>Tyres: {v.tyres}</p>
              <button onClick={() => book(v._id , v.name)}>Book Now</button>
            </div>
          ))}
        </div>
      )}
      <p>{message}</p>
    </div>
  );
}
