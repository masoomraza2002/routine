// pages/Login/Login.jsx

import React from "react"; 
import "./login.css";  
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom"; 
import { AuthContext } from "../../authContext.jsx";  

function Login() {
    const [credentials, setCredentials] = useState({
        username: "",  
        password: "",
    });
    const [error, setError] = useState(null);  

    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();  
    const from = location.state?.from || '/home';

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        setError(null);  
        dispatch({ type: "LOGIN_START" });
        try { 
            const res = await axios.post("http://localhost:3000/api/auth/login", credentials, { withCredentials: true });
             
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details }); 
            navigate(from, { replace: true });

        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
                dispatch({ type: "LOGIN_FAILURE", payload: err.response.data.message });
            } else {
                setError("An unexpected error occurred during login.");
                dispatch({ type: "LOGIN_FAILURE", payload: "An unexpected error occurred during login." });
            }
        }
    };

    return (
        <div className="login"> 
            <div className="loginCard">
                <div className="center">
                    <h1>Welcome Back!</h1>
                    <form onSubmit={handleClick}>  
                        <div className="txt_field">
                            <input
                                type="text"
                                placeholder="username"
                                id="username"
                                onChange={handleChange}
                                value={credentials.username} 
                                className="lInput"
                                required
                            />
                        </div>
                        <div className="txt_field">
                            <input
                                type="password"
                                placeholder="password"
                                id="password"
                                onChange={handleChange}
                                value={credentials.password} 
                                className="lInput"
                                required
                            />
                        </div>
                        {error && <span className="error-message" style={{ color: 'red', marginTop: '10px' }}>{error}</span>}
                        <div className="login_button">
                            <button type="submit" className="button"> 
                                Login
                            </button>
                        </div>
                        <div className="signup_link">
                            <p>
                                Not registered? <Link to="/register">Register</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div> 
        </div>
    );
}

export default Login;
