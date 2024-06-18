import MessageContainer from "../components/messages/MessageContainer";
import Sidebar from "../components/sidebar/Sidebar";
import { useCookies } from "../context/CookieContext";
import { useAuthContext } from "../context/AuthContext";
const Home = () => {
	let { authUser } = useAuthContext();
	useCookies().set('userIdChat', authUser._id, {path:'/'} );
	return (
		<div className='flex w-screen h-screen'>
			<Sidebar />
			<MessageContainer />
		</div>
	);
};
export default Home;
