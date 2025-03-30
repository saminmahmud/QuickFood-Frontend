import React, { useContext, useEffect, useState } from "react";
import { LuSquareArrowOutUpRight } from "react-icons/lu";
import { Link } from "react-router";
import CartQuantity from "./CartQuantity";
import { AuthContext } from "../context/AuthContext";
import { FaRegEdit } from "react-icons/fa";
import UpdateMenuModal from "./UpdateMenuModal";
import { toast } from "react-toastify";
import Loading from "./Loading";
import { useDeleteMenuMutation } from "../features/menu/menuSLice";
import { RiDeleteBin5Line } from "react-icons/ri";

const MenuItems = ({ restaurantId, menuData, isLoading, menuRefetch }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState(null);
    const { quantity, increaseQuantity, decreaseQuantity, addToCart } =
        CartQuantity();

    const { isLoggedIn, isOwner } = useContext(AuthContext);
    const [deleteMenu] = useDeleteMenuMutation();

    const handleAddToCart = (data) => {
        if (!isLoggedIn) {
            toast.warning("Please login first.", {
                position: "top-right",
            });
        } else {
            addToCart({
                restaurantId: data.restaurantId,
                menuId: data.menuId,
                image: data.image,
                name: data.name,
                price: data.price,
                quantity: quantity,
            });
            toast.success("Item added to cart successfully.", {
                position: "top-right",
            });
        }
    };

    const handleEditClick = (menu) => {
        setSelectedMenu(menu);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedMenu(null);
    };

    const handleDelete = async (id) => {
        try {
            await deleteMenu(id).unwrap();
            menuRefetch();
            toast.success("Menu Deleted successfully.", {
                position: "top-right",
            });
        } catch (error) {
            toast.error("Something went wrong. Please try again.", {
                position: "top-right",
            });
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <>
            {menuData &&
                menuData.map((item) => {
                    const {
                        image,
                        name,
                        description,
                        price,
                        id: itemId,
                    } = item;

                    return (
                        <div
                            key={itemId}
                            className="card bg-base-100 w-72 h-100 sm:w-80 shadow-sm border border-gray-500"
                        >
                            <figure>
                                <img
                                    src={image}
                                    alt="Menu Item"
                                    className="w-full h-full object-cover"
                                />
                            </figure>
                            <div className="card-body relative">
                                {isOwner === "true" && (
                                    <div className="absolute right-3 top-3 cursor-pointer flex justify-center items-center gap-8">
                                        <FaRegEdit
                                            onClick={() =>
                                                handleEditClick({
                                                    name,
                                                    image,
                                                    description,
                                                    price,
                                                    itemId,
                                                    restaurantId,
                                                })
                                            }
                                            className="font-bold text-lg text-white hover:text-gray-300"
                                        />
                                        <RiDeleteBin5Line
                                            onClick={() => handleDelete(itemId)}
                                            className="font-bold text-lg text-red-500 hover:text-red-600"
                                        />
                                    </div>
                                )}
                                <h2 className="card-title text-white">
                                    {name}
                                </h2>
                                <p className="text-gray-200">
                                    {description.slice(0, 40)}...
                                </p>
                                <div className="flex justify-between items-center mt-4">
                                    <p className="text-xl text-green-600 font-semibold">
                                        ${price}
                                    </p>

                                    {/* Quantity Counter */}
                                    {(isOwner === "false" || !isOwner) && (
                                        <div className="flex items-center space-x-2 text-white">
                                            <button
                                                className="btn btn-sm btn-outline hover:bg-gray-600"
                                                onClick={decreaseQuantity}
                                            >
                                                -
                                            </button>
                                            <span className="text-lg">
                                                {quantity}
                                            </span>
                                            <button
                                                className="btn btn-sm btn-outline hover:bg-gray-600"
                                                onClick={increaseQuantity}
                                            >
                                                +
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div
                                    className={`card-actions ${
                                        isOwner === "false" || !isOwner
                                            ? "justify-between"
                                            : "justify-end"
                                    } items-center mt-4`}
                                >
                                    {(isOwner === "false" || !isOwner) && (
                                        <button
                                            onClick={() => {
                                                handleAddToCart({
                                                    restaurantId,
                                                    menuId: itemId,
                                                    image,
                                                    name,
                                                    price,
                                                    quantity,
                                                });
                                            }}
                                            className="btn btn-primary text-white"
                                        >
                                            Add to Cart
                                        </button>
                                    )}
                                    <Link
                                        to={`/restaurant/${restaurantId}/menu/${itemId}`}
                                        className="badge badge-outline"
                                    >
                                        <LuSquareArrowOutUpRight className="text-lg text-white" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}

            {isModalOpen && selectedMenu && (
                <UpdateMenuModal
                    menuData={selectedMenu}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onRefetch={menuRefetch}
                />
            )}
        </>
    );
};

export default MenuItems;
