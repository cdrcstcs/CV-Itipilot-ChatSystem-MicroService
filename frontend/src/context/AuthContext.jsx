import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
export const AuthContext = createContext();
export const useAuthContext = () => {
	return useContext(AuthContext);
};
export const AuthContextProvider = ({ children }) => {
	let [authUser, setAuthUser] = useState(null);
	useEffect(() => {
		const fetchUserData = async () => {
		  try {
			const response = await axios.get("http://localhost:3500/userdataclient");
			setAuthUser(response.data);
		  } catch (error) {
			console.error("Error fetching user data:", error);
		  }
		};
		if (authUser === null) {
		  fetchUserData();
		}
	}, [authUser]); 
	console.log(authUser.data);
	authUser = authUser.data;
	return <AuthContext.Provider value={{ authUser }}>{children}</AuthContext.Provider>;
};
