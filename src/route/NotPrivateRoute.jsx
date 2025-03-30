import React, { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

const NotPrivateRoute = ({ children }) => {
    const { isOwner } = useContext(AuthContext);

    if (isOwner == "false") return children;
    else return <Navigate to="/" />;
};

export default NotPrivateRoute;
