import React from 'react';
import {Navigate, Outlet} from "react-router-dom";
import getStoredUser from "./utils/getStoredUser";

function ProtectedRoutesAdminAndEditor() {

    const storedUser = getStoredUser();
    const authenticated = storedUser !== undefined && (storedUser.roles.includes("admin") || storedUser.roles.includes("editor"));

    return (
        authenticated ? <Outlet/> : <Navigate to={"/eventViewSelection"}/>
    );
}

export default ProtectedRoutesAdminAndEditor;