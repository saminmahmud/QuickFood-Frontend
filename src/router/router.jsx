import React from "react";
import { createBrowserRouter } from "react-router";
import Root from "../pages/Root";
import PageNotFound from "../pages/PageNotFound";
import Home from "../pages/Home";
import RestaurantDetails from "../pages/RestaurantDetails";
import MenuDetails from "../pages/MenuDetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import SignupForm from "../pages/SignupForm";
import NotShowRoute from "./../route/NotShowRoute";
import LoginForm from "../pages/LoginForm";
import Order from "../pages/Order";
import PrivateRoute from "../route/PrivateRoute";
import NotPrivateRoute from "../route/NotPrivateRoute";
import AdOrder from "../pages/AdOrder";
import About from "../pages/About";
import Contact from "../pages/Contact";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/about", element: <About /> },
            { path: "/contact", element: <Contact /> },
            {
                path: "/restaurant/:restaurantId",
                element: <RestaurantDetails />,
            },
            {
                path: "/restaurant/:restaurantId/menu/:menuId",
                element: <MenuDetails />,
            },

            {
                path: "/cart",
                element: (
                    <NotPrivateRoute>
                        <Cart />
                    </NotPrivateRoute>
                ),
            },
            {
                path: "/checkout",
                element: (
                    <NotPrivateRoute>
                        <Checkout />
                    </NotPrivateRoute>
                ),
            },
            {
                path: "/my-orders",
                element: (
                    <NotPrivateRoute>
                        <Order />
                    </NotPrivateRoute>
                ),
            },

            {
                path: "/all-order",
                element: (
                    <PrivateRoute>
                        <AdOrder />
                    </PrivateRoute>
                ),
            },

            {
                path: "/login",
                element: (
                    <NotShowRoute>
                        <LoginForm />
                    </NotShowRoute>
                ),
            },
            {
                path: "/signup",
                element: (
                    <NotShowRoute>
                        <SignupForm />
                    </NotShowRoute>
                ),
            },

            { path: "*", element: <PageNotFound /> },
        ],
    },
]);
