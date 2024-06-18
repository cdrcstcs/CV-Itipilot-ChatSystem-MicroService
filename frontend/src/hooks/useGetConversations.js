import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useCookies } from "../context/CookieContext";
const useGetConversations = () => {
    const token = useCookies().get('userIdChat');
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);
    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try {
                const response = await axios.get("http://localhost:3500/users",{
                    headers:{
                        Authorization: `Bearer ${token}`,
                    }
                });
                setConversations(response.data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };
        getConversations();
    }, []);
    return { loading, conversations };
};
export default useGetConversations;
