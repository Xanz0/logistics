// import { useEffect, useState } from "react";
// import { fetchOrders } from "../../utils/api";
// import { saveExtraData } from "../../utils/storage";
// import "../../styles/driver.css";
// import { useNavigate } from "react-router-dom";

// export default function DriverDashboard() {
//   const [orders, setOrders] = useState([]);
//   const navigate = useNavigate();

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
//       delivered: false
//     });
//     alert("Order accepted");
//   };

//   const finish = (id) => {
//     saveExtraData(id, { delivered: true });
//     alert("Delivered");
//   };

//   return (
//     <div className="page">
//       <header>
//         <h2>🚚 Driver Panel</h2>
//         <button onClick={() => navigate("/")}>Exit</button>
//       </header>

//       <div className="grid">
//         {orders.map(o => (
//           <div key={o.id} className="card">
//             <h3>{o.name}</h3>
//             <p>{o.from} → {o.to}</p>

//             <button onClick={() => accept(o.id)}>Accept</button>
//             <button className="done" onClick={() => finish(o.id)}>
//               Finish
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }












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

//     saveExtraData(id, { driverName: name, driverPhone: phone, delivered: false });
//     alert("Order accepted");
//     setOrders([...orders]); // re-render to show accepted status
//   };

//   const finish = (id) => {
//     saveExtraData(id, { delivered: true });
//     alert("Delivered");
//     setOrders([...orders]);
//   };

//   const getStatusInfo = (id) => {
//     const e = extra[id];
//     if (!e) return { text: "NEW", cls: "new", buttons: true };
//     if (!e.delivered) return { text: "IN PROGRESS", cls: "progress", buttons: false };
//     return { text: "DELIVERED", cls: "done", buttons: false };
//   };

//   return (
//     <div className="page">
//       <header>
//         <h2>🚚 Driver Panel</h2>
//         <button className="exit-btn" onClick={() => navigate("/")}>
//           Exit
//         </button>
//       </header>

//       <div className="grid">
//         {orders.map((o) => {
//           const st = getStatusInfo(o.id);
//           const e = extra[o.id];

//           return (
//             <div key={o.id} className={`card ${st.cls}`}>
//               <h3>{o.name}</h3>
//               <p>{o.from} → {o.to}</p>
//               <p>Kg: {o.height}</p>

//               {e && (
//                 <p className="driver">
//                   🚚 {e.driverName} ({e.driverPhone})
//                 </p>
//               )}

//               <span className="status">{st.text}</span>

//               {st.buttons && (
//                 <>
//                   <button onClick={() => accept(o.id)}>Accept</button>
//                   <button className="done" onClick={() => finish(o.id)}>Finish</button>
//                 </>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { fetchOrders } from "../../utils/api";
import { saveExtraData, getExtraData } from "../../utils/storage";
import "../../styles/driver.css";
import { useNavigate } from "react-router-dom";

export default function DriverDashboard() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const extra = getExtraData();

  useEffect(() => {
    fetchOrders().then(setOrders);
  }, []);

  const accept = (id) => {
    const name = prompt("Driver name:");
    const phone = prompt("Driver phone:");
    if (!name || !phone) return;

    saveExtraData(id, { driverName: name, driverPhone: phone, delivered: false });
    alert("Order accepted");
    setOrders([...orders]); // re-render
  };

  const finish = (id) => {
    saveExtraData(id, { delivered: true });
    alert("Delivered");
    setOrders([...orders]);
  };

  const getStatusInfo = (id) => {
    const e = extra[id];

    if (!e) return { text: "NEW", cls: "new", showAccept: true, showFinish: false };
    if (!e.delivered) return { text: "IN PROGRESS", cls: "progress", showAccept: false, showFinish: true };
    return { text: "DELIVERED", cls: "done", showAccept: false, showFinish: false };
  };

  return (
    <div className="page">
      <header>
        <h2>🚚 Driver Panel</h2>
        <button className="exit-btn" onClick={() => navigate("/")}>
          Exit
        </button>
      </header>

      <div className="grid">
        {orders.map((o) => {
          const st = getStatusInfo(o.id);
          const e = extra[o.id];

          return (
            <div key={o.id} className={`card ${st.cls}`}>
              <h3>{o.name}</h3>
              <p>{o.from} → {o.to}</p>
              <p>Kg: {o.height}</p>

              {e && (
                <p className="driver">
                  🚚 {e.driverName} ({e.driverPhone})
                </p>
              )}

              <span className="status">{st.text}</span>

              {st.showAccept && <button onClick={() => accept(o.id)}>Accept</button>}
              {st.showFinish && <button className="done" onClick={() => finish(o.id)}>Finish</button>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
