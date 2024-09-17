import React from 'react';
import ArticleCard from './ArticleCard';
import Pagination from './Pagination';

const ArticleList = ({ articles, pagination, onNextPage, onPrevPage }) => {
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article, index) => (
                    <ArticleCard key={article.id} article={article} index={index} />
                ))}
            </div>
            <Pagination 
                pagination={pagination} 
                onPrevPage={onPrevPage} 
                onNextPage={onNextPage} 
            />
        </div>
    );
};

export default ArticleList;