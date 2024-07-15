import { useState } from "react";
import axios from "axios";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();
    const sendMessage = async (message1, message2) => {
        setLoading(true);
        try {
            const response1 = await axios.post(`http://localhost:3500/messages/send/${selectedConversation._id}`, {
                message: message1,
            }
            );
            const response2 = await axios.post(`http://localhost:3500/messages/sendauto/${selectedConversation._id}`, {
                message: message2,
            }
            );
            setMessages([...messages, ...[response1.data, response2.data]]);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };
    return { sendMessage, loading };
};
export default useSendMessage;
