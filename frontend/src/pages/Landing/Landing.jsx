// frontend/pages/Landing/Landing.jsx

import React, { useContext } from 'react';
import "./landing.css"; 
import { AuthContext } from '../../authContext.jsx';  
import { Link } from "react-router-dom";

const Landing = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="landing">
            <div className="header" /> 
            <div className="upper-layer">
                <h1>
                    Welcome to <span className="brand-name">ShapeSync</span>
                </h1> 
                <Link to={user ? '/home' : '/login'}>
                    <button className="btn-get-started">Get Started</button>
                </Link>
            </div>
        </div>
    );
};

export default Landing;
