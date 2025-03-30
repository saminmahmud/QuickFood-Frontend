import React from "react";

const CartTotal = () => {
    const cartItem = JSON.parse(localStorage.getItem("cart")) || [];

    const subTotalPrice = cartItem.reduce((total, item) => {
        return total + parseFloat(item.price) * parseInt(item.quantity);
    }, 0);

    let delivery = 60;
    if (subTotalPrice == 0) {
        delivery = 0;
    }
    const total = subTotalPrice + delivery;

    return (
        <>
            <h1 className="text-2xl font-bold text-start pb-5">Cart Total</h1>

            <div className="overflow-x-auto bg-white shadow-lg rounded-lg max-w-md">
                <table className="table">
                    <tbody>
                        <tr className="border-b border-black">
                            <th>Subtotal</th>
                            <td>{subTotalPrice}</td>
                        </tr>
                        <tr className="border-b border-black">
                            <th>Delivery Fee</th>
                            <td>{delivery}</td>
                        </tr>
                        <tr className="border-b border-black">
                            <th>Total</th>
                            <td>{total}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default CartTotal;
