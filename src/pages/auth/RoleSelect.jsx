// import { useNavigate } from "react-router-dom";
// import { login } from "../../utils/auth";
// import "../../styles/auth.css";

// export default function RoleSelect() {
//   const navigate = useNavigate();

//   const selectRole = (role) => {
//     // LocalStorage dan user ma'lumotlarini olish
//     const storedUser = JSON.parse(localStorage.getItem('tempUser') || '{}');
    
//     // Login qilish
//     login(role, storedUser);
    
//     // Temporary user ma'lumotlarini o'chirish
//     localStorage.removeItem('tempUser');
    
//     // Dashboardga yo'naltirish
//     navigate(role === "customer" ? "/customer" : "/driver");
//   };

//   return (
//     <div className="role-select auth-container">
//       <h1>Select Your Role</h1>
//       <p>Choose how you want to use the platform</p>
      
//       <div className="role-buttons">
//         <button 
//           className="role-btn customer-btn"
//           onClick={() => selectRole("customer")}
//         >
//           <div className="role-icon">👤</div>
//           <h3>Customer</h3>
//           <p>I want to place orders</p>
//         </button>
        
//         <button 
//           className="role-btn driver-btn"
//           onClick={() => selectRole("driver")}
//         >
//           <div className="role-icon">🚗</div>
//           <h3>Driver</h3>
//           <p>I want to deliver orders</p>
//         </button>
//       </div>
      
//       <button 
//         className="back-btn"
//         onClick={() => navigate('/login')}
//       >
//         ← Back to Login
//       </button>
//     </div>
//   );
// }













































// src/pages/auth/RoleSelect.jsx
import { useNavigate } from "react-router-dom";
import { simpleLogin } from "../../utils/auth";

export default function RoleSelect() {
  const navigate = useNavigate();

  const selectRole = (role) => {
    simpleLogin(role);
    navigate(role === "customer" ? "/customer" : "/driver");
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(20px)',
        padding: '40px',
        borderRadius: '24px',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.35)',
        color: '#fff',
        maxWidth: '400px',
        width: '100%'
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Select Your Role</h1>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <button
            onClick={() => selectRole("customer")}
            style={{
              padding: '20px',
              borderRadius: '16px',
              border: 'none',
              background: 'rgba(255, 255, 255, 0.2)',
              color: '#fff',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
          >
            <span style={{ fontSize: '24px' }}>👤</span>
            <div style={{ textAlign: 'left', flex: 1 }}>
              <h3 style={{ margin: '0 0 5px 0' }}>Customer</h3>
              <small style={{ opacity: 0.8 }}>I want to place orders</small>
            </div>
          </button>
          
          <button
            onClick={() => selectRole("driver")}
            style={{
              padding: '20px',
              borderRadius: '16px',
              border: 'none',
              background: 'rgba(255, 255, 255, 0.2)',
              color: '#fff',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
          >
            <span style={{ fontSize: '24px' }}>🚗</span>
            <div style={{ textAlign: 'left', flex: 1 }}>
              <h3 style={{ margin: '0 0 5px 0' }}>Driver</h3>
              <small style={{ opacity: 0.8 }}>I want to deliver orders</small>
            </div>
          </button>
        </div>
        
        <button 
          onClick={() => navigate('/login')}
          style={{
            marginTop: '30px',
            width: '100%',
            padding: '12px',
            background: 'transparent',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            color: '#fff',
            borderRadius: '12px',
            cursor: 'pointer'
          }}
        >
          ← Back to Login
        </button>
      </div>
    </div>
  );
}