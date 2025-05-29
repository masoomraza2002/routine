// components/create/CreateMeal.jsx

import './popUp.css'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from 'react';
import axios from "axios";
import { AuthContext } from '../../authContext.jsx'; 

const CreateMeal = ({ setOpen }) => {
    const { user } = useContext(AuthContext);
    const [info, setInfo] = useState({
        name: '',
        recipe: '',
        time: 0, 
        description: '',
        category: 'Other', 
    });
    const [submitError, setSubmitError] = useState(null); 

    const handleChange = (e) => {
        const { id, value, type } = e.target; 
        setInfo((prev) => ({
            ...prev,
            [id]: type === 'number' ? Number(value) : value,
        }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        setSubmitError(null);  
        if (!info.name || !info.time || !info.category) {
            setSubmitError("Name, Time, and Category are required.");
            return;
        }
        if (info.time < 0) {
            setSubmitError("Time cannot be negative.");
            return;
        }

        const newMeal = {
            ...info,
            userId: user._id,
        };

        try { 
            await axios.post('http://localhost:3000/api/meals/', newMeal, {
                withCredentials: true
            });
            setOpen(false);
            console.log("New meal created:", newMeal);
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setSubmitError(err.response.data.message); 
            } else {
                setSubmitError("Failed to create meal. Please try again."); 
            }
            console.error("Error creating meal:", err);
        }
    };

    return (
        <div className="modal">
            <div className="mContainer">
                <FontAwesomeIcon icon={faXmark} className="mClose" onClick={() => setOpen(false)} />
                <div className="mTitle">Create New Meal</div>

                <form onSubmit={handleClick}> 
                    <div className="formInput">
                        <label htmlFor="name">Meal Name:</label>
                        <input
                            type="text"
                            onChange={handleChange}
                            id="name"
                            value={info.name}
                            placeholder="e.g., Chicken Salad"
                            required
                        />
                    </div>

                    <div className="formInput">
                        <label htmlFor="recipe">Recipe (URL or text):</label>
                        <input
                            type="text"
                            onChange={handleChange}
                            id="recipe"
                            value={info.recipe}
                            placeholder="e.g., https://youtube.com/recipe-video or instructions"
                        />
                    </div>

                    <div className="formInput">
                        <label htmlFor="time">Preparation Time (minutes):</label>
                        <input
                            type="number"
                            onChange={handleChange}
                            id="time"
                            value={info.time}
                            min="0"
                            required
                        />
                    </div>

                    <div className="formInput">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            onChange={handleChange}
                            id="description"
                            value={info.description}
                            placeholder="Brief description of the meal"
                            rows="3"
                        ></textarea>
                    </div>

                    <div className="formInput">
                        <label htmlFor="category">Category:</label>
                        <select
                            id="category"
                            onChange={handleChange}
                            value={info.category}
                            required
                        >
                            <option value="Breakfast">Breakfast</option>
                            <option value="Lunch">Lunch</option>
                            <option value="Dinner">Dinner</option>
                            <option value="Snack">Snack</option>
                            <option value="Dessert">Dessert</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {submitError && <span className="error-message" style={{ color: 'red', marginTop: '10px' }}>{submitError}</span>}

                    <button type="submit" className="mButton">
                        Add Meal
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateMeal;
