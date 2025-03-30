import { createContext, useEffect, useState } from "react";
import { isAuthenticated, isRestaurantOwner } from "../auth/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());
    const [isOwner, setOwner] = useState(isRestaurantOwner());
    const [cartItemCount, setCartItemCount] = useState(
        JSON.parse(localStorage.getItem("cart")) || []
    );

    useEffect(() => {
        setIsLoggedIn(isAuthenticated());
        setOwner(isRestaurantOwner());
    }, [isOwner, isLoggedIn]);

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                isOwner,
                setOwner,
                cartItemCount: cartItemCount.length,
                setCartItemCount,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
