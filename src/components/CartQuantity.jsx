import React, { useContext, useState } from "react";
import { AddToCart, RemoveFromCart } from "../cart/CartFunctionality";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const CartQuantity = ({item}) => {
    const [quantity, setQuantity] = useState(1);
    const { isLoggedIn, isOwner, setCartItemCount } = useContext(AuthContext);

    const increaseQuantity = () => setQuantity(quantity + 1);
    const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);


    const addToCart = () => {
        if (!isLoggedIn) {
            toast.warning("Please login first.", {
                position: "top-right",
            });
        } else {
            AddToCart({
                restaurantId: item.restaurant,
                menuId: item.id,
                image: item.image,
                name: item.name,
                price: item.price,
                quantity: quantity,
            });
            setQuantity(1);
            setCartItemCount(JSON.parse(localStorage.getItem("cart")) || []);
            toast.success("Item added to cart successfully.", {
                position: "top-right",
            });
        }
    };


    return (
        <div className="w-full flex items-center justify-between mt-4">
            <div className="flex items-center space-x-2 text-white ">
                    <button className="btn btn-sm btn-outline hover:bg-gray-600" onClick={decreaseQuantity}>-</button>
                    <span className="text-lg">{quantity}</span>
                    <button className="btn btn-sm btn-outline hover:bg-gray-600" onClick={increaseQuantity}>+</button>
            </div>
            <div>
                <button
                    onClick={() => {
                        addToCart()
                    }}
                    className="btn btn-primary text-white"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default CartQuantity;
