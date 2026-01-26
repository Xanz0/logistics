import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, logout, getAllUsers } from '../utils/auth';
import { getDriverRatings } from '../utils/ratings';
import '../styles/profile.css';

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [ratings, setRatings] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const currentUser = getUser();
    if (!currentUser) {
      navigate('/');
      return;
    }
    
    setUser(currentUser);
    setFormData({
      name: currentUser.name,
      email: currentUser.email
    });

    // Load driver ratings if user is driver
    if (currentUser.role === 'driver') {
      const driverRatings = getDriverRatings(currentUser.id);
      setRatings(driverRatings);
    }

    // Load user stats
    loadStats(currentUser);
  }, []);

  const loadStats = (currentUser) => {
    // This would normally come from API
    const orderExtraData = JSON.parse(localStorage.getItem('order_extra_data') || '{}');
    
    if (currentUser.role === 'driver') {
      const myOrders = Object.values(orderExtraData).filter(
        data => data.driverId === currentUser.id
      );
      setStats({
        totalDeliveries: myOrders.filter(o => o.delivered).length,
        inProgress: myOrders.filter(o => !o.delivered).length
      });
    }
  };

  const handleSave = () => {
    // Update user in localStorage
    const usersDb = getAllUsers();
    const updatedUser = { ...user, ...formData };
    usersDb[user.email] = updatedUser;
    localStorage.setItem('users_database', JSON.stringify(usersDb));
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    setUser(updatedUser);
    setEditing(false);
    alert('Profile updated successfully!');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleBack = () => {
    if (user.role === 'admin') navigate('/admin');
    else if (user.role === 'driver') navigate('/driver');
    else navigate('/customer');
  };

  if (!user) return null;

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <button onClick={handleBack} className="back-btn">← Back</button>
          <h1>Profile Settings</h1>
        </div>

        <div className="profile-content">
          {/* Avatar Section */}
          <div className="profile-avatar-section">
            <div className="profile-avatar">
              {user.role === 'admin' ? '👑' : user.role === 'driver' ? '🚗' : '👤'}
            </div>
            <div className="profile-role-badge">{user.role}</div>
          </div>

          {/* Info Section */}
          <div className="profile-info">
            {editing ? (
              <div className="edit-form">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    disabled
                    title="Email cannot be changed"
                  />
                </div>

                <div className="edit-actions">
                  <button onClick={() => setEditing(false)} className="cancel-btn">
                    Cancel
                  </button>
                  <button onClick={handleSave} className="save-btn">
                    Save Changes
                  </button>
                </div>
              </div>
            ) : (
              <div className="info-display">
                <div className="info-item">
                  <span className="info-label">Name</span>
                  <span className="info-value">{user.name}</span>
                </div>
                
                <div className="info-item">
                  <span className="info-label">Email</span>
                  <span className="info-value">{user.email}</span>
                </div>

                <div className="info-item">
                  <span className="info-label">Member Since</span>
                  <span className="info-value">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {user.role === 'driver' && user.rating && (
                  <div className="info-item">
                    <span className="info-label">Rating</span>
                    <span className="info-value">⭐ {user.rating.toFixed(1)} ({ratings.length} reviews)</span>
                  </div>
                )}

                <button onClick={() => setEditing(true)} className="edit-btn">
                  Edit Profile
                </button>
              </div>
            )}
          </div>

          {/* Stats Section */}
          {stats && (
            <div className="profile-stats">
              <h3>Statistics</h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-value">{stats.totalDeliveries}</span>
                  <span className="stat-label">Completed</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{stats.inProgress}</span>
                  <span className="stat-label">In Progress</span>
                </div>
              </div>
            </div>
          )}

          {/* Recent Ratings (for drivers) */}
          {user.role === 'driver' && ratings.length > 0 && (
            <div className="recent-ratings">
              <h3>Recent Reviews</h3>
              <div className="ratings-list">
                {ratings.slice(0, 5).map((rating, idx) => (
                  <div key={idx} className="rating-item">
                    <div className="rating-stars">
                      {'⭐'.repeat(rating.rating)}
                    </div>
                    {rating.comment && <p className="rating-comment">{rating.comment}</p>}
                    <span className="rating-date">
                      {new Date(rating.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Danger Zone */}
          <div className="danger-zone">
            <h3>Danger Zone</h3>
            <button onClick={handleLogout} className="logout-btn">
              🚪 Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}