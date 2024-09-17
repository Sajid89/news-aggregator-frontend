import React from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import Img1 from '../assets/placeholder_1.jpg';
import Img2 from '../assets/placeholder_2.jpg';
import Img3 from '../assets/placeholder_3.jpg';

import useSaveUserSettings from '../hooks/useSaveUserSettings';

const ArticleCard = ({ article, index }) => {
    const user = useSelector((state) => state.auth.user);
    const { saveSettings } = useSaveUserSettings();

    const placeholderImages = [Img1, Img2, Img3];
    const placeholderImage = placeholderImages[index % placeholderImages.length];

    const handleHeartClick = async () => {
        if (!user) {
            toast.warning('You need to be logged in to save favorites.');
            return;
        }

        try {
            await saveSettings(user.id, article.id);
        } catch (err) {
            console.error('Error saving settings:', err);
        }
    };

    return (
        <div className="relative bg-white shadow-md rounded-lg overflow-hidden">
            <img 
                src={article.imageUrl || placeholderImage} 
                alt={article.title} 
                className="w-full h-48 object-cover" 
            />
            <FontAwesomeIcon 
                icon={faHeart} 
                className="absolute top-2 right-2 text-red-500 cursor-pointer text-2xl hover:text-red-700 transition duration-300 ease-in-out transform hover:scale-110 shadow-lg" 
                onClick={handleHeartClick} 
            />
            <div className="p-4">
                <h2 className="text-lg font-semibold mb-2 leading-tight">{article.title}</h2>
                <p className="mb-2">Author: <span className='text-xs text-gray-400'>{article.author}</span></p>
                <p className="text-gray-600">{article.description}</p>
                <a href={`/article/${article.id}`} className="text-blue-500 mt-2 inline-block">Read more</a>
            </div>
        </div>
    );
};

export default ArticleCard;