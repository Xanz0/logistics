// import { useEffect, useState } from "react";
// import { fetchCustomerOrders, deleteOrder, addOrder } from "../../utils/api";
// import { getUser, logout } from "../../utils/auth";
// import "../../styles/customer.css";
// import { useNavigate } from "react-router-dom";

// export default function CustomerDashboard() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [showAddModal, setShowAddModal] = useState(false);
//   const navigate = useNavigate();
//   const user = getUser();

//   useEffect(() => {
//     if (user) {
//       loadOrders();
//     }
//   }, []);

//   const loadOrders = async () => {
//     try {
//       setLoading(true);
//       const data = await fetchCustomerOrders(user.id);
//       setOrders(data);
//     } catch (err) {
//       console.error(err);
//       alert('Failed to load orders');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddOrder = async (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
    
//     const newOrder = {
//       name: formData.get('name'),
//       from: formData.get('from'),
//       to: formData.get('to'),
//       height: Number(formData.get('height')),
//       price: Number(formData.get('price')),
//       description: formData.get('description') || ''
//     };

//     if (!newOrder.name || !newOrder.from || !newOrder.to || !newOrder.height || !newOrder.price) {
//       alert('Please fill all required fields!');
//       return;
//     }

//     try {
//       setLoading(true);
//       const added = await addOrder(newOrder);
//       setOrders((prev) => [added, ...prev]);
//       setShowAddModal(false);
//       alert('Order created successfully!');
//       e.target.reset();
//     } catch (err) {
//       console.error(err);
//       alert('Failed to create order');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!confirm('Are you sure you want to delete this order?')) return;
    
//     try {
//       await deleteOrder(id);
//       setOrders((prev) => prev.filter((x) => x.id !== id));
//       alert('Order deleted successfully');
//     } catch (err) {
//       alert('Failed to delete order');
//     }
//   };

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   const getStatusInfo = (status) => {
//     switch(status) {
//       case 'pending': return { text: 'Pending', cls: 'new' };
//       case 'in-progress': return { text: 'In Progress', cls: 'progress' };
//       case 'delivered': return { text: 'Delivered', cls: 'done' };
//       default: return { text: 'Pending', cls: 'new' };
//     }
//   };

//   const filteredOrders = orders.filter(o => 
//     filterStatus === 'all' || o.status === filterStatus
//   );

//   return (
//     <div className="page">
//       <header>
//         <div>
//           <h2>📦 My Orders</h2>
//           <p style={{ fontSize: '14px', opacity: 0.8, marginTop: '5px' }}>
//             Welcome, {user?.name}!
//           </p>
//         </div>
//         <div style={{ display: 'flex', gap: '10px' }}>
//           <button className="add-btn" onClick={() => setShowAddModal(true)} disabled={loading}>
//             ➕ New Order
//           </button>
//           <button className="exit-btn" onClick={handleLogout}>
//             Logout
//           </button>
//         </div>
//       </header>

//       {/* Filter */}
//       <div style={{ marginBottom: '20px' }}>
//         <select 
//           value={filterStatus} 
//           onChange={(e) => setFilterStatus(e.target.value)}
//           style={{
//             padding: '10px 15px',
//             borderRadius: '8px',
//             border: '1px solid #ddd',
//             fontSize: '14px'
//           }}
//         >
//           <option value="all">All Orders</option>
//           <option value="pending">Pending</option>
//           <option value="in-progress">In Progress</option>
//           <option value="delivered">Delivered</option>
//         </select>
//       </div>

//       {loading && !showAddModal ? (
//         <div style={{ textAlign: 'center', padding: '40px' }}>
//           <h3>Loading...</h3>
//         </div>
//       ) : (
//         <div className="grid">
//           {filteredOrders.map((o) => {
//             const st = getStatusInfo(o.status);

//             return (
//               <div key={o.id} className={`card ${st.cls}`}>
//                 <h3>{o.name}</h3>
//                 <p>
//                   {o.from} → {o.to}
//                 </p>
//                 <p>Weight: {o.height} kg</p>
//                 <p className="price">💵 ${Number(o.price).toFixed(2)}</p>
                
//                 {o.description && (
//                   <p style={{ fontSize: '13px', opacity: 0.8 }}>
//                     📝 {o.description}
//                   </p>
//                 )}
                
//                 {o.driverName && (
//                   <p className="driver">
//                     🚚 {o.driverName} ({o.driverPhone})
//                   </p>
//                 )}
                
//                 <span className="status">{st.text}</span>
                
//                 {o.status === 'pending' && (
//                   <button
//                     className="danger"
//                     onClick={() => handleDelete(o.id)}
//                   >
//                     Delete
//                   </button>
//                 )}
                
//                 {o.status === 'delivered' && (
//                   <p style={{ color: '#4ade80', fontSize: '12px', marginTop: '10px' }}>
//                     ✅ Delivered on {new Date(o.deliveredAt).toLocaleDateString()}
//                   </p>
//                 )}
//               </div>
//             );
//           })}
          
//           {filteredOrders.length === 0 && (
//             <div style={{ 
//               gridColumn: '1 / -1', 
//               textAlign: 'center', 
//               padding: '40px',
//               background: '#f5f5f5',
//               borderRadius: '12px'
//             }}>
//               <h3>No orders found</h3>
//               <p>Create your first order to get started!</p>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Add Order Modal */}
//       {showAddModal && (
//         <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <h2>Create New Order</h2>
//             <form onSubmit={handleAddOrder}>
//               <div className="form-group">
//                 <label>Order Name *</label>
//                 <input type="text" name="name" required placeholder="e.g., Electronics Shipment" />
//               </div>
              
//               <div className="form-group">
//                 <label>From Location *</label>
//                 <input type="text" name="from" required placeholder="e.g., Tashkent" />
//               </div>
              
//               <div className="form-group">
//                 <label>To Location *</label>
//                 <input type="text" name="to" required placeholder="e.g., Samarkand" />
//               </div>
              
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Weight (kg) *</label>
//                   <input type="number" name="height" required min="0.1" step="0.1" placeholder="10" />
//                 </div>
                
//                 <div className="form-group">
//                   <label>Price ($) *</label>
//                   <input type="number" name="price" required min="0" step="0.01" placeholder="50.00" />
//                 </div>
//               </div>
              
//               <div className="form-group">
//                 <label>Description (optional)</label>
//                 <textarea name="description" rows="3" placeholder="Additional details about your order..."></textarea>
//               </div>
              
//               <div className="modal-actions">
//                 <button type="button" onClick={() => setShowAddModal(false)} className="cancel-btn">
//                   Cancel
//                 </button>
//                 <button type="submit" className="submit-btn" disabled={loading}>
//                   {loading ? 'Creating...' : 'Create Order'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }















































import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCustomerOrders, deleteOrder, addOrder } from "../../utils/api";
import { getUser, logout } from "../../utils/auth";
import { getUnreadCount, createOrderNotification, NotificationTypes } from "../../utils/notifications.js";
import { isOrderRated, saveRating } from "../../utils/rating.js";
import { exportOrders, printOrders } from "../../utils/export.js";
import NotificationCenter from "../NotificationCenter";
import RatingModal from "../RatingModal";
import OrderNotes from "../OrderNotes";
import PriceCalculator from "../PriceCalculator.jsx";
import Analytics from "../Analytics.jsx";
import DriverLeaderboard from "../driver/DriverLeaderboard.jsx";
import "../../styles/customer.css";

