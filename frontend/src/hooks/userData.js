import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
const useUserData = () => {
    const { authUser } = useAuthContext();
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState([]);
    console.log(authUser);
    useEffect(() => {
        const getUserData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:3500/users/${authUser.userId}`,{
                    headers:{
                        Authorization: `Bearer ${authUser.userId}`,
                    }
                });
                setUserData(response.data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };
        getUserData();
    }, []);
    return { loading, userData };
};
export default useUserData;
