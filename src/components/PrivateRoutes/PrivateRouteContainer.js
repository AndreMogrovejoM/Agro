import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ authRoute='admin', children, ...props }) => {
    
    const authReducer = useSelector(state => state.authReducer )
    const isAuth = authReducer.auth[authRoute]
    // console.log(authRoute,authReducer)
    if(!isAuth) {
        return <Navigate to="/404" />;
    }
    return children
};

export default PrivateRoute;
