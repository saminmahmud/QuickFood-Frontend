import React, { useContext, useEffect, useRef, useState } from "react";
import CartTotal from "../components/CartTotal";
import {
    useCreateOrderMutation,
    useCreatePaymentMutation,
} from "../features/order/orderSlice";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const [cartItem, setCartItem] = useState(
        JSON.parse(localStorage.getItem("cart")) || []
    );
    const [createOrder, { isLoading, error }] = useCreateOrderMutation();
    const [createPayment] = useCreatePaymentMutation();
    const { cartItemCount } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        address: "",
        postal_code: "",
        city: "",
        user: null,
    });

    const formRef = useRef(null);

    // Handle form input changes
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const userId = JSON.parse(localStorage.getItem("u_id"));
    const accessToken = JSON.parse(
        JSON.stringify(localStorage.getItem("a_token"))
    );
    // console.log(userId, accessToken)

    if (userId && !formData.user) {
        setFormData((prevData) => ({
            ...prevData,
            user: userId,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!accessToken) {
            // console.error('No access token available');
            return;
        }

        try {
            const orderResponse = await createOrder(formData).unwrap();
            console.log("Order Response:", orderResponse);
            console.log("Order ID:", orderResponse.id);
            const orderId = parseInt(orderResponse.id);

            const orderItemData = cartItem.map((item) => ({
                menu_item: item.menuId,
                restaurant: item.restaurantId,
                quantity: item.quantity,
                price: item.price,
            }));

            const paymentResponse = await createPayment({
                data: { items: orderItemData },
                id: orderId,
            }).unwrap();

            if (paymentResponse && paymentResponse.redirect_url) {
                console.log("Redirecting to:", paymentResponse.redirect_url);
                window.location.href = paymentResponse.redirect_url;
            } else {
                navigate("/cart");
            }
        } catch (error) {
            // console.error("Error occurred:", error);

            if (error.response) {
                // If there is a response from the server
                const errorData = await error.response.text();
                // console.error("Server response text:", errorData);
            } else {
                // console.error("Network or other error:", error);
            }
        }
    };

    const handleProceedToPayment = () => {
        if (formRef.current) {
            formRef.current.requestSubmit();
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Flexbox Layout for large devices */}
            <div className="lg:flex lg:space-x-8">
                {/* Left Side - Delivery Information Form */}
                <div className="lg:w-1/2 bg-white p-6 shadow-lg rounded-lg">
                    <h2 className="text-xl font-bold mb-4">
                        Delivery Information
                    </h2>

                    <form ref={formRef} onSubmit={(e) => handleSubmit(e)}>
                        <div className="mb-4">
                            <label
                                htmlFor="first_name"
                                className="block text-sm font-semibold"
                            >
                                First Name
                            </label>
                            <input
                                required
                                value={formData.first_name}
                                onChange={handleChange}
                                type="text"
                                id="first_name"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="mb-2">
                            <label
                                htmlFor="last_name"
                                className="block text-sm font-semibold"
                            >
                                Last Name
                            </label>
                            <input
                                required
                                value={formData.last_name}
                                onChange={handleChange}
                                type="text"
                                id="last_name"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="mb-2">
                            <label
                                htmlFor="email"
                                className="block text-sm font-semibold"
                            >
                                Email
                            </label>
                            <input
                                required
                                value={formData.email}
                                onChange={handleChange}
                                type="email"
                                id="email"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="mb-2">
                            <label
                                htmlFor="phone"
                                className="block text-sm font-semibold"
                            >
                                Phone Number
                            </label>
                            <input
                                required
                                maxLength="13"
                                value={formData.phone}
                                onChange={handleChange}
                                type="tel"
                                id="phone"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="mb-2">
                            <label
                                htmlFor="address"
                                className="block text-sm font-semibold"
                            >
                                Address
                            </label>
                            <input
                                required
                                value={formData.address}
                                onChange={handleChange}
                                type="text"
                                id="address"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="mb-2">
                            <label
                                htmlFor="postal_code"
                                className="block text-sm font-semibold"
                            >
                                Postal Code
                            </label>
                            <input
                                maxLength="6"
                                required
                                value={formData.postal_code}
                                onChange={handleChange}
                                type="text"
                                id="postal_code"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="mb-2">
                            <label
                                htmlFor="city"
                                className="block text-sm font-semibold"
                            >
                                City
                            </label>
                            <input
                                required
                                value={formData.city}
                                onChange={handleChange}
                                type="text"
                                id="city"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                    </form>
                </div>

                {/* Right Side - Cart Total and Proceed Button */}
                <div className="pt-10">
                    <div className="pb-5">
                        <CartTotal />
                    </div>
                    {cartItemCount == 0 ? (
                        <button className="px-4 py-2 bg-orange-500 font-bold rounded-md cursor-not-allowed hover:bg-orange-400">
                            Proceed to Payment
                        </button>
                    ) : (
                        <button
                            onClick={handleProceedToPayment}
                            className="px-4 py-2 bg-orange-500 font-bold rounded-md cursor-pointer hover:bg-orange-400"
                        >
                            Proceed to Payment
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Checkout;
