import React, { useState } from 'react';
import Layout from '../layout/Main';
import { useSelector } from 'react-redux';
import ArticleList from '../components/ArticleList';
import useFetchFavoriteArticles from '../hooks/useFetchFavoriteArticles';
import SkeletonLoader from '../components/SkeletonLoader';

const UserNewsFeed = () => {
    const user = useSelector((state) => state.auth.user);
    const [page, setPage] = useState(1);
    const { articles, loading, error, pagination } = useFetchFavoriteArticles(page, user.id);

    const handleNextPage = () => {
        if (pagination.nextPageUrl) {
            setPage(page + 1);
        }
    };

    const handlePrevPage = () => {
        if (pagination.prevPageUrl) {
            setPage(page - 1);
        }
    };

    return (
        <Layout>
            <main className="container mx-auto p-6">
                {loading && <SkeletonLoader />}
                {error && <p>Error fetching articles: {error}</p>}
                {!loading && !error && (
                    <ArticleList 
                        articles={articles} 
                        pagination={pagination} 
                        onNextPage={handleNextPage} 
                        onPrevPage={handlePrevPage} 
                    />
                )}
            </main>
        </Layout>
    )
}

export default UserNewsFeed