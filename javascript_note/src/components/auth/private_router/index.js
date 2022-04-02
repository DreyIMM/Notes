import React from 'react';
import { Navigate} from 'react-router-dom';


const PrivateRoute = ({ children }) => { 
    const auth = localStorage.getItem('user') ; 
        
    return auth ? children : <Navigate to="/login" />;
}

export default PrivateRoute
