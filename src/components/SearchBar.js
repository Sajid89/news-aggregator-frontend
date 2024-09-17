import React, { useState } from 'react';
import { toast } from 'react-toastify';
import useFetchCategories from '../hooks/useFetchCategories';
import useFetchSources from '../hooks/useFetchSources';

const SearchBar = ({ onSearch }) => {
    const { categories, loading, error } = useFetchCategories();
    const { sources = [], loading: sourcesLoading, error: sourcesError } = useFetchSources();
    
    const [keyword, setKeyword] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [source, setSource] = useState('');

    const handleSearch = () => {
        if (!keyword && !date && !category && !source) {
            toast.error('Please enter a keyword or select a filter.');
            return;
        }

        // Filter out empty values
        const searchFilters = { keyword, date, category, source };
        const filteredSearchFilters = Object.fromEntries(
            Object.entries(searchFilters).filter(([key, value]) => value)
        );

        onSearch(filteredSearchFilters);
    };

    return (
        <div className="flex items-center justify-center p-4">
            <div className="search-bar p-4 bg-white rounded-lg shadow-lg w-full max-w-4xl">
                <div className="flex flex-col md:flex-row md:flex-wrap md:space-x-4">
                    <input
                        type="text"
                        placeholder="Search by keyword"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        className="p-2 h-10 border rounded mb-2 md:mb-0 flex-grow md:flex-1"
                    />
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="p-2 h-10 border rounded mb-2 md:mb-0 flex-grow md:flex-1"
                    />
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="p-2 h-10 border rounded mb-2 md:mb-0 flex-grow md:flex-1"
                    >
                        <option value="">Filter by category</option>
                        {loading && <option>Loading categories...</option>}
                        {error && <option>Error loading categories</option>}
                        {!loading && !error && categories.map((cat) => (
                            <option key={cat.id} value={cat.name}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                    <select
                        value={source}
                        onChange={(e) => setSource(e.target.value)}
                        className="p-2 h-10 border rounded mb-2 md:mb-0 md:ml-0 md:mt-2 lg:mt-0 flex-grow md:flex-1"
                    >
                        <option value="">Filter by source</option>
                        {sourcesLoading && <option>Loading sources...</option>}
                        {sourcesError && <option>Error loading sources</option>}
                        {!sourcesLoading && !sourcesError && sources.map((src) => (
                            <option key={src.id} value={src.name}>
                                {src.name}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={handleSearch}
                        className="p-2 h-10 bg-blue-500 text-white rounded md:ml-0 md:mt-2 lg:mt-0 md:flex-1"
                    >
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;