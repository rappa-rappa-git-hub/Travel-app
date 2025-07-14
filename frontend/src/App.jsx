import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [packages, setPackages] = useState([]);
  const [formData, setFormData] = useState({ customerName: '', email: '', packageId: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/api/packages')
      .then(res => setPackages(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleBooking = (e) => {
    e.preventDefault();
    const selectedPackage = packages.find(pkg => pkg.id == formData.packageId);
    axios.post('http://localhost:8080/api/book', {
      customerName: formData.customerName,
      email: formData.email,
      travelPackage: selectedPackage
    }).then(res => {
      setMessage('Booking successful! 🎉');
    }).catch(err => {
      setMessage('Booking failed. Try again!');
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-200 to-indigo-200 p-6">
      <h1 className="text-4xl font-bold text-center text-indigo-800 mb-8">🌍 Travel Booking Portal</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {packages.map(pkg => (
          <div key={pkg.id} className="bg-white p-4 rounded-2xl shadow-md">
            <img src={pkg.imageUrl} alt={pkg.title} className="rounded-lg w-full h-48 object-cover" />
            <h2 className="text-2xl font-semibold mt-2">{pkg.title}</h2>
            <p className="text-sm text-gray-600">{pkg.description}</p>
            <p className="font-bold text-indigo-700 mt-1">₹{pkg.price}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 bg-white p-6 rounded-xl shadow-md max-w-xl mx-auto">
        <h2 className="text-2xl font-semibold text-center text-indigo-700 mb-4">Book Your Trip</h2>
        <form onSubmit={handleBooking} className="space-y-4">
          <input type="text" placeholder="Your Name" required
                 className="w-full p-2 rounded border" value={formData.customerName}
                 onChange={e => setFormData({ ...formData, customerName: e.target.value })} />
          <input type="email" placeholder="Your Email" required
                 className="w-full p-2 rounded border" value={formData.email}
                 onChange={e => setFormData({ ...formData, email: e.target.value })} />
          <select required
                  className="w-full p-2 rounded border"
                  onChange={e => setFormData({ ...formData, packageId: e.target.value })}>
            <option value="">Select Package</option>
            {packages.map(pkg => (
              <option key={pkg.id} value={pkg.id}>{pkg.title}</option>
            ))}
          </select>
          <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700">
            Book Now
          </button>
        </form>
        {message && <p className="text-center mt-4 text-green-700 font-semibold">{message}</p>}
      </div>
    </div>
  );
}

export default App;
