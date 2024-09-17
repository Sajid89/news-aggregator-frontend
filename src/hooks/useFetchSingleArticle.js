import { useState, useEffect } from 'react';
import api from '../api/api';

const useFetchSingleArticle = (id) => {
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticle = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await api.get(`/articles/${id}`);
                setArticle(response.data.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [id]);

    return { article, loading, error };
};

export default useFetchSingleArticle;