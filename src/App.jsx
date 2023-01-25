import Login from "./pages/Login";
import { Route, Routes, NavLink } from "react-router-dom";
import Register from "./pages/Register";
import Error from "./pages/Error";
import Dashboard from "./pages/Dashboard";


function App() {
  return (
    <div className="h-screen bg-[#F8F9FE]">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
