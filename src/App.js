import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import UserNewsFeed from './pages/UserNewsFeed';
import ArticlePage from './pages/ArticlePage';

import PublicRoute from './utils/PublicRoute';
import ProtectedRoute from './utils/ProtectedRoute';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';


function App() {
    return (
        <>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <ToastContainer />
                    <Router>
                        <Routes>
                            <Route path="/login" element={<PublicRoute element={Login} />} />
                            <Route path="/register" element={<PublicRoute element={Register} />} />

                            <Route path="/" element={<HomePage />} />
                            <Route path="/article/:id" element={<ArticlePage />} />
                            <Route 
                                path="/personalized-news-feed" 
                                element={<ProtectedRoute element={UserNewsFeed} />} 
                            />
                        </Routes>
                    </Router>
                </PersistGate>
            </Provider>
        </>
    );
}

export default App;