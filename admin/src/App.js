import { AuthProvider } from "./context/AuthContext";
import Login from "../src/pages/login/Login.jsx";
import Dashboard from "./pages/Dashboard"; // We'll build this next
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
