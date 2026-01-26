import { useState, useEffect } from 'react';
import '../styles/calculator.css';

// Simple distance calculator based on city pairs (demo data)
const CITY_DISTANCES = {
  'Tashkent-Samarkand': 280,
  'Tashkent-Bukhara': 450,
  'Tashkent-Andijan': 350,
  'Tashkent-Fergana': 330,
  'Tashkent-Namangan': 290,
  'Samarkand-Bukhara': 270,
  'Samarkand-Tashkent': 280,
  'Bukhara-Tashkent': 450,
  'Andijan-Tashkent': 350,
  'Fergana-Tashkent': 330,
  'Namangan-Tashkent': 290,
  'Bukhara-Samarkand': 270
};

const CITIES = [
  'Tashkent', 'Samarkand', 'Bukhara', 'Andijan', 
  'Fergana', 'Namangan', 'Khiva', 'Nukus'
];

export default function PriceCalculator({ onCalculate }) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [weight, setWeight] = useState('');
  const [calculatedPrice, setCalculatedPrice] = useState(null);
  const [distance, setDistance] = useState(null);

  const calculatePrice = () => {
    if (!from || !to || !weight) {
      alert('Please fill all fields');
      return;
    }

    if (from === to) {
      alert('From and To locations must be different');
      return;
    }

    // Get distance
    const key1 = `${from}-${to}`;
    const key2 = `${to}-${from}`;
    let dist = CITY_DISTANCES[key1] || CITY_DISTANCES[key2] || 200; // Default 200km

    // Price calculation formula:
    // Base price: $10
    // Distance: $0.15 per km
    // Weight: $2 per kg
    const basePrice = 10;
    const distancePrice = dist * 0.15;
    const weightPrice = parseFloat(weight) * 2;
    const total = basePrice + distancePrice + weightPrice;

    setDistance(dist);
    setCalculatedPrice(total.toFixed(2));

    if (onCalculate) {
      onCalculate({
        from,
        to,
        weight: parseFloat(weight),
        distance: dist,
        price: parseFloat(total.toFixed(2))
      });
    }
  };

  return (
    <div className="price-calculator">
      <h3>💰 Price Calculator</h3>
      <p className="calculator-desc">Calculate shipping price based on distance and weight</p>

      <div className="calculator-form">
        <div className="form-row">
          <div className="form-group">
            <label>From</label>
            <select value={from} onChange={(e) => setFrom(e.target.value)}>
              <option value="">Select city</option>
              {CITIES.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>To</label>
            <select value={to} onChange={(e) => setTo(e.target.value)}>
              <option value="">Select city</option>
              {CITIES.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter weight"
            min="0.1"
            step="0.1"
          />
        </div>

        <button onClick={calculatePrice} className="calculate-btn">
          Calculate Price
        </button>

        {calculatedPrice && (
          <div className="price-result">
            <div className="result-item">
              <span>Distance:</span>
              <strong>{distance} km</strong>
            </div>
            <div className="result-item">
              <span>Weight:</span>
              <strong>{weight} kg</strong>
            </div>
            <div className="result-item total">
              <span>Total Price:</span>
              <strong>${calculatedPrice}</strong>
            </div>
            <div className="price-breakdown">
              <small>Base: $10 + Distance: ${(distance * 0.15).toFixed(2)} + Weight: ${(parseFloat(weight) * 2).toFixed(2)}</small>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}