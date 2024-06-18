import { createContext, useContext} from "react";
import jwt from "jsonwebtoken";
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
	const jwtSecret = 'fasefraw4r5r3wq45wdfgw34twdfg';
	let authUser = null;
	jwt.verify(getCookie('usertoken'), jwtSecret, {}, (err, userData) => {
		if (err) {
			console.log(err);
		} else {
			authUser = userData;
		}
	});
	return <AuthContext.Provider value={{ authUser }}>{children}</AuthContext.Provider>;
};
