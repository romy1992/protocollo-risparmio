import { createContext, useContext, useReducer } from "react"
import reducer from "./reducer";
import { payload } from "../utility/payloadMonth";
import { SET_QUERY, SEARCH } from "./state"

const AppContext = createContext();

const initialState = {
    payload: payload,
    query: "",
    months: payload.months
}

const AppProvider = ({ children }) => {

    const [state, dispach] = useReducer(reducer, initialState);

    // Setta la query nella barra di ricerca
    const setQuery = (value) => {
        dispach({ type: SET_QUERY, payload: value })
    }

    // Set paylod
    const setPayload = (value) => {
        dispach({ type: SEARCH, payload: value })
    }

    return (
        <AppContext.Provider
            value={
                {
                    ...state,
                    setQuery,
                    setPayload
                }
            }>
            {children}
        </AppContext.Provider>
    )
}

const useGlobalContext = () => {
    return useContext(AppContext);
}

export { AppProvider, useGlobalContext }
