import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../../utils/auth.js";
import Silk from "../../components/Silk.jsx";
import "../../styles/login.css";

export default function LoginRegister() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("customer");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        const { user } = await login({ email, password });
        
        // Redirect based on role
        if (user.role === 'admin') {
          navigate("/admin", { replace: true });
        } else if (user.role === 'driver') {
          navigate("/driver", { replace: true });
        } else {
          navigate("/customer", { replace: true });
        }
      } else {
        await register({ name, email, password, role });
        alert("Registration successful! Please login.");
        setIsLogin(true);
        setName("");
        setPassword("");
        setEmail("");
      }
    } catch (err) {
      setError(err.message || "An error occurred");
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
        <div className="login-card">
          <h2 style={{ marginBottom: '10px' }}>
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="instructions-box" style={{ marginBottom: '20px' }}>
            {isLogin ? 'Login to your account' : 'Register a new account'}
          </p>
          
          {error && (
            <div className="alert-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            
            {/* Name (only for register) */}
            {!isLogin && (
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={loading}
              />
            )}

            {/* Email */}
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />

            {/* Password */}
            <input
              type="password"
              placeholder="Password (min 6 chars)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />

            {/* Role Selection (only for register) */}
            {!isLogin && (
              <div className="role-tabs-container">
                <button
                  type="button"
                  className={`role-tab-btn ${role === "customer" ? 'active' : ''}`}
                  onClick={() => setRole("customer")}
                  disabled={loading}
                >
                  👤 Customer
                </button>
                
                <button
                  type="button"
                  className={`role-tab-btn ${role === "driver" ? 'active' : ''}`}
                  onClick={() => setRole("driver")}
                  disabled={loading}
                >
                  🚗 Driver
                </button>
              </div>
            )}

            {/* Demo credentials hint */}
            {isLogin && (
              <div className="hint-box">
                <strong>Demo Admin:</strong> admin@logistics.com / admin2025!Secure<br/>
                <strong>Demo Driver:</strong> driver@logistics.com / driver123
              </div>
            )}

            {/* Submit button */}
            <button 
              type="submit" 
              disabled={loading}
            >
              {loading ? (isLogin ? 'Logging in...' : 'Registering...') : (isLogin ? 'Login' : 'Register')}
            </button>
          </form>

          {/* Toggle Login/Register */}
          <p 
            className="hint-box" 
            style={{ marginTop: '20px', cursor: 'pointer', textDecoration: 'underline' }} 
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
          >
            {isLogin ? "Don't have an account? Register here" : "Already have an account? Login here"}
          </p>
        </div>
      </div>
    </div>
  );
}