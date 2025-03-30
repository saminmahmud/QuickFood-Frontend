import React, { useEffect, useState } from "react";
import {
    useGetOrderByAdminQuery,
    useUpdateOrderMutation,
} from "../features/order/orderSlice";
import Loading from "../components/Loading";
import { useGetMenuListQuery } from "../features/menu/menuSLice";
import { toast } from "react-toastify";
import { useGetRestaurantByOwnerQuery } from "../features/restaurant/restaurantSlice";

const AdOrder = () => {
    const { data, isLoading, refetch } = useGetOrderByAdminQuery(
        localStorage.getItem("u_id") || null
    );
    const { data: menuData, isLoading: menuLoading } = useGetMenuListQuery();
    const {
        data: ownerRestaurant,
        isLoading: ownerRestaurantLoading,
        refetch: ownerRestauranRefetch,
    } = useGetRestaurantByOwnerQuery(localStorage.getItem("u_id") || null);

    const [updateOrder, { isLoading: updateLoading }] =
        useUpdateOrderMutation();

    useEffect(() => {
        refetch();
    }, [refetch]);

    const handleStatusChange = async (e, order) => {
        const newStatus = e.target.value;
        const newOrder = { ...order, status: newStatus };

        try {
            await updateOrder({
                data: newOrder,
                id: parseInt(newOrder.id),
            }).unwrap();
            refetch();
            toast.success("Order updated successfully.", {
                position: "top-right",
            });
        } catch (error) {
            toast.error("Something wrong. Please try again.", {
                position: "top-right",
            });
        }
    };

    if (isLoading || menuLoading || ownerRestaurantLoading) {
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
                        <table className="table">
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
                                                                const restaurant =
                                                                    ownerRestaurant?.find(
                                                                        (res) =>
                                                                            res.id ==
                                                                            menuItem?.restaurant
                                                                    );

                                                                if (
                                                                    menuItem &&
                                                                    restaurant
                                                                ) {
                                                                    return (
                                                                        <span
                                                                            key={
                                                                                index
                                                                            }
                                                                        >
                                                                            <span className="font-bold">
                                                                                {
                                                                                    restaurant.name
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
                                                    onChange={(e) =>
                                                        handleStatusChange(
                                                            e,
                                                            item
                                                        )
                                                    }
                                                    name="order-status"
                                                    id="order-status"
                                                    className="py-2 border-2 border-gray-500 rounded-md font-semibold focus:outline-none"
                                                    disabled={
                                                        updateLoading ||
                                                        item.status ==
                                                            "Delivered"
                                                    }
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

export default AdOrder;
