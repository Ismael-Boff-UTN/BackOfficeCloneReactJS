import { createSlice } from "@reduxjs/toolkit";


const initialState = {

    formsList: null

}


const formsSlice = createSlice({
    name: "formsList",
    initialState,
    reducers: {
        setFormsList: (state, action) => {
            state.formsList = action.payload;

        },
        clearFormsList: (state, action) => {
            state.formsList = null;

        },
        deleteForm: (state, action) => {
            //...state.items.filter((articulo) => articulo._id !== action.payload),
            // state.usersList.users = [...state.usersList.users, action.payload];
            state.formsList = [...state.formsList.filter((form) => form._id !== action.payload)];
        },


    }
});

export const { setFormsList, clearFormsList, deleteForm } = formsSlice.actions;

export default formsSlice.reducer;