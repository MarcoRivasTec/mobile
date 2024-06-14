import React, {createContext, useState} from "react";

export const AppContext = createContext();

export const AppProvider = ({children}) => {
    const [numEmp, setNumEmp] = useState("");

    return(
        <AppContext.Provider value={{numEmp, setNumEmp}}>
            {children}
        </AppContext.Provider>
    )
}