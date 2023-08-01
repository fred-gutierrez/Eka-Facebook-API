import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header() {
  return (
    <>
      <div className="relative">
        <div className="relative text-center py-56 md:py-64 px-8 h-screen">
          <h1
            id="header-text"
            className="text-center sm:text-4xl md:text-5xl md:leading-tight text-2xl font-bold"
          >
            ¡Casas en Venta, Renta y<br /> Propiedades Comerciales!
          </h1>
          <div className="text-center">
            <Link to="/propiedades">
              <button
                className={`bg-green-500 hover:bg-green-400 text-white 
           py-2 px-4 font-bold border-b-4 border-green-700 hover:border-green-500 
          w-52 mt-7 rounded-full text-center hover:animate-pulse`}
              >
                Ver Propiedades
                <FontAwesomeIcon
                  icon={["fas", "arrow-right"]}
                  className="text-white ml-2"
                  size="lg"
                />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
