import { createContext, useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import useUsers from "../hooks/useGetAllUsers"; // Assuming this hook fetches all users

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	let count = 0;
    const { loading, users } = useUsers(); // Fetch all users (adjust as per your hook implementation)
    const [sockets, setSockets] = useState({}); // Store socket connections for each user
	// console.log(users);
	count = count + 1;
	// console.log(count);
    useEffect(() => {
        // Create socket connections for each user
        if (!loading && users.length > 0) {
            const newSockets = {};
            users.forEach(user => {
                const socket = io("http://localhost:3500", {
                    query: {
                        userId: user._id, // Assuming user._id is the unique identifier for each user
                    },
                });
                newSockets[user._id] = socket;
            });
            setSockets(newSockets);

            // Clean up when component unmounts
            return () => {
                Object.values(sockets).forEach(socket => {
                    socket.close();
                });
            };
        }
    }, [loading, users]); // Depend on loading state and users array

    if (loading) {
        return <span>Loading...</span>;
    }

    return (
        <SocketContext.Provider value={{ sockets }}>
            {children}
        </SocketContext.Provider>
    );
};
