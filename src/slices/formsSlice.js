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

        }

    }
});

export const { setFormsList, clearFormsList } = formsSlice.actions;

export default formsSlice.reducer;