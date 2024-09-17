import React from 'react';

const Pagination = ({ pagination, onPrevPage, onNextPage }) => {
    return (
        <div className="pagination-controls flex items-center justify-center mt-8 space-x-4">
            <button 
                onClick={onPrevPage} 
                disabled={!pagination.prevPageUrl}
                className={`px-4 py-2 rounded ${pagination.prevPageUrl ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            >
                Previous
            </button>
            <span className="text-gray-700">
                Page {pagination.currentPage} of {pagination.lastPage}
            </span>
            <button 
                onClick={onNextPage} 
                disabled={!pagination.nextPageUrl}
                className={`px-4 py-2 rounded ${pagination.nextPageUrl ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;