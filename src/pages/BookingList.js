import { useEffect, useState } from 'react';
export default function BookingList() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const res = await fetch('http://localhost:5000/api/bookings');
    const data = await res.json();
    setBookings(data);
  };

  const cancelBooking = async (id) => {
    const res = await fetch(`http://localhost:5000/api/bookings/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setBookings(bookings.filter(b => b._id !== id));
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="card">
      <h3>Current Bookings</h3>
      {bookings.map(b => (
        <div key={b._id} className="booking-card">
          <p>Vehicle ID: {b.vehicleId}</p>
          <p>Vehicle Name: {b.vehiclename}</p>
          <p>From: {b.fromPincode} → To: {b.toPincode}</p>
          <p>Start: {new Date(b.startTime).toLocaleString()}</p>
          <p>End: {new Date(b.endTime).toLocaleString()}</p>
          <button onClick={() => cancelBooking(b._id)}>Cancel Booking</button>
        </div>
      ))}
    </div>
  );
}
