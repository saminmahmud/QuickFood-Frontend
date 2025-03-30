import React, { useEffect, useRef, useState } from "react";
import { useCreateMenuMutation } from "../features/menu/menuSLice";
import { toast } from "react-toastify";

const AddMenuForm = ({ refetch, menuRefetch, restaurantId }) => {
    const [formData, setFormData] = useState({
        name: "",
        image: null,
        description: "",
        price: "",
        restaurant: parseInt(restaurantId),
    });

    const fileInputRef = useRef(null);
    const [createMenu, { isSuccess, isLoading }] = useCreateMenuMutation();

    // Handle input change for text and number fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle file input change (for image upload)
    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            image: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData();
        form.append("name", formData.name);
        form.append("description", formData.description);
        form.append("price", formData.price);
        form.append("image", formData.image);
        form.append("restaurant", formData.restaurant);

        try {
            await createMenu(form).unwrap();
            refetch();
            menuRefetch();
            toast.success("Restaurant added successfully.", {
                position: "top-right",
            });
        } catch (error) {
            toast.error("Something went wrong. Please try again.", {
                position: "top-right",
            });
        }

        setFormData({
            name: "",
            image: null,
            description: "",
            price: "",
            restaurant: parseInt(restaurantId),
        });

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div>
            <div>
                <h1 className="text-3xl md:text-3xl lg:text-4xl font-bold text-center pb-5">
                    Add New Menu
                </h1>
                <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
                    <form onSubmit={handleSubmit}>
                        <div className="grid md:grid-cols-2 md:gap-6">
                            {/* Menu Name */}
                            <div className="mb-4">
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700 bg-white"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>

                            {/* Image */}
                            <div className="mb-4">
                                <label
                                    htmlFor="image"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Image
                                </label>
                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md"
                                    accept="image/*"
                                    required
                                />
                            </div>
                        </div>

                        {/* price */}
                        <div className="mb-4">
                            <label
                                htmlFor="price"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Price
                            </label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>

                        {/* Description */}
                        <div className="mb-4">
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 cursor-pointer"
                            disabled={isLoading}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddMenuForm;
