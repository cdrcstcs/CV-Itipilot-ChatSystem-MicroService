import { createContext, useContext, useState, useEffect} from "react";
import axios from "axios";
export const AuthContext = createContext();
export const useAuthContext = () => {
	return useContext(AuthContext);
};
function getCookie(name) {
    // Construct the regular expression to match the cookie name and value
    const cookieRegex = new RegExp('(^|;\\s*)(' + name + ')=([^;]*)');
    const cookieMatch = document.cookie.match(cookieRegex);

    // If the cookie is found, return its value (decoded)
    if (cookieMatch) {
        return decodeURIComponent(cookieMatch[3]);
    } else {
        return null; // Return null if cookie with specified name is not found
    }
}

export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);
    const token = getCookie('usertoken');
    console.log('Token:', token); // Check token value

    useEffect(() => {
        const fetchAuthUser = async () => {
            try {
                const response = await axios.post(`http://localhost:3500/verify`, { token });
                console.log('Authentication response:', response.data); // Check response from server
                setAuthUser(response.data);
            } catch (error) {
                console.error('Authentication error:', error);
                setAuthUser(null); // Handle authentication failure
            }
        };
        if (token) {
            fetchAuthUser();
        } else {
            setAuthUser(null); // No token available, reset authUser state
        }
    }, [token]);
    console.log('AuthUser state:', authUser); // Check authUser state
    return <AuthContext.Provider value={{ authUser }}>{children}</AuthContext.Provider>;
};
