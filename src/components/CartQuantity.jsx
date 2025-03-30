import React, { useContext, useState } from "react";
import { AddToCart, RemoveFromCart } from "../cart/CartFunctionality";
import { AuthContext } from "../context/AuthContext";

const CartQuantity = () => {
    const [quantity, setQuantity] = useState(1);
    const { setCartItemCount } = useContext(AuthContext);

    const increaseQuantity = () => setQuantity(quantity + 1);
    const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

    const addToCart = (item) => {
        // console.log(item);
        AddToCart(item);
        setQuantity(1);
        setCartItemCount(JSON.parse(localStorage.getItem("cart")) || []);
    };

    const removeFromCart = (menuId) => {
        RemoveFromCart(menuId);
        setCartItemCount(JSON.parse(localStorage.getItem("cart")) || []);
    };

    return {
        quantity,
        increaseQuantity,
        decreaseQuantity,
        addToCart,
        removeFromCart,
    };
};

export default CartQuantity;
