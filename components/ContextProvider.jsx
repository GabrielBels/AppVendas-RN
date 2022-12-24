import React, { createContext } from 'react';

export const Context = createContext({});

export const ContextProvider = (props) => {
    const urlApi = "http://191.101.235.83:8001/";

    return (
        <Context.Provider value={{ urlApi }}>
            {props.children}
        </Context.Provider>
    )
}