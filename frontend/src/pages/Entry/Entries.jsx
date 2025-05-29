// pages/Entry/Entries.jsx

import React, { useContext } from 'react';
import useFetch from '../../useFetch.jsx';  
import "./entry.css"; 
import { AuthContext } from '../../authContext.jsx'; 

const Entry = () => {  
    const { user } = useContext(AuthContext); 
    const { data, loading, error, reFetch } = useFetch(`http://localhost:3000/api/entries/`);
 
    function formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString); 
        if (isNaN(date.getTime())) {
            return 'Invalid Date';
        }
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    } 
    if (loading) {
        return <div className="loading-message">Loading entries...</div>;
    }

    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }

    return (
        <div className='entry-page'>  
            <div className="entriesContainer">
                {Array.isArray(data) && data.length > 0 ? (
                    data.map((d) => (
                        <div className="entryItem" key={d._id}>
                            <h1>Date: {formatDate(d.date)}</h1>

                            {d.meals && d.meals.length > 0 && (
                                <>
                                    <h2>Meals taken</h2>
                                    <div className="mealsContainer">
                                        {d.meals.map((m) => (
                                            <div className="mealItem" key={m._id}>{m.name}</div> 
                                        ))}
                                    </div>
                                </>
                            )}

                            {d.routines && d.routines.length > 0 && (
                                <>
                                    <h2>Routines done</h2>
                                    <div className="routinesContainer">
                                        {d.routines.map((r) => (
                                            <div className="routineItem" key={r._id}>{r.name}</div> 
                                        ))}
                                    </div>
                                </>
                            )}

                            {(!d.meals || d.meals.length === 0) && (!d.routines || d.routines.length === 0) && (
                                <p>No meals or routines recorded for this date.</p>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="no-entries-message">No entries found. Start by creating one!</div>
                )}
            </div>
 
        </div>
    );
};

export default Entry;
