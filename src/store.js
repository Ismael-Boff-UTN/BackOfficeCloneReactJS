import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import formsReducer from "./slices/formsSlice";
import { apiSlice } from "./slices/apiSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        forms: formsReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,


    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,

});


export default store;