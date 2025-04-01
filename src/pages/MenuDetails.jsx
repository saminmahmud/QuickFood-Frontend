import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { IoArrowBack } from "react-icons/io5";
import Loading from "../components/Loading";
import { useGetMenuDetailsQuery } from "../features/menu/menuSLice";
import CartQuantity from "../components/CartQuantity";
import { AuthContext } from "../context/AuthContext";
import { FaRegEdit } from "react-icons/fa";
import UpdateMenuModal from "../components/UpdateMenuModal";

const MenuDetails = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState(null);
    const { restaurantId, menuId } = useParams();
    const { data, isLoading, refetch } = useGetMenuDetailsQuery(menuId);
    const navigate = useNavigate();
    const { isLoggedIn, isOwner } = useContext(AuthContext);

    const handleEditClick = (menu) => {
        setSelectedMenu(menu);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedMenu(null);
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <>
            <div className="max-w-5xl mx-auto p-6">
                <div className="pb-5">
                    <button
                        onClick={() => navigate(-1)}
                        className="badge badge-outline flex items-center cursor-pointer"
                    >
                        <IoArrowBack className="text-lg text-black " />
                        Go Back
                    </button>
                </div>

                <div className="flex flex-col md:flex-row p-2 items-center shadow-lg rounded-lg bg-base-100 pb-8 md:pb-2">
                    {/* Image Section */}
                    <div className="w-full md:w-1/2">
                        <img
                            src={data?.image}
                            alt={data?.name}
                            className="w-full h-96 object-cover rounded-t-lg md:rounded-lg"
                        />
                    </div>

                    {/* Details Section */}
                    <div className="w-full md:w-1/2 px-6 flex flex-col justify-between relative">
                        {isOwner == "true" && (
                            <div className="absolute right-3 top-3 cursor-pointer">
                                <FaRegEdit
                                    onClick={() =>
                                        handleEditClick({
                                            name: data.name,
                                            image: data.image,
                                            description: data.description,
                                            price: data.price,
                                            itemId: data.id,
                                            restaurantId,
                                        })
                                    }
                                    className="font-bold text-lg text-white hover:text-gray-300"
                                />
                            </div>
                        )}
                        <h1 className="text-3xl font-semibold text-white my-4">
                            {data?.name}
                        </h1>
                        <p className="text-gray-200 mb-4">
                            {data?.description}
                        </p>
                        <p className="text-lg font-semibold text-green-600">
                            ${data?.price}
                        </p>

                        {/* Quantity Counter */}

                        {(isOwner == "false" || !isOwner) && (
                            <div className="flex justify-between mt-4">
                                <CartQuantity item={data} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {isModalOpen && selectedMenu && (
                <UpdateMenuModal
                    menuData={selectedMenu}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onRefetch={refetch}
                />
            )}
        </>
    );
};

export default MenuDetails;
