import { createSlice } from "@reduxjs/toolkit";
import database from "../../config/firebase";
import { TABELLA_ACCREDITI, TABELLA_SPESE, TABELLA_SPESE_FISSE } from "../../context/state";
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


export const addMultipleRow = (idUMonth) => async (dispatch, getState) => {
    let { container } = getState().containerReducer
    const dataRef = database.ref("/container");
    let arrayTotal = []
    container.fixedCost.costs.forEach(el => {
        const newDataRef = dataRef.push();
        let body = { idLeisure: newDataRef.key, note: el.note, price: el.price }
        arrayTotal.push(body)
    })

    if (arrayTotal.length > 0) {
        const months = container?.months?.map(m => {
            if (m.idUMonth === idUMonth) {
                if (m?.leisure?.length > 0) {
                    let lei = Array.from(m.leisure)
                    lei = lei.concat(arrayTotal)
                    m = { ...m, leisure: lei }
                } else {
                    m = { ...m, leisure: arrayTotal }
                }
            }
            return m;
        });

        dispatch(updateContainer(calculateTotal({ ...container, months }, idUMonth)))
    }
}

// Aggiunge la riga con note e price
export const addRowNote = (idUMonth, title, body) => async (dispatch, getState) => {
    const dataRef = database.ref("/container");
    let { container } = getState().containerReducer
    if (title !== TABELLA_SPESE_FISSE) {
        const months = container?.months?.map(m => {
            if (m.idUMonth === idUMonth) {
                const newDataRef = dataRef.push();
                if (title === TABELLA_SPESE) {
                    body = { ...body, idLeisure: newDataRef.key }
                    if (m.leisure) {
                        let lei = Array.from(m.leisure)
                        lei.push(body)
                        m = { ...m, leisure: lei }
                    } else {
                        m = { ...m, leisure: [body] }
                    }
                } else if (title === TABELLA_ACCREDITI) {
                    body = { ...body, idFixedMonthlyCredit: newDataRef.key }
                    if (m.fixedMonthlyCredit !== undefined) {
                        let fixed = Array.from(m.fixedMonthlyCredit)
                        fixed.push(body)
                        m = { ...m, fixedMonthlyCredit: fixed }
                    } else m = { ...m, fixedMonthlyCredit: [body] }
                }
            }
            return m;
        });

        dispatch(updateContainer(calculateTotal({ ...container, months }, idUMonth)))

    } else {
        const newDataRef = dataRef.push();
        let contInput = container;
        if (contInput?.fixedCost === null)
            contInput = { ...contInput, fixedCost: { costs: [] } }
        let co = contInput?.fixedCost?.costs ? Array.from(contInput.fixedCost.costs) : [];
        body = { ...body, idCost: newDataRef.key }
        co.push(body)
        const fs = { ...contInput.fixedCost, costs: co }
        dispatch(updateContainer(calculateTotal({ ...contInput, fixedCost: fs }, idUMonth)))
    }
}

// Elimina la Card del mese
export const deleteCard = (id) => async (dispatch, getState) => {
    let { container } = getState().containerReducer
    let a = container.months.filter(el => el.idUMonth !== id);
    dispatch(updateContainer({ ...container, months: a }))
}

// Cancella tutte le righe
export const deleteAllRow = (idUMonth, title) => async (dispatch, getState) => {
    let { container } = getState().containerReducer
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
        dispatch(updateContainer(calculateTotal({ ...container, months: mo }, idUMonth)))
    } else {
        dispatch(updateContainer(calculateTotal({ ...container, fixedCost: { ...container.fixedCost, costs: [] } }, idUMonth)))
    }
}


// Cancella una singola riga
export const deleteRow = (idUMonth, title, item) => async (dispatch, getState) => {
    let { container } = getState().containerReducer
    if (title !== TABELLA_SPESE_FISSE) {
        let months = container.months.map(el => {
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
        dispatch(updateContainer(calculateTotal({ ...container, months }, idUMonth)))
    } else {
        let costs = container.fixedCost.costs.filter(el => el.idCost !== item.idCost)
        dispatch(updateContainer(calculateTotal({ ...container, fixedCost: { ...container.fixedCost, costs } }, idUMonth)))
    }
}

//  Modifica la riga singolarmente
export const editRow = (idUMonth, body, title) => async (dispatch, getState) => {
    let { container } = getState().containerReducer
    if (title !== TABELLA_SPESE_FISSE) {
        let map = container.months.map(el => {
            if (el.idUMonth === idUMonth) {
                if (title === TABELLA_SPESE) {
                    let a = el.leisure.map(l => {
                        if (l.idLeisure === body.idLeisure) l = { ...l, ...body }
                        return l;
                    })
                    el = { ...el, leisure: a }
                } else if (title === TABELLA_ACCREDITI) {
                    let a = el.fixedMonthlyCredit.map(l => {
                        if (l.idFixedMonthlyCredit === body.idFixedMonthlyCredit) l = { ...l, ...body }
                        return l;
                    })
                    el = { ...el, fixedMonthlyCredit: a }
                }
            }
            return el;
        })
        dispatch(updateContainer(calculateTotal({ ...container, months: map }, idUMonth)))
    } else {
        let a = container.fixedCost.costs.map(c => {
            if (c.idCost === body.idCost) c = { ...c, ...body }
            return c;
        })
        dispatch(updateContainer(calculateTotal({ ...container, fixedCost: { ...container.fixedCost, costs: a } }, idUMonth)))
    }
}

/**
 * Cerca il container per email
 * @param {*} path 
 * @returns 
 */
export const searchContainer = (path) => (dispach) => {
    dispach(startLoading())
    const dataRef = database.ref("/container");
    dataRef.orderByChild("codUser").equalTo(path).once("value")
        .then((snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const user = childSnapshot.val();
                dispach(getContainerByCod(user))
            });
        })
        .catch((error) => {
            dispach(catchError({ isError: true, message: "Errore server : " + error }))
        });
    dispach(stopLoading())
}



