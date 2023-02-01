import React from 'react'
import {Children, createContext} from 'react';

export const authInitialState = {
  isLogginIn: false,
  username: undefined,
  token: undefined,
};

const AuthContext = createContext({});

export const AuthProvider = () => {

    const [authState, dispatch] = useReducer(authReducer, authInitialState);


    const signIn = () => {
        dispatch({ type: 'signIn' });
    }

    // const changeFavoriteIcon = (iconName: string) => {
    //     dispatch({ type: 'changeFavIcon', payload: iconName })
    // }

    const logout = () => {
        dispatch({ type: 'logout' });
    }

    // const changeUsername = (username: string) => {
    //     dispatch({ type: 'changeUsername', payload: username })
    // }


    return (
        <AuthContext.Provider value={{
            authState,
            signIn,
            logout,
            // changeFavoriteIcon,
            // changeUsername
        }}>
            {children}
        </AuthContext.Provider>
    )
}
