import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../utils/auth.js";
import Silk from "../../components/Silk.jsx";
import "../../styles/login.css";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedRole, setSelectedRole] = useState("customer");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login({
        role: selectedRole,
        name: name,
        password: password
      });
      
      const redirectPath = selectedRole === "customer" ? "/customer" : "/driver";
      navigate(redirectPath, { replace: true });
      
    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-bg">
        <Silk />
      </div>

      <div className="login-container">
        <div className="login-card" style={{ maxWidth: '420px', padding: '35px' }}>
          <h2 style={{ marginBottom: '20px', fontSize: '26px' }}>Welcome Back</h2>
          
          {error && (
            <div style={{
              background: 'rgba(255, 100, 100, 0.2)',
              color: '#ffcccc',
              padding: '12px',
              borderRadius: '12px',
              marginBottom: '20px',
              fontSize: '14px',
              border: '1px solid rgba(255, 100, 100, 0.3)',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Role Selection */}
            <div style={{
              display: 'flex',
              gap: '12px',
              marginBottom: '5px'
            }}>
              <button
                type="button"
                style={{
                  flex: 1,
                  padding: '14px',
                  borderRadius: '12px',
                  border: selectedRole === "customer" ? '2px solid white' : 'none',
                  background: selectedRole === "customer" 
                    ? 'rgba(255, 255, 255, 0.25)' 
                    : 'rgba(255, 255, 255, 0.15)',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => setSelectedRole("customer")}
                disabled={loading}
              >
                👤 Customer
              </button>
              
              <button
                type="button"
                style={{
                  flex: 1,
                  padding: '14px',
                  borderRadius: '12px',
                  border: selectedRole === "driver" ? '2px solid white' : 'none',
                  background: selectedRole === "driver" 
                    ? 'rgba(255, 255, 255, 0.25)' 
                    : 'rgba(255, 255, 255, 0.15)',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => setSelectedRole("driver")}
                disabled={loading}
              >
                🚗 Driver
              </button>
            </div>

            {/* Name input */}
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loading}
              style={{
                padding: '14px',
                borderRadius: '12px',
                border: 'none',
                outline: 'none',
                background: 'rgba(255, 255, 255, 0.25)',
                color: '#fff',
                width: '100%',
                fontSize: '15px'
              }}
            />

            {/* Password input */}
            <input
              type="password"
              placeholder={`Enter ${selectedRole} password`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              style={{
                padding: '14px',
                borderRadius: '12px',
                border: 'none',
                outline: 'none',
                background: 'rgba(255, 255, 255, 0.25)',
                color: '#fff',
                width: '100%',
                fontSize: '15px'
              }}
            />

            {/* Simple instruction */}
            {/* <div style={{
              textAlign: 'center',
              fontSize: '12px',
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: '5px'
            }}>
              <small>
                {selectedRole === "customer" 
                  ? "Password: customer123" 
                  : "Password: driver123"}
              </small>
            </div> */}

            {/* Submit button */}
            <button 
              type="submit" 
              disabled={loading}
              style={{
                padding: '15px',
                borderRadius: '14px',
                border: 'none',
                fontSize: '16px',
                fontWeight: '600',
                color: '#000',
                background: loading 
                  ? 'linear-gradient(135deg, #cfcfcf, #afafaf)' 
                  : 'linear-gradient(135deg, #fff, #cfcfcf)',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                opacity: loading ? 0.7 : 1,
                marginTop: '10px'
              }}
            >
              {loading ? 'Logging in...' : `Login`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}