import React, { createContext } from 'react';

export const Context = createContext({});

export const ContextProvider = (props) => {
    const urlApi = "http://191.101.235.83:8001/";
    const empresaNome = "Esmalteria da Mi";

    return (
        <Context.Provider value={{ urlApi, empresaNome }}>
            {props.children}
        </Context.Provider>
    )
}