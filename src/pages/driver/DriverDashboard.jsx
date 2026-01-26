// import { useEffect, useState } from "react";
// import { fetchOrders } from "../../utils/api";
// import { saveExtraData, getExtraData } from "../../utils/storage";
// import "../../styles/driver.css";
// import { useNavigate } from "react-router-dom";

// export default function DriverDashboard() {
//   const [orders, setOrders] = useState([]);
//   const navigate = useNavigate();
//   const extra = getExtraData();

//   useEffect(() => {
//     fetchOrders().then(setOrders);
//   }, []);

//   const accept = (id) => {
//     const name = prompt("Driver name:");
//     const phone = prompt("Driver phone:");
//     if (!name || !phone) return;

//     saveExtraData(id, {
//       driverName: name,
//       driverPhone: phone,
//       delivered: false,
//     });

//     alert("Order accepted");
//     setOrders([...orders]); // re-render
//   };

//   const finish = (id) => {
//     saveExtraData(id, { delivered: true });
//     alert("Delivered");
//     setOrders([...orders]);
//   };

//   const getStatusInfo = (id) => {
//     const e = extra[id];

//     if (!e)
//       return { text: "Yangi", cls: "new", showAccept: true, showFinish: false };

//     if (!e.delivered)
//       return {
//         text: "Jarayonda",
//         cls: "progress",
//         showAccept: false,
//         showFinish: true,
//       };

//     return {
//       text: "Yetkazildi",
//       cls: "done",
//       showAccept: false,
//       showFinish: false,
//     };
//   };

//   return (
//     <div className="page">
//       <header>
//         <h2>🚚 Driver Paneli</h2>
//         <button className="exit-btn" onClick={() => navigate("/")}>
//           Chiqish
//         </button>
//       </header>

//       <div className="grid">
//         {orders.map((o) => {
//           const st = getStatusInfo(o.id);
//           const e = extra[o.id];

//           return (
//             <div key={o.id} className={`card ${st.cls}`}>
//               <h3>{o.name}</h3>

//               <p>
//                 {o.from} → {o.to}
//               </p>

//               <p>Kg: {o.height}</p>

//               {/* PRICE */}
//               <p className="price">
//                 💵 {Number(o.price).toFixed(2)} $
//               </p>

//               {e && (
//                 <p className="driver">
//                   🚚 {e.driverName} ({e.driverPhone})
//                 </p>
//               )}

//               <span className="status">{st.text}</span>

//               {st.showAccept && (
//                 <button onClick={() => accept(o.id)}>Qabul Qilish</button>
//               )}

//               {st.showFinish && (
//                 <button className="done" onClick={() => finish(o.id)}>
//                   Ishni Yakunlash
//                 </button>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }







































import { useEffect, useState } from "react";
import { fetchOrders, assignDriver, completeOrder } from "../../utils/api";
import { getUser, logout } from "../../utils/auth";
import "../../styles/driver.css";
import { useNavigate } from "react-router-dom";

export default function DriverDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const navigate = useNavigate();
  const user = getUser();

  useEffect(() => {
    loadOrders();
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

  const handleAccept = async (order) => {
    const phone = prompt('Enter your contact phone number:');
    if (!phone) return;

    try {
      setLoading(true);
      await assignDriver(order.id, user.id, user.name, phone);
      alert('Order accepted successfully!');
      loadOrders();
    } catch (err) {
      console.error(err);
      alert('Failed to accept order');
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async (orderId) => {
    if (!confirm('Mark this order as delivered?')) return;
    
    try {
      setLoading(true);
      await completeOrder(orderId);
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
      // Check if this driver accepted it
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
        <button className="exit-btn" onClick={handleLogout}>
          Logout
        </button>
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
          <option value="available">Available Orders</option>
          <option value="my-orders">My Orders</option>
          <option value="in-progress">In Progress</option>
          <option value="delivered">Delivered</option>
        </select>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h3>Loading...</h3>
        </div>
      ) : (
        <div className="grid">
          {filteredOrders.map((o) => {
            const st = getStatusInfo(o);

            return (
              <div key={o.id} className={`card ${st.cls}`}>
                <h3>{o.name}</h3>

                <p>
                  {o.from} → {o.to}
                </p>

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

                {st.showAccept && (
                  <button onClick={() => handleAccept(o)} disabled={loading}>
                    Accept Order
                  </button>
                )}

                {st.showFinish && (
                  <button className="done" onClick={() => handleComplete(o.id)} disabled={loading}>
                    Mark as Delivered
                  </button>
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
              <p>
                {filterStatus === 'available' 
                  ? 'No available orders at the moment' 
                  : 'No orders match your filter'}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}