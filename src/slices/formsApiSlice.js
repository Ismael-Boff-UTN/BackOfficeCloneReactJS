import { apiSlice } from "./apiSlice";


const FORMS_URL = "/api/forms";


export const formsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        loadForms: builder.mutation({
            query: () => ({
                url: `${FORMS_URL}/list`,
                method: "GET",

            })
        }),
        createForms: builder.mutation({
            query: (data) => ({
                url: `${FORMS_URL}/create`,
                method: "POST",
                body: data
            })
        }),
    }),
});


//Usar el correcto standard para la exportacion useMutation, useQuery, etc..
export const { useLoadFormsMutation, useCreateFormsMutation } = formsApiSlice;

