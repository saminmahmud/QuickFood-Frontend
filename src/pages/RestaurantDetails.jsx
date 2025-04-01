import React, { useContext, useEffect, useState } from "react";
import MenuItems from "../components/MenuItems";
import { useGetRestaurantDetailsQuery } from "../features/restaurant/restaurantSlice";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { FaRegEdit } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import UpdateRestaurantModal from "../components/UpdateRestaurantModal";
import AddMenuForm from "./AddMenuForm";
import { useGetMenuSearchByRestaurantQuery } from "../features/menu/menuSLice";

const RestaurantDetails = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);

    const [search, setSearch] = useState("");
    const [menu, setmenu] = useState([]);

    const { restaurantId } = useParams();
    const { data, isLoading, refetch } =
        useGetRestaurantDetailsQuery(restaurantId);

    const {
        data: menuData,
        isLoading: menuLoading,
        refetch: menuRefetch,
    } = useGetMenuSearchByRestaurantQuery(restaurantId);
    const { isLoggedIn, isOwner } = useContext(AuthContext);

    useEffect(() => {
        setmenu(menuData || []);
    }, [menuData]);

    useEffect(() => {
        refetch();
        menuRefetch();
    }, [isLoggedIn, isOwner]);

    const handleEditClick = (restaurant) => {
        setSelectedRestaurant(restaurant);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedRestaurant(null);
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const menuList = menu?.filter((menu) => {
        return menu.name.toLowerCase().includes(search.toLowerCase());
    });

    if (isLoading || menuLoading) {
        return <Loading />;
    }

    return (
        <div>
            <div>
                <div className="hero w-full border-b border-gray-300">
                    <div className="hero-content flex-col lg:flex-row">
                        <img
                            src={data?.image}
                            className="max-w-sm rounded-lg shadow-2xl"
                        />
                        <div className="relative">
                            {isOwner == "true" && (
                                <div className=" absolute right-0 -top-3 cursor-pointer">
                                    <FaRegEdit
                                        onClick={() => handleEditClick(data)}
                                        className="font-bold text-lg"
                                    />
                                </div>
                            )}
                            <h1 className="text-5xl font-bold">{data?.name}</h1>
                            <p className="pt-6">{data?.description}</p>
                            <p className="pt-2">{data?.location}</p>
                        </div>
                    </div>
                </div>

                {isOwner == "true" && (
                    <div className="pt-5">
                        <AddMenuForm
                            refetch={refetch}
                            menuRefetch={menuRefetch}
                            restaurantId={restaurantId}
                        />
                    </div>
                )}

                <div className="flex justify-between items-center pt-5 flex-col md:flex-row">
                    <h1 className="text-2xl md:text-3xl font-bold">Menus:</h1>
                    <div className="mt-3 md:mt-0">
                        <input
                            className="border-2 rounded-md px-2 py-1 w-full outline-0 bg-white"
                            type="search"
                            value={search}
                            onChange={handleSearch}
                            name="search"
                            id="search"
                            placeholder="Search menu items..."
                        />
                    </div>
                </div>

                <div className=" py-10">
                    {menuList.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-5">
                            <MenuItems
                                restaurantId={restaurantId}
                                menuData={menuList}
                                isLoading={menuLoading}
                                menuRefetch={menuRefetch}
                            />
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
                                    No Menu Item Found :(
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
                        onRefetch={refetch}
                    />
                )}
            </div>
        </div>
    );
};

export default RestaurantDetails;
