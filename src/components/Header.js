import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearUser } from '../features/auth/authSlice';

const Header = () => {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const getFirstName = (fullName) => {
        return fullName.split(' ')[0];
    };

    const handleLogout = () => {
        dispatch(clearUser());
        navigate('/');
    };

    return (
        <header className="flex items-center justify-between p-4 bg-blue-600 text-white">
            <Link to="/" className="text-3xl font-bold mb-2 md:mb-0 text-shadow">
                News Aggregator
            </Link>
            <nav className="relative">
                {user ? (
                    <div className="relative">
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="mb-2 md:mb-0"
                        >
                            Hi, {getFirstName(user.name)}
                        </button>
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                                <Link
                                    to="/personalized-news-feed"
                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                                    onClick={() => setDropdownOpen(false)}
                                >
                                    Favorite News
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <a href="/login" className="mb-2 md:mb-0">Login</a>
                )}
            </nav>
        </header>
    );
};

export default Header;