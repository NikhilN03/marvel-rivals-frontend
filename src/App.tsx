import NavBar from "./components/NavBar";
import Home from "./pages/Home";

export default function App() {
  return (
    <div className="min-h-screen w-screen overflow-x-hidden bg-gray-950 text-gray-100">
      <NavBar />
      <Home />
    </div>
  );
}

