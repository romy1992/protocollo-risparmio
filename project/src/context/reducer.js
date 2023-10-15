import {
    ADD,
    UPDATE_TITLE,
    EDIT_SALARY,
    SEARCH,
    SET_SHOW_SEARCH,
    TABELLA_ACCREDITI,
    TABELLA_SPESE,
    TABELLA_SPESE_FISSE,
    UPDATE,
    _single,
    DELETE_CARD,
    ADD_CARD,
    UPDATE_TOTAL
} from "./state";

const reducer = (state, action) => {
    const { type, payload } = action;

    // Aggiunge la nuova Card
    if (type === ADD_CARD) {

        const newPayload = {
            ...payload,
            id: state.payload.months.length + 1,
            priority: state.payload.months.length + 1
        }

        if (filterCard(state.months, payload))
            state.months.push(newPayload)

        return { ...state }
    }

    // Setta il titolo del Mese
    if (type === UPDATE_TITLE) {
        return {
            ...state,
            months: state.months.filter((item) => {
                if (item.id === payload.id) {
                    item.name = payload.body.nameMonth
                    item.des = payload.body.des
                    item.year = payload.body.year
                }
                return {
                    ...item
                }
            })
        }
    }

    // Cancella la card del mese 
    if (type === DELETE_CARD) {
        return {
            ...state,
            months: state.months.filter((item) => item.id !== payload)
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
            ...state,
            months: state.months
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
                    if (el.name === payload.name)
                        el.leisure = el.leisure.filter((a) => {
                            if (a.id !== payload.item.id)
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
                    if (el.name === payload.name)
                        el.fixedMonthlyCredit = el.fixedMonthlyCredit.filter((a) => {
                            if (a.id !== payload.item.id)
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
                state.fixedCost.filter((el) => el.id !== payload.item.id)
        }
    }

    // Modifica Le righe
    if (type === UPDATE.concat(TABELLA_SPESE)) {
        return {
            ...state,
            months:
                state.months.filter(el => {
                    if (el.name === payload.nameMonth)
                        el.leisure = el.leisure.filter((a) => {
                            if (a.id === payload.item.id) {
                                payload.name === "note" ?
                                    a.note = payload.value :
                                    a.price = payload.value
                            }
                            return { ...a }
                        })

                    return { ...el }
                })
        }
    } else if (type === UPDATE.concat(TABELLA_ACCREDITI)) {
        return {
            ...state,
            months:
                state.months.filter(el => {
                    if (el.name === payload.nameMonth)
                        el.fixedMonthlyCredit = el.fixedMonthlyCredit.filter((a) => {
                            if (a.id === payload.item.id) {
                                payload.name === "note" ?
                                    a.note = payload.value :
                                    a.price = payload.value
                            }
                            return { ...a }
                        })

                    return { ...el }
                })
        }
    } else if (type === UPDATE.concat(TABELLA_SPESE_FISSE)) {
        return {
            ...state,
            fixedCost:
                state.fixedCost.filter((a) => {
                    if (a.id === payload.item.id) {
                        payload.name === "note" ?
                            a.note = payload.value :
                            a.price = payload.value
                    }
                    return { ...a }
                })
        }
    }

    // Modifica lo stipendio
    if (type === EDIT_SALARY) {
        return {
            ...state,
            months: state.months.filter((el) => {
                if (el.id === payload.id) {
                    el.salary = payload.value
                }
                return { ...el }
            })
        }
    }

    // Aggiunge nelle tabelle la riga
    if (type === ADD.concat(TABELLA_SPESE)) {
        return {
            ...state,
            months: state.months.filter((el) => {
                if (el.name === payload.nameMonth) {
                    const newRow =
                    {
                        id: el.leisure.length + 1,
                        note: payload.row.note,
                        price: payload.row.price
                    }

                    if (filter(el.leisure, payload.row.note))
                        el.leisure.push(newRow)

                }

                return { ...el }
            })
        }

    } else if (type === ADD.concat(TABELLA_ACCREDITI)) {
        return {
            ...state,
            months: state.months.filter((el) => {
                if (el.name === payload.nameMonth) {
                    const newRow =
                    {
                        id: el.fixedMonthlyCredit.length + 1,
                        note: payload.row.note,
                        price: payload.row.price
                    }

                    if (filter(el.fixedMonthlyCredit, payload.row.note))
                        el.fixedMonthlyCredit.push(newRow)
                }
                return { ...el }
            })
        }

    } else if (type === ADD.concat(TABELLA_SPESE_FISSE)) {
        if (filter(state.fixedCost, payload.row.note))
            state.fixedCost.push(
                {
                    id: state.fixedCost.length + 1,
                    note: payload.row.note,
                    price: payload.row.price
                }
            )
        return {
            ...state
        }
    }

    // Aggiorna i totali/spese
    if (type === UPDATE_TOTAL.concat(TABELLA_SPESE)) {

        return {
            ...state, months:
                state.months.filter(el => {
                    if (el.id === payload.id) {
                        el.totalLeisure = payload.total
                        fixCounter(state, el)
                    }
                    return { ...el }
                })
        }
    }
    else if (type === UPDATE_TOTAL.concat(TABELLA_ACCREDITI)) {
        return {
            ...state, months:
                state.months.filter(el => {
                    if (el.id === payload.id) {
                        el.totalFixedMonthlyCredit = payload.total
                        fixCounter(state, el)
                    }
                    return { ...el }
                })
        }
    }
    else if (type === UPDATE_TOTAL.concat(TABELLA_SPESE_FISSE)) {
        state.payload.totalFixedCost = payload.total
        return {
            ...state
        }
    }
    return state;
}

const filter = (array, note) => {
    return array.filter(el => el.note === note).length === 0
}
const filterCard = (array, p) => {
    return array.filter(el => el.name === p.name && el.year === p.year).length === 0
}

const fixCounter = (state, el) => {
    el.cost = el.totalLeisure + el.totalFixedMonthlyCredit +
        state.fixedCost.reduce((a, b) => a + parseFloat(b.price), 0)
    el.difference = el.salary - el.cost
}


export default reducer;