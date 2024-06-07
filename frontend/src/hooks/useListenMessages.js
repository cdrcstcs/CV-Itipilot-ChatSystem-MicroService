import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages } = useConversation();

    useEffect(() => {
        const handleNewMessage = (newMessage) => {
            newMessage.shouldShake = true;
            setMessages(prevMessages => [...prevMessages, newMessage]); // Update messages state with new message
        };

        if (socket) {
            socket.on("newMessage", handleNewMessage);

            return () => socket.off("newMessage", handleNewMessage);
        }
    }, [socket, setMessages]);

    return null; // This hook doesn't return any JSX
};
export default useListenMessages;
