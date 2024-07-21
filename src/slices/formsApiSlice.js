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
        deleteForm: builder.mutation({
            query: (data) => ({
                url: `${FORMS_URL}/delete`,
                method: "DELETE",
                body: data
            })
        }),
        updateForm: builder.mutation({
            query: (data) => ({
                url: `${FORMS_URL}/update`,
                method: "PUT",
                body: data
            })
        }),
        getFormbyId: builder.query({ query: formId => `${FORMS_URL}/byId/${formId}` }),

    }),
});


//Usar el correcto standard para la exportacion useMutation, useQuery, etc..
export const { useLoadFormsMutation, useCreateFormsMutation, useDeleteFormMutation, useUpdateFormMutation, useGetFormbyIdQuery } = formsApiSlice;

