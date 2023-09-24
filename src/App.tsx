import { Routes } from "react-router";
import { Route } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Inicio from "./pages/Inicio";
import Propiedades from "./pages/Propiedades";
import animations from "./components/animations";

function App() {
  animations();

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
