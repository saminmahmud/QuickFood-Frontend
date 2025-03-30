import React, { useContext, useEffect } from "react";
import Loading from "../components/Loading";
import { useGetOrderByOwnerQuery } from "../features/order/orderSlice";
import { useGetMenuListQuery } from "../features/menu/menuSLice";
import { useGetRestaurantListQuery } from "../features/restaurant/restaurantSlice";
import { toast } from "react-toastify";
import { RemoveTotalCart } from "../cart/CartFunctionality";
import { AuthContext } from "../context/AuthContext";

const Order = () => {
    const { data, isLoading, refetch } = useGetOrderByOwnerQuery(
        localStorage.getItem("u_id") || null
    );
    const { data: menuData, isLoading: menuLoading } = useGetMenuListQuery();
    const {
        data: restaurant,
        isLoading: restaurantLoading,
        refetch: restauranRefetch,
    } = useGetRestaurantListQuery();
    const { setCartItemCount } = useContext(AuthContext);

    useEffect(() => {
        refetch();
    }, [refetch]);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const paymentStatus = urlParams.get("payment_status");

        if (paymentStatus === "success") {
            RemoveTotalCart();
            setCartItemCount(JSON.parse(localStorage.getItem("cart")) || []);
            toast.success("Payment successfully completed!", {
                position: "top-right",
            });
        }
    }, []);

    if (isLoading || menuLoading || restaurantLoading) {
        return <Loading />;
    }

    return (
        <div>
            <div>
                <h1 className="text-3xl md:text-3xl lg:text-4xl font-bold text-center pb-2">
                    All Orders
                </h1>
                <h1 className="text-xl font-bold text-center text-gray-600 pb-5">
                    Total Orders: {data.length}{" "}
                </h1>
                <div className="flex justify-center">
                    <div className="overflow-x-auto bg-white shadow-lg rounded-lg w-full max-w-6xl px-4">
                        <table className="table  w-full">
                            <tbody className="">
                                {data?.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="border-b border-black"
                                    >
                                        <td>
                                            <img
                                                src="/parcel_icon.png"
                                                alt=""
                                                className="min-w-12 min-h-12"
                                            />
                                        </td>

                                        <td>
                                            <div className="border-b bg-gray-100 inline-block px-1">
                                                <span className="font-bold">
                                                    Restaurant Name
                                                </span>
                                                : <span> Item Name</span>
                                            </div>
                                            <div className="">
                                                {item.items.length > 0 ? (
                                                    item.items
                                                        .map(
                                                            (
                                                                innerItem,
                                                                index
                                                            ) => {
                                                                const menuItem =
                                                                    menuData?.find(
                                                                        (
                                                                            menu
                                                                        ) =>
                                                                            menu.id ===
                                                                            innerItem.menu_item
                                                                    );
                                                                const rest =
                                                                    restaurant?.find(
                                                                        (res) =>
                                                                            res.id ==
                                                                            menuItem?.restaurant
                                                                    );

                                                                if (
                                                                    menuItem &&
                                                                    rest
                                                                ) {
                                                                    return (
                                                                        <span
                                                                            key={
                                                                                index
                                                                            }
                                                                        >
                                                                            <span className="font-bold">
                                                                                {
                                                                                    rest.name
                                                                                }
                                                                            </span>
                                                                            :{" "}
                                                                            {
                                                                                menuItem.name
                                                                            }{" "}
                                                                            x{" "}
                                                                            {
                                                                                innerItem.quantity
                                                                            }
                                                                        </span>
                                                                    );
                                                                }
                                                                return null;
                                                            }
                                                        )
                                                        .filter(Boolean)
                                                        .reduce(
                                                            (
                                                                acc,
                                                                curr,
                                                                index
                                                            ) => (
                                                                <>
                                                                    {acc}
                                                                    {index >
                                                                        0 && (
                                                                        <br />
                                                                    )}
                                                                    {curr}
                                                                </>
                                                            ),
                                                            null
                                                        )
                                                ) : (
                                                    <span className="text-red-500">
                                                        Menu Item Not Found
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td>${item.total_price.toFixed(2)}</td>
                                        <td>items:{item.items.length}</td>

                                        <td>
                                            <div className="">
                                                <h1 className="font-bold ">
                                                    {item.first_name}{" "}
                                                    {item.last_name}
                                                </h1>
                                                <p className="">
                                                    {item.address}, {item.city}-
                                                    {item.postal_code}
                                                </p>
                                                <p className="">
                                                    {item.phone} | {item.email}
                                                </p>
                                            </div>
                                        </td>

                                        <td>
                                            <div className="flex justify-center items-center gap-2">
                                                <div
                                                    className={`w-2 h-2 rounded-full ${
                                                        item.status ==
                                                            "Preparing" &&
                                                        "bg-red-500"
                                                    } ${
                                                        item.status ==
                                                            "Out for Delivery" &&
                                                        "bg-yellow-500"
                                                    } ${
                                                        item.status ==
                                                            "Delivered" &&
                                                        "bg-green-500"
                                                    }`}
                                                ></div>

                                                <select
                                                    value={item.status}
                                                    name="order-status"
                                                    id="order-status"
                                                    className="py-2 px-3 border-2 border-gray-500 rounded-md font-semibold focus:outline-none custom-select"
                                                    style={{
                                                        appearance: "none",
                                                        WebkitAppearance:
                                                            "none",
                                                        MozAppearance: "none",
                                                    }}
                                                    disabled={true}
                                                >
                                                    <option
                                                        value="Preparing"
                                                        className="font-semibold cursor-pointer"
                                                    >
                                                        Preparing
                                                    </option>
                                                    <option
                                                        value="Out for Delivery"
                                                        className="font-semibold cursor-pointer"
                                                    >
                                                        Out for Delivery
                                                    </option>
                                                    <option
                                                        value="Delivered"
                                                        className="font-semibold cursor-pointer"
                                                    >
                                                        Delivered
                                                    </option>
                                                </select>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Order;
