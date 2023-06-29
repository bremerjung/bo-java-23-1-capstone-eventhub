import React from 'react';
import {Navigate, Outlet} from "react-router-dom";
import getStoredUser from "./utils/getStoredUser";

function ProtectedRoutesUser() {

    const storedUser = getStoredUser();
    const authenticated = storedUser !== undefined && storedUser.username !== "anyonymousUser"

    return (
        authenticated ? <Outlet/> : <Navigate to={"/"}/>
    );
}

export default ProtectedRoutesUser;