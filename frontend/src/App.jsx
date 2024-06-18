import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { SocketContextProvider } from "./context/SocketContext.jsx";
function App() {
	return (
	<BrowserRouter>
		<AuthContextProvider>
			<SocketContextProvider>
				<div className='w-screen h-screen flex items-center justify-center'>
					<Routes>
						<Route path='/' element={<Home />} />
					</Routes>
					<Toaster />
				</div>	
			</SocketContextProvider>
		</AuthContextProvider>
	</BrowserRouter>
	)
}
export default App;
