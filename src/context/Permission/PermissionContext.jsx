import { createContext, useEffect, useRef, useState } from "react";
import { AppState } from "react-native";
import { check, openSettings, PERMISSIONS, request } from "react-native-permissions";

export const permissionsInitState = {
    locationStatus: 'unavailable'
}

export const PermissionContext = createContext({});

export const PermissionsProvider = ({ children }) => {

    const [permissions, setPermissions] = useState(permissionsInitState)

    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);

    const askLocationPermissions = async () => {
        let permissionsStatus = null;
        permissionsStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        // if (permissionsStatus === 'blocked') openSettings();
        setPermissions({
            ...permissions,
            locationStatus: permissionsStatus
        })
    }

    const checkLocationPermission = async () => {
        let permissionStatus;
        permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

        setPermissions({
            ...permissions,
            locationStatus: permissionStatus
        });
    }

    useEffect(() => {
        const subscription = AppState.addEventListener("change", state => {
            appState.current = state;
            setAppStateVisible(appState.current);
            console.log(appState.current);
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