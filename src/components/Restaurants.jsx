import React, { useContext, useEffect, useState } from "react";
import { LuSquareArrowOutUpRight } from "react-icons/lu";
import { Link } from "react-router";
import {
    useDeleteRestaurantMutation,
    useGetRestaurantByOwnerQuery,
    useGetRestaurantListQuery,
} from "../features/restaurant/restaurantSlice";
import Loading from "./Loading";
import { AuthContext } from "../context/AuthContext";
import { FaRegEdit } from "react-icons/fa";
import AddRestaurantForm from "../pages/AddRestaurantForm";
import UpdateRestaurantModal from "./UpdateRestaurantModal";
import { RiDeleteBin5Line } from "react-icons/ri";
import { toast } from "react-toastify";

const Restaurants = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [restaurant, setRestaurant] = useState([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);

    const { data, isLoading, isSuccess, refetch } = useGetRestaurantListQuery();
    const {
        data: ownerRestaurant,
        isLoading: ownerRestaurantLoading,
        isSuccess: ownerRestaurantIsSuccess,
        refetch: ownerRestauranRefetch,
    } = useGetRestaurantByOwnerQuery(localStorage.getItem("u_id") || null);
    
    const { isLoggedIn, isOwner } = useContext(AuthContext);
    const [deleteRestaurant] = useDeleteRestaurantMutation();

    useEffect(() => {
        if (isOwner === "true") {
            setRestaurant(ownerRestaurant || []);
        } else {
            setRestaurant(data || []);
        }
    }, [isOwner, data, ownerRestaurant]);

    useEffect(() => {
        refetch();
    }, [isLoggedIn, isOwner, refetch]);

    useEffect(() => {
        ownerRestauranRefetch();
    }, [ownerRestaurant, isOwner, ownerRestauranRefetch]);

    const handleEditClick = (restaurant) => {
        setSelectedRestaurant(restaurant);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedRestaurant(null);
    };

    const handleDelete = async (id) => {
        try {
            await deleteRestaurant(id).unwrap();
            ownerRestauranRefetch();
            refetch();
            toast.success("Restaurant Deleted successfully.", {
                position: "top-right",
            });
        } catch (error) {
            toast.error("Something went wrong. Please try again.", {
                position: "top-right",
            });
        }
    };

    if (isLoading || ownerRestaurantLoading) {
        return <Loading />;
    }

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const restaurantList = restaurant?.filter((restaurant) => {
        return restaurant.name.toLowerCase().includes(search.toLowerCase());
    });

    return (
        <div className="">
            <div>
                {isOwner == "true" ? (
                    <div className="pb-5">
                        <AddRestaurantForm
                            refetch={refetch}
                            ownerRestauranRefetch={ownerRestauranRefetch}
                        />
                    </div>
                ) : (
                    <div
                        className="relative w-full h-96 bg-cover bg-center rounded-2xl"
                        style={{
                            backgroundImage: "url(restaurant-banner.png)",
                        }}
                    >
                        <div className="absolute inset-0 bg-black opacity-40 rounded-2xl"></div>
                        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6">
                            <h1 className="text-3xl font-semibold mb-4">
                                Order your favourite food here.
                            </h1>
                            <p className="text-lg max-w-lg">
                                QuickFood makes it easy for you to discover a
                                wide variety of restaurants in your area and
                                enjoy your favorite meals from the comfort of
                                your home. Browse through menus, place your
                                order, and have it delivered right to your
                                doorstep, all with just a few clicks.
                            </p>
                        </div>
                    </div>
                )}

                <div className="flex justify-between items-center pt-5 flex-col md:flex-row">
                    <h1 className="text-2xl md:text-3xl font-bold">
                        Restaurants:
                    </h1>
                    <div className="mt-3 md:mt-0">
                        <input
                            className="border-2 rounded-md px-2 py-1 w-full outline-0 bg-white"
                            type="search"
                            value={search}
                            onChange={handleSearch}
                            name="search"
                            id="search"
                            placeholder="Search restaurants..."
                        />
                    </div>
                </div>

                <div className=" py-10">
                    {restaurantList.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-5">
                            {restaurantList?.map((item) => (
                                <div
                                    key={item.id}
                                    className="card bg-base-100 w-72 h-90 sm:w-80 shadow-sm border border-gray-500"
                                >
                                    <figure>
                                        <img
                                            src={item.image}
                                            alt="Shoes"
                                            className="w-full h-full object-cover"
                                        />
                                    </figure>
                                    <div className="card-body relative">
                                        {isOwner == "true" && (
                                            <div className="absolute right-3 top-3 cursor-pointer flex justify-center items-center gap-10">
                                                <FaRegEdit
                                                    onClick={() =>
                                                        handleEditClick(item)
                                                    }
                                                    className="font-bold text-lg text-white hover:text-gray-300"
                                                />
                                                <RiDeleteBin5Line
                                                    onClick={() =>
                                                        handleDelete(item.id)
                                                    }
                                                    className="font-bold text-lg text-red-500 hover:text-red-600"
                                                />
                                            </div>
                                        )}
                                        <h2 className="card-title text-white">
                                            {item.name}
                                        </h2>
                                        <p className="text-gray-200">
                                            {item.location}
                                        </p>
                                        <p className="text-gray-200">
                                            {item.description.slice(0, 44)}...
                                        </p>
                                        <div className="card-actions justify-end">
                                            <Link
                                                to={`/restaurant/${item.id}`}
                                                className="badge badge-outline"
                                            >
                                                <LuSquareArrowOutUpRight className="text-lg text-white" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="max-w-2xl m-auto">
                            <div className="flex w-full flex-col items-center justify-center p-10 bg-gray-100 rounded-lg shadow-lg space-y-5">
                                <img
                                    src="https://img.icons8.com/ios/452/no-food.png" // You can replace this with any icon you'd like
                                    alt="Not found"
                                    className="w-24 h-24"
                                />
                                <h1 className="text-3xl text-orange-500 font-bold">
                                    No Restaurants Found :(
                                </h1>
                                <p className="text-lg text-gray-600">
                                    Please try searching with different keywords
                                    or check back later.
                                </p>
                                <button
                                    className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
                                    onClick={() => setSearch("")} // Reset search functionality
                                >
                                    Reset Search
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                {isModalOpen && selectedRestaurant && (
                    <UpdateRestaurantModal
                        restaurantData={selectedRestaurant}
                        isOpen={isModalOpen}
                        onClose={handleCloseModal}
                        onRefetch={
                            isOwner == "true" ? ownerRestauranRefetch : refetch
                        }
                    />
                )}
            </div>
        </div>
    );
};

export default Restaurants;
