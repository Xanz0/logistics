// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { login } from "../../utils/auth.js";
// import Silk from "../../components/Silk.jsx";
// import "../../styles/login.css";

// export default function Login() {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [selectedRole, setSelectedRole] = useState("customer");
//   const [name, setName] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       await login({
//         role: selectedRole,
//         name: name,
//         password: password
//       });
      
//       const redirectPath = selectedRole === "customer" ? "/customer" : "/driver";
//       navigate(redirectPath, { replace: true });
      
//     } catch (err) {
//       setError(err.message || "Login failed. Please check your credentials.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login-wrapper">
//       <div className="login-bg">
//         <Silk />
//       </div>

//       <div className="login-container">
//         <div className="login-card" style={{ maxWidth: '420px', padding: '35px' }}>
//           <h2 style={{ marginBottom: '20px', fontSize: '26px' }}>Welcome Back</h2>
          
//           {error && (
//             <div style={{
//               background: 'rgba(255, 100, 100, 0.2)',
//               color: '#ffcccc',
//               padding: '12px',
//               borderRadius: '12px',
//               marginBottom: '20px',
//               fontSize: '14px',
//               border: '1px solid rgba(255, 100, 100, 0.3)',
//               textAlign: 'center'
//             }}>
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
//             {/* Role Selection */}
//             <div style={{
//               display: 'flex',
//               gap: '12px',
//               marginBottom: '5px'
//             }}>
//               <button
//                 type="button"
//                 style={{
//                   flex: 1,
//                   padding: '14px',
//                   borderRadius: '12px',
//                   border: selectedRole === "customer" ? '2px solid white' : 'none',
//                   background: selectedRole === "customer" 
//                     ? 'rgba(255, 255, 255, 0.25)' 
//                     : 'rgba(255, 255, 255, 0.15)',
//                   color: '#fff',
//                   cursor: 'pointer',
//                   fontSize: '14px',
//                   fontWeight: '500',
//                   transition: 'all 0.3s ease'
//                 }}
//                 onClick={() => setSelectedRole("customer")}
//                 disabled={loading}
//               >
//                 👤 Customer
//               </button>
              
//               <button
//                 type="button"
//                 style={{
//                   flex: 1,
//                   padding: '14px',
//                   borderRadius: '12px',
//                   border: selectedRole === "driver" ? '2px solid white' : 'none',
//                   background: selectedRole === "driver" 
//                     ? 'rgba(255, 255, 255, 0.25)' 
//                     : 'rgba(255, 255, 255, 0.15)',
//                   color: '#fff',
//                   cursor: 'pointer',
//                   fontSize: '14px',
//                   fontWeight: '500',
//                   transition: 'all 0.3s ease'
//                 }}
//                 onClick={() => setSelectedRole("driver")}
//                 disabled={loading}
//               >
//                 🚗 Driver
//               </button>
//             </div>

//             {/* Name input */}
//             <input
//               type="text"
//               placeholder="Your Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//               disabled={loading}
//               style={{
//                 padding: '14px',
//                 borderRadius: '12px',
//                 border: 'none',
//                 outline: 'none',
//                 background: 'rgba(255, 255, 255, 0.25)',
//                 color: '#fff',
//                 width: '100%',
//                 fontSize: '15px'
//               }}
//             />

//             {/* Password input */}
//             <input
//               type="password"
//               placeholder={`Enter ${selectedRole} password`}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               disabled={loading}
//               style={{
//                 padding: '14px',
//                 borderRadius: '12px',
//                 border: 'none',
//                 outline: 'none',
//                 background: 'rgba(255, 255, 255, 0.25)',
//                 color: '#fff',
//                 width: '100%',
//                 fontSize: '15px'
//               }}
//             />

//             {/* Simple instruction */}
//             {/* <div style={{
//               textAlign: 'center',
//               fontSize: '12px',
//               color: 'rgba(255, 255, 255, 0.8)',
//               marginBottom: '5px'
//             }}>
//               <small>
//                 {selectedRole === "customer" 
//                   ? "Password: customer123" 
//                   : "Password: driver123"}
//               </small>
//             </div> */}

