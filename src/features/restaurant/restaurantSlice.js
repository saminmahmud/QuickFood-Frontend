import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import apiBaseUrl from "../../apiBaseUrl/apiBaseUrl";
import {
    isTokenExpired,
    refreshAccessToken,
} from "../../tokenExpiration/tokenExpiration";

export const restaurantSlice = createApi({
    reducerPath: "restaurant",
    baseQuery: fetchBaseQuery({
        baseUrl: `${apiBaseUrl}`,
        prepareHeaders: async (headers, { endpoint }) => {
            if (
                endpoint === "getRestaurantList" ||
                endpoint === "getRestaurantDetails"
            ) {
                return headers;
            }

            let a_token = localStorage.getItem("a_token");

            if (isTokenExpired(a_token)) {
                a_token = await refreshAccessToken();
                if (a_token) {
                    localStorage.setItem("a_token", a_token);
                }
            }
            a_token = localStorage.getItem("a_token");

            if (a_token) {
                headers.set("Authorization", `Bearer ${a_token}`);
            }

            return headers;
        },
    }),
    tagTypes: ["restaurants", "restaurant"],
    endpoints: (builder) => ({
        getRestaurantList: builder.query({
            query: () => "/restaurant",
            providesTags: ["restaurants"],
        }),

        getRestaurantDetails: builder.query({
            query: (id) => `/restaurant/${id}/`,
            providesTags: ["restaurant"],
        }),

        getRestaurantByOwner: builder.query({
            query: (id) => `/restaurant/?search=${id}`,
        }),

        createRestaurant: builder.mutation({
            query: (data) => ({
                url: "/restaurant/",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["restaurants", "restaurant"],
        }),

        updateRestaurant: builder.mutation({
            query: ({ data, id }) => ({
                url: `/restaurant/${id}/`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["restaurants", "restaurant"],
        }),
        deleteRestaurant: builder.mutation({
            query: (id) => ({
                url: `/restaurant/${id}/`,
                method: "DELETE",
            }),
            invalidatesTags: ["restaurants", "restaurant"],
        }),
    }),
});

export const {
    useGetRestaurantListQuery,
    useGetRestaurantDetailsQuery,
    useGetRestaurantByOwnerQuery,
    useCreateRestaurantMutation,
    useUpdateRestaurantMutation,
    useDeleteRestaurantMutation,
} = restaurantSlice;
