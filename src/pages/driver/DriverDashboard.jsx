import { useEffect, useState } from "react";
import { fetchOrders, assignDriver, completeOrder } from "../../utils/api";
import { getUser, logout } from "../../utils/auth";
import { getUnreadCount, createOrderNotification, NotificationTypes } from "../../utils/notifications.js";
import { exportOrders, printOrders } from "../../utils/export";
import NotificationCenter from "../NotificationCenter.jsx";
import OrderNotes from "../OrderNotes";
import Analytics from "../Analytics";
import "../../styles/driver.css";
import { useNavigate } from "react-router-dom";

export default function DriverDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  
  const navigate = useNavigate();
  const user = getUser();

  useEffect(() => {
    loadOrders();
    loadUnreadCount();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await fetchOrders();
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

  const handleAccept = async (order) => {
    const phone = prompt('Enter your contact phone number:');
    if (!phone) return;

    try {
      setLoading(true);
      await assignDriver(order.id, user.id, user.name, phone);
      
      // Send notification to customer
      createOrderNotification(
        order,
        NotificationTypes.ORDER_ACCEPTED,
        order.customerId
      );
      
      // Send notification to driver
      createOrderNotification(
        order,
        NotificationTypes.DRIVER_ASSIGNED,
        user.id
      );
      
      alert('Order accepted successfully!');
      loadOrders();
    } catch (err) {
      console.error(err);
      alert('Failed to accept order');
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async (orderId, order) => {
    if (!confirm('Mark this order as delivered?')) return;
    
    try {
      setLoading(true);
      await completeOrder(orderId);
      
      // Send notification to customer
      createOrderNotification(
        order,
        NotificationTypes.ORDER_DELIVERED,
        order.customerId
      );
      
      alert('Order completed!');
      loadOrders();
    } catch (err) {
      console.error(err);
      alert('Failed to complete order');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleOpenNotes = (order) => {
    setSelectedOrder(order);
    setShowNotes(true);
  };

  const getStatusInfo = (order) => {
    if (order.status === 'delivered') {
      return {
        text: 'Delivered',
        cls: 'done',
        showAccept: false,
        showFinish: false,
      };
    }

    if (order.status === 'in-progress') {
      const isMyOrder = order.driverId === user.id;
      return {
        text: isMyOrder ? 'My Order - In Progress' : 'Assigned to Another Driver',
        cls: isMyOrder ? 'progress' : 'unavailable',
        showAccept: false,
        showFinish: isMyOrder,
      };
    }

    return {
      text: 'Available',
      cls: 'new',
      showAccept: true,
      showFinish: false,
    };
  };

  const filteredOrders = orders.filter(o => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'available') return o.status === 'pending';
    if (filterStatus === 'my-orders') return o.driverId === user.id;
    return o.status === filterStatus;
  });

  return (
    <div className="page">
      <header>
        <div>
          <h2>🚚 Driver Panel</h2>
          <p style={{ fontSize: '14px', opacity: 0.8, marginTop: '5px' }}>
            Welcome, {user?.name}!
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {/* Notification Button */}
          <button 
            className="notification-badge" 
            onClick={() => {
              setShowNotifications(true);
              loadUnreadCount();
            }}
            style={{
              position: 'relative',
              padding: '12px 16px',
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              borderRadius: '10px',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            🔔
            {unreadCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-5px',
                right: '-5px',
                background: '#ef4444',
                color: 'white',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                fontSize: '11px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold'
              }}>
                {unreadCount}
              </span>
            )}
          </button>

          {/* Profile Button */}
          <button 
            onClick={() => navigate('/profile')}
            style={{
              padding: '12px 16px',
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              borderRadius: '10px',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            👤
          </button>

          {/* Export Dropdown */}
          <div style={{ position: 'relative' }}>
            <button 
              onClick={(e) => {
                const menu = e.currentTarget.nextSibling;
                menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
              }}
              style={{
                padding: '12px 16px',
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                borderRadius: '10px',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              📥 Export
            </button>
            <div style={{
              display: 'none',
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: '5px',
              background: 'white',
              borderRadius: '10px',
              boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
              overflow: 'hidden',
              zIndex: 10,
              minWidth: '150px'
            }}>
              <button 
                onClick={() => exportOrders(filteredOrders)}
                style={{
                  width: '100%',
                  padding: '10px 15px',
                  background: 'white',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  color: '#333'
                }}
                onMouseOver={(e) => e.target.style.background = '#f3f4f6'}
                onMouseOut={(e) => e.target.style.background = 'white'}
              >
                📊 Export CSV
              </button>
              <button 
                onClick={() => printOrders(filteredOrders)}
                style={{
                  width: '100%',
                  padding: '10px 15px',
                  background: 'white',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  color: '#333'
                }}
                onMouseOver={(e) => e.target.style.background = '#f3f4f6'}
                onMouseOut={(e) => e.target.style.background = 'white'}
              >
                🖨️ Print/PDF
              </button>
            </div>
          </div>

          <button className="exit-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {/* Analytics Toggle */}
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => setShowAnalytics(!showAnalytics)}
          style={{
            padding: '10px 20px',
            background: 'rgba(255, 255, 255, 0.2)',
            border: 'none',
            borderRadius: '10px',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          {showAnalytics ? '📊 Hide Analytics' : '📊 Show Analytics'}
        </button>
      </div>

      {/* Analytics */}
      {showAnalytics && <Analytics userId={user.id} userRole="driver" />}

      {/* Filter */}
      <div style={{ marginBottom: '20px' }}>
        <select 
          value={filterStatus} 
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{
            padding: '10px 15px',
            borderRadius: '8px',
            border: '1px solid rgba(255,255,255,0.3)',
            background: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            fontSize: '14px'
          }}
        >
          <option value="all" style={{ background: '#1e1e1e' }}>All Orders</option>
          <option value="available" style={{ background: '#1e1e1e' }}>Available Orders</option>
          <option value="my-orders" style={{ background: '#1e1e1e' }}>My Orders</option>
          <option value="in-progress" style={{ background: '#1e1e1e' }}>In Progress</option>
          <option value="delivered" style={{ background: '#1e1e1e' }}>Delivered</option>
        </select>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: 'white' }}>
          <h3>Loading...</h3>
        </div>
      ) : (
        <div className="grid">
          {filteredOrders.map((o) => {
            const st = getStatusInfo(o);

            return (
              <div key={o.id} className={`card ${st.cls}`}>
                <h3>{o.name}</h3>
                <p>{o.from} → {o.to}</p>
                <p>Weight: {o.height} kg</p>
                <p className="price">💵 ${Number(o.price).toFixed(2)}</p>

                {o.customerName && (
                  <p style={{ fontSize: '13px', opacity: 0.8 }}>
                    👤 Customer: {o.customerName}
                  </p>
                )}

                {o.driverName && o.driverName !== user.name && (
                  <p className="driver">
                    🚚 Assigned to: {o.driverName}
                  </p>
                )}

                {o.description && (
                  <p style={{ fontSize: '13px', opacity: 0.8 }}>
                    📝 {o.description}
                  </p>
                )}

                <span className="status">{st.text}</span>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
                  {/* Comments Button */}
                  {(st.showFinish || o.driverId === user.id) && (
                    <button
                      onClick={() => handleOpenNotes(o)}
                      style={{
                        padding: '10px',
                        background: 'rgba(96, 165, 250, 0.3)',
                        border: 'none',
                        borderRadius: '8px',
                        color: 'white',
                        cursor: 'pointer',
                        fontWeight: '600'
                      }}
                    >
                      💬 Comments
                    </button>
                  )}

                  {st.showAccept && (
                    <button onClick={() => handleAccept(o)} disabled={loading}>
                      Accept Order
                    </button>
                  )}

                  {st.showFinish && (
                    <button className="done" onClick={() => handleComplete(o.id, o)} disabled={loading}>
                      Mark as Delivered
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          {filteredOrders.length === 0 && (
            <div style={{ 
              gridColumn: '1 / -1', 
              textAlign: 'center', 
              padding: '40px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              color: 'white'
            }}>
              <h3>No orders found</h3>
              <p>
                {filterStatus === 'available' 
                  ? 'No available orders at the moment' 
                  : 'No orders match your filter'}
              </p>
            </div>
          )}
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

      {/* Order Notes */}
      {showNotes && selectedOrder && (
        <OrderNotes 
          orderId={selectedOrder.id}
          onClose={() => setShowNotes(false)}
        />
      )}
    </div>
  );
}