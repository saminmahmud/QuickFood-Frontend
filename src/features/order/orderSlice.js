import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import apiBaseUrl from "../../apiBaseUrl/apiBaseUrl";
import {
    isTokenExpired,
    refreshAccessToken,
} from "../../tokenExpiration/tokenExpiration";

export const orderSlice = createApi({
    reducerPath: "order",
    baseQuery: fetchBaseQuery({
        baseUrl: `${apiBaseUrl}`,
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
    tagTypes: ["orders", "order", "admin", "user"], // You can leave this if you plan to use tags later for cache invalidation
    endpoints: (builder) => ({
        getOrderList: builder.query({
            query: () => "/order/",
            providesTags: ["orders"], // Provides tags for cache invalidation if required
        }),

        getOrderDetails: builder.query({
            query: (id) => `/order/${id}/`,
            providesTags: ["order"],
        }),

        getOrderByOwner: builder.query({
            query: (id) => `/order/?search=${id}`,
            providesTags: ["user"],
        }),

        getOrderByAdmin: builder.query({
            query: (id) => `/order/admin/${id}/`,
            providesTags: ["admin"],
        }),

        createOrder: builder.mutation({
            query: (data) => ({
                url: "/order/",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["orders", "order", "admin", "user"],
        }),

        updateOrder: builder.mutation({
            query: ({ data, id }) => ({
                url: `/order/${id}/`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["orders", "order", "admin", "user"],
        }),

        createPayment: builder.mutation({
            query: ({ data, id }) => ({
                url: `/order/payment/${id}/`,
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const {
    useGetOrderListQuery,
    useGetOrderDetailsQuery,
    useGetOrderByOwnerQuery,
    useGetOrderByAdminQuery,
    useCreateOrderMutation,
    useUpdateOrderMutation,
    useCreatePaymentMutation,
} = orderSlice;

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import apiBaseUrl from "../../apiBaseUrl/apiBaseUrl";
// import { isTokenExpired, refreshAccessToken } from "../../tokenExpiration/tokenExpiration";

// export const orderSlice = createApi({
//     reducerPath: 'menu',
//     baseQuery: fetchBaseQuery({
//         baseUrl: `${apiBaseUrl}`,
//         prepareHeaders: async (headers) => {
//             const a_token = localStorage.getItem('a_token');

//             if (isTokenExpired(a_token)) {
//                 a_token = await refreshAccessToken();
//             }

//             if (a_token) {
//               headers.set('Authorization', `Bearer ${a_token}`);
//             }

//             return headers;
//         }
//     }),
//     tagTypes:['orders'],
//     endpoints: (builder) => ({
//         getOrderList: builder.query({
//             query: () => '/order/',
//             providesTags: ['orders']
//         }),

//         getOrderDetails: builder.query({
//             query: (id) => `/order/${id}/`,
//             // providesTags: ['order']
//         }),

//         createOrder: builder.mutation({
//             query: (data) => ({
//                 url: "/order/",
//                 method: "POST",
//                 body: data,
//             }),
//             // invalidatesTags: ['orders']
//         }),

//         createPayment: builder.mutation({
//             query: (data, id) => ({
//                 url: `/order/payment/${id}/`,
//                 method: "POST",
//                 body: data,
//             }),
//         }),
//     })
// })

// export const {
//   useGetOrderListQuery,
//   useGetOrderDetailsQuery,
//   useCreateOrderMutation,
//   useCreatePaymentMutation,
// } = orderSlice;
