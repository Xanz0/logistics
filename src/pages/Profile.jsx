// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getUser, logout } from '../utils/auth';
// import { getDriverRatings } from '../utils/rating';
// import { fetchOrders } from '../utils/api';
// import '../styles/profile.css';

// export default function Profile() {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [editing, setEditing] = useState(false);
//   const [formData, setFormData] = useState({});
//   const [ratings, setRatings] = useState([]);
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const currentUser = getUser();
//     if (!currentUser) {
//       navigate('/');
//       return;
//     }
    
//     setUser(currentUser);
//     setFormData({
//       name: currentUser.name,
//       email: currentUser.email,
//       phone: currentUser.phone || ''
//     });

//     loadUserData(currentUser);
//   }, []);

//   const loadUserData = async (currentUser) => {
//     try {
//       // Load driver ratings if user is driver
//       if (currentUser.role === 'driver') {
//         const driverRatings = getDriverRatings(currentUser.id);
//         setRatings(driverRatings);
//       }

//       // Load user stats
//       const orders = await fetchOrders();
      
//       if (currentUser.role === 'customer') {
//         const myOrders = orders.filter(o => o.customerId === currentUser.id);
//         setStats({
//           totalOrders: myOrders.length,
//           pending: myOrders.filter(o => o.status === 'pending').length,
//           inProgress: myOrders.filter(o => o.status === 'in-progress').length,
//           delivered: myOrders.filter(o => o.status === 'delivered').length
//         });
//       } else if (currentUser.role === 'driver') {
//         const myOrders = orders.filter(o => o.driverId === currentUser.id);
//         setStats({
//           totalDeliveries: myOrders.filter(o => o.delivered).length,
//           inProgress: myOrders.filter(o => o.status === 'in-progress').length
//         });
//       }
//     } catch (error) {
//       console.error('Error loading user data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSave = () => {
//     // Update user in localStorage
//     const usersDb = JSON.parse(localStorage.getItem('users_database') || '{}');
//     const updatedUser = { ...user, ...formData };
//     usersDb[user.email] = updatedUser;
//     localStorage.setItem('users_database', JSON.stringify(usersDb));
//     localStorage.setItem('user', JSON.stringify(updatedUser));
    
