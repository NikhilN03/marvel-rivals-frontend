import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Forums from "./pages/Forums";
import News from "./pages/News"; 
import Rankings from "./pages/Rankings";
import { Routes, Route, Navigate } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen w-screen overflow-x-hidden bg-gray-950 text-gray-100">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/forums" element={<Forums />} />
        <Route path="/news" element={<News />} /> {/* <-- use the new page */}
        <Route path="/stats" element={<div className="p-6">Stats/Rankings coming soon</div>} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/rankings" element={<Rankings />} />
        <Route path="/stats" element={<Rankings />} />
      </Routes>
    </div>
  );
}
