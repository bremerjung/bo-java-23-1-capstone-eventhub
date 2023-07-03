import React from 'react';
import {Navigate, Outlet} from "react-router-dom";
import getStoredUser from "./utils/getStoredUser";

function ProtectedRoutesAdminOnly() {

    const storedUser = getStoredUser();
    const authenticated = storedUser?.roles?.includes("admin");

    return (
        authenticated ? <Outlet/> : <Navigate to={"/eventViewSelection"}/>
    );
}

export default ProtectedRoutesAdminOnly;