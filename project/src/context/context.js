import { createContext, useContext, useState } from "react";


const AppContext = createContext();

const AppProvider = ({ children }) => {

    const [showSearch, setShowSearch] = useState(true);


    return (
        <AppContext.Provider
            value={
                {
                    showSearch, setShowSearch
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

