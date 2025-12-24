// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { login } from '../../utils/auth';

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('customer'); // default role
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const success = login({ email, password, role });
//     if (success) {
//       navigate(role === 'customer' ? '/customer' : '/driver');
//     } else {
//       alert('Login failed. Fill all fields!');
//     }
//   };

//   return (
//     <div className="auth-container">
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={e => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={e => setPassword(e.target.value)}
//           required
//         />
//         <select value={role} onChange={e => setRole(e.target.value)}>
//           <option value="customer">Customer</option>
//           <option value="driver">Driver</option>
//         </select>
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }



// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { login } from "../../utils/auth";
// import Silk from "../../components/Silk.jsx"; // Reactbits Silk component
// import "../../styles/login.css";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("customer");
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const success = login({ email, password, role });
//     if (success) {
//       navigate(role === "customer" ? "/customer" : "/driver");
//     } else {
//       alert("Login failed. Fill all fields!");
//     }
//   };

//   return (
//     <div className="premium-login-container">
//       {/* Silk animated background */}
//       <Silk
//         speed={5}
//         scale={1}
//         color="#7B7481"
//         noiseIntensity={1.5}
//         rotation={0}
//       />

//       {/* Glassmorphism login card */}
//       <div className="premium-card">
//         <h2>Welcome Back</h2>
//         <form className="premium-form" onSubmit={handleSubmit}>
//           <input
//             type="email"
//             placeholder="Email address"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <select value={role} onChange={(e) => setRole(e.target.value)}>
//             <option value="customer">Customer</option>
//             <option value="driver">Driver</option>
//           </select>
//           <button type="submit">Sign In</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { login } from "../../utils/auth";
// import Silk from "../../components/Silk.jsx";
// import "../../styles/login.css";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("customer");
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const success = login({ email, password, role });
//     if (success) {
//       navigate(role === "customer" ? "/customer" : "/driver");
//     } else {
//       alert("Login failed. Fill all fields!");
//     }
//   };

//   return (
//     <div className="login-page">
//       <Silk speed={5} scale={1} color="#7B7481" noiseIntensity={1.5} rotation={0} />
//       <div className="login-card">
//         <h2>Login</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="inputs-inline">
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <select value={role} onChange={(e) => setRole(e.target.value)}>
//             <option value="customer">Customer</option>
//             <option value="driver">Driver</option>
//           </select>
//           <button type="submit">Login</button>
//         </form>
//       </div>
//     </div>
//   );
// }




import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Silk from "../../components/Silk";
import "../../styles/login.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");

  const submit = (e) => {
    e.preventDefault();

    localStorage.setItem(
      "user",
      JSON.stringify({ email, name, role })
    );

    navigate(role === "customer" ? "/customer" : "/driver");
  };

  return (
    <div className="login-wrapper">
      {/* BACKGROUND */}
      <div className="login-bg">
        <Silk />
      </div>

      {/* CENTER CARD */}
      <div className="login-container">
        <div className="login-card">
          <h2>Welcome Back</h2>

          <form onSubmit={submit}>
            <div className="row">
              <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <select  value={role} onChange={(e) => setRole(e.target.value)}>
              <option className="option-status" value="customer">Customer</option>
              <option className="option-status" value="driver">Driver</option>
            </select>

            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

