import React from 'react';
import {EventModel} from "../model/EventModel";

type Props = {
    events:EventModel[]
}

function Administration(props:Props) {
    return (
        <div>
            <h1>ADMIN VIEW</h1>
            <h2>only administrators can see this</h2>
        </div>
    );
}

export default Administration;