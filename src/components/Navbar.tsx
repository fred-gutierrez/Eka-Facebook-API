import React from "react";
import EkaLogo from "../images/eka-logo-transparent.png";

function toggleHidden() {
  const navbarHamburger = document.getElementById("navbar-solid-bg");
  navbarHamburger!.classList.toggle("hidden");
}

export default function Navbar() {
  return (
    <nav className="p-3 navy">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <a href="#" className="flex items-center">
          {/* <img src={EkaLogo} className="h-6 mr-3 sm:h-10" alt="Flowbite Logo" /> */}
          <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
            Eka Bienes Raíces
          </span>
        </a>
        <button
          data-collapse-toggle="navbar-solid-bg"
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-solid-bg"
          aria-expanded="false"
          onClick={toggleHidden}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
          <ul className="flex flex-col mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 bg-gray-800 md:bg-transparent border-gray-700">
            <li>
              <a
                href="/"
                className="block py-2 pl-3 pr-4 text-white rounded md:p-0 md:text-white bg-blue-600 md:bg-transparent"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/homes"
                className="block py-2 pl-3 pr-4 text-gray-700 rounded md:border-0 md:p-0 dark:text-gray-400 md:hover:text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent"
              >
                Homes
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="block py-2 pl-3 pr-4 text-gray-700 rounded md:border-0 md:p-0 dark:text-gray-400 md:hover:text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent"
              >
                About & Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
