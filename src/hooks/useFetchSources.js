import { useState, useEffect } from 'react';
import api from '../api/api';

const useFetchSources = () => {
    const [sources, setSources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get('/sources');
                setSources(response.data.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return { sources, loading, error };
};

export default useFetchSources;
