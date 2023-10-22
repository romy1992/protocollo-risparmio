import { createContext, useContext, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isAuthUser, logout } from "../redux/reducers/loginReducer";
import { searchContainer, searchInLikeMonths, updateContainer } from "../redux/service/reducerContainerService";
import { loginFetch } from "../redux/service/reducerLoginService";
import { payload } from "../utility/payloadMonth";
import reducer from "./reducer";
import {
    ADD,
    EDIT_SALARY,
    UPDATE,
    UPDATE_TOTAL,
    _single
} from "./state";

const AppContext = createContext();

const initialState = {
    payload: payload,
    months: payload.months,
    fixedCost: payload.fixedCost,
}

const AppProvider = ({ children }) => {

    const [showSearch, setShowSearch] = useState(true);

    /** REDUX */

    const uDispach = useDispatch();
    const stateLogin = useSelector(state => state.loginReducer);
    const stateContainer = useSelector(state => state.containerReducer);
    const currentUser = stateContainer.container.codUser;

    // Chiama la funzione di login con Redux
    const globaLoginFetch = (user) => {
        uDispach(loginFetch("auth/login", user))
    }

    // Check Auth Manual
    const isAuth = () => {
        uDispach(isAuthUser(true))
    }

    // Semplice logout
    const globaLogout = () => {
        uDispach(logout())
        localStorage.removeItem("user")
    }

    // Cerca il container in base alla mail
    const globalSearchContainer = (email) => {
        uDispach(searchContainer(`container/search/${email}`))
    }

    // Update generale del container
    const globalUpdateContainer = (payload) => {
        uDispach(updateContainer("container/update", payload))
    }

    // Update per modifiche al mese
    const updateMounths = (container, body) => {
        let a = container.months.map((item) => {
            if (item.idUMonth === body.idUMonth) {
                item = { ...item, ...body }
            }
            return item
        })
        globalUpdateContainer({ ...container, months: a })
    }

    // Elimina la Card del mese
    const deleteCard = (id, container) => {
        let a = container.months.filter(el => el.idUMonth !== id);
        uDispach(updateContainer("container/update", { ...container, months: a }))
    }

    // Setta il payload in base alla query di ricerca
    const globalSearchInLikeMonths = (value) => {
        uDispach(searchInLikeMonths("container/searchInLike", value, stateContainer.container.codUser))
    }

    // Modifica lo stipendio mensile
    const editSalary = (idUMonth, salary) => {
        updateMounths(stateContainer.container, { idUMonth, salary })
    }


    /** REDUX */


    const [state, dispach] = useReducer(reducer, initialState);


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
                    somTotal,
                    deleteCard,
                    deleteRow,
                    deleteAllRow,
                    refresh,
                    setValueEdited,
                    editSalary,
                    addRowNote,

                    currentUser,
                    showSearch, setShowSearch,
                    stateLogin, isAuth, globaLoginFetch, globaLogout,
                    stateContainer, globalSearchContainer, globalUpdateContainer, updateMounths, globalSearchInLikeMonths
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

