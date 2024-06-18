import { createContext, useContext} from "react";
import { useCookies } from "./Cookies";
export const AuthContext = createContext();
export const useAuthContext = () => {
	return useContext(AuthContext);
};
export const AuthContextProvider = ({ children }) => {
	const jwtSecret = 'fasefraw4r5r3wq45wdfgw34twdfg';
	let authUser = null;
	jwt.verify(useCookies().get('usertoken'), jwtSecret, {}, (err, userData) => {
		if (err) {
			console.log(err);
		} else {
			authUser = userData;
		}
	});
	return <AuthContext.Provider value={{ authUser }}>{children}</AuthContext.Provider>;
};
