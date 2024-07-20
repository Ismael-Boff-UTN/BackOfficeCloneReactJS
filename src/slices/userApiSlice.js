import { apiSlice } from "./apiSlice";


const USER_URL = "/api/users";


export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/auth`,
                method: "POST",
                body: data
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USER_URL}/logout`,
                method: "POST",

            })
        }),
        updateUserProfile: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/profile`,
                method: "PUT",
                body: data
            })
        }),
        createUser: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}`,
                method: "POST",
                body: data
            })
        }),
        loadAllUsers: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/list`,
                method: "GET",
                body: data
            })
        }),
        deleteUser: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/delete`,
                method: "DELETE",
                body: data
            })
        }),

    }),

});


//Usar el correcto standard para la exportacion useMutation, useQuery, etc..
export const { useLoginMutation, useLogoutMutation, useUpdateUserProfileMutation, useCreateUserMutation, useLoadAllUsersMutation, useDeleteUserMutation } = userApiSlice;