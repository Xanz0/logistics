// import { useNavigate } from 'react-router-dom'
// import '../../styles/auth.css'

// export default function RoleSelect() {
//   const navigate = useNavigate()

//   return (
//     <div className="auth-container">
//       <h1>Foydalanuvchi turini tanlang</h1>
//       <button onClick={() => navigate('/login?role=customer')}>
//         Men buyurtmachiman
//       </button>
//       <button onClick={() => navigate('/login?role=driver')}>
//         Men haydovchiman
//       </button>
//     </div>
//   )
// }

import { useNavigate } from "react-router-dom";
import { login } from "../../utils/auth";

export default function RoleSelect() {
  const navigate = useNavigate();

  const selectRole = (role) => {
    login(role);
    navigate(role === "customer" ? "/customer" : "/driver");
  };

  return (
    <div className="role-select">
      <h2>Select Your Role</h2>
      <button onClick={() => selectRole("customer")}>Customer</button>
      <button onClick={() => selectRole("driver")}>Driver</button>
    </div>
  );
}

