import { Routes } from "react-router";
import { Route } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Inicio from "./pages/Inicio";
import Propiedades from "./pages/Propiedades";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/propiedades" element={<Propiedades />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
