import { useState, useEffect } from 'react';
import { getAllUsers } from '../../utils/auth.js';
import '../../styles/leaderboard.css';

export default function DriverLeaderboard({ onClose }) {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    loadDrivers();
  }, []);

  const loadDrivers = () => {
    const users = getAllUsers();
    const allDrivers = Object.values(users)
      .filter(u => u.role === 'driver')
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 10); // Top 10
    
    setDrivers(allDrivers);
  };

  const getMedalEmoji = (index) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `${index + 1}.`;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="leaderboard-modal" onClick={(e) => e.stopPropagation()}>
        <div className="leaderboard-header">
          <h2>🏆 Top Drivers</h2>
          <button onClick={onClose} className="close-btn">✕</button>
        </div>

        <div className="leaderboard-list">
          {drivers.length === 0 ? (
            <div className="no-drivers">
              <p>No drivers yet</p>
            </div>
          ) : (
            drivers.map((driver, index) => (
              <div 
                key={driver.id} 
                className={`leaderboard-item ${index < 3 ? 'top-three' : ''}`}
              >
                <div className="rank">{getMedalEmoji(index)}</div>
                
                <div className="driver-avatar">
                  🚗
                </div>
                
                <div className="driver-info">
                  <h3>{driver.name}</h3>
                  <p className="driver-email">{driver.email}</p>
                </div>
                
                <div className="driver-stats">
                  <div className="rating">
                    <span className="stars">⭐ {(driver.rating || 5).toFixed(1)}</span>
                    {driver.totalRatings && (
                      <span className="review-count">({driver.totalRatings} reviews)</span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <button 
          onClick={onClose}
          className="close-bottom-btn"
        >
          Close
        </button>
      </div>
    </div>
  );
}