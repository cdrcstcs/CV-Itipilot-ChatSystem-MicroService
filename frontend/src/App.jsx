import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import { SocketContextProvider } from "./context/SocketContext";
import { BrowserRouter } from "react-router-dom";
import CookiesProvider from "./context/CookieContext";
function App() {
	const { authUser } = useAuthContext();
	if (!authUser) {
		return null;
	}
	return (
	<BrowserRouter>
		<SocketContextProvider>
			<CookiesProvider>
				<div className='w-screen h-screen flex items-center justify-center'>
					<Routes>
						<Route path='/' element={<Home />} />
					</Routes>
					<Toaster />
				</div>
			</CookiesProvider>
		</SocketContextProvider>
	</BrowserRouter>
	)
}
export default App;
