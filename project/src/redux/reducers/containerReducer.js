import { createSlice } from "@reduxjs/toolkit";
import { container } from "../../model/containerModel";

const initialState = {
    isLoading: true,
    errorContainer: {
        isError: false,
        message: ""
    },
    container
}

const containerReducer = createSlice(
    {
        name: "container",
        initialState,
        reducers: {
            startLoading: (state) => {
                state.isLoading = true;
                state.errorContainer = { ...state.error };
            },
            getContainerByCod: (state, actions) => {
                state.container = { ...actions.payload }
            },
            updateContainerReducer: (state, action) => {
                state.container = action.payload
            },
            stopLoading: (state) => {
                state.isLoading = false
            },
            catchError: (state, action) => {
                state.isLoading = false;
                state.errorContainer = { ...action.payload }
                state.container = null
            }
        }
    }
)


export const {
    startLoading,
    getContainerByCod,
    stopLoading,
    updateContainerReducer,
    catchError } = containerReducer.actions;

export default containerReducer.reducer;