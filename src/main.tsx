import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { BrowserRouter } from "react-router-dom";
import "./styles/index.css";
import "./styles/main.css";
library.add(fas, far);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
