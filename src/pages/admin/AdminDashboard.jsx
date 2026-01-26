import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchOrders, deleteOrder, getOrderStats } from "../../utils/api";
import { getAllUsers, logout } from "../../utils/auth";
import "../../styles/admin.css";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' or 'users'
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [ordersData, statsData] = await Promise.all([
        fetchOrders(),
        getOrderStats()
      ]);
      
      setOrders(ordersData);
      setStats(statsData);
      
      const usersData = getAllUsers();
      setUsers(Object.values(usersData));
    } catch (error) {
      console.error('Error loading data:', error);
      alert('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this order?')) return;
    
    try {
      await deleteOrder(id);
      setOrders(prev => prev.filter(o => o.id !== id));
      alert('Order deleted successfully');
      loadData(); // Reload stats
    } catch (error) {
      alert('Failed to delete order');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Filter users
  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <header className="admin-header">
        <h1>👑 Admin Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </header>

      {/* Stats Cards */}
      {stats && (
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Orders</h3>
            <p className="stat-number">{stats.total}</p>
          </div>
          <div className="stat-card pending">
            <h3>Pending</h3>
            <p className="stat-number">{stats.pending}</p>
          </div>
          <div className="stat-card progress">
            <h3>In Progress</h3>
            <p className="stat-number">{stats.inProgress}</p>
          </div>
          <div className="stat-card delivered">
            <h3>Delivered</h3>
            <p className="stat-number">{stats.delivered}</p>
          </div>
          <div className="stat-card revenue">
            <h3>Total Revenue</h3>
            <p className="stat-number">${stats.totalRevenue.toFixed(2)}</p>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="tabs">
        <button 
          className={activeTab === 'orders' ? 'active' : ''}
          onClick={() => setActiveTab('orders')}
        >
          📦 Orders
        </button>
        <button 
          className={activeTab === 'users' ? 'active' : ''}
          onClick={() => setActiveTab('users')}
        >
          👥 Users
        </button>
      </div>

      {/* Search and Filter */}
      <div className="controls">
        <input
          type="text"
          placeholder={activeTab === 'orders' ? 'Search orders...' : 'Search users...'}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        
        {activeTab === 'orders' && (
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="delivered">Delivered</option>
          </select>
        )}
      </div>

      {/* Content */}
      {activeTab === 'orders' ? (
        <div className="orders-table">
          <table>
            <thead>
              <tr>
                <th>Order Name</th>
                <th>Customer</th>
                <th>From → To</th>
                <th>Weight (kg)</th>
                <th>Price</th>
                <th>Status</th>
                <th>Driver</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => (
                <tr key={order.id}>
                  <td>{order.name}</td>
                  <td>{order.customerName || 'Unknown'}</td>
                  <td>{order.from} → {order.to}</td>
                  <td>{order.height}</td>
                  <td>${Number(order.price).toFixed(2)}</td>
                  <td>
                    <span className={`status-badge ${order.status || 'pending'}`}>
                      {order.status || 'pending'}
                    </span>
                  </td>
                  <td>{order.driverName || '-'}</td>
                  <td>
                    <button 
                      className="delete-btn-small"
                      onClick={() => handleDelete(order.id)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredOrders.length === 0 && (
            <div className="empty-state">No orders found</div>
          )}
        </div>
      ) : (
        <div className="users-grid">
          {filteredUsers.map(user => (
            <div key={user.id} className="user-card">
              <div className="user-avatar">
                {user.role === 'admin' ? '👑' : user.role === 'driver' ? '🚗' : '👤'}
              </div>
              <h3>{user.name}</h3>
              <p className="user-email">{user.email}</p>
              <span className={`role-badge ${user.role}`}>{user.role}</span>
              {user.role === 'driver' && user.rating && (
                <p className="rating">⭐ {user.rating.toFixed(1)}</p>
              )}
              <p className="user-date">
                Joined: {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
          
          {filteredUsers.length === 0 && (
            <div className="empty-state">No users found</div>
          )}
        </div>
      )}
    </div>
  );
}