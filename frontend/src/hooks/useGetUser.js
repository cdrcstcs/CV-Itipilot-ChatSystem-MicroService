import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
// import { useAuthContext } from "../context/AuthContext";
const useUser = () => {
    // const { authUser } = useAuthContext();
    const [loading, setLoading] = useState(false);
    const [User, setUser] = useState([]);
    // console.log(authUser);
    useEffect(() => {
        const getUser = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:3500/users/cur`,
                // {
                //     headers:{
                //         Authorization: `Bearer ${authUser.userId}`,
                //     }
                // }
                );
                setUser(response.data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };
        getUser();
    }, []);
    // console.log(User);
    return { loading, User };
};
export default useUser;
