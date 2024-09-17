import React, { useState, useEffect } from 'react';
import Layout from '../layout/Main';
import SearchBar from '../components/SearchBar';
import ArticleList from '../components/ArticleList';
import useFetchArticles from '../hooks/useFetchArticles';
import SkeletonLoader from '../components/SkeletonLoader';

const HomePage = () => {
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({});
    const { articles, loading, error, pagination } = useFetchArticles(page, filters);

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

    const handleSearch = (searchFilters) => {
        setFilters(searchFilters);
        setPage(1);
    };

    return (
        <Layout>
            <SearchBar onSearch={handleSearch} />
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
    );
};

export default HomePage;
