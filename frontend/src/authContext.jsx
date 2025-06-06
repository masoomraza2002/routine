// frontend/src/authContext.jsx

import { createContext, useReducer, useEffect, useContext } from "react";
import axios from 'axios';   
const INITIAL_STATE = {
     user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error: null,
};
 
export const AuthContext = createContext(INITIAL_STATE);
 
const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                loading: true,
                error: null,
            };
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,  
                loading: false,
                error: null,
            };
        case "LOGIN_FAILURE":
            return {
                user: null,
                loading: false,
                error: action.payload,  
            };
        case "LOGOUT":
            return {
                user: null,
                loading: false,
                error: null,
            };
        default:
            return state;
    }
};
 
export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
 
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user));
    }, [state.user]);
 
    const logout = async () => {
        try { 
            await axios.post('http://localhost:3000/api/auth/logout', {}, { withCredentials: true });
            dispatch({ type: "LOGOUT" }); 
        } catch (err) {
            console.error("Logout failed:", err); 
            dispatch({ type: "LOGOUT" });
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                loading: state.loading,
                error: state.error,
                dispatch, 
                logout, 
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
 
export const useAuth = () => useContext(AuthContext);