// Update per modifiche al mese
export const updateMounths = (body) => async (dispatch, getState) => {
    let { container } = getState().containerReducer
    let a = container.months.map((item) => {
        if (item.idUMonth === body.idUMonth) {
            item = { ...item, ...body }
        }
        return item
    })
    dispatch(updateContainer(({ ...container, months: a })))
}

/**
 * Inserimento nuova card
 * @param {*} payload 
 * @returns 
 */
export const insertCard = (payload) => async (dispach) => {
    const dataRef = database.ref("/container");
    dataRef.push(payload, (error) => {
        if (error)
            dispach(catchError({ isError: true, message: "Errore server : " + error }))
        else
            dispach(updateContainerReducer(payload))
    });
}


/**
 *  Update generico del container che chiama firestore
 * 
 * @param {*} path 
 * @param {*} payload 
 * @returns 
 */
export const updateContainer = (payload) => async (dispach) => {
    const dataRef = database.ref("/container");
    try {
        dataRef.once(("value"), (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                let el = childSnapshot.val();
                if (payload.idContainer === el.idContainer) {
                    let idContainer = el.idContainer;
                    if (idContainer === "") {
                        const newDataRef = dataRef.push();
                        idContainer = newDataRef.key
                        payload = { ...payload, idContainer }
                    }

                    dataRef.child(idContainer).update(payload);
                    dispach(updateContainerReducer(payload))
                }
            })
        });
    } catch (error) {
        dispach(catchError({ isError: true, message: "Errore server : " + error }))

    }
}

/**
 * Cerca in like i mesi (Card) dei contenitore User
 * @param {*} value 
 * @param {*} codUser 
 * @returns 
 */
export const searchInLikeMonths = (value, codUser) => async (dispach) => {

    const dataRef = database.ref("/container");
    const queryEmail = dataRef.orderByChild("codUser")
        .equalTo(codUser).once("value");

    Promise.all([queryEmail])
        .then((snapshot) => {
            snapshot[0].forEach((children) => {
                let container = children.val();
                let filterData =
                    Object.values(container.months).filter((item) => {
                        return item.title.toLowerCase().includes(value.toLowerCase())
                    }
                    );
                dispach(getContainerByCod({ ...container, months: filterData }))
            })
        })
        .catch((error) => {
            dispach(catchError({ isError: true, message: "Errore server : " + error }))
        });
}

/**
 * Calcolatore generico ogni volta che c'è un cambiamento
 * 
 * @param {*} containerInput 
 * @param {*} idUMonth 
 * @returns 
 */
const calculateTotal = (containerInput, idUMonth) => {
    // Toale spese fisse al mese
    let totalFixedCost = container?.fixedCost?.costs ? somTotal(containerInput.fixedCost.costs) : 0;
    let editFixedCost = { ...containerInput.fixedCost, totalFixedCost }
    if (idUMonth) {
        let months = Array.from(containerInput?.months)
        // Cerca il mese 
        let month = containerInput?.months.filter(el => el?.idUMonth === idUMonth)[0];
        // Rimuovo dal months il month vecchio
        months = months.filter(el => el?.idUMonth !== idUMonth)

        // Totale Spese idMese
        let totalLeisure = somTotal(month.leisure)
        // Totale Accrediti mese
        let totalFixedMonthlyCredit = somTotal(month.fixedMonthlyCredit)
        // Calcolo le differenze totale accrediti del mese - i costi totali
        let difference = totalFixedMonthlyCredit - totalLeisure;

        month = { ...month, totalLeisure, cost: totalLeisure, totalFixedMonthlyCredit, difference }
        // Riaggiungo al months il month nuovo
        months.push(month)
        return { ...containerInput, fixedCost: { ...editFixedCost }, months }
    } else {
        let listMounths = containerInput?.months ? Array.from(containerInput.months) : [];
        let editMonths = []
        listMounths.forEach(month => {
            // Totale Spese idMese
            let totalLeisure = somTotal(month.leisure)
            // Totale Accrediti mese
            let totalFixedMonthlyCredit = somTotal(month.fixedMonthlyCredit)
            // Calcolo le differenze totale accrediti del mese - i costi totali
            let difference = totalFixedMonthlyCredit - totalLeisure;
            editMonths.push({ ...month, totalLeisure, cost: totalLeisure, totalFixedMonthlyCredit, difference })
        });
        return { ...containerInput, fixedCost: { ...editFixedCost }, months: editMonths }
    }

}

// Somma i totali
const somTotal = (obj) => {
    return obj ? obj.reduce((a, b) => a + parseFloat(b.price), 0) : 0
}

export default containerReducer.reducer;