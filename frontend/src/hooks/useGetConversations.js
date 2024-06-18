import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
const useGetConversations = () => {
    const { authUser } = useAuthContext();
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);
    console.log(authUser);
    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try {
                const response = await axios.get("http://localhost:3500/users/",{
                    headers:{
                        Authorization: `Bearer ${authUser.userId}`,
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
