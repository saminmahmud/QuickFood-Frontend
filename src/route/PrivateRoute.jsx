import React, { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
    const { isOwner } = useContext(AuthContext);

    if (isOwner == "true") return children;
    else return <Navigate to="/" />;
};

export default PrivateRoute;
