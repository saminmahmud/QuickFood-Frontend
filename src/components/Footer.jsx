import React from "react";
import {
    FaSquareFacebook,
    FaSquareInstagram,
    FaSquareTwitter,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-semibold mb-4">About Us</h3>
                        <p className="text-gray-400">
                            QuickFood is your go-to platform to order delicious
                            food from the best restaurants in your area. We're
                            dedicated to bringing your favorite meals to your
                            doorstep.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-4">
                            Quick Links
                        </h3>
                        <ul>
                            <li>
                                <Link
                                    to="/"
                                    className="text-gray-400 hover:text-white"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/about"
                                    className="text-gray-400 hover:text-white"
                                >
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/contact"
                                    className="text-gray-400 hover:text-white"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-4">Contact</h3>
                        <p className="text-gray-400">
                            Email: support@quickfood.com
                        </p>
                        <p className="text-gray-400">
                            Phone: +1 (800) 123-4567
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-4">
                            Follow Us
                        </h3>
                        <div className="flex space-x-6">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white"
                            >
                                <FaSquareFacebook className="w-6 h-6" />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white"
                            >
                                <FaSquareTwitter className="w-6 h-6" />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white"
                            >
                                <FaSquareInstagram className="w-6 h-6" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} QuickFood. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
