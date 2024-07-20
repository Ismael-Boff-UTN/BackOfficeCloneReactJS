import { createSlice } from "@reduxjs/toolkit";


const initialState = {

    userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
    usersList: null,

}


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem("userInfo", JSON.stringify(action.payload));
        },
        logout: (state, action) => {
            state.userInfo = null;
            localStorage.removeItem("userInfo");
        },
        setUsersList: (state, action) => {
            state.usersList = action.payload;
        },
        updateUsersList: (state, action) => {
            state.usersList.users = [...state.usersList.users, action.payload];
        },
        deleteUser: (state, action) => {
            //state.usersList.users = [...state.usersList.users.filter((user) => user._id !== action.payload)];
        },


    }
});

export const { setCredentials, logout, setUsersList, updateUsersList, deleteUser } = authSlice.actions;

export default authSlice.reducer;