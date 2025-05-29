// pages/Meal/Meal.jsx

import React, { useContext } from 'react'; 
import useFetch from '../../useFetch.jsx';  
import { AuthContext } from '../../authContext.jsx';  
import "./meal.css";  
import { Link } from 'react-router-dom';

const Meal = () => {
    const { user } = useContext(AuthContext); 
    const { data, loading, error, reFetch } = useFetch(`http://localhost:3000/api/meals/`);
 
    if (loading) {
        return <div className="loading-message">Loading meals...</div>;
    }

    if (error) {
        return <div className="error-message">Error: {error}</div>; 
    }

    return (
        <div className='mealsView'> 
            <div className="mealsViewContainer">
                {Array.isArray(data) && data.length > 0 ? (
                    data.map((m) => (
                        <div className="mealViewItem" key={m._id}> 
                            <div className="mealDetails">
                                <div className="mealName">Name: {m.name}</div>
                                {m.description && <div className="mealDesc">Description: {m.description}</div>}
                                <div className="mealTime">Time: {m.time} minutes</div>
                                <div className="mealCat">Category: {m.category}</div>
                            </div>
                            {m.recipe && (
                                <Link to={m.recipe}
                                    style={{ textDecoration: "none", color: "black" }}
                                    target="_blank"  
                                    rel="noopener noreferrer"  
                                >
                                    <div className="mealLink">Watch Recipe Video</div>
                                </Link>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="no-meals-message">No meals found. Start by creating one!</div>
                )}
            </div>
 
        </div>
    );
};

export default Meal;
