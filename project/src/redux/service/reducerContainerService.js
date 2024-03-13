import database from "../../config/firebase";
import { catchError, getContainerByCod, setActualMonth, startLoading, stopLoading, updateContainerReducer } from "../reducers/containerReducer";

/**
 * Cerca il container per email
 * @param {*} path 
 * @returns 
 */
export const searchContainer = (path, name) => async (dispach) => {
    dispach(startLoading())
    const dataRef = database.ref("/container");
    dataRef.orderByChild("codUser").equalTo(path).once("value")
        .then((snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const user = childSnapshot.val();
                dispach(getContainerByCod(user))
                if (name)
                    dispach(setActualMonth(name))
            });
        })
        .catch((error) => {
            dispach(catchError({ isError: true, message: "Errore server : " + error }))
        });
    dispach(stopLoading())
}

/**
 *  Update generico del container
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