import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogged: false,
    error: {
        message: "",
        isError: false
    }
}

const loginReducer = createSlice(
    {
        name: "login",
        initialState,
        reducers: {
            isAuthUser: (state, action) => {
                state.isLogged = action.payload
            },
            catchError: (state, action) => {
                state.error = action.payload
            },
            logout: (state) => {
                state.isLogged = false;
            }
        }
    }
)

// Se vogliamo usarli singolarmente
export const {
    isAuthUser,
    catchError,
    logout
} = loginReducer.actions;
// Prendo il reducer nel conternitore login
const { reducer } = loginReducer;

export default reducer;

