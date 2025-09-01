import { useState } from 'react';
export default function AddVehicle() {
  const [form, setForm] = useState({ name: '', capacityKg: '', tyres: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/vehicles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        capacityKg: parseInt(form.capacityKg),
        tyres: parseInt(form.tyres)
      })
    });
    const data = await res.json();
    setMessage(res.ok ? 'Vehicle added successfully!' : data.error);
    setForm({ name: '', capacityKg: '', tyres: '' });
  };

  return (
    <div className="card">
      <h3>Add New Vehicle</h3>
      <form onSubmit={handleSubmit} className="form">
        <input name="name" placeholder="Vehicle Name" value={form.name} onChange={handleChange} />
        <input name="capacityKg" type="number" placeholder="Capacity (kg)" value={form.capacityKg} onChange={handleChange} />
        <input name="tyres" type="number" placeholder="Tyres" value={form.tyres} onChange={handleChange} />
        <button type="submit">Add Vehicle</button>
      </form>
      <p>{message}</p>
    </div>
  );
}