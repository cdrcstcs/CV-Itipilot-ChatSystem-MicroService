import { useState } from "react";
import axios from "axios";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
// import { useAuthContext } from "../context/AuthContext";
const useSendMessage = () => {
    // const { authUser } = useAuthContext();
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();
    const sendMessage = async (message1, message2) => {
        setLoading(true);
        try {
            const response1 = await axios.post(`http://localhost:3500/messages/send/${selectedConversation._id}`, {
                message: message1,
            }
            // ,{
            //     headers:{
            //         Authorization: `Bearer ${authUser.userId}`,
            //     }
            // }
            );
            // setMessages([...messages, response.data]);
            const response2 = await axios.post(`http://localhost:3500/messages/sendauto/${selectedConversation._id}`, {
                message: message2,
            }
            // ,{
            //     headers:{
            //         Authorization: `Bearer ${authUser.userId}`,
            //     }
            // }
            );
            setMessages([...messages, ...[response1.data, response2.data]]);
            // setMessages([...messages, response2.data]);
            // console.log('ok');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };
    return { sendMessage, loading };
};
export default useSendMessage;
