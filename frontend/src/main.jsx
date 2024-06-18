import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import CookiesProvider from "./context/Cookies.jsx";
import { SocketContextProvider } from "./context/SocketContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<CookiesProvider>
			<AuthContextProvider>
				<SocketContextProvider>
					<App />
				</SocketContextProvider>
			</AuthContextProvider>
		</CookiesProvider>
	</React.StrictMode>
);
