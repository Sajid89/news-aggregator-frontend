import { useState } from 'react';
import api from '../api/api';
import { toast } from 'react-toastify';

const useSaveUserSettings = () => {
    const saveSettings = async (userId, articleIdd) => {
        try {
            const response = await api.post('/save-favorites', {
                user_id: userId,
                article_id: articleIdd,
            });
            toast.success('Article saved successfully!');
            console.log(response.data);
        } catch (err) {
            console.error('Error saving settings:', err);
        }
    };

    return { saveSettings };
};

export default useSaveUserSettings;