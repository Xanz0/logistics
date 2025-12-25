import { useEffect, useState } from "react";
import { fetchOrders, deleteOrder } from "../../utils/api";
import { getExtraData } from "../../utils/storage";
import "../../styles/customer.css";
import { useNavigate } from "react-router-dom";

export default function CustomerDashboard() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders().then(setOrders);
  }, []);

  const extra = getExtraData();

  const statusInfo = (id) => {
    const e = extra[id];
    if (!e) return { text: "Yangi", cls: "new" };
    if (e.delivered) return { text: "Yetkzaildi", cls: "done" };
    return { text: "Jarayonda", cls: "progress" };
  };

  return (
    <div className="page">
      <header>
        <h2>📦 Buyurtmalar</h2>
        <button className="exit-btn" onClick={() => navigate("/")}>
          Chiqish
        </button>
      </header>

      <div className="grid">
        {orders.map((o) => {
          const st = statusInfo(o.id);
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
