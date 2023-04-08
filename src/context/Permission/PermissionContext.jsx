import React, { createContext, useEffect, useRef, useState } from "react";
import { AppState, PermissionsAndroid } from "react-native";

export const permissionsInitState = {
    locationStatus: 'unavailable',
    locationBackground: 'unavailable',
    intentos: 0,
}

export const PermissionContext = createContext({});

export const PermissionsProvider = ({ children }) => {

    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);
    const [permissions, setPermissions] = useState(permissionsInitState)

    const askLocationPermissions = async () => {
        // permissionsStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        // if (permissionsStatus === 'blocked') openSettings();

        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            )
            // const granted = await PermissionsAndroid.requestMultiple([
            //     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            //     PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
            //     PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
            // ])
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                // const grantedBackground = await PermissionsAndroid.request(
                //     PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
                //     )
                //     if (grantedBackground === PermissionsAndroid.RESULTS.GRANTED) {
                //         setPermissions({
                //             ...permissions,
                //             locationStatus: 'granted',
                //             locationBackground: 'granted',
                //             intentos: 0,
                //         })
                //     }
                    setPermissions({
                        ...permissions,
                        locationStatus: 'granted',
                        intentos: 0,
        
                    })

            } else if (PermissionsAndroid.RESULTS.DENIED === granted) {
                setPermissions({
                    ...permissions,
                    locationStatus: 'denied',
                    intentos: permissions.intentos + 1,

                })
            } else if (PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN === granted) {
                if (permissions.intentos < 1){
                    setPermissions({
                        ...permissions,
                        locationStatus: 'denied',
                        intentos: permissions.intentos + 1, 
                    })
                }else {
                    setPermissions({
                        ...permissions,
                        locationStatus: 'never_ask_again',
                        intentos: 0,
                    })
                }
                
            }
        } catch (err) {
        }


    }

    const checkLocationPermission = async () => {
        const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

        if (granted) {
            setPermissions({
                ...permissions,
                locationStatus: 'granted'
            });
        }
        else {
            setPermissions({
                ...permissions, 
                locationStatus: 'denied'
            });
        }

        // setPermissions({
        //     ...permissions,
        //     locationStatus: granted
        // });
    }

    useEffect(() => {
        const subscription = AppState.addEventListener("change", state => {
            appState.current = state;
            setAppStateVisible(appState.current);
            if (appStateVisible === 'active') return;
            checkLocationPermission();
        });

        return () => {
            subscription.remove();
        };
    }, []);

    

    return (
        <PermissionContext.Provider value={{
            permissions,
            askLocationPermissions,
            checkLocationPermission
        }}>
            {children}
        </PermissionContext.Provider>
    )
}