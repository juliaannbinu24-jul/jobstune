import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home.jsx";
import Login from "./pages/login.jsx";
import Signup from "./pages/signup.jsx";
import AboutUs from "./pages/about.jsx";
import HelpPage from "./pages/help.jsx";
import Dashboard from "./pages/dashboard";
import RecruiterDashboard from "./pages/RecruiterDashboard.jsx";

export default function App() {
  return (
    <BrowserRouter basename="/jobstune">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/RecruiterDashboard" element={<RecruiterDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

