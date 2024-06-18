import { useEffect, useState } from "react";
import axios from "axios";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { useCookies } from "../context/Cookies";
const useGetMessages = () => {
    const token = useCookies().get('userIdChat');
    console.log(token);

    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();
    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:3500/messages/${selectedConversation._id}`,{
                    headers:{
                        Authorization: `Bearer ${token}`,
                    }
                });
                setMessages(response.data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };
        if (selectedConversation?._id) {
            getMessages();
        }
    }, [selectedConversation?._id, setMessages]);
    return { messages, loading };
};
export default useGetMessages;
