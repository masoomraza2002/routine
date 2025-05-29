// pages/Register/Register.jsx

import React from "react"; 
import "./register.css";  
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
    const navigate = useNavigate(); 
    const [info, setInfo] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState(null);  
    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        setError(null);  
        try { 
            await axios.post("http://localhost:3000/api/auth/register", info, { withCredentials: true });

            navigate("/login");  
        } catch (err) { 
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
                console.error("Registration error:", err.response.data.message);
            } else {
                setError("An unexpected error occurred during registration.");
                console.error("Registration error:", err);
            }
        }
    };

    return (
        <div className="register"> 
            <div className="registerCard">
                <div className="center">
                    <h1>Join Us</h1>

                    <form onSubmit={handleClick}>   
                        <div className="formInput">
                            <div className="txt_field">
                                <input
                                    type="text"
                                    placeholder="username"
                                    name="username"
                                    id="username"
                                    onChange={handleChange}
                                    value={info.username}
                                    required
                                />
                            </div>
                            <div className="txt_field">
                                <input
                                    type="email"
                                    placeholder="email"
                                    name="email"
                                    id="email"
                                    onChange={handleChange}
                                    value={info.email}
                                    required
                                />
                            </div>
                            <div className="txt_field">
                                <input
                                    type="password"
                                    placeholder="password"
                                    name="password"
                                    id="password"
                                    onChange={handleChange}
                                    value={info.password}                                     
                                    required
                                />
                            </div>
                        </div>
                        {error && <span className="error-message" style={{ color: 'red', marginTop: '10px' }}>{error}</span>}
                        <div className="login_button">
                            <button type="submit" className="button"> 
                                Register
                            </button>
                        </div>
                        <div className="signup_link">
                            <p>
                                Already Registered? <Link to="/login">Login</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div> 
        </div>
    );
}

export default Register;
