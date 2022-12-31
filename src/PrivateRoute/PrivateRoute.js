import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authContext } from "../ContextProvider/ContextProvider";

const PrivateRoute = ({ children }) => {

    const { user, loading } = useContext(authContext);
    const location = useLocation();

    if (loading) {
        return <h1>Loading....</h1>
    }

    //navigate 
    if (user) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;


};

export default PrivateRoute;