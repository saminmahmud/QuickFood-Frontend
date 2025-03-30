export const AddToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItemIndex = cart.findIndex(
        (cartItem) => cartItem.menuId === item.menuId
    );
    console.log(existingItemIndex);
    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += parseInt(item.quantity);
    } else {
        const newItem = { ...item, quantity: parseInt(item.quantity) };
        cart.push(newItem);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
};

export const RemoveFromCart = (menuId) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const updatedCart = cart.filter((item) => item.menuId !== menuId);

    localStorage.setItem("cart", JSON.stringify(updatedCart));
};

export const UpdateQuantityCartItem = (id, quantity) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const itemIndex = cart.findIndex((item) => item.id === id);

    if (itemIndex >= 0) {
        cart[itemIndex].quantity = quantity;

        localStorage.setItem("cart", JSON.stringify(cart));
    }
};

export const RemoveTotalCart = () => {
    localStorage.removeItem("cart");
};
