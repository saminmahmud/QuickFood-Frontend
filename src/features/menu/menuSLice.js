import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import apiBaseUrl from "../../apiBaseUrl/apiBaseUrl";
import {
    isTokenExpired,
    refreshAccessToken,
} from "../../tokenExpiration/tokenExpiration";

export const menuSlice = createApi({
    reducerPath: "menu",
    baseQuery: fetchBaseQuery({
        baseUrl: `${apiBaseUrl}/restaurant`,
        prepareHeaders: async (headers) => {
            let a_token = localStorage.getItem("a_token");

            if (isTokenExpired(a_token)) {
                a_token = await refreshAccessToken();
                if (a_token) {
                    localStorage.setItem("a_token", a_token);
                }
            }

            if (a_token) {
                headers.set("Authorization", `Bearer ${a_token}`);
            }

            return headers;
        },
    }),
    tagTypes: ["menus", "menu"],
    endpoints: (builder) => ({
        getMenuList: builder.query({
            query: () => "/menu/",
            providesTags: ["menus"],
        }),

        getMenuDetails: builder.query({
            query: (id) => `/menu/${id}/`,
            providesTags: ["menu"],
        }),

        getMenuSearchByRestaurant: builder.query({
            query: (id) => `/menu/?search=${id}`,
        }),

        createMenu: builder.mutation({
            query: (data) => ({
                url: "/menu/",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["menus", "menu"],
        }),

        updateMenu: builder.mutation({
            query: ({ data, id }) => ({
                url: `/menu/${id}/`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["menus", "menu"],
        }),

        deleteMenu: builder.mutation({
            query: (id) => ({
                url: `/menu/${id}/`,
                method: "DELETE",
            }),
            invalidatesTags: ["menus", "menu"],
        }),
    }),
});

export const {
    useGetMenuListQuery,
    useGetMenuDetailsQuery,
    useGetMenuSearchByRestaurantQuery,
    useCreateMenuMutation,
    useUpdateMenuMutation,
    useDeleteMenuMutation,
} = menuSlice;
