// src/App.jsx
import { BrowserRouter } from 'react-router-dom';
import RouterComponent from './router'; // RouterComponent ni import qilish

function App() {
  return (
    <BrowserRouter>
      <RouterComponent /> {/* ✅ RouterComponent ni ishlatish */}
    </BrowserRouter>
  );
}

export default App;