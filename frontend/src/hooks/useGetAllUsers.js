import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
const useUsers = () => {
    const [loading, setLoading] = useState(false);
    const [users, setusers] = useState([]);
    useEffect(() => {
        const getusers = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:3500/users/all`,
                );
                setusers(response.data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };
        getusers();
    }, []);
    return { loading, users };
};
export default useUsers;
