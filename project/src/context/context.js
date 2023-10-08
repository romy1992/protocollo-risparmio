import { createContext, useContext, useReducer } from "react";
import { payload } from "../utility/payloadMonth";
import reducer from "./reducer";
import { SEARCH, SET_QUERY, SET_SHOW_SEARCH, _single } from "./state";

const AppContext = createContext();

const initialState = {
    payload: payload,
    query: "",
    months: payload.months,
    fixedCost: payload.fixedCost,
    showSearch: true
}

const AppProvider = ({ children }) => {

    const [state, dispach] = useReducer(reducer, initialState);

    // Setta la query nella barra di ricerca
    const setQuery = (value) => {
        dispach({ type: SET_QUERY, payload: value })
    }

    // Setta il payload in base alla query di ricerca
    const setPayload = (value) => {
        dispach({ type: SEARCH, payload: value })
    }

    // Applica un booleano per mostrare la barra di ricerca
    const setShowSearch = (value) => {
        dispach({ type: SET_SHOW_SEARCH, payload: value })
    }

    // Cancella una singola riga
    const deleteRow = (name, title, item) => {
        dispach({ type: title.concat(_single), payload: item, name })
    }

    // Cancella tutte le righe
    const deleteAllRow = (name, title) => {
        dispach({ type: title, payload: name })
    }

    // Refresha l'array dei mesi
    const refresh = () => {
        state.months = payload.months;
    }

    return (
        <AppContext.Provider
            value={
                {
                    ...state,
                    setQuery,
                    setPayload,
                    setShowSearch,
                    deleteRow,
                    deleteAllRow,
                    refresh
                }
            }>
            {children}
        </AppContext.Provider>
    )
}

const useGlobalContext = () => {
    return useContext(AppContext);
}

export { AppProvider, useGlobalContext };

