// import { useEffect, useState } from "react";
// import { fetchOrders, deleteOrder } from "../../utils/api";
// import { getExtraData } from "../../utils/storage";
// import "../../styles/customer.css";
// import { useNavigate } from "react-router-dom";

// export default function CustomerDashboard() {
//   const [orders, setOrders] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchOrders().then(setOrders);
//   }, []);

//   const extra = getExtraData();

//   const statusInfo = (id) => {
//     const e = extra[id];
//     if (!e) return { text: "Yangi", cls: "new" };
//     if (e.delivered) return { text: "Yetkazildi", cls: "done" };
//     return { text: "Jarayonda", cls: "progress" };
//   };

//   return (
//     <div className="page">
//       <header>
//         <h2>📦 Buyurtmalar</h2>
//         <button className="exit-btn" onClick={() => navigate("/")}>
//           Chiqish
//         </button>
//       </header>

//       <div className="grid">
//         {orders.map((o) => {
//           const st = statusInfo(o.id);
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

//               <button
//                 className="danger"
//                 onClick={() =>
//                   deleteOrder(o.id).then(() =>
//                     setOrders((prev) => prev.filter((x) => x.id !== o.id))
//                   )
//                 }
//               >
//                 O'chirish
//               </button>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }























import { useEffect, useState } from "react";
import { fetchOrders, deleteOrder, addOrder } from "../../utils/api";
import { getExtraData } from "../../utils/storage";
import "../../styles/customer.css";
import { useNavigate } from "react-router-dom";

export default function CustomerDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false); // optional loading state
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders().then(setOrders).catch((err) => console.error(err));
  }, []);

  const extra = getExtraData();

  const statusInfo = (id) => {
    const e = extra[id];
    if (!e) return { text: "Yangi", cls: "new" };
    if (e.delivered) return { text: "Yetkazildi", cls: "done" };
    return { text: "Jarayonda", cls: "progress" };
  };

  // Add new order handler
  const handleAddOrder = async () => {
    const name = prompt("Buyurtma nomini kiriting:");
    const from = prompt("Qayerdan:");
    const to = prompt("Qayerga:");
    const height = prompt("Kg kiriting:");
    const price = prompt("Narx kiriting:");

    if (!name || !from || !to || !height || !price) {
      alert("Barcha maydonlarni to‘ldiring!");
      return;
    }

    const newOrder = {
      name,
      from,
      to,
      height: Number(height),
      price: Number(price)
    };

    try {
      setLoading(true);
      const added = await addOrder(newOrder);
      setOrders((prev) => [...prev, added]);
      alert("Buyurtma qo‘shildi!");
    } catch (err) {
      console.error(err);
      alert("Buyurtma qo‘shishda xatolik yuz berdi!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <header>
        <h2>📦 Buyurtmalar</h2>
        <div>
          <button className="add-btn" onClick={handleAddOrder} disabled={loading}>
            ➕ Yangi Buyurtma
          </button>
          <button className="exit-btn" onClick={() => navigate("/")}>
            Chiqish
          </button>
        </div>
      </header>

      <div className="grid">
        {orders.map((o) => {
          const st = statusInfo(o.id);
          const e = extra[o.id];

          return (
            <div key={o.id} className={`card ${st.cls}`}>
              <h3>{o.name}</h3>
              <p>
                {o.from} → {o.to}
              </p>
              <p>Kg: {o.height}</p>
              <p className="price">💵 {Number(o.price).toFixed(2)} $</p>
              {e && (
                <p className="driver">
                  🚚 {e.driverName} ({e.driverPhone})
                </p>
              )}
              <span className="status">{st.text}</span>
              <button
                className="danger"
                onClick={() =>
                  deleteOrder(o.id).then(() =>
                    setOrders((prev) => prev.filter((x) => x.id !== o.id))
                  )
                }
              >
                O'chirish
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
