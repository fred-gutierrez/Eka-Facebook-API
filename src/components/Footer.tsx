import React from "react";
import EkaLogo from "../images/eka-logo-transparent2.png";

export default function Footer() {
  const faceBookPage = "https://www.facebook.com/BienesRaicesEka";
  return (
    <footer className="p-4 sm:p-6 bg-transparent">
      <div className="md:flex md:justify-between">
        <div className="mb-6 md:mb-0 flex">
          <a href="/">
            <img src={EkaLogo} className="h-30 ml-3 w-auto" alt="Eka Logo" />
          </a>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
          <div>
            <h2 className="mb-6 text-sm font-semibold uppercase text-black">
              Seguínos
            </h2>
            <ul className="text-gray-600">
              <li className="mb-4">
                {" "}
                <a
                  href={faceBookPage}
                  className="hover:underline"
                  target={"_blank"}
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr className="my-6 sm:mx-auto border-gray-400 lg:my-8" />
      <div className="sm:flex sm:items-center sm:justify-between">
        <span className="text-sm sm:text-center text-gray-600">
          © 2023{" "}
          <a href="/" className="hover:underline">
            Eka Bienes Raíces™
          </a>
          . Todos los derechos reservados.
        </span>
        <div className="flex my-4 space-x-6 sm:justify-center sm:my-0">
          <a
            href={faceBookPage}
            className="text-gray-600 hover:text-black"
            target={"_blank"}
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                clip-rule="evenodd"
              />
            </svg>
            <span className="sr-only">Facebook page</span>
          </a>
        </div>
        <span className="text-gray-600 text-xs">
          {" "}
          Creado por{" "}
          <a
            target={"_blank"}
            href="https://freddavidsolisgutierrez.netlify.app/"
            className="text-gray-600 hover:text-black"
          >
            Fred David Solis Gutierrez
          </a>
        </span>
      </div>
    </footer>
  );
}
