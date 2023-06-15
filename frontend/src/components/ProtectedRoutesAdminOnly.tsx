import React from 'react';
import {Navigate, Outlet} from "react-router-dom";
import {User} from "../model/User";

type Props = {
    user: User | undefined
}

function ProtectedRoutesAdminOnly(props: Props) {

    const authenticated = props.user !== undefined && props.user.roles.includes("admin");


    return (
        authenticated ? <Outlet/> : <Navigate to={"/"}/>
    );
}

export default ProtectedRoutesAdminOnly;