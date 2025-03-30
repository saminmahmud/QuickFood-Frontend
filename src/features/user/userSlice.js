import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import apiBaseUrl from "../../apiBaseUrl/apiBaseUrl";
import {
    isTokenExpired,
    refreshAccessToken,
} from "../../tokenExpiration/tokenExpiration";

export const userSlice = createApi({
    reducerPath: "user",
    baseQuery: fetchBaseQuery({
        baseUrl: `${apiBaseUrl}`,
        prepareHeaders: async (headers, { endpoint }) => {
            if (endpoint === "signup" || endpoint === "login") {
                return headers;
            }

            const a_token = localStorage.getItem("a_token");

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
    tagTypes: ["users", "user"],
    endpoints: (builder) => ({
        getUsersList: builder.query({
            query: () => "/users/",
            providesTags: ["users"],
        }),
        getUserDetails: builder.query({
            query: (id) => `/users/${id}/`,
            providesTags: ["user"],
        }),
        signup: builder.mutation({
            query: (userData) => ({
                url: "/users/signup/",
                method: "POST",
                body: userData,
            }),
        }),
        login: builder.mutation({
            query: (credentials) => ({
                url: "/users/login/",
                method: "POST",
                body: credentials,
            }),
        }),

        logout: builder.mutation({
            query: () => ({
                url: "/users/logout/",
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("r_token")}`,
                },
            }),
        }),
    }),
});

export const {
    useGetUsersListQuery,
    useGetUserDetailsQuery,
    useSignupMutation,
    useLoginMutation,
    useLogoutMutation,
} = userSlice;
