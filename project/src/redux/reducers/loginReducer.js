import { createSlice } from "@reduxjs/toolkit";
import { USER } from "../../utility/constStorage";

const initialState = {
    isLogged: false,
    currentUser: localStorage.getItem(USER) ? localStorage.getItem(USER) : "",
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
                state.currentUser = ""
                localStorage.removeItem(USER)
            },
            setCurrentUser: (state, action) => {
                state.currentUser = action.payload
                localStorage.setItem(USER, action.payload)
            }
        }
    }
)

// Se vogliamo usarli singolarmente
export const {
    setCurrentUser,
    isAuthUser,
    catchError,
    logout
} = loginReducer.actions;
// Prendo il reducer nel conternitore login
const { reducer } = loginReducer;

export default reducer;

