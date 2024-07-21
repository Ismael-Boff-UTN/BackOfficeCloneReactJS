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
            }),
            invalidatesTags: ['Users']
        }),
        getUsers: builder.query({
            query: () => ({ url: `${USER_URL}/list`, method: "GET" }),
            providesTags: ['Users']
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                //http://10.0.0.164:4000/api/users/delete/669c021477f5a7088855c623
                url: `${USER_URL}/delete/${id}`,
                method: "DELETE",

            }),
            invalidatesTags: ['Users']
        }),


    }),

});


//Usar el correcto standard para la exportacion useMutation, useQuery, etc..
export const { useLoginMutation, useLogoutMutation, useUpdateUserProfileMutation, useCreateUserMutation, useGetUsersQuery, useDeleteUserMutation } = userApiSlice;