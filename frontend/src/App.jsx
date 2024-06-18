import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import { SocketContextProvider } from "./context/SocketContext";
function App() {
	const { authUser } = useAuthContext();
	if (!authUser) {
		return null;
	}
	return (
		<SocketContextProvider>
		<div className='p-4 h-screen flex items-center justify-center'>
			<Routes>
				<Route path='/' element={<Home />} />
			</Routes>
			<Toaster />
		</div>
		</SocketContextProvider>
	)
}
export default App;
