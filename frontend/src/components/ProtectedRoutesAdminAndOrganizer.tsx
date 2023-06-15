import React from 'react';
import {Navigate, Outlet} from "react-router-dom";
import {User} from "../model/User";

type Props = {
    user: User | undefined
}

function ProtectedRoutesAdminAndOrganizer(props: Props) {

    const authenticated = props.user !== undefined && (props.user.roles.includes("admin") || props.user.roles.includes("organizer"));

    return (
        authenticated ? <Outlet/> : <Navigate to={"/gallery"}/>
    );
}

export default ProtectedRoutesAdminAndOrganizer;