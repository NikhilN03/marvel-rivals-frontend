import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Forums from "./pages/Forums";
import News from "./pages/News"; 
import Rankings from "./pages/Rankings";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Verify from "./pages/Verify";

export default function App() {
  return (
    <div className="min-h-screen w-screen overflow-x-hidden bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/forums" element={<Forums />} />
        <Route path="/news" element={<News />} /> {/* <-- use the new page */}
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/rankings" element={<Rankings />} />
        <Route path="/stats" element={<Rankings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify" element={<Verify />} />
      </Routes>
    </div>
  );
}
