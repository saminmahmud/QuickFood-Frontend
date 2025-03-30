export const isAuthenticated = () => {
    const a_token = localStorage.getItem("a_token");
    const r_token = localStorage.getItem("r_token");
    const u_id = localStorage.getItem("u_id");
    return a_token && r_token && u_id ? true : false;
};

export const isRestaurantOwner = () => {
    const is_ro = localStorage.getItem("is_ro");

    return is_ro;
};
