import NavBar from "./components/NavBar";
import Home from "./pages/Home";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 dark:bg-gray-950 dark:text-gray-100">
      <NavBar />
      <Home />
    </div>
  );
}
