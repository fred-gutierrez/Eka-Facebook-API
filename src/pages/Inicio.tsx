import { Link } from "react-router-dom";

export default function Inicio() {
  return (
    <div className="py-64">
      <h1 className="text-center md:text-4xl text-2xl font-bold">
        ¡Casas en Venta, Renta y Propiedades
        <br />
        Comerciales!
      </h1>
      <div className="text-center">
        <Link to="/propiedades">
          <button
            className={`bg-orange-500 hover:bg-orange-400 text-white 
                font-bold py-2 px-4 border-b-4 border-orange-700 hover:border-orange-500 
                rounded w-44 mt-7`}
          >
            Ver Propiedades
          </button>
        </Link>
      </div>
    </div>
  );
}
