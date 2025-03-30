import apiBaseUrl from "../apiBaseUrl/apiBaseUrl";
import { isAuthenticated, isRestaurantOwner } from "../auth/auth";

export const isTokenExpired = (token) => {
    if (!token) return true;
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const expiryTime = decodedToken.exp * 1000;
    return Date.now() > expiryTime;
};

const getRefreshToken = () => {
    return localStorage.getItem("r_token");
};

export const refreshAccessToken = async () => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) return null;

    const response = await fetch(`${apiBaseUrl}/auth/token/refresh/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: refreshToken }),
    });

    const data = await response.json();
    if (response.ok && data.access) {
        // Store the new access token
        localStorage.setItem("a_token", data.access);
        isAuthenticated();
        isRestaurantOwner();
        return data.access;
    }

    if (response.status === 401) {
        localStorage.removeItem("a_token");
        localStorage.removeItem("r_token");
        localStorage.removeItem("u_id");
        localStorage.removeItem("is_ro");

        window.location.href = "/login";
    }

    return null;
};