export default function CustomerDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Feature states
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [calculatedData, setCalculatedData] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  
  const navigate = useNavigate();
  const user = getUser();

  useEffect(() => {
    if (user) {
      loadOrders();
      loadUnreadCount();
      
      // Auto-refresh unread count every 10 seconds
      const interval = setInterval(() => {
        loadUnreadCount();
      }, 10000);
      
      return () => clearInterval(interval);
    }
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await fetchCustomerOrders(user.id);
      setOrders(data);
    } catch (err) {
      console.error(err);
      alert('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const loadUnreadCount = () => {
    const count = getUnreadCount(user.id);
    setUnreadCount(count);
  };

  const handleAddOrder = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const newOrder = {
      name: formData.get('name'),
      from: formData.get('from'),
      to: formData.get('to'),
      height: Number(formData.get('height')),
      price: Number(formData.get('price')),
      description: formData.get('description') || ''
    };

    if (!newOrder.name || !newOrder.from || !newOrder.to || !newOrder.height || !newOrder.price) {
      alert('Please fill all required fields!');
      return;
    }

    try {
      setLoading(true);
      const added = await addOrder(newOrder);
      setOrders((prev) => [added, ...prev]);
      setShowAddModal(false);
      setCalculatedData(null);
      
      // Create notification for customer
      createOrderNotification(added, NotificationTypes.ORDER_CREATED, user.id);
      
      alert('Order created successfully!');
      e.target.reset();
    } catch (err) {
      console.error(err);
      alert('Failed to create order');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this order?')) return;
    
    try {
      await deleteOrder(id);
      setOrders((prev) => prev.filter((x) => x.id !== id));
      alert('Order deleted successfully');
    } catch (err) {
      alert('Failed to delete order');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleRateDriver = (order) => {
    setSelectedOrder(order);
    setShowRating(true);
  };

  const handleSubmitRating = async (ratingData) => {
    try {
      saveRating(ratingData);
      
      // Send notification to driver
      createOrderNotification(
        selectedOrder,
        NotificationTypes.RATING_RECEIVED,
        selectedOrder.driverId
      );
      
      alert('Rating submitted successfully! Thank you for your feedback.');
      setShowRating(false);
      setSelectedOrder(null);
      loadOrders(); // Refresh to update rated status
    } catch (error) {
      console.error(error);
      alert('Failed to submit rating');
    }
  };

  const handleOpenNotes = (order) => {
    setSelectedOrder(order);
    setShowNotes(true);
  };

  const handleCalculate = (data) => {
    setCalculatedData(data);
    setShowCalculator(false);
    setShowAddModal(true);
  };

  const getStatusInfo = (status) => {
    switch(status) {
      case 'pending': return { text: 'Pending', cls: 'new' };
      case 'in-progress': return { text: 'In Progress', cls: 'progress' };
      case 'delivered': return { text: 'Delivered', cls: 'done' };
      default: return { text: 'Pending', cls: 'new' };
    }
  };

  const filteredOrders = orders.filter(o => 
    filterStatus === 'all' || o.status === filterStatus
  );

  return (
    <div className="page">
      <header>
        <div>
          <h2>📦 My Orders</h2>
          <p style={{ fontSize: '14px', opacity: 0.8, marginTop: '5px' }}>
            Welcome, {user?.name}!
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Notification Button */}
          <button 
            className="header-btn notification-btn"
            onClick={() => {
              setShowNotifications(true);
              loadUnreadCount();
            }}
            title="Notifications"
          >
            🔔
            {unreadCount > 0 && (
              <span className="badge-count">{unreadCount}</span>
            )}
          </button>

          {/* Profile Button */}
          <button 
            className="header-btn"
            onClick={() => navigate('/profile')}
            title="Profile"
          >
            👤 Profile
          </button>

          {/* Leaderboard Button */}
          <button 
            className="header-btn"
            onClick={() => setShowLeaderboard(true)}
            title="Top Drivers"
          >
            🏆 Top Drivers
          </button>

          {/* Export Dropdown */}
          <div style={{ position: 'relative' }}>
            <button 
              className="header-btn"
              onClick={(e) => {
                const menu = e.currentTarget.nextSibling;
                menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
              }}
            >
              📥 Export
            </button>
            <div className="dropdown-menu">
              <button onClick={() => {
                exportOrders(orders);
                document.querySelector('.dropdown-menu').style.display = 'none';
              }}>
                📊 Export CSV
              </button>
              <button onClick={() => {
                printOrders(orders);
                document.querySelector('.dropdown-menu').style.display = 'none';
              }}>
                🖨️ Print/PDF
              </button>
            </div>
          </div>

          <button 
            className="add-btn" 
            onClick={() => setShowCalculator(true)}
          >
            💰 Calculate Price
          </button>

          <button 
            className="add-btn" 
            onClick={() => setShowAddModal(true)} 
            disabled={loading}
          >
            ➕ New Order
          </button>
          
          <button className="exit-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {/* Analytics Toggle */}
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => setShowAnalytics(!showAnalytics)}
          className="toggle-btn"
        >
          {showAnalytics ? '📊 Hide Analytics' : '📊 Show Analytics'}
        </button>
      </div>

      {/* Analytics */}
      {showAnalytics && <Analytics userId={user.id} userRole="customer" />}

      {/* Filter */}
      <div style={{ marginBottom: '20px' }}>
        <select 
          value={filterStatus} 
          onChange={(e) => setFilterStatus(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Orders</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="delivered">Delivered</option>
        </select>
      </div>

      {loading && !showAddModal ? (
        <div style={{ textAlign: 'center', padding: '40px', color: 'white' }}>
          <h3>Loading...</h3>
        </div>
      ) : (
        <div className="grid">
          {filteredOrders.map((o) => {
            const st = getStatusInfo(o.status);

            return (
              <div key={o.id} className={`card ${st.cls}`}>
                <h3>{o.name}</h3>
                <p>{o.from} → {o.to}</p>
                <p>Weight: {o.height} kg</p>
                <p className="price">💵 ${Number(o.price).toFixed(2)}</p>
                
                {o.description && (
                  <p style={{ fontSize: '13px', opacity: 0.8 }}>
                    📝 {o.description}
                  </p>
                )}
                
                {o.driverName && (
                  <p className="driver">
                    🚚 {o.driverName} ({o.driverPhone})
                  </p>
                )}
                
                <span className="status">{st.text}</span>
                
                <div className="card-actions">
                  {/* Comments Button - Always visible */}
                  <button
                    className="action-btn comments-btn"
                    onClick={() => handleOpenNotes(o)}
                  >
                    💬 Comments
                  </button>

                  {/* Rate Driver Button - only for delivered orders that haven't been rated */}
                  {o.status === 'delivered' && !isOrderRated(o.id) && o.driverId && (
                    <button
                      className="action-btn rate-btn"
                      onClick={() => handleRateDriver(o)}
                    >
                      ⭐ Rate Driver
                    </button>
                  )}

                  {/* Already rated message */}
                  {o.status === 'delivered' && isOrderRated(o.id) && (
                    <div className="rated-badge">
                      ⭐ Rated
                    </div>
                  )}

                  {/* Delete Button - only for pending */}
                  {o.status === 'pending' && (
                    <button
                      className="action-btn delete-btn"
                      onClick={() => handleDelete(o.id)}
                    >
                      🗑️ Delete
                    </button>
                  )}
                </div>
                
                {o.status === 'delivered' && o.deliveredAt && (
                  <p className="delivery-info">
                    ✅ Delivered on {new Date(o.deliveredAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            );
          })}
          
          {filteredOrders.length === 0 && (
            <div className="empty-state">
              <h3>No orders found</h3>
              <p>Create your first order to get started!</p>
              <button 
                className="add-btn"
                onClick={() => setShowAddModal(true)}
                style={{ marginTop: '15px' }}
              >
                ➕ Create Order
              </button>
            </div>
          )}
        </div>
      )}

      {/* Price Calculator Modal */}
      {showCalculator && (
        <div className="modal-overlay" onClick={() => setShowCalculator(false)}>
          <div className="modal-content calculator-modal" onClick={(e) => e.stopPropagation()}>
            <PriceCalculator onCalculate={handleCalculate} />
            <button 
              onClick={() => setShowCalculator(false)}
              className="cancel-btn"
              style={{ marginTop: '15px', width: '100%' }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Add Order Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => {
          setShowAddModal(false);
          setCalculatedData(null);
        }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Create New Order</h2>
            <form onSubmit={handleAddOrder}>
              <div className="form-group">
                <label>Order Name *</label>
                <input 
                  type="text" 
                  name="name" 
                  required 
                  placeholder="e.g., Electronics Shipment"
                />
              </div>
              
              <div className="form-group">
                <label>From Location *</label>
                <input 
                  type="text" 
                  name="from" 
                  required 
                  placeholder="e.g., Tashkent"
                  defaultValue={calculatedData?.from || ''}
                />
              </div>
              
              <div className="form-group">
                <label>To Location *</label>
                <input 
                  type="text" 
                  name="to" 
                  required 
                  placeholder="e.g., Samarkand"
                  defaultValue={calculatedData?.to || ''}
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Weight (kg) *</label>
                  <input 
                    type="number" 
                    name="height" 
                    required 
                    min="0.1" 
                    step="0.1" 
                    placeholder="10"
                    defaultValue={calculatedData?.weight || ''}
                  />
                </div>
                
                <div className="form-group">
                  <label>Price ($) *</label>
                  <input 
                    type="number" 
                    name="price" 
                    required 
                    min="0" 
                    step="0.01" 
                    placeholder="50.00"
                    defaultValue={calculatedData?.price || ''}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Description (optional)</label>
                <textarea 
                  name="description" 
                  rows="3" 
                  placeholder="Additional details about your order..."
                ></textarea>
              </div>
              
              {calculatedData && (
                <div className="calc-info">
                  💡 Price calculated: ${calculatedData.price} (Distance: {calculatedData.distance}km)
                </div>
              )}
              
              <div className="modal-actions">
                <button 
                  type="button" 
                  onClick={() => {
                    setShowAddModal(false);
                    setCalculatedData(null);
                  }} 
                  className="cancel-btn"
                >
                  Cancel
                </button>
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? 'Creating...' : 'Create Order'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Notification Center */}
      {showNotifications && (
        <NotificationCenter 
          onClose={() => {
            setShowNotifications(false);
            loadUnreadCount();
          }} 
        />
      )}

      {/* Rating Modal */}
      {showRating && selectedOrder && (
        <RatingModal 
          order={selectedOrder}
          onClose={() => {
            setShowRating(false);
            setSelectedOrder(null);
          }}
          onSubmit={handleSubmitRating}
        />
      )}

      {/* Order Notes */}
      {showNotes && selectedOrder && (
        <OrderNotes 
          orderId={selectedOrder.id}
          onClose={() => {
            setShowNotes(false);
            setSelectedOrder(null);
          }}
        />
      )}

      {/* Driver Leaderboard */}
      {showLeaderboard && (
        <DriverLeaderboard 
          onClose={() => setShowLeaderboard(false)}
        />
      )}
    </div>
  );
}