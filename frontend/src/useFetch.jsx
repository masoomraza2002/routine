// frontend/src/useFetch.jsx

import { useEffect, useState } from "react";
import axios from "axios";
 
const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);  

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);  
            setError(null); 

            try {
                const res = await axios.get(url, { withCredentials: true });
                setData(res.data);
            } catch (err) { 
                if (err.response && err.response.data && err.response.data.message) {
                    setError(err.response.data.message);
                } else {
                    setError("Failed to fetch data. Please try again.");
                }
                console.error("useFetch error:", err);  
            } finally {
                setLoading(false);  
            }
        };
 
        if (url) {
            fetchData();
        }
 
    }, [url]);
 
    const reFetch = async () => {
        setLoading(true);  
        setError(null);  

        try {
            const res = await axios.get(url, { withCredentials: true });
            setData(res.data);
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("Failed to refetch data. Please try again.");
            }
            console.error("useFetch reFetch error:", err);
        } finally {
            setLoading(false);  
        }
    };

    return { data, loading, error, reFetch };
};

export default useFetch;
