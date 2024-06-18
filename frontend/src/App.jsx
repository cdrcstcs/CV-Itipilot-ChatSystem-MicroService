import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import { SocketContextProvider } from "./context/SocketContext";
import { BrowserRouter } from "react-router-dom";
function App() {
	const { authUser } = useAuthContext();
	if (!authUser) {
		return null;
	}
	return (
	<BrowserRouter>
		<SocketContextProvider>
		<div className='  w-screen h-screen flex items-center justify-center'>
			<Routes>
				<Route path='/' element={<Home />} />
			</Routes>
			<Toaster />
		</div>
		</SocketContextProvider>
	</BrowserRouter>
	)
}
export default App;
