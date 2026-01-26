import { useEffect, useState } from "react";
import { fetchCustomerOrders, deleteOrder, addOrder } from "../../utils/api";
import { getUser, logout } from "../../utils/auth";
import "../../styles/customer.css";
import { useNavigate } from "react-router-dom";

export default function CustomerDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const navigate = useNavigate();
  const user = getUser();

  useEffect(() => {
    if (user) {
      loadOrders();
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
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="add-btn" onClick={() => setShowAddModal(true)} disabled={loading}>
            ➕ New Order
          </button>
          <button className="exit-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {/* Filter */}
      <div style={{ marginBottom: '20px' }}>
        <select 
          value={filterStatus} 
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{
            padding: '10px 15px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            fontSize: '14px'
          }}
        >
          <option value="all">All Orders</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="delivered">Delivered</option>
        </select>
      </div>

      {loading && !showAddModal ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h3>Loading...</h3>
        </div>
      ) : (
        <div className="grid">
          {filteredOrders.map((o) => {
            const st = getStatusInfo(o.status);

            return (
              <div key={o.id} className={`card ${st.cls}`}>
                <h3>{o.name}</h3>
                <p>
                  {o.from} → {o.to}
                </p>
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
                
                {o.status === 'pending' && (
                  <button
                    className="danger"
                    onClick={() => handleDelete(o.id)}
                  >
                    Delete
                  </button>
                )}
                
                {o.status === 'delivered' && (
                  <p style={{ color: '#4ade80', fontSize: '12px', marginTop: '10px' }}>
                    ✅ Delivered on {new Date(o.deliveredAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            );
          })}
          
          {filteredOrders.length === 0 && (
            <div style={{ 
              gridColumn: '1 / -1', 
              textAlign: 'center', 
              padding: '40px',
              background: '#f5f5f5',
              borderRadius: '12px'
            }}>
              <h3>No orders found</h3>
              <p>Create your first order to get started!</p>
            </div>
          )}
        </div>
      )}

      {/* Add Order Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Create New Order</h2>
            <form onSubmit={handleAddOrder}>
              <div className="form-group">
                <label>Order Name *</label>
                <input type="text" name="name" required placeholder="e.g., Electronics Shipment" />
              </div>
              
              <div className="form-group">
                <label>From Location *</label>
                <input type="text" name="from" required placeholder="e.g., Tashkent" />
              </div>
              
              <div className="form-group">
                <label>To Location *</label>
                <input type="text" name="to" required placeholder="e.g., Samarkand" />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Weight (kg) *</label>
                  <input type="number" name="height" required min="0.1" step="0.1" placeholder="10" />
                </div>
                
                <div className="form-group">
                  <label>Price ($) *</label>
                  <input type="number" name="price" required min="0" step="0.01" placeholder="50.00" />
                </div>
              </div>
              
              <div className="form-group">
                <label>Description (optional)</label>
                <textarea name="description" rows="3" placeholder="Additional details about your order..."></textarea>
              </div>
              
              <div className="modal-actions">
                <button type="button" onClick={() => setShowAddModal(false)} className="cancel-btn">
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
    </div>
  );
}