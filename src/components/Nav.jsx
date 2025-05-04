import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { BsCart4 } from "react-icons/bs";
import { AuthContext } from "../context/AuthContext";
import { useLogoutMutation } from "../features/user/userSlice";
import { isAuthenticated } from "../auth/auth";
import { toast } from "react-toastify";
import { RemoveTotalCart } from "../cart/CartFunctionality";

const Nav = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { isLoggedIn, setIsLoggedIn, cartItemCount, isOwner } =
        useContext(AuthContext);

    const [logout] = useLogoutMutation();
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLogout = async () => {
        await logout().unwrap();
        toggleDropdown();
        localStorage.removeItem("a_token");
        localStorage.removeItem("r_token");
        localStorage.removeItem("u_id");
        localStorage.removeItem("is_ro");
        RemoveTotalCart();
        setIsLoggedIn(isAuthenticated());
        navigate("/login");
        toast.success("Logout successfully", {
            position: "top-right",
        });
    };

    return (
        <nav className="bg-gray-200/[0.5] p-4 border-b-1">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo / Website name */}
                <Link
                    to="/"
                    onClick={() => {
                        setMenuOpen(false);
                    }}
                    className="flex flex-col"
                >
                    <span className="text-orange-600 text-2xl font-bold ">
                        QuickFood
                    </span>
                    {isLoggedIn && isOwner == "true" && (
                        <small className="text-xs text-black text-end">
                            Admin Panel
                        </small>
                    )}
                </Link>

                {/* Hamburger Icon for small screens */}
                <div className="md:hidden">
                    {!menuOpen ? (
                        <button
                            onClick={toggleMenu}
                            className="text-black focus:outline-none  cursor-pointer"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    ) : (
                        <button
                            onClick={toggleMenu}
                            className="text-black focus:outline-none cursor-pointer"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                            >
                                <path
                                    d="M6 18L18 6M6 6l12 12"
                                    stroke="black"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                        </button>
                    )}
                </div>

                {/* Links - visible on medium and larger screens */}
                <div className="hidden md:flex space-x-6">
                    <Link
                        to="/"
                        className="text-black hover:text-orange-600 font-semibold"
                    >
                        Home
                    </Link>
                    {isOwner == "true" ? (
                        isLoggedIn && (
                            <>
                                <Link
                                    to="/all-order"
                                    className="text-black hover:text-orange-600 font-semibold"
                                >
                                    Orders
                                </Link>
                            </>
                        )
                    ) : (
                        <>
                            <Link
                                to="/about"
                                className="text-black hover:text-orange-600 font-semibold"
                            >
                                About
                            </Link>
                            <Link
                                to="/contact"
                                className="text-black hover:text-orange-600 font-semibold"
                            >
                                Contact
                            </Link>
                        </>
                    )}

                    {!isLoggedIn && (
                        <>
                            <Link
                                to="/signup"
                                className="text-black hover:text-orange-600 font-semibold"
                            >
                                Sign up
                            </Link>
                            <Link
                                to="/login"
                                className="text-black hover:text-orange-600 font-semibold"
                            >
                                Login
                            </Link>
                        </>
                    )}
                </div>

                {/* Profile dropdown */}
                {isLoggedIn && (
                    <div className="relative hidden md:flex justify-center items-center gap-5">
                        {isOwner == "false" && (
                            <Link to="/cart">
                                <div className="relative">
                                    <BsCart4 className="text-2xl text-black hover:text-orange-600" />
                                    <div className="absolute -top-1 -right-3 bg-red-500 rounded-full w-4 h-4 text-xs text-white flex items-center justify-center">
                                        {cartItemCount}
                                    </div>
                                </div>
                            </Link>
                        )}

                        <button
                            onClick={toggleDropdown}
                            type="button"
                            className="inline-flex justify-center items-center w-full px-3 py-2 text-sm font-medium text-black cursor-pointer"
                        >
                            <img
                                className="w-4"
                                src="/profile_icon.png"
                                alt="profile"
                                srcset=""
                            />
                            <svg
                                className="ml-2 -mr-1 h-5 w-5 text-gray-400"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>

                        {/* Dropdown menu */}
                        {dropdownOpen && (
                            <div className="absolute top-8 right-0 mt-2 w-40 bg-white rounded-lg shadow-lg z-10">
                                <ul className="text-black font-semibold">
                                    {isLoggedIn && isOwner == "false" && (
                                        <li>
                                            <Link
                                                onClick={toggleDropdown}
                                                to="/my-orders"
                                                className="block px-4 py-2 text-sm hover:bg-gray-100"
                                            >
                                                My Orders
                                            </Link>
                                        </li>
                                    )}

                                    <li>
                                        <button
                                            onClick={() => handleLogout()}
                                            className="block w-full text-start px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Mobile menu - displayed when menu is open */}
            {menuOpen && (
                <div className="md:hidden py-4 px-5">
                    <Link
                        onClick={toggleMenu}
                        to="/"
                        className="block text-black hover:text-orange-600 font-semibold py-2"
                    >
                        Home
                    </Link>
                    {isOwner == "true" ? (
                        isLoggedIn && (
                            <>
                                <Link
                                    onClick={toggleMenu}
                                    to="/all-order"
                                    className="block text-black hover:text-orange-600 font-semibold py-2"
                                >
                                    Orders
                                </Link>
                            </>
                        )
                    ) : (
                        <>
                            <Link
                                onClick={toggleMenu}
                                to="/about"
                                className="block text-black hover:text-orange-600 font-semibold py-2"
                            >
                                About
                            </Link>
                            <Link
                                onClick={toggleMenu}
                                to="/contact"
                                className="block text-black hover:text-orange-600 font-semibold py-2"
                            >
                                Contact
                            </Link>
                        </>
                    )}

                    {!isLoggedIn && (
                        <>
                            <Link
                                onClick={toggleMenu}
                                to="/signup"
                                className="block text-black hover:text-orange-600 font-semibold py-2"
                            >
                                Sign up
                            </Link>
                            <Link
                                onClick={toggleMenu}
                                to="/login"
                                className="block text-black hover:text-orange-600 font-semibold py-2"
                            >
                                Login
                            </Link>
                        </>
                    )}

                    {/* profile dropdown for mobile */}
                    {isLoggedIn && (
                        <div className="relative mt-2">
                            <Link to="/cart">
                                {isOwner == "false" && (
                                    <div className="">
                                        <BsCart4
                                            onClick={toggleMenu}
                                            className="text-2xl text-black hover:text-orange-600"
                                        />
                                        <div className="absolute -top-1 left-5 bg-red-500 rounded-full w-4 h-4 text-xs text-white flex items-center justify-center">
                                            {cartItemCount}
                                        </div>
                                    </div>
                                )}
                            </Link>
                            <button
                                onClick={toggleDropdown}
                                type="button"
                                className="inline-flex mt-3 justify-center items-center px-1 py-2 text-sm font-medium text-black cursor-pointer"
                            >
                                <img
                                    className="w-4"
                                    src="/profile_icon.png"
                                    alt="profile"
                                    srcset=""
                                />
                                <svg
                                    className="ml-1 -mr-1 h-5 w-5 text-gray-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>

                            {dropdownOpen && (
                                <div className="absolute left-0 mt-2 w-40 bg-white rounded-lg shadow-lg z-10">
                                    <ul className="text-black font-semibold">
                                        {isLoggedIn && isOwner == "false" && (
                                            <li>
                                                <Link
                                                    onClick={toggleDropdown}
                                                    to="/my-orders"
                                                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                                                >
                                                    My Orders
                                                </Link>
                                            </li>
                                        )}

                                        <li>
                                            <button
                                                onClick={() => handleLogout()}
                                                className="block w-full text-start px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                                            >
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Nav;
