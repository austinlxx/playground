import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/global.css";
import "./assets/fonts/FKGrotesk/font.css";
import "./assets/fonts/FKGroteskMono/font.css";
import "./assets/fonts/Gustavo/font.css";
import "./assets/fonts/ArthemysDisplay/font.css";
import "./assets/fonts/TT_Interfaces/stylesheet.css";
import "./assets/fonts/Neue_Haas_Display/stylesheet.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