//     setUser(updatedUser);
//     setEditing(false);
//     alert('Profile updated successfully!');
//   };

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   const handleBack = () => {
//     if (user.role === 'admin') navigate('/admin');
//     else if (user.role === 'driver') navigate('/driver');
//     else navigate('/customer');
//   };

//   if (loading || !user) {
//     return (
//       <div style={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: '100vh',
//         background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//         color: 'white'
//       }}>
//         <h2>Loading...</h2>
//       </div>
//     );
//   }

//   return (
//     <div className="profile-page">
//       <div className="profile-container">
//         <div className="profile-header">
//           <button onClick={handleBack} className="back-btn">← Back</button>
//           <h1>Profile Settings</h1>
//         </div>

//         <div className="profile-content">
//           {/* Avatar Section */}
//           <div className="profile-avatar-section">
//             <div className="profile-avatar">
//               {user.role === 'admin' ? '👑' : user.role === 'driver' ? '🚗' : '👤'}
//             </div>
//             <div className="profile-role-badge">{user.role}</div>
//           </div>

//           {/* Info Section */}
//           <div className="profile-info">
//             {editing ? (
//               <div className="edit-form">
//                 <div className="form-group">
//                   <label>Name</label>
//                   <input
//                     type="text"
//                     value={formData.name}
//                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                   />
//                 </div>
                
//                 <div className="form-group">
//                   <label>Email</label>
//                   <input
//                     type="email"
//                     value={formData.email}
//                     disabled
//                     title="Email cannot be changed"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label>Phone Number</label>
//                   <input
//                     type="tel"
//                     value={formData.phone}
//                     onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//                     placeholder="+998 90 123 45 67"
//                   />
//                 </div>

//                 <div className="edit-actions">
//                   <button onClick={() => setEditing(false)} className="cancel-btn">
//                     Cancel
//                   </button>
//                   <button onClick={handleSave} className="save-btn">
//                     Save Changes
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <div className="info-display">
//                 <div className="info-item">
//                   <span className="info-label">Name</span>
//                   <span className="info-value">{user.name}</span>
//                 </div>
                
//                 <div className="info-item">
//                   <span className="info-label">Email</span>
//                   <span className="info-value">{user.email}</span>
//                 </div>

//                 <div className="info-item">
//                   <span className="info-label">Phone</span>
//                   <span className="info-value">{user.phone || 'Not set'}</span>
//                 </div>

//                 <div className="info-item">
//                   <span className="info-label">Member Since</span>
//                   <span className="info-value">
//                     {new Date(user.createdAt).toLocaleDateString()}
//                   </span>
//                 </div>

//                 {user.role === 'driver' && user.rating && (
//                   <div className="info-item">
//                     <span className="info-label">Rating</span>
//                     <span className="info-value">⭐ {user.rating.toFixed(1)} ({ratings.length} reviews)</span>
//                   </div>
//                 )}

//                 <button onClick={() => setEditing(true)} className="edit-btn">
//                   Edit Profile
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* Stats Section */}
//           {stats && (
//             <div className="profile-stats">
//               <h3>Statistics</h3>
//               <div className="stats-grid">
//                 {user.role === 'customer' ? (
//                   <>
//                     <div className="stat-item">
//                       <span className="stat-value">{stats.totalOrders}</span>
//                       <span className="stat-label">Total Orders</span>
//                     </div>
//                     <div className="stat-item">
//                       <span className="stat-value">{stats.pending}</span>
//                       <span className="stat-label">Pending</span>
//                     </div>
//                     <div className="stat-item">
//                       <span className="stat-value">{stats.inProgress}</span>
//                       <span className="stat-label">In Progress</span>
//                     </div>
//                     <div className="stat-item">
//                       <span className="stat-value">{stats.delivered}</span>
//                       <span className="stat-label">Delivered</span>
//                     </div>
//                   </>
//                 ) : user.role === 'driver' ? (
//                   <>
//                     <div className="stat-item">
//                       <span className="stat-value">{stats.totalDeliveries}</span>
//                       <span className="stat-label">Completed</span>
//                     </div>
//                     <div className="stat-item">
//                       <span className="stat-value">{stats.inProgress}</span>
//                       <span className="stat-label">In Progress</span>
//                     </div>
//                   </>
//                 ) : null}
//               </div>
//             </div>
//           )}

//           {/* Recent Ratings (for drivers) */}
//           {user.role === 'driver' && ratings.length > 0 && (
//             <div className="recent-ratings">
//               <h3>Recent Reviews</h3>
//               <div className="ratings-list">
//                 {ratings.slice(0, 5).map((rating, idx) => (
//                   <div key={idx} className="rating-item">
//                     <div className="rating-stars">
//                       {'⭐'.repeat(rating.rating)}
//                     </div>
//                     {rating.comment && <p className="rating-comment">{rating.comment}</p>}
//                     <span className="rating-date">
//                       {new Date(rating.timestamp).toLocaleDateString()}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Danger Zone */}
//           <div className="danger-zone">
//             <h3>Danger Zone</h3>
//             <button onClick={handleLogout} className="logout-btn">
//               🚪 Logout
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

//   return (
//     <div className="profile-page">
//       <div className="profile-container">
//         <div className="profile-header">
//           <button onClick={handleBack} className="back-btn">← Back</button>
//           <h1>Profile Settings</h1>
//         </div>

//         <div className="profile-content">
//           {/* Avatar Section */}
//           <div className="profile-avatar-section">
//             <div className="profile-avatar">
//               {user.role === 'admin' ? '👑' : user.role === 'driver' ? '🚗' : '👤'}
//             </div>
//             <div className="profile-role-badge">{user.role}</div>
//           </div>

//           {/* Info Section */}
//           <div className="profile-info">
//             {editing ? (
//               <div className="edit-form">
//                 <div className="form-group">
//                   <label>Name</label>
//                   <input
//                     type="text"
//                     value={formData.name}
//                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                   />
//                 </div>
                
