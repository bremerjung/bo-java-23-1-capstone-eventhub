import React from 'react';
import {Navigate, Outlet} from "react-router-dom";
import {User} from "../model/User";

type Props = {
    user: User | undefined
}

function ProtectedRoutesAdminAndEditor(props: Props) {

    const authenticated = props.user !== undefined && (props.user.roles.includes("admin") || props.user.roles.includes("editor"));


    return (
        authenticated ? <Outlet/> : <Navigate to={"/gallery"}/>
    );
}

export default ProtectedRoutesAdminAndEditor;