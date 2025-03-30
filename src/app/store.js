import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../features/user/userSlice";
import { restaurantSlice } from "./../features/restaurant/restaurantSlice";
import { menuSlice } from "../features/menu/menuSLice";
import { orderSlice } from "../features/order/orderSlice";

export const store = configureStore({
    reducer: {
        [userSlice.reducerPath]: userSlice.reducer,
        [restaurantSlice.reducerPath]: restaurantSlice.reducer,
        [menuSlice.reducerPath]: menuSlice.reducer,
        [orderSlice.reducerPath]: orderSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(userSlice.middleware)
            .concat(restaurantSlice.middleware)
            .concat(menuSlice.middleware)
            .concat(orderSlice.middleware),
});