//                 <div className="form-group">
//                   <label>Email</label>
//                   <input
//                     type="email"
//                     value={formData.email}
//                     disabled
//                     title="Email cannot be changed"
//                   />
//                 </div>

//                 <div className="edit-actions">
//                   <button onClick={() => setEditing(false)} className="cancel-btn">
//                     Cancel
//                   </button>
//                   <button onClick={handleSave} className="save-btn">
//                     Save Changes
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <div className="info-display">
//                 <div className="info-item">
//                   <span className="info-label">Name</span>
//                   <span className="info-value">{user.name}</span>
//                 </div>
                
//                 <div className="info-item">
//                   <span className="info-label">Email</span>
//                   <span className="info-value">{user.email}</span>
//                 </div>

//                 <div className="info-item">
//                   <span className="info-label">Member Since</span>
//                   <span className="info-value">
//                     {new Date(user.createdAt).toLocaleDateString()}
//                   </span>
//                 </div>

//                 {user.role === 'driver' && user.rating && (
//                   <div className="info-item">
//                     <span className="info-label">Rating</span>
//                     <span className="info-value">⭐ {user.rating.toFixed(1)} ({ratings.length} reviews)</span>
//                   </div>
//                 )}

//                 <button onClick={() => setEditing(true)} className="edit-btn">
//                   Edit Profile
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* Stats Section */}
//           {stats && (
//             <div className="profile-stats">
//               <h3>Statistics</h3>
//               <div className="stats-grid">
//                 <div className="stat-item">
//                   <span className="stat-value">{stats.totalDeliveries}</span>
//                   <span className="stat-label">Completed</span>
//                 </div>
//                 <div className="stat-item">
//                   <span className="stat-value">{stats.inProgress}</span>
//                   <span className="stat-label">In Progress</span>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Recent Ratings (for drivers) */}
//           {user.role === 'driver' && ratings.length > 0 && (
//             <div className="recent-ratings">
//               <h3>Recent Reviews</h3>
//               <div className="ratings-list">
//                 {ratings.slice(0, 5).map((rating, idx) => (
//                   <div key={idx} className="rating-item">
//                     <div className="rating-stars">
//                       {'⭐'.repeat(rating.rating)}
//                     </div>
//                     {rating.comment && <p className="rating-comment">{rating.comment}</p>}
//                     <span className="rating-date">
//                       {new Date(rating.timestamp).toLocaleDateString()}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Danger Zone */}
//           <div className="danger-zone">
//             <h3>Danger Zone</h3>
//             <button onClick={handleLogout} className="logout-btn">
//               🚪 Logout
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

import { useState, useEffect } from 'react';
import { getUser } from '../utils/auth';
import { getDriverRatings } from '../utils/ratings';
import { fetchOrders } from '../utils/api';
import '../styles/profile.css';

