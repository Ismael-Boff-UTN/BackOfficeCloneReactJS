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

    }),

});


//Usar el correcto standard para la exportacion useMutation, useQuery, etc..
export const { useLoginMutation, useLogoutMutation, useUpdateUserProfileMutation } = userApiSlice;