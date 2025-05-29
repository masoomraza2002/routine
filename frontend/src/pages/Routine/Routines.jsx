// pages/Routine/Routines.jsx

import React, { useContext } from 'react';
import useFetch from '../../useFetch.jsx';
import { AuthContext } from '../../authContext.jsx';
import './routine.css';
import { Link } from 'react-router-dom';

const Routine = () => {
    const { user } = useContext(AuthContext);
    const { data, loading, error, reFetch } = useFetch(`http://localhost:3000/api/routines/`);

    if (loading) {
        return <div className="loading-message">Loading routines...</div>;
    }

    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }

    return (
        <div className='routinesView'>
            <div className="routinesViewContainer">
                {Array.isArray(data) && data.length > 0 ? (
                    data.map((r) => (
                        <div className="routineViewItem" key={r._id}>
                            <div className="routineDetails">
                                <div className="routineName">Name: {r.name}</div>
                                <div className="routineType">Workout Type: {r.workout_type}</div>
                                <div className="routinePart">Body Part: {r.body_part}</div>
                            </div>
                            {r.link && (
                                <Link to={r.link}
                                    style={{ textDecoration: "none", color: "black" }}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <div className="routineLink">Watch Workout Video</div>
                                </Link>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="no-routines-message">No routines found. Start by creating one!</div>
                )}
            </div>

        </div>
    );
};

export default Routine;
