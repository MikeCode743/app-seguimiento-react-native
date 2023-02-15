import { createContext, useEffect, useRef, useState } from "react";
import { AppState, PermissionsAndroid } from "react-native";

export const permissionsInitState = {
    locationStatus: 'unavailable'
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
                setPermissions({
                    ...permissions,
                    locationStatus: 'granted'
                })
            } else if (PermissionsAndroid.RESULTS.DENIED === granted) {
                setPermissions({
                    ...permissions,
                    locationStatus: 'denied'
                })
            } else {
                setPermissions({
                    ...permissions,
                    locationStatus: 'never_ask_again'
                })
                
            }
        } catch (err) {
            console.warn(err)
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