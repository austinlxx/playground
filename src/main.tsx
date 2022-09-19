import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/global.css";
import "./assets/fonts/FKGrotesk/font.css";
import "./assets/fonts/FKGroteskMono/font.css";
import "./assets/fonts/Gustavo/font.css";
import "./assets/fonts/ArthemysDisplay/font.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
