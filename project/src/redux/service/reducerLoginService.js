import instance from "../../utility/api";
import { isAuthUser, catchError } from "../reducers/loginReducer";

/**
 *  Se abbiamo solo pochi metoidi,usiamo una funzione direttamente nel reducer 
    Altrimenti in un file separato come questo
*/

// LOGIN
export const loginFetch = (path, body) => async (dispath) => {
    dispath(catchError(
        {
            message: "",
            isError: false
        }
    ))
    try {
        const response = await instance.post(path, body);
        const { data } = response;
        dispath(isAuthUser(data))

        if (!data)
            dispath(catchError(
                {
                    message: "Utente o password errate...",
                    isError: true
                }
            ))


    } catch (error) {
        dispath(catchError(
            {
                message: "Errore Server...",
                isError: true
            }
        ))
    }
}
