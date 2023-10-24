import { createContext, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isAuthUser, logout } from "../redux/reducers/loginReducer";
import { searchContainer, searchInLikeMonths, updateContainer } from "../redux/service/reducerContainerService";
import { loginFetch } from "../redux/service/reducerLoginService";
import {
    TABELLA_ACCREDITI,
    TABELLA_SPESE,
    TABELLA_SPESE_FISSE
} from "./state";

const AppContext = createContext();

const AppProvider = ({ children }) => {

    const [showSearch, setShowSearch] = useState(true);

    /** REDUX */

    const uDispach = useDispatch();
    const stateLogin = useSelector(state => state.loginReducer);
    const stateContainer = useSelector(state => state.containerReducer);
    const { container } = stateContainer;

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
    const updateMounths = (body) => {
        let a = container.months.map((item) => {
            if (item.idUMonth === body.idUMonth) {
                item = { ...item, ...body }
            }
            return item
        })
        globalUpdateContainer({ ...container, months: a })
    }

    // Elimina la Card del mese
    const deleteCard = (id) => {
        let a = container.months.filter(el => el.idUMonth !== id);
        uDispach(updateContainer("container/update", { ...container, months: a }))
    }

    // Setta il payload in base alla query di ricerca
    const globalSearchInLikeMonths = (value) => {
        uDispach(searchInLikeMonths("container/searchInLike", value, container.codUser))
    }

    // Modifica lo stipendio mensile
    const editSalary = (idUMonth, salary) => {
        globalUpdateContainer(calculateTotal({ ...container }, idUMonth, salary))
    }


    // Aggiunge la riga con note e price
    const addRowNote = (idUMonth, title, body) => {
        if (title !== TABELLA_SPESE_FISSE) {
            const map = container.months.map(m => {
                if (m.idUMonth === idUMonth) {
                    if (title === TABELLA_SPESE) {
                        let lei = Array.from(m.leisure)
                        lei.push(body)
                        m = { ...m, leisure: lei }
                    } else if (title === TABELLA_ACCREDITI) {
                        let fixed = Array.from(m.fixedMonthlyCredit)
                        fixed.push(body)
                        m = { ...m, fixedMonthlyCredit: fixed }
                    }
                }
                return m;
            }
            );
            globalUpdateContainer(calculateTotal({ ...container, months: map }, idUMonth))
        } else {
            let contInput = container;
            if (contInput.fixedCost === null)
                contInput = { ...contInput, fixedCost: { costs: [] } }
            let co = Array.from(contInput.fixedCost.costs);
            co.push(body)
            const fs = { ...contInput.fixedCost, costs: co }
            globalUpdateContainer(calculateTotal({ ...contInput, fixedCost: fs }, idUMonth))
        }
    }

    // Cancella tutte le righe
    const deleteAllRow = (idUMonth, title) => {
        if (title !== TABELLA_SPESE_FISSE) {
            let mo = container.months.map(m => {
                if (m.idUMonth === idUMonth) {
                    if (title === TABELLA_SPESE)
                        m = { ...m, leisure: [] }
                    else if (title === TABELLA_ACCREDITI)
                        m = { ...m, fixedMonthlyCredit: [] }
                }
                return m;
            })
            globalUpdateContainer(calculateTotal({ ...container, months: mo }, idUMonth))
        } else {
            globalUpdateContainer(calculateTotal({ ...container, fixedCost: { ...container.fixedCost, costs: [] } }, idUMonth))
        }
    }


    // Cancella una singola riga
    const deleteRow = (idUMonth, title, item) => {
        if (title !== TABELLA_SPESE_FISSE) {
            let map = container.months.map(el => {
                if (el.idUMonth === idUMonth) {
                    if (title === TABELLA_SPESE) {
                        let leisure = el.leisure.filter(l => l.idLeisure !== item.idLeisure);
                        el = { ...el, leisure }
                    } else if (title === TABELLA_ACCREDITI) {
                        let fixedMonthlyCredit = el.fixedMonthlyCredit.filter(l => l.idFixedMonthlyCredit !== item.idFixedMonthlyCredit);
                        el = { ...el, fixedMonthlyCredit }
                    }
                }
                return el;
            })
            globalUpdateContainer(calculateTotal({ ...container, months: map }, idUMonth))
        } else {
            let costs = container.fixedCost.costs.filter(el => el.idCost !== item.idCost)
            globalUpdateContainer(calculateTotal({ ...container, fixedCost: { ...container.fixedCost, costs } }, idUMonth))
        }
    }


    //  Modifica la riga singolarmente
    const editRow = (idUMonth, body, title) => {
        if (title !== TABELLA_SPESE_FISSE) {
            let map = container.months.map(el => {
                if (el.idUMonth === idUMonth) {
                    if (title === TABELLA_SPESE) {
                        el = { ...el, leisure: [{ ...body }] }
                    } else if (title === TABELLA_ACCREDITI) {
                        el = { ...el, fixedMonthlyCredit: [{ ...body }] }
                    }
                }
                return el;
            })
            globalUpdateContainer(calculateTotal({ ...container, months: map }, idUMonth))
        } else {
            globalUpdateContainer(calculateTotal({ ...container, fixedCost: { ...container.fixedCost, costs: [{ ...body }] } }, idUMonth))
        }
    }

    const calculateTotal = (containerInput, idUMonth, salary) => {
        // Toale spese fisse al mese
        let totalFixedCost = container.fixedCost && container.fixedCost.costs ? somTotal(containerInput.fixedCost.costs) : 0;
        let editFixedCost = { ...containerInput.fixedCost, totalFixedCost }
        if (idUMonth) {
            let months = Array.from(containerInput.months)
            // Cerca il mese 
            let month = containerInput.months.filter(el => el && el.idUMonth === idUMonth)[0];
            // Rimuovo dal months il month vecchio
            months = months.filter(el => el && el.idUMonth !== idUMonth)
            // Per aggionare lo stipendio
            if (salary) {
                salary = parseInt(salary)
                month = { ...month, salary }
            }
            // Totale Spese idMese
            let totalLeisure = somTotal(month.leisure)
            // Calcolo delle Spese totali dele mese (month:cost) = Spese mese (leisure) + Totale Spese Fisse (fixedCost:totalFixedCost)
            let cost = totalFixedCost + totalLeisure;
            // Totale Accrediti mese
            let totalFixedMonthlyCredit = somTotal(month.fixedMonthlyCredit)
            // Calcolo le differenze(Stipendio + totale accrediti del mese) - i costi totali
            let difference = month.salary + totalFixedMonthlyCredit - cost;

            month = { ...month, totalLeisure, cost, totalFixedMonthlyCredit, difference }
            // Riaggiungo al months il month nuovo
            months.push(month)
            return { ...containerInput, fixedCost: { ...editFixedCost }, months }
        } else {
            let listMounths = Array.from(containerInput.months);
            let editMonths = []
            listMounths.forEach(month => {
                // Totale Spese idMese
                let totalLeisure = somTotal(month.leisure)
                // Calcolo delle Spese totali dele mese (month:cost) = Spese mese (leisure) + Totale Spese Fisse (fixedCost:totalFixedCost)
                let cost = totalFixedCost + totalLeisure;
                // Totale Accrediti mese
                let totalFixedMonthlyCredit = somTotal(month.fixedMonthlyCredit)
                // Calcolo le differenze(Stipendio + totale accrediti del mese) - i costi totali
                let difference = (month.salary + totalFixedMonthlyCredit) - cost;
                editMonths.push({ ...month, totalLeisure, cost, totalFixedMonthlyCredit, difference })
            });
            return { ...containerInput, fixedCost: { ...editFixedCost }, months: editMonths }
        }

    }

    // Somma i totali
    const somTotal = (obj) => {
        return obj.reduce((a, b) => a + parseFloat(b.price), 0)
    }


    /** REDUX */

    return (
        <AppContext.Provider
            value={
                {
                    editSalary, addRowNote, deleteCard, deleteRow, deleteAllRow, editRow,
                    showSearch, setShowSearch,
                    stateLogin, isAuth, globaLoginFetch, globaLogout,
                    container, stateContainer, globalSearchContainer, updateMounths, globalUpdateContainer, globalSearchInLikeMonths
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
