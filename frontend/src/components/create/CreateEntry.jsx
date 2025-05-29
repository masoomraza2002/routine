// components/create/CreateEntry.jsx

import './popUp.css';  
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useContext, useState, useEffect } from 'react';  
import axios from "axios";
import useFetch from '../../useFetch.jsx';  
import { AuthContext } from '../../authContext.jsx';  

const CreateEntry = ({ setOpen }) => {
    const { user } = useContext(AuthContext);
    const [info, setInfo] = useState({
        date: '',  
        meals: [],  
        routines: [],  
    });
    const [submitError, setSubmitError] = useState(null);  
 
    const { data: dropdownData, loading: dropdownLoading, error: dropdownError } = useFetch(
        `http://localhost:3000/api/entries/data/fetch/${user._id}`
    );
 
    useEffect(() => {
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const day = today.getDate().toString().padStart(2, '0');
        setInfo(prev => ({ ...prev, date: `${year}-${month}-${day}` }));
    }, []);

    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleMultiSelectChange = (e) => {
        const { id, options } = e.target;
        const selectedOptions = Array.from(options)
            .filter(option => option.selected)
            .map(option => option.value);  
        setInfo(prev => ({ ...prev, [id]: selectedOptions }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        setSubmitError(null);  
 
        if (!info.date) {
            setSubmitError("Date is required.");
            return;
        }

        const newEntry = {
            ...info,
            author: user._id, 
        };

        try { 
            await axios.post('http://localhost:3000/api/entries/', newEntry, {
                withCredentials: true  
            });
            setOpen(false);  
            console.log("New entry created:", newEntry);
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setSubmitError(err.response.data.message);  
            } else {
                setSubmitError("Failed to create entry. Please try again.");  
            }
            console.error("Error creating entry:", err);
        }
    };

    if (dropdownLoading) return <div className="modal-loading">Loading options...</div>;
    if (dropdownError) return <div className="modal-error">Error loading options: {dropdownError}</div>;

    return (
        <div className="modal">
            <div className="mContainer">
                <FontAwesomeIcon icon={faXmark} className="mClose" onClick={() => setOpen(false)} />
                <div className="mTitle">Create Entry</div>

                <form onSubmit={handleClick}>  
                    <div className="formInput">
                        <label htmlFor="date">Date:</label>
                        <input
                            type="date"
                            onChange={handleChange}
                            id="date"
                            value={info.date}  
                            required
                        />
                    </div>

                    <div className="formInput" id='options'>
                        <label htmlFor="meals">Choose Meals:</label>
                        <select
                            id="meals"
                            multiple
                            onChange={handleMultiSelectChange}
                            value={info.meals}  
                        >
                            {dropdownData?.meals?.map((meal) => (
                                <option key={meal._id} value={meal._id}>{meal.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="formInput" id='options'>
                        <label htmlFor="routines">Choose Routines:</label>
                        <select
                            id="routines"
                            multiple
                            onChange={handleMultiSelectChange}
                            value={info.routines}  
                        >
                            {dropdownData?.routines?.map((routine) => (
                                <option key={routine._id} value={routine._id}>{routine.name}</option>
                            ))}
                        </select>
                    </div>
                    {submitError && <span className="error-message" style={{ color: 'red', marginTop: '10px' }}>{submitError}</span>}
                    <button type="submit" className="mButton">  
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateEntry;
