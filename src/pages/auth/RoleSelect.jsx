import { useNavigate } from "react-router-dom";

export default function RoleSelect() {
  const navigate = useNavigate();

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
            onClick={() => navigate("/")}
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
            onClick={() => navigate("/")}
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

          <button
            onClick={() => navigate("/")}
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
            <span style={{ fontSize: '24px' }}>👑</span>
            <div style={{ textAlign: 'left', flex: 1 }}>
              <h3 style={{ margin: '0 0 5px 0' }}>Admin</h3>
              <small style={{ opacity: 0.8 }}>Manage everything</small>
            </div>
          </button>
        </div>
        
        <p style={{ 
          textAlign: 'center', 
          marginTop: '30px',
          fontSize: '14px',
          opacity: 0.8
        }}>
          Note: All roles now require login/registration
        </p>
      </div>
    </div>
  );
}






















