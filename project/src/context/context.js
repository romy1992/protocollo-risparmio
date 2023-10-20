import { createContext, useContext, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { payload } from "../utility/payloadMonth";
import reducer from "./reducer";
import { loginFetch } from "../redux/service/reducerLoginService";
import { logout } from "../redux/reducers/loginReducer";
import {
    ADD,
    ADD_CARD,
    DELETE_CARD,
    EDIT_SALARY,
    SEARCH,
    SET_SHOW_SEARCH,
    UPDATE,
    UPDATE_TITLE,
    UPDATE_TOTAL,
    _single
} from "./state";

const AppContext = createContext();

const initialState = {
    payload: payload,
    months: payload.months,
    fixedCost: payload.fixedCost,
    showSearch: true
}

const AppProvider = ({ children }) => {

    /** REDUX */

    const uDispach = useDispatch();
    const { isLogged, error } = useSelector(state => state.login);

    // Chiama la funzione di login con Redux
    const globaLoginFetch = (user) => {
        uDispach(loginFetch("auth/login", user))
    }

    const globaLogout = () => {
        uDispach(logout())
    }


    /** REDUX */


    const [state, dispach] = useReducer(reducer, initialState);


    // Setta il titolo,anno e descrizione del Mese
    const setTitle = (id, body) => {
        dispach({ type: UPDATE_TITLE, payload: { id, body } })
    }

    // Elimina la Card del mese
    const deleteCard = (id) => {
        dispach({ type: DELETE_CARD, payload: id })
    }

    const addnewCard = (card) => {
        dispach({ type: ADD_CARD, payload: card })
    }

    // Setta il payload in base alla query di ricerca
    const setPayload = (value) => {
        dispach({ type: SEARCH, payload: value })
    }

    // Applica un booleano per mostrare la barra di ricerca
    const setShowSearch = (value) => {
        dispach({ type: SET_SHOW_SEARCH, payload: value })
        // state.showSearch = value
    }

    // Cancella una singola riga
    const deleteRow = (name, title, item) => {
        dispach({
            type: title.concat(_single),
            payload: { item, name }
        })
    }

    // Cancella tutte le righe
    const deleteAllRow = (name, title) => {
        dispach({ type: title, payload: name })
    }

    // Refresha l'array dei mesi
    const refresh = () => {
        state.months = payload.months;
    }

    // Modifica la riga singolarmente
    const setValueEdited = (name, value, item, nameMonth, title) => {
        dispach({
            type: UPDATE.concat(title),
            payload:
            {
                name,
                value,
                item,
                nameMonth
            }
        })
    }

    // Modifica lo stipendio mensile
    const editSalary = (id, value) => {
        dispach({
            type: EDIT_SALARY,
            payload: { id, value }
        })
    }


    // Aggiunge la riga con note e price
    const addRowNote = (nameMonth, title, row) => {
        dispach({
            type: ADD.concat(title),
            payload: { nameMonth, row }
        })
    }

    // Somma i totali
    const somTotal = (id, total, title) => {
        dispach({ type: UPDATE_TOTAL.concat(title), payload: { id, total } })
    }

    return (
        <AppContext.Provider
            value={
                {
                    ...state,
                    setTitle,
                    somTotal,
                    deleteCard,
                    addnewCard,
                    setPayload,
                    setShowSearch,
                    deleteRow,
                    deleteAllRow,
                    refresh,
                    setValueEdited,
                    editSalary,
                    addRowNote,

                    isLogged,
                    error,
                    globaLoginFetch,
                    globaLogout
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

