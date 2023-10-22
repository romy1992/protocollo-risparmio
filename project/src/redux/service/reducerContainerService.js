import instance from "../../utility/api"
import { catchError, getContainerByCod, startLoading, stopLoading, updateContainerReducer } from "../reducers/containerReducer"

/**
 * Cerca il container per email
 * @param {*} path 
 * @returns 
 */
export const searchContainer = (path) => async (dispach) => {
    dispach(startLoading())
    await instance.get(path)
        .then((response) => {
            dispach(getContainerByCod(response.data))
        })
        .catch(error => {
            dispach(catchError({ isError: true, message: "Errore server!" }))
        })
    dispach(stopLoading())
}

/**
 *  Update generico del container
 *  Altre funzionalità : 
 *   1 - Elimina la card del mese
 *   2 - Modifica i dati del mese
 * @param {*} path 
 * @param {*} payload 
 * @returns 
 */
export const updateContainer = (path, payload) => async (dispach) => {
    await instance.put(path, payload)
        .then((response) => {
            dispach(updateContainerReducer(response.data))
        })
        .catch(error => {
            dispach(catchError({ isError: true, message: "Errore Server modifica!" }))
        })
}

/**
 * Cerca in like i mesi (Card) dei contenitore User
 * @param {*} path 
 * @param {*} value 
 * @param {*} codUser 
 * @returns 
 */
export const searchInLikeMonths = (path, value, codUser) => async (dispach) => {
    await instance.get(path, { params: { codUser, value } })
        .then((response) => {
            dispach(updateContainerReducer(response.data))
        })
        .catch(error => {
            dispach(catchError({ isError: true, message: "Errore Server modifica!" }))
        })
}