import { Routes } from "react-router";
import { Route } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Inicio from "./pages/Inicio";
import Propiedades from "./pages/Propiedades";

function App() {
  return (
    <div className="silver">
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/propiedades" element={<Propiedades />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

// ! TODO: Fix the fact that when reloading /propiedades ONLY it has an error of not found
