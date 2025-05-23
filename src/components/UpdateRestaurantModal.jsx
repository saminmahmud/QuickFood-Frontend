import React, { useEffect, useRef, useState } from "react";
import { useUpdateRestaurantMutation } from "../features/restaurant/restaurantSlice";
import { toast } from "react-toastify";

const UpdateRestaurantModal = ({
    restaurantData,
    isOpen,
    onClose,
    onRefetch,
}) => {
    const [formData, setFormData] = useState({
        name: restaurantData?.name || "",
        image: restaurantData?.image || null,
        description: restaurantData?.description || "",
        location: restaurantData?.location || "",
        owner: localStorage.getItem("u_id") || null,
    });
    const [imagePreview, setImagePreview] = useState(
        restaurantData?.image || null
    );
    const fileInputRef = useRef(null);

    const [updateRestaurant, { isLoading: updateLoading, isSuccess }] =
        useUpdateRestaurantMutation();

    useEffect(() => {
        setFormData({
            name: restaurantData?.name || "",
            image: restaurantData?.image || null,
            description: restaurantData?.description || "",
            location: restaurantData?.location || "",
            owner: localStorage.getItem("u_id") || null,
        });
        setImagePreview(restaurantData?.image || null);
    }, [restaurantData]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Create a URL to show the image preview
            const previewURL = URL.createObjectURL(file);
            setFormData({
                ...formData,
                image: file,
            });
            setImagePreview(previewURL);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    // console.log(formData.image);
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataObj = new FormData();

        formDataObj.append("name", formData.name);
        formDataObj.append("description", formData.description);
        formDataObj.append("location", formData.location);
        formDataObj.append("owner", formData.owner);

        if (formData.image != restaurantData.image) {
            formDataObj.append("image", formData.image);
            // console.log('Image appended successfully');
        }

        try {
            await updateRestaurant({
                data: formDataObj,
                id: parseInt(restaurantData.id),
            }).unwrap();
            await onRefetch();
            onClose();
            toast.success("Restaurant updated successfully.", {
                position: "top-right",
            });
        } catch (error) {
            // console.log(error);
            toast.error("Something went wrong. Please try again.", {
                position: "top-right",
            });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-transparent backdrop-blur-xl flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg max-w-xl w-full">
                <h2 className="text-2xl font-semibold mb-4">
                    Update Restaurant
                </h2>
                <form onSubmit={handleSubmit}>
                    {/* Restaurant Name */}
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 bg-white"
                        >
                            Restaurant Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6 items-center">
                        {/* Image */}
                        <div className="mb-4">
                            <label
                                htmlFor="image"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Restaurant Image
                            </label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md"
                                accept="image/*"
                            />
                        </div>
                        {imagePreview && (
                            <div className="mt-2">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-16 h-16 object-cover rounded-md"
                                />
                            </div>
                        )}
                    </div>

                    {/* Location */}
                    <div className="mb-4">
                        <label
                            htmlFor="location"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Location
                        </label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md"
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
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 cursor-pointer"
                    >
                        Submit
                    </button>
                </form>
                <button
                    onClick={onClose}
                    className="mt-4 w-full bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 cursor-pointer"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default UpdateRestaurantModal;
