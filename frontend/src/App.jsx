import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { SocketContextProvider } from "./context/SocketContext.jsx";
function App() {
	return (
	<BrowserRouter>
		<SocketContextProvider>
			<div className='w-screen h-screen flex items-center justify-center'>
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
