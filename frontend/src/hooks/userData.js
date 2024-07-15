import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
const useUserData = () => {
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState([]);
    useEffect(() => {
        const getUserData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:3500/users`,
                );
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
