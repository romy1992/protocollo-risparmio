import {
    SEARCH,
    SET_QUERY,
    SET_SHOW_SEARCH,
    TABELLA_ACCREDITI,
    TABELLA_SPESE,
    TABELLA_SPESE_FISSE,
    _single
} from "./state";

const reducer = (state, action) => {
    const { type, payload, name } = action;

    // Setta la query nella barra di ricerca
    if (type === SET_QUERY) {
        return {
            ...state, query: payload
        }
    }

    // In base a delle condizione, ritorna IN LIKE il valore ricercato
    if (type === SEARCH) {
        if (payload !== "" && state.months.length !== 0)
            return {
                ...state,
                months: state.months
                    .filter((el) =>
                        el.name.toLowerCase().
                            includes(payload.toLowerCase()))
            }
        else if (payload !== "" && state.months.length === 0) {
            return {
                ...state,
                months: state.payload.months
                    .filter((el) =>
                        el.name.toLowerCase().
                            includes(payload.toLowerCase()))
            }
        }
        return {
            ...state,
            months: state.payload.months
        }

    }

    if (type === SET_SHOW_SEARCH) {
        return {
            ...state, showSearch: payload
        }
    }

    // Cancella tutto
    if (type === TABELLA_SPESE) {
        return {
            ...state, months: state.months
                .filter((el) => {
                    if (el.name === payload)
                        el.leisure = []
                    return { ...el }
                })
        }
    } else if (type === TABELLA_ACCREDITI) {
        return {
            ...state, months: state.months
                .filter((el) => {
                    if (el.name === payload)
                        el.fixedMonthlyCredit = []
                    return { ...el }
                })
        }
    } else if (type === TABELLA_SPESE_FISSE) {
        return {
            ...state, fixedCost: []
        }
    }

    // Cancella Singolarmente
    if (type === TABELLA_SPESE.concat(_single)) {

        /**
            Il doppio filtro deve essere applicato con  
             condizioni e con i "return" in modalità json 
          */
        return {
            ...state,
            months:
                state.months.filter(el => {
                    if (el.name === name)
                        el.leisure = el.leisure.filter((a) => {
                            if (a.note !== payload.note)
                                return { ...a }
                        })

                    return { ...el }
                })
        }
    } else if (type === TABELLA_ACCREDITI.concat(_single)) {

        /**
          Il doppio filtro deve essere applicato con  
           condizioni e con i "return" in modalità json 
        */
        return {
            ...state,
            months:
                state.months.filter(el => {
                    if (el.name === name)
                        el.fixedMonthlyCredit = el.fixedMonthlyCredit.filter((a) => {
                            if (a.note !== payload.note)
                                return { ...a }
                        })

                    return { ...el }
                })
        }
    }
    else if (type === TABELLA_SPESE_FISSE.concat(_single)) {

        // Filtra a primo vilevvo ed elimina singolarmente la nota
        return {
            ...state,
            fixedCost:
                state.fixedCost.filter((el) => el.note !== payload.note)
        }
    }

    



    return state;
}

export default reducer;