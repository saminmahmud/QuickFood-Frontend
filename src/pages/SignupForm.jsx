import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignupMutation } from "../features/user/userSlice";
import { toast } from "react-toastify";

const SignupForm = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirm_password: "",
        is_restaurant_owner: false,
    });

    const [signup, { isLoading, isError }] = useSignupMutation();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(formData);
        try {
            await signup(formData).unwrap();
            navigate("/login");
            toast.success("Sign up successfully. Now login.", {
                position: "top-right",
            });
        } catch (err) {
            toast.error("Sign up failed. Try again.", {
                position: "top-right",
            });
        }

        setFormData({
            username: "",
            email: "",
            password: "",
            confirm_password: "",
            is_restaurant_owner: false,
        });
    };

    return (
        <div>
            <div>
                <h1 className="text-3xl md:text-3xl lg:text-4xl font-bold text-center pb-5">
                    SignUp
                </h1>
                <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full mt-1 px-4 py-2 border border-gray-300 bg-white rounded-md"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full mt-1 px-4 py-2 border border-gray-300 bg-white rounded-md"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full mt-1 px-4 py-2 border border-gray-300 bg-white rounded-md"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="confirm_password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirm_password"
                                name="confirm_password"
                                value={formData.confirm_password}
                                onChange={handleChange}
                                className="w-full mt-1 px-4 py-2 border border-gray-300 bg-white rounded-md"
                                required
                            />
                        </div>

                        <div className="mb-4 flex justify-start items-center gap-3">
                            <input
                                type="checkbox"
                                id="is_restaurant_owner"
                                name="is_restaurant_owner"
                                checked={formData.is_restaurant_owner}
                                onChange={handleChange}
                                className=" mt-1 px-4 py-2 border bg-white rounded-md"
                            />
                            <label
                                htmlFor="is_restaurant_owner"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Sign up As Restaurant Manager
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 font-bold cursor-pointer"
                            disabled={isLoading}
                        >
                            Sign up
                        </button>
                        {isError && (
                            <p className="text-red-500 text-center mt-4">
                                Error during sign up. Try again.
                            </p>
                        )}
                    </form>
                    <div className="">
                        <p className="text-center mt-4 text-black">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="text-blue-500 hover:underline"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupForm;
