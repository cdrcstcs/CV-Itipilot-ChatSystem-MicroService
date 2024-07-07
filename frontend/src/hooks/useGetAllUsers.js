import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
// import { useAuthContext } from "../context/AuthContext";
const useUsers = () => {
    // const { authUsers } = useAuthContext();
    const [loading, setLoading] = useState(false);
    const [users, setusers] = useState([]);
    // console.log(authusers);
    useEffect(() => {
        const getusers = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:3500/users/all`,
                // {
                //     headers:{
                //         Authorization: `Bearer ${authusers.usersId}`,
                //     }
                // }
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
    console.log(users);
    return { loading, users };
};
export default useUsers;
