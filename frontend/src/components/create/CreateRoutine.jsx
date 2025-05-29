// components/create/CreateRoutine.jsx

import './popUp.css'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from 'react';
import axios from "axios";
import { AuthContext } from '../../authContext.jsx';
import { WorkoutType, BodyPart } from "../../data.js";

const CreateRoutine = ({ setOpen }) => {
    const { user } = useContext(AuthContext);
    const [info, setInfo] = useState({
        name: '',
        workout_type: 'Other', 
        body_part: 'Other', 
        link: '',
    });
    const [submitError, setSubmitError] = useState(null); 

    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        setSubmitError(null); 
        if (!info.name || !info.workout_type || !info.body_part) {
            setSubmitError("Name, Workout Type, and Body Part are required.");
            return;
        }

        const newRoutine = {
            ...info,
            userId: user._id,  
        };

        try { 
            await axios.post("http://localhost:3000/api/routines/", newRoutine, {
                withCredentials: true 
            });
            setOpen(false); 
            console.log("New routine created:", newRoutine);
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setSubmitError(err.response.data.message); 
            } else {
                setSubmitError("Failed to create routine. Please try again.");
            }
            console.error("Error creating routine:", err);
        }
    };

    return (
        <div className="modal">
            <div className="mContainer">
                <FontAwesomeIcon icon={faXmark} className="mClose" onClick={() => setOpen(false)} />
                <div className="mTitle">Create New Routine</div>

                <form onSubmit={handleClick}> 
                    <div className="formInput">
                        <label htmlFor="name">Workout Name:</label>
                        <input
                            type="text"
                            onChange={handleChange}
                            id="name"
                            value={info.name}
                            placeholder="e.g., Daily Yoga Flow"
                            required
                        />
                    </div>
                    <div className="formInput">
                        <label htmlFor="link">Workout Link (optional):</label>
                        <input
                            type="text"
                            onChange={handleChange}
                            id="link"
                            value={info.link}
                            placeholder="e.g., https://youtube.com/workout"
                        />
                    </div>

                    <div className="formInput" id='options'>
                        <label htmlFor="workout_type">Choose Workout Type:</label>
                        <select id="workout_type" onChange={handleChange} value={info.workout_type} required>
                            
                            <option value="Other">Select Type</option> 
                            {
                                WorkoutType.map((w, index) => (
                                    <option key={index} value={w}>{w}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="formInput" id='options'>
                        <label htmlFor="body_part">Choose Body Part:</label>
                        <select id="body_part" onChange={handleChange} value={info.body_part} required>
                            
                            <option value="Other">Select Body Part</option> 
                            {
                                BodyPart.map((b, index) => (
                                    <option key={index} value={b}>{b}</option>
                                ))
                            }
                        </select>
                    </div>
                    {submitError && <span className="error-message" style={{ color: 'red', marginTop: '10px' }}>{submitError}</span>}

                    <button type="submit" className="mButton">
                        Add Routine
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateRoutine;
