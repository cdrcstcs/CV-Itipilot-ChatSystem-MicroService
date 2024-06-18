import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";
const SocketContext = createContext();
export const useSocketContext = () => {
	return useContext(SocketContext);
};
export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	let { authUser } = useAuthContext();
	useEffect(() => {
		if (authUser) {
			const socket = io("https://localhost:3500", {
				query: {
					userId: authUser.data._id,
				},
			});
			setSocket(socket);
			return () => socket.close();
		} else {
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
	}, [authUser]);
	return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};
