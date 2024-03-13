import { createSlice } from "@reduxjs/toolkit";
import { container } from "../../model/containerModel";

const initialState = {
    isLoading: true,
    errorContainer: {
        isError: false,
        message: ""
    },
    container,
    actualMonth: {},
}

const containerReducer = createSlice(
    {
        name: "container",
        initialState,
        reducers: {
            startLoading: (state) => {
                state.isLoading = true;
            },
            getContainerByCod: (state, action) => {
                state.container = action.payload
            },
            updateContainerReducer: (state, action) => {
                state.container = action.payload
            },
            stopLoading: (state) => {
                state.isLoading = false
            },
            setActualMonth: (state, action) => {
                const ms = state.container?.months?.filter((el) => el.title === action.payload);
                state.actualMonth = ms[0]
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
    setActualMonth,
    startLoading,
    getContainerByCod,
    stopLoading,
    updateContainerReducer,
    catchError } = containerReducer.actions;

export default containerReducer.reducer;