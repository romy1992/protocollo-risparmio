import database from "../../config/firebase";
import { catchError, isAuthUser } from "../reducers/loginReducer";

/**
 *  Se abbiamo solo pochi metoidi,usiamo una funzione direttamente nel reducer 
    Altrimenti in un file separato come questo
*/

export const loginFetch = (body) => async (dispath, getState) => {
    // console.log(getState())
    dispath(catchError(
        {
            message: "",
            isError: false
        }
    ))
    // LOGIN
    const dataRef = database.ref("/userContainer");
    // Esegui una query per ottenere gli utenti con il campo "codUser" specifico
    const query1 = dataRef.orderByChild("email")
        .equalTo(body?.email).once("value");

    // Esegui una query per ottenere gli utenti con il campo "password" specifico
    const query2 = dataRef.orderByChild("password")
        .equalTo(body?.password).once("value");

    Promise.all([query1, query2])
        .then((snapshots) => {
            const risultati1 = [];
            const risultati2 = [];

            snapshots[0].forEach((childSnapshot) => {
                const utente = childSnapshot.val();
                risultati1.push(utente);
            });

            snapshots[1].forEach((childSnapshot) => {
                const utente = childSnapshot.val();
                risultati2.push(utente);
            });

            // Unisci i risultati (utenti che soddisfano entrambi i criteri)
            const risultatiFinali = risultati1.filter(
                (utente1) =>
                    risultati2.some((utente2) =>
                        utente1.idUserContainer === utente2.idUserContainer)
            );

            if (risultatiFinali[0].email === body.email
                && risultatiFinali[0].password === body.password)
                dispath(isAuthUser(true))
            else {
                dispath(isAuthUser(false))
                dispath(catchError({ message: "Utente o password errate...", isError: true }))
            }
        })
        .catch((error) => {
            dispath(isAuthUser(false))
            dispath(catchError({ message: "Errore Server : " + error, isError: true }))
        });
}
