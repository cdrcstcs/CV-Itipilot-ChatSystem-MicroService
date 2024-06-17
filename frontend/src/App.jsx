import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
function App() {
	const { authUser } = useAuthContext();
	return (
		authUser &&(
		<div className='p-4 h-screen flex items-center justify-center'>
			<Routes>
				<Route path='/' element={<Home />} />
			</Routes>
			<Toaster />
		</div>
		)
	)
}
export default App;
