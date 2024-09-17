import { useState, useEffect } from 'react';
import api from '../api/api';

const useFetchFavoriteArticles = (page = 1, user_id) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({});

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const params = { page, user_id };
                const response = await api.get('/favorites', { params });
                const data = response.data.data;
                setArticles(data.data);
                setPagination({
                    currentPage: data.current_page,
                    lastPage: data.last_page,
                    nextPageUrl: data.next_page_url,
                    prevPageUrl: data.prev_page_url,
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, [page]);

    return { articles, loading, error, pagination };
};

export default useFetchFavoriteArticles;
