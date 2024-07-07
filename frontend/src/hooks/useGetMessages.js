import { useEffect, useState } from "react";
import axios from "axios";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
// import { useAuthContext } from "../context/AuthContext";
const useGetMessages = () => {
    // const { authUser } = useAuthContext();
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();
    console.log(selectedConversation);
    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            try {
                // console.log(selectedConversation._id);
                const response = await axios.get(`http://localhost:3500/messages/${selectedConversation._id}`,
                    // {
                    // headers:{
                    //     Authorization: `Bearer ${authUser.userId}`,
                    // }
                // }
                );
                console.log(response.data);
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
    }, [selectedConversation]);
    return { messages, loading };
};
export default useGetMessages;