//             {/* Submit button */}
//             <button 
//               type="submit" 
//               disabled={loading}
//               style={{
//                 padding: '15px',
//                 borderRadius: '14px',
//                 border: 'none',
//                 fontSize: '16px',
//                 fontWeight: '600',
//                 color: '#000',
//                 background: loading 
//                   ? 'linear-gradient(135deg, #cfcfcf, #afafaf)' 
//                   : 'linear-gradient(135deg, #fff, #cfcfcf)',
//                 cursor: loading ? 'not-allowed' : 'pointer',
//                 transition: 'all 0.3s ease',
//                 opacity: loading ? 0.7 : 1,
//                 marginTop: '10px'
//               }}
//             >
//               {loading ? 'Logging in...' : `Login`}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }





// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { login, register } from "../../utils/auth.js";
// import Silk from "../../components/Silk.jsx";
// import "../../styles/login.css";

// export default function LoginRegister() {
//   const navigate = useNavigate();
//   const [isLogin, setIsLogin] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
  
//   // Form fields
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [role, setRole] = useState("customer");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       if (isLogin) {
//         const { user } = await login({ email, password });
        
//         // Redirect based on role
//         if (user.role === 'admin') {
//           navigate("/admin", { replace: true });
//         } else if (user.role === 'driver') {
//           navigate("/driver", { replace: true });
//         } else {
//           navigate("/customer", { replace: true });
//         }
//       } else {
//         await register({ name, email, password, role });
//         alert("Registration successful! Please login.");
//         setIsLogin(true);
//         setName("");
//         setPassword("");
//         setEmail("");
//       }
//     } catch (err) {
//       setError(err.message || "An error occurred");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login-wrapper">
//       <div className="login-bg">
//         <Silk />
//       </div>

//       <div className="login-container">
//         <div className="login-card">
//           <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
//           <p className="instructions-box">
//             {isLogin ? 'Login to your account' : 'Register a new account'}
//           </p>
          
//           {error && (
//             <div className="alert-error">
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleSubmit}>
            
//             {/* Name (only for register) */}
//             {!isLogin && (
//               <input
//                 type="text"
//                 placeholder="Full Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//                 disabled={loading}
//               />
//             )}

//             {/* Email */}
//             <input
//               type="email"
//               placeholder="Email Address"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               disabled={loading}
//             />

//             {/* Password */}
//             <input
//               type="password"
//               placeholder="Password (min 6 chars)"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               disabled={loading}
//             />

//             {/* Role Selection (only for register) */}
//             {!isLogin && (
//               <div className="role-tabs-container">
//                 <button
//                   type="button"
//                   className={`role-tab-btn ${role === "customer" ? 'active' : ''}`}
//                   onClick={() => setRole("customer")}
//                   disabled={loading}
//                 >
//                   👤 Customer
//                 </button>
                
//                 <button
//                   type="button"
//                   className={`role-tab-btn ${role === "driver" ? 'active' : ''}`}
//                   onClick={() => setRole("driver")}
//                   disabled={loading}
//                 >
//                   🚗 Driver
//                 </button>
//               </div>
//             )}

//             {/* Demo credentials hint */}
//             {isLogin && (
//               <div className="hint-box">
//                 <strong>Demo Admin:</strong> admin@logistics.com / admin2025!Secure<br/>
//                 <strong>Demo Driver:</strong> driver@logistics.com / driver123
//               </div>
//             )}

//             {/* Submit button */}
//             <button 
//               type="submit" 
//               disabled={loading}
//             >
//               {loading ? (isLogin ? 'Logging in...' : 'Registering...') : (isLogin ? 'Login' : 'Register')}
//             </button>
//           </form>

//           {/* Toggle Login/Register */}
//           <div className="hint-box" style={{ marginTop: '20px', cursor: 'pointer' }} onClick={() => {
//             setIsLogin(!isLogin);
//             setError("");
//           }}>
//             {isLogin ? "Don't have an account? Register here" : "Already have an account? Login here"}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }












































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