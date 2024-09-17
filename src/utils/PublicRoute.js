import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ element: Component, ...rest }) => {
    const user = useSelector((state) => state.auth.user);

    return user ? <Navigate to="/" /> : <Component {...rest} />;
};

export default PublicRoute;