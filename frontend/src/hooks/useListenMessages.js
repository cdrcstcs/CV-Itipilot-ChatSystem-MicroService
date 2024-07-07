import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

const useListenMessages = () => {
    const { sockets } = useSocketContext(); // Access all sockets from context
    const { setMessages } = useConversation(); // Assuming useConversation provides setMessages function

    useEffect(() => {
        const handleNewMessage = (newMessage) => {
            console.log(newMessage);
            newMessage.shouldShake = true; // Example modification to newMessage
            setMessages(prevMessages => [...prevMessages, newMessage]);
        };

        // Listen to "newMessage" event for each socket
        Object.values(sockets).forEach(socket => {
            socket.on("newMessage", handleNewMessage);
        });

        // Clean up socket listeners when component unmounts
        return () => {
            Object.values(sockets).forEach(socket => {
                socket.off("newMessage", handleNewMessage);
            });
        };
    }, [sockets, setMessages]);

    return null; // Return value as needed, can be null or other components/elements
};

export default useListenMessages;
