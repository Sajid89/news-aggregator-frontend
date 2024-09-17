import React from 'react';
import { useParams } from 'react-router-dom';
import useFetchSingleArticle from '../hooks/useFetchSingleArticle';
import Layout from '../layout/Main';
import SkeletonLoader from '../components/SkeletonLoader';

const ArticlePage = () => {
    const { id } = useParams();
    const { article, loading, error } = useFetchSingleArticle(id);

    return (
        <Layout>
            {loading && <SkeletonLoader />}
            {error && <p>Error fetching article detail: {error}</p>}
            {!loading && !error && (
                <div className="max-w-4xl mx-auto p-4">
                    <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
                    <p className="text-gray-600 mb-4">Author: {article.author}</p>
                    <div className="text-gray-800 leading-relaxed">
                        {article.content}
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default ArticlePage;