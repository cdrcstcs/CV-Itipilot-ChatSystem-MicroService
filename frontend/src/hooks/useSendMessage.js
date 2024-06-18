import { useState } from "react";
import axios from "axios";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { useCookies } from "../context/CookieContext";
const useSendMessage = () => {
    const token = useCookies().get('userIdChat');
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();
    const sendMessage = async (message) => {
        setLoading(true);
        try {
            const response = await axios.post(`http://localhost:3500/messages/send/${selectedConversation._id}`, {
                message: message,
            },{
                headers:{
                    Authorization: `Bearer ${token}`,
                }
            });
            setMessages([...messages, response.data]);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };
    return { sendMessage, loading };
};
export default useSendMessage;
