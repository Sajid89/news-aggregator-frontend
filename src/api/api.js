import axios from 'axios';
import { toast } from 'react-toastify';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
});

api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            if (error.response.status === 422 && error.response.data.message == "Validation errors") {
                toast.error(`Error: ${Object.values(error.response.data.errors)[0][0]}`);
            } else {
                toast.error(`Error: ${error.response.data.message}`);
            }
            
            if (error.response.status === 401 && error.response.data.message === "Unauthenticated") 
            {
                //store.dispatch(logout());
            }
        } else if (error.request) {
            toast.error('Error: No response was received from the server.');
        } else {
            toast.error('Error: ' + error.message);
        }
        return Promise.reject(error);
    }
);

export default api;