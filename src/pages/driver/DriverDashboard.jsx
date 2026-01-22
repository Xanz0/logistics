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

    saveExtraData(id, {
      driverName: name,
      driverPhone: phone,
      delivered: false,
    });

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

    if (!e)
      return { text: "Yangi", cls: "new", showAccept: true, showFinish: false };

    if (!e.delivered)
      return {
        text: "Jarayonda",
        cls: "progress",
        showAccept: false,
        showFinish: true,
      };

    return {
      text: "Yetkazildi",
      cls: "done",
      showAccept: false,
      showFinish: false,
    };
  };

  return (
    <div className="page">
      <header>
        <h2>🚚 Driver Paneli</h2>
        <button className="exit-btn" onClick={() => navigate("/")}>
          Chiqish
        </button>
      </header>

      <div className="grid">
        {orders.map((o) => {
          const st = getStatusInfo(o.id);
          const e = extra[o.id];

          return (
            <div key={o.id} className={`card ${st.cls}`}>
              <h3>{o.name}</h3>

              <p>
                {o.from} → {o.to}
              </p>

              <p>Kg: {o.height}</p>

              {/* PRICE */}
              <p className="price">
                💵 {Number(o.price).toFixed(2)} $
              </p>

              {e && (
                <p className="driver">
                  🚚 {e.driverName} ({e.driverPhone})
                </p>
              )}

              <span className="status">{st.text}</span>

              {st.showAccept && (
                <button onClick={() => accept(o.id)}>Qabul Qilish</button>
              )}

              {st.showFinish && (
                <button className="done" onClick={() => finish(o.id)}>
                  Ishni Yakunlash
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

