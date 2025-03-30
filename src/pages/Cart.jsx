import React, { useContext, useEffect, useState } from "react";
import CartTotal from "../components/CartTotal";
import { Link } from "react-router-dom";
import CartQuantity from "../components/CartQuantity";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const Cart = () => {
    const [cartItem, setCartItem] = useState(
        JSON.parse(localStorage.getItem("cart")) || []
    );
    const { removeFromCart } = CartQuantity();
    const { cartItemCount, setCartItemCount } = useContext(AuthContext);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const paymentStatus = urlParams.get("payment_status");

        if (paymentStatus === "failed") {
            toast.error("Payment failed or was canceled.", {
                position: "top-right",
            });
        }
    }, []);

    const subTotalPrice = cartItem.reduce((total, item) => {
        return total + parseFloat(item.price) * parseInt(item.quantity);
    }, 0);

    const handleRemoveCart = (menuId) => {
        removeFromCart(menuId);
        setCartItem(JSON.parse(localStorage.getItem("cart")) || []);
    };

    return (
        <div>
            <div>
                <h1 className="text-3xl md:text-3xl lg:text-4xl font-bold text-center pb-5">
                    Cart
                </h1>
                <div className="flex justify-center">
                    <div className="overflow-x-auto bg-white shadow-lg rounded-lg w-full max-w-6xl px-4">
                        <table className="table  w-full">
                            {/* head */}
                            <thead>
                                <tr className="text-black border-b border-black">
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {cartItem.map((item) => (
                                    <tr
                                        key={item.menuId}
                                        className="border-b border-black"
                                    >
                                        <td>
                                            <img
                                                src={item.image}
                                                className="w-15 h-15 rounded-xl object-cover"
                                                alt="Item 1"
                                            />
                                        </td>
                                        <td>{item.name}</td>
                                        <td>{item.price}</td>
                                        <td>{item.quantity}</td>
                                        <td>
                                            {(
                                                parseFloat(item.price) *
                                                parseFloat(item.quantity)
                                            ).toFixed(2)}
                                        </td>
                                        <td
                                            onClick={() =>
                                                handleRemoveCart(item.menuId)
                                            }
                                            className="font-bold cursor-pointer"
                                        >
                                            X
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="pt-10">
                    <div className="pb-5">
                        <CartTotal />
                    </div>
                    {cartItemCount == 0 ? (
                        <span className="px-4 py-2 bg-orange-500 font-bold rounded-md cursor-not-allowed hover:bg-orange-600 mt-4">
                            Proceed to Checkout
                        </span>
                    ) : (
                        <Link
                            to="/checkout"
                            className="px-4 py-2 bg-orange-500 font-bold rounded-md cursor-pointer hover:bg-orange-600 mt-4"
                        >
                            Proceed to Checkout
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cart;