export default function ProfileModal({ onClose }) {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [ratings, setRatings] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = getUser();
    if (!currentUser) {
      onClose();
      return;
    }
    
    setUser(currentUser);
    setFormData({
      name: currentUser.name,
      email: currentUser.email,
      password: '••••••••', // Hidden password
      phone: currentUser.phone || ''
    });

    loadUserData(currentUser);
  }, []);

  const loadUserData = async (currentUser) => {
    try {
      // Load driver ratings if user is driver
      if (currentUser.role === 'driver') {
        const driverRatings = getDriverRatings(currentUser.id);
        setRatings(driverRatings);
      }

      // Load user stats
      const orders = await fetchOrders();
      
      if (currentUser.role === 'customer') {
        const myOrders = orders.filter(o => o.customerId === currentUser.id);
        setStats({
          totalOrders: myOrders.length,
          pending: myOrders.filter(o => o.status === 'pending').length,
          inProgress: myOrders.filter(o => o.status === 'in-progress').length,
          delivered: myOrders.filter(o => o.status === 'delivered').length
        });
      } else if (currentUser.role === 'driver') {
        const myOrders = orders.filter(o => o.driverId === currentUser.id);
        setStats({
          totalDeliveries: myOrders.filter(o => o.status === 'delivered').length,
          inProgress: myOrders.filter(o => o.status === 'in-progress').length
        });
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    // Update user in localStorage
    const usersDb = JSON.parse(localStorage.getItem('users_database') || '{}');
    const updatedUser = { 
      ...user, 
      name: formData.name,
      phone: formData.phone
    };
    usersDb[user.email] = updatedUser;
    localStorage.setItem('users_database', JSON.stringify(usersDb));
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    setUser(updatedUser);
    setEditing(false);
    alert('Profile updated successfully!');
  };

  if (loading || !user) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="profile-modal-content" onClick={(e) => e.stopPropagation()}>
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            <h3>Loading...</h3>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="profile-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="profile-modal-header">
          <h2>👤 My Account</h2>
          <button onClick={onClose} className="close-btn">✕</button>
        </div>

        <div className="profile-modal-body">
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
                  <label>Full Name</label>
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
                    style={{ opacity: 0.6, cursor: 'not-allowed' }}
                  />
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    value={formData.password}
                    disabled
                    title="Password cannot be changed here"
                    style={{ opacity: 0.6, cursor: 'not-allowed' }}
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+998 90 123 45 67"
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
                  <span className="info-label">👤 Name</span>
                  <span className="info-value">{user.name}</span>
                </div>
                
                <div className="info-item">
                  <span className="info-label">📧 Email</span>
                  <span className="info-value">{user.email}</span>
                </div>

                <div className="info-item">
                  <span className="info-label">🔒 Password</span>
                  <span className="info-value">••••••••</span>
                </div>

                <div className="info-item">
                  <span className="info-label">📱 Phone</span>
                  <span className="info-value">{user.phone || 'Not set'}</span>
                </div>

                <div className="info-item">
                  <span className="info-label">📅 Member Since</span>
                  <span className="info-value">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {user.role === 'driver' && user.rating && (
                  <div className="info-item">
                    <span className="info-label">⭐ Rating</span>
                    <span className="info-value">{user.rating.toFixed(1)} ({ratings.length} reviews)</span>
                  </div>
                )}

                <button onClick={() => setEditing(true)} className="edit-profile-btn">
                  ✏️ Edit Profile
                </button>
              </div>
            )}
          </div>

          {/* Stats Section */}
          {stats && (
            <div className="profile-stats-box">
              <h3>📊 Statistics</h3>
              <div className="stats-grid">
                {user.role === 'customer' ? (
                  <>
                    <div className="stat-item-small">
                      <span className="stat-value">{stats.totalOrders}</span>
                      <span className="stat-label">Total Orders</span>
                    </div>
                    <div className="stat-item-small">
                      <span className="stat-value">{stats.pending}</span>
                      <span className="stat-label">Pending</span>
                    </div>
                    <div className="stat-item-small">
                      <span className="stat-value">{stats.inProgress}</span>
                      <span className="stat-label">In Progress</span>
                    </div>
                    <div className="stat-item-small">
                      <span className="stat-value">{stats.delivered}</span>
                      <span className="stat-label">Delivered</span>
                    </div>
                  </>
                ) : user.role === 'driver' ? (
                  <>
                    <div className="stat-item-small">
                      <span className="stat-value">{stats.totalDeliveries}</span>
                      <span className="stat-label">Completed</span>
                    </div>
                    <div className="stat-item-small">
                      <span className="stat-value">{stats.inProgress}</span>
                      <span className="stat-label">In Progress</span>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          )}

          {/* Recent Ratings (for drivers) */}
          {user.role === 'driver' && ratings.length > 0 && (
            <div className="recent-ratings-box">
              <h3>⭐ Recent Reviews</h3>
              <div className="ratings-list-small">
                {ratings.slice(0, 3).map((rating, idx) => (
                  <div key={idx} className="rating-item-small">
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
        </div>

        <div className="profile-modal-footer">
          <button onClick={onClose} className="close-modal-btn">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}