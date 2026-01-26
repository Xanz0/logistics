// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { fetchOrders, deleteOrder, getOrderStats } from "../../utils/api";
// import { getAllUsers, logout } from "../../utils/auth";
// import "../../styles/admin.css";

// export default function AdminDashboard() {
//   const navigate = useNavigate();
//   const [orders, setOrders] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [stats, setStats] = useState(null);
//   const [activeTab, setActiveTab] = useState('orders'); // 'orders' or 'users'
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     try {
//       setLoading(true);
//       const [ordersData, statsData] = await Promise.all([
//         fetchOrders(),
//         getOrderStats()
//       ]);
      
//       setOrders(ordersData);
//       setStats(statsData);
      
//       const usersData = getAllUsers();
//       setUsers(Object.values(usersData));
//     } catch (error) {
//       console.error('Error loading data:', error);
//       alert('Failed to load data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!confirm('Are you sure you want to delete this order?')) return;
    
//     try {
//       await deleteOrder(id);
//       setOrders(prev => prev.filter(o => o.id !== id));
//       alert('Order deleted successfully');
//       loadData(); // Reload stats
//     } catch (error) {
//       alert('Failed to delete order');
//     }
//   };

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   // Filter orders
//   const filteredOrders = orders.filter(order => {
//     const matchesSearch = order.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          order.customerName?.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
//     return matchesSearch && matchesStatus;
//   });

//   // Filter users
//   const filteredUsers = users.filter(user => 
//     user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     user.email?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (loading) {
//     return (
//       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//         <h2>Loading...</h2>
//       </div>
//     );
//   }

//   return (
//     <div className="admin-page">
//       <header className="admin-header">
//         <h1>👑 Admin Dashboard</h1>
//         <button className="logout-btn" onClick={handleLogout}>Logout</button>
//       </header>

//       {/* Stats Cards */}
//       {stats && (
//         <div className="stats-grid">
//           <div className="stat-card">
//             <h3>Total Orders</h3>
//             <p className="stat-number">{stats.total}</p>
//           </div>
//           <div className="stat-card pending">
//             <h3>Pending</h3>
//             <p className="stat-number">{stats.pending}</p>
//           </div>
//           <div className="stat-card progress">
//             <h3>In Progress</h3>
//             <p className="stat-number">{stats.inProgress}</p>
//           </div>
//           <div className="stat-card delivered">
//             <h3>Delivered</h3>
//             <p className="stat-number">{stats.delivered}</p>
//           </div>
//           <div className="stat-card revenue">
//             <h3>Total Revenue</h3>
//             <p className="stat-number">${stats.totalRevenue.toFixed(2)}</p>
//           </div>
//         </div>
//       )}

//       {/* Tabs */}
//       <div className="tabs">
//         <button 
//           className={activeTab === 'orders' ? 'active' : ''}
//           onClick={() => setActiveTab('orders')}
//         >
//           📦 Orders
//         </button>
//         <button 
//           className={activeTab === 'users' ? 'active' : ''}
//           onClick={() => setActiveTab('users')}
//         >
//           👥 Users
//         </button>
//       </div>

//       {/* Search and Filter */}
//       <div className="controls">
//         <input
//           type="text"
//           placeholder={activeTab === 'orders' ? 'Search orders...' : 'Search users...'}
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="search-input"
//         />
        
//         {activeTab === 'orders' && (
//           <select 
//             value={filterStatus} 
//             onChange={(e) => setFilterStatus(e.target.value)}
//             className="filter-select"
//           >
//             <option value="all">All Status</option>
//             <option value="pending">Pending</option>
//             <option value="in-progress">In Progress</option>
//             <option value="delivered">Delivered</option>
//           </select>
//         )}
//       </div>

//       {/* Content */}
//       {activeTab === 'orders' ? (
//         <div className="orders-table">
//           <table>
//             <thead>
//               <tr>
//                 <th>Order Name</th>
//                 <th>Customer</th>
//                 <th>From → To</th>
//                 <th>Weight (kg)</th>
//                 <th>Price</th>
//                 <th>Status</th>
//                 <th>Driver</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredOrders.map(order => (
//                 <tr key={order.id}>
//                   <td>{order.name}</td>
//                   <td>{order.customerName || 'Unknown'}</td>
//                   <td>{order.from} → {order.to}</td>
//                   <td>{order.height}</td>
//                   <td>${Number(order.price).toFixed(2)}</td>
//                   <td>
//                     <span className={`status-badge ${order.status || 'pending'}`}>
//                       {order.status || 'pending'}
//                     </span>
//                   </td>
//                   <td>{order.driverName || '-'}</td>
//                   <td>
//                     <button 
//                       className="delete-btn-small"
//                       onClick={() => handleDelete(order.id)}
//                     >
//                       🗑️
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
          
//           {filteredOrders.length === 0 && (
//             <div className="empty-state">No orders found</div>
//           )}
//         </div>
//       ) : (
//         <div className="users-grid">
//           {filteredUsers.map(user => (
//             <div key={user.id} className="user-card">
//               <div className="user-avatar">
//                 {user.role === 'admin' ? '👑' : user.role === 'driver' ? '🚗' : '👤'}
//               </div>
//               <h3>{user.name}</h3>
//               <p className="user-email">{user.email}</p>
//               <span className={`role-badge ${user.role}`}>{user.role}</span>
//               {user.role === 'driver' && user.rating && (
//                 <p className="rating">⭐ {user.rating.toFixed(1)}</p>
//               )}
//               <p className="user-date">
//                 Joined: {new Date(user.createdAt).toLocaleDateString()}
//               </p>
//             </div>
//           ))}
          
//           {filteredUsers.length === 0 && (
//             <div className="empty-state">No users found</div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }








































































// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { fetchOrders, deleteOrder, getOrderStats } from "../../utils/api";
// import { getAllUsers, logout } from "../../utils/auth";
// import { exportOrders, exportUsers, exportStatistics, printOrders } from "../../utils/export";
// import { getUnreadCount } from "../../utils/notifications";
// import NotificationCenter from "../../components/NotificationCenter";
// import Analytics from "../../components/Analytics";
// import "../../styles/admin.css";

// export default function AdminDashboard() {
//   const navigate = useNavigate();
//   const [orders, setOrders] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [stats, setStats] = useState(null);
//   const [activeTab, setActiveTab] = useState('orders');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [showAnalytics, setShowAnalytics] = useState(false);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const user = JSON.parse(localStorage.getItem('user'));

//   useEffect(() => {
//     loadData();
//     loadUnreadCount();
//   }, []);

//   const loadData = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const [ordersData, statsData] = await Promise.all([
//         fetchOrders(),
//         getOrderStats()
//       ]);
      
//       setOrders(ordersData || []);
//       setStats(statsData || { total: 0, pending: 0, inProgress: 0, delivered: 0, totalRevenue: 0 });
      
//       const usersData = getAllUsers();
//       setUsers(Object.values(usersData || {}));
//     } catch (error) {
//       console.error('Error loading data:', error);
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadUnreadCount = () => {
//     if (user) {
//       const count = getUnreadCount(user.id);
//       setUnreadCount(count);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!confirm('Are you sure you want to delete this order?')) return;
    
//     try {
//       await deleteOrder(id);
//       setOrders(prev => prev.filter(o => o.id !== id));
//       alert('Order deleted successfully');
//       loadData();
//     } catch (error) {
//       alert('Failed to delete order');
//     }
//   };

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   const filteredOrders = orders.filter(order => {
//     const matchesSearch = order.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          order.customerName?.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
//     return matchesSearch && matchesStatus;
//   });

//   const filteredUsers = users.filter(user => 
//     user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     user.email?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (loading) {
//     return (
//       <div style={{ 
//         display: 'flex', 
//         justifyContent: 'center', 
//         alignItems: 'center', 
//         height: '100vh',
//         background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//         color: 'white'
//       }}>
//         <h2>Loading Admin Dashboard...</h2>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div style={{ 
//         display: 'flex', 
//         flexDirection: 'column',
//         justifyContent: 'center', 
//         alignItems: 'center', 
//         height: '100vh',
//         background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//         color: 'white',
//         gap: '20px'
//       }}>
//         <h2>Error Loading Data</h2>
//         <p>{error}</p>
//         <button onClick={loadData} style={{
//           padding: '12px 24px',
//           background: 'rgba(255, 255, 255, 0.2)',
//           border: 'none',
//           borderRadius: '10px',
//           color: 'white',
//           cursor: 'pointer'
//         }}>
//           Retry
//         </button>
//         <button onClick={handleLogout} style={{
//           padding: '12px 24px',
//           background: 'rgba(239, 68, 68, 0.3)',
//           border: 'none',
//           borderRadius: '10px',
//           color: 'white',
//           cursor: 'pointer'
//         }}>
//           Logout
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="admin-page">
//       <header className="admin-header">
//         <h1>👑 Admin Dashboard</h1>
//         <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
//           {/* Notification Button */}
//           <button 
//             onClick={() => {
//               setShowNotifications(true);
//               loadUnreadCount();
//             }}
//             style={{
//               position: 'relative',
//               padding: '10px 16px',
//               background: 'rgba(255, 255, 255, 0.2)',
//               border: 'none',
//               borderRadius: '10px',
//               color: 'white',
//               cursor: 'pointer'
//             }}
//           >
//             🔔
//             {unreadCount > 0 && (
//               <span style={{
//                 position: 'absolute',
//                 top: '-5px',
//                 right: '-5px',
//                 background: '#ef4444',
//                 color: 'white',
//                 borderRadius: '50%',
//                 width: '20px',
//                 height: '20px',
//                 fontSize: '11px',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 fontWeight: 'bold'
//               }}>
//                 {unreadCount}
//               </span>
//             )}
//           </button>

//           {/* Profile Button */}
//           <button 
//             onClick={() => navigate('/profile')}
//             style={{
//               padding: '10px 16px',
//               background: 'rgba(255, 255, 255, 0.2)',
//               border: 'none',
//               borderRadius: '10px',
//               color: 'white',
//               cursor: 'pointer'
//             }}
//           >
//             👤
//           </button>

//           <button className="logout-btn" onClick={handleLogout}>Logout</button>
//         </div>
//       </header>

//       {/* Stats Cards */}
//       {stats && (
//         <div className="stats-grid">
//           <div className="stat-card">
//             <h3>Total Orders</h3>
//             <p className="stat-number">{stats.total}</p>
//           </div>
//           <div className="stat-card pending">
//             <h3>Pending</h3>
//             <p className="stat-number">{stats.pending}</p>
//           </div>
//           <div className="stat-card progress">
//             <h3>In Progress</h3>
//             <p className="stat-number">{stats.inProgress}</p>
//           </div>
//           <div className="stat-card delivered">
//             <h3>Delivered</h3>
//             <p className="stat-number">{stats.delivered}</p>
//           </div>
//           <div className="stat-card revenue">
//             <h3>Total Revenue</h3>
//             <p className="stat-number">${stats.totalRevenue.toFixed(2)}</p>
//           </div>
//         </div>
//       )}

//       {/* Analytics Toggle */}
//       <div style={{ marginBottom: '20px' }}>
//         <button
//           onClick={() => setShowAnalytics(!showAnalytics)}
//           style={{
//             padding: '12px 24px',
//             background: 'rgba(255, 255, 255, 0.2)',
//             border: 'none',
//             borderRadius: '10px',
//             color: 'white',
//             cursor: 'pointer',
//             fontWeight: '600'
//           }}
//         >
//           {showAnalytics ? '📊 Hide Analytics' : '📊 Show Analytics'}
//         </button>
//       </div>

//       {/* Analytics */}
//       {showAnalytics && user && <Analytics userId={user.id} userRole="admin" />}

//       {/* Tabs */}
//       <div className="tabs">
//         <button 
//           className={activeTab === 'orders' ? 'active' : ''}
//           onClick={() => setActiveTab('orders')}
//         >
//           📦 Orders
//         </button>
//         <button 
//           className={activeTab === 'users' ? 'active' : ''}
//           onClick={() => setActiveTab('users')}
//         >
//           👥 Users
//         </button>
//       </div>

//       {/* Search and Filter */}
//       <div className="controls">
//         <input
//           type="text"
//           placeholder={activeTab === 'orders' ? 'Search orders...' : 'Search users...'}
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="search-input"
//         />
        
//         {activeTab === 'orders' ? (
//           <>
//             <select 
//               value={filterStatus} 
//               onChange={(e) => setFilterStatus(e.target.value)}
//               className="filter-select"
//             >
//               <option value="all">All Status</option>
//               <option value="pending">Pending</option>
//               <option value="in-progress">In Progress</option>
//               <option value="delivered">Delivered</option>
//             </select>

//             {/* Export Buttons */}
//             <button 
//               onClick={() => exportOrders(filteredOrders)}
//               style={{
//                 padding: '10px 20px',
//                 background: 'rgba(74, 222, 128, 0.3)',
//                 border: 'none',
//                 borderRadius: '10px',
//                 color: 'white',
//                 cursor: 'pointer',
//                 fontWeight: '600'
//               }}
//             >
//               📥 Export CSV
//             </button>
            
//             <button 
//               onClick={() => printOrders(filteredOrders)}
//               style={{
//                 padding: '10px 20px',
//                 background: 'rgba(96, 165, 250, 0.3)',
//                 border: 'none',
//                 borderRadius: '10px',
//                 color: 'white',
//                 cursor: 'pointer',
//                 fontWeight: '600'
//               }}
//             >
//               🖨️ Print
//             </button>
//           </>
//         ) : (
//           <button 
//             onClick={() => exportUsers(filteredUsers)}
//             style={{
//               padding: '10px 20px',
//               background: 'rgba(74, 222, 128, 0.3)',
//               border: 'none',
//               borderRadius: '10px',
//               color: 'white',
//               cursor: 'pointer',
//               fontWeight: '600'
//             }}
//           >
//             📥 Export Users
//           </button>
//         )}

//         {stats && (
//           <button 
//             onClick={() => exportStatistics(stats)}
//             style={{
//               padding: '10px 20px',
//               background: 'rgba(167, 139, 250, 0.3)',
//               border: 'none',
//               borderRadius: '10px',
//               color: 'white',
//               cursor: 'pointer',
//               fontWeight: '600'
//             }}
//           >
//             📊 Export Stats
//           </button>
//         )}
//       </div>

//       {/* Content */}
//       {activeTab === 'orders' ? (
//         <div className="orders-table">
//           <table>
//             <thead>
//               <tr>
//                 <th>Order Name</th>
//                 <th>Customer</th>
//                 <th>From → To</th>
//                 <th>Weight (kg)</th>
//                 <th>Price</th>
//                 <th>Status</th>
//                 <th>Driver</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredOrders.map(order => (
//                 <tr key={order.id}>
//                   <td>{order.name}</td>
//                   <td>{order.customerName || 'Unknown'}</td>
//                   <td>{order.from} → {order.to}</td>
//                   <td>{order.height}</td>
//                   <td>${Number(order.price).toFixed(2)}</td>
//                   <td>
//                     <span className={`status-badge ${order.status || 'pending'}`}>
//                       {order.status || 'pending'}
//                     </span>
//                   </td>
//                   <td>{order.driverName || '-'}</td>
//                   <td>
//                     <button 
//                       className="delete-btn-small"
//                       onClick={() => handleDelete(order.id)}
//                     >
//                       🗑️
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
          
//           {filteredOrders.length === 0 && (
//             <div className="empty-state">No orders found</div>
//           )}
//         </div>
//       ) : (
//         <div className="users-grid">
//           {filteredUsers.map(user => (
//             <div key={user.id} className="user-card">
//               <div className="user-avatar">
//                 {user.role === 'admin' ? '👑' : user.role === 'driver' ? '🚗' : '👤'}
//               </div>
//               <h3>{user.name}</h3>
//               <p className="user-email">{user.email}</p>
//               <span className={`role-badge ${user.role}`}>{user.role}</span>
//               {user.role === 'driver' && user.rating && (
//                 <p className="rating">⭐ {user.rating.toFixed(1)}</p>
//               )}
//               <p className="user-date">
//                 Joined: {new Date(user.createdAt).toLocaleDateString()}
//               </p>
//             </div>
//           ))}
          
//           {filteredUsers.length === 0 && (
//             <div className="empty-state">No users found</div>
//           )}
//         </div>
//       )}

//       {/* Notification Center */}
//       {showNotifications && (
//         <NotificationCenter 
//           onClose={() => {
//             setShowNotifications(false);
//             loadUnreadCount();
//           }} 
//         />
//       )}
//     </div>
//   );
// }

// export default function AdminDashboard() {
//   const navigate = useNavigate();
//   const [orders, setOrders] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [stats, setStats] = useState(null);
//   const [activeTab, setActiveTab] = useState('orders');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       console.log('Loading admin data...');
      
//       const [ordersData, statsData] = await Promise.all([
//         fetchOrders(),
//         getOrderStats()
//       ]);
      
//       console.log('Orders:', ordersData);
//       console.log('Stats:', statsData);
      
//       setOrders(ordersData || []);
//       setStats(statsData || { total: 0, pending: 0, inProgress: 0, delivered: 0, totalRevenue: 0 });
      
//       const usersData = getAllUsers();
//       console.log('Users:', usersData);
//       setUsers(Object.values(usersData || {}));
//     } catch (error) {
//       console.error('Error loading data:', error);
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!confirm('Are you sure you want to delete this order?')) return;
    
//     try {
//       await deleteOrder(id);
//       setOrders(prev => prev.filter(o => o.id !== id));
//       alert('Order deleted successfully');
//       loadData(); // Reload stats
//     } catch (error) {
//       alert('Failed to delete order');
//     }
//   };

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   // Filter orders
//   const filteredOrders = orders.filter(order => {
//     const matchesSearch = order.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          order.customerName?.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
//     return matchesSearch && matchesStatus;
//   });

//   // Filter users
//   const filteredUsers = users.filter(user => 
//     user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     user.email?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (loading) {
//     return (
//       <div style={{ 
//         display: 'flex', 
//         justifyContent: 'center', 
//         alignItems: 'center', 
//         height: '100vh',
//         background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//         color: 'white'
//       }}>
//         <h2>Loading Admin Dashboard...</h2>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div style={{ 
//         display: 'flex', 
//         flexDirection: 'column',
//         justifyContent: 'center', 
//         alignItems: 'center', 
//         height: '100vh',
//         background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//         color: 'white',
//         gap: '20px'
//       }}>
//         <h2>Error Loading Data</h2>
//         <p>{error}</p>
//         <button onClick={loadData} style={{
//           padding: '12px 24px',
//           background: 'rgba(255, 255, 255, 0.2)',
//           border: 'none',
//           borderRadius: '10px',
//           color: 'white',
//           cursor: 'pointer'
//         }}>
//           Retry
//         </button>
//         <button onClick={handleLogout} style={{
//           padding: '12px 24px',
//           background: 'rgba(239, 68, 68, 0.3)',
//           border: 'none',
//           borderRadius: '10px',
//           color: 'white',
//           cursor: 'pointer'
//         }}>
//           Logout
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="admin-page">
//       <header className="admin-header">
//         <h1>👑 Admin Dashboard</h1>
//         <button className="logout-btn" onClick={handleLogout}>Logout</button>
//       </header>

//       {/* Stats Cards */}
//       {stats && (
//         <div className="stats-grid">
//           <div className="stat-card">
//             <h3>Total Orders</h3>
//             <p className="stat-number">{stats.total}</p>
//           </div>
//           <div className="stat-card pending">
//             <h3>Pending</h3>
//             <p className="stat-number">{stats.pending}</p>
//           </div>
//           <div className="stat-card progress">
//             <h3>In Progress</h3>
//             <p className="stat-number">{stats.inProgress}</p>
//           </div>
//           <div className="stat-card delivered">
//             <h3>Delivered</h3>
//             <p className="stat-number">{stats.delivered}</p>
//           </div>
//           <div className="stat-card revenue">
//             <h3>Total Revenue</h3>
//             <p className="stat-number">${stats.totalRevenue.toFixed(2)}</p>
//           </div>
//         </div>
//       )}

//       {/* Tabs */}
//       <div className="tabs">
//         <button 
//           className={activeTab === 'orders' ? 'active' : ''}
//           onClick={() => setActiveTab('orders')}
//         >
//           📦 Orders
//         </button>
//         <button 
//           className={activeTab === 'users' ? 'active' : ''}
//           onClick={() => setActiveTab('users')}
//         >
//           👥 Users
//         </button>
//       </div>

//       {/* Search and Filter */}
//       <div className="controls">
//         <input
//           type="text"
//           placeholder={activeTab === 'orders' ? 'Search orders...' : 'Search users...'}
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="search-input"
//         />
        
//         {activeTab === 'orders' && (
//           <select 
//             value={filterStatus} 
//             onChange={(e) => setFilterStatus(e.target.value)}
//             className="filter-select"
//           >
//             <option value="all">All Status</option>
//             <option value="pending">Pending</option>
//             <option value="in-progress">In Progress</option>
//             <option value="delivered">Delivered</option>
//           </select>
//         )}
//       </div>

//       {/* Content */}
//       {activeTab === 'orders' ? (
//         <div className="orders-table">
//           <table>
//             <thead>
//               <tr>
//                 <th>Order Name</th>
//                 <th>Customer</th>
//                 <th>From → To</th>
//                 <th>Weight (kg)</th>
//                 <th>Price</th>
//                 <th>Status</th>
//                 <th>Driver</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredOrders.map(order => (
//                 <tr key={order.id}>
//                   <td>{order.name}</td>
//                   <td>{order.customerName || 'Unknown'}</td>
//                   <td>{order.from} → {order.to}</td>
//                   <td>{order.height}</td>
//                   <td>${Number(order.price).toFixed(2)}</td>
//                   <td>
//                     <span className={`status-badge ${order.status || 'pending'}`}>
//                       {order.status || 'pending'}
//                     </span>
//                   </td>
//                   <td>{order.driverName || '-'}</td>
//                   <td>
//                     <button 
//                       className="delete-btn-small"
//                       onClick={() => handleDelete(order.id)}
//                     >
//                       🗑️
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
          
//           {filteredOrders.length === 0 && (
//             <div className="empty-state">No orders found</div>
//           )}
//         </div>
//       ) : (
//         <div className="users-grid">
//           {filteredUsers.map(user => (
//             <div key={user.id} className="user-card">
//               <div className="user-avatar">
//                 {user.role === 'admin' ? '👑' : user.role === 'driver' ? '🚗' : '👤'}
//               </div>
//               <h3>{user.name}</h3>
//               <p className="user-email">{user.email}</p>
//               <span className={`role-badge ${user.role}`}>{user.role}</span>
//               {user.role === 'driver' && user.rating && (
//                 <p className="rating">⭐ {user.rating.toFixed(1)}</p>
//               )}
//               <p className="user-date">
//                 Joined: {new Date(user.createdAt).toLocaleDateString()}
//               </p>
//             </div>
//           ))}
          
//           {filteredUsers.length === 0 && (
//             <div className="empty-state">No users found</div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }


















































































import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchOrders, deleteOrder, getOrderStats } from "../../utils/api";
import { getAllUsers, logout } from "../../utils/auth";
import { exportOrders, exportUsers, exportStatistics, printOrders } from "../../utils/export";
import { getUnreadCount } from "../../utils/notifications";
import "../../styles/admin.css";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [activeTab, setActiveTab] = useState('orders');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    loadData();
    loadUnreadCount();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [ordersData, statsData] = await Promise.all([
        fetchOrders(),
        getOrderStats()
      ]);
      
      setOrders(ordersData || []);
      setStats(statsData || { total: 0, pending: 0, inProgress: 0, delivered: 0, totalRevenue: 0 });
      
      const usersData = getAllUsers();
      setUsers(Object.values(usersData || {}));
    } catch (error) {
      console.error('Error loading data:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const loadUnreadCount = () => {
    if (user) {
      const count = getUnreadCount(user.id);
      setUnreadCount(count);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this order?')) return;
    
    try {
      await deleteOrder(id);
      setOrders(prev => prev.filter(o => o.id !== id));
      alert('Order deleted successfully');
      loadData();
    } catch (error) {
      alert('Failed to delete order');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
      }}>
        <h2>Loading Admin Dashboard...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        gap: '20px'
      }}>
        <h2>Error Loading Data</h2>
        <p>{error}</p>
        <button onClick={loadData} style={{
          padding: '12px 24px',
          background: 'rgba(255, 255, 255, 0.2)',
          border: 'none',
          borderRadius: '10px',
          color: 'white',
          cursor: 'pointer'
        }}>
          Retry
        </button>
        <button onClick={handleLogout} style={{
          padding: '12px 24px',
          background: 'rgba(239, 68, 68, 0.3)',
          border: 'none',
          borderRadius: '10px',
          color: 'white',
          cursor: 'pointer'
        }}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <header className="admin-header">
        <h1>👑 Admin Dashboard</h1>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {/* Notification Button */}
          <button 
            onClick={() => {
              setShowNotifications(true);
              loadUnreadCount();
            }}
            style={{
              position: 'relative',
              padding: '10px 16px',
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
              padding: '10px 16px',
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              borderRadius: '10px',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            👤
          </button>

          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
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

      {/* Analytics Toggle */}
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => setShowAnalytics(!showAnalytics)}
          style={{
            padding: '12px 24px',
            background: 'rgba(255, 255, 255, 0.2)',
            border: 'none',
            borderRadius: '10px',
            color: 'white',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          {showAnalytics ? '📊 Hide Analytics' : '📊 Show Analytics'}
        </button>
      </div>

      {/* Analytics (Inlined) */}
      {showAnalytics && user && (
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          padding: '1.5rem',
          borderRadius: '12px',
          marginBottom: '2rem'
        }}>
          <h3>Analytics Dashboard</h3>
          <p>Analytics will be available soon for admin!</p>
          {stats && (
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
              <div>
                <strong>Average Order Value:</strong> ${stats.totalRevenue > 0 ? (stats.totalRevenue / stats.total).toFixed(2) : '0.00'}
              </div>
              <div>
                <strong>Delivery Rate:</strong> {stats.total > 0 ? ((stats.delivered / stats.total) * 100).toFixed(1) : '0'}%
              </div>
            </div>
          )}
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
        
        {activeTab === 'orders' ? (
          <>
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

            {/* Export Buttons */}
            <button 
              onClick={() => exportOrders(filteredOrders)}
              style={{
                padding: '10px 20px',
                background: 'rgba(74, 222, 128, 0.3)',
                border: 'none',
                borderRadius: '10px',
                color: 'white',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              📥 Export CSV
            </button>
            
            <button 
              onClick={() => printOrders(filteredOrders)}
              style={{
                padding: '10px 20px',
                background: 'rgba(96, 165, 250, 0.3)',
                border: 'none',
                borderRadius: '10px',
                color: 'white',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              🖨️ Print
            </button>
          </>
        ) : (
          <button 
            onClick={() => exportUsers(filteredUsers)}
            style={{
              padding: '10px 20px',
              background: 'rgba(74, 222, 128, 0.3)',
              border: 'none',
              borderRadius: '10px',
              color: 'white',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            📥 Export Users
          </button>
        )}

        {stats && (
          <button 
            onClick={() => exportStatistics(stats)}
            style={{
              padding: '10px 20px',
              background: 'rgba(167, 139, 250, 0.3)',
              border: 'none',
              borderRadius: '10px',
              color: 'white',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            📊 Export Stats
          </button>
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

      {/* Notification Center (Inlined) */}
      {showNotifications && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          zIndex: 1000,
          minWidth: '300px',
          color: '#333'
        }}>
          <h3 style={{ marginTop: 0 }}>Notifications</h3>
          <p>No new notifications</p>
          <button 
            onClick={() => {
              setShowNotifications(false);
              loadUnreadCount();
            }}
            style={{
              padding: '10px 20px',
              background: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              marginTop: '1rem'
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}