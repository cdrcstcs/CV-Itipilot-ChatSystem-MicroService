import { useState } from "react";
import axios from "axios";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
const useSendMessage = () => {
    // const { authUser } = useAuthContext();
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();
    const sendMessage = async (message) => {
        setLoading(true);
        try {
            const response = await axios.post(`http://localhost:3500/messages/send/${selectedConversation._id}`, {
                message: message,
            }
            // ,{
            //     headers:{
            //         Authorization: `Bearer ${authUser.userId}`,
            //     }
            // }
            );
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
