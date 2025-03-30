import React, { useState } from "react";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // console.log(formData);

        setFormData({
            name: "",
            email: "",
            message: "",
        });
    };

    return (
        <div>
            <h1 className="text-3xl md:text-3xl lg:text-4xl font-bold text-center pb-5">
                Contact Us
            </h1>
            <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
                <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-lg font-medium text-gray-700 mb-2"
                        >
                            Your Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your name"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-lg font-medium text-gray-700 mb-2"
                        >
                            Your Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="message"
                            className="block text-lg font-medium text-gray-700 mb-2"
                        >
                            Your Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your message"
                            rows="4"
                            required
                        />
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            className="w-full bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 font-bold cursor-pointer"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
            <div className="mt-5 text-center text-gray-700">
                <h2 className="text-2xl font-semibold">
                    Or Contact Us Directly:
                </h2>
                <p className="text-lg text-gray-500">
                    Email:{" "}
                    <a
                        href="mailto:support@quickfood.com"
                        className="text-blue-500"
                    >
                        support@quickfood.com
                    </a>
                </p>
                <p className="text-lg text-gray-500">
                    Phone: +1 (800) 123-4567
                </p>
            </div>
        </div>
    );
};

export default Contact;
