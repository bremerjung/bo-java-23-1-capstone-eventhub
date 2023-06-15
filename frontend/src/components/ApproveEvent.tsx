import React from 'react';
import {EventModel} from "../model/EventModel";

type Props = {
    events:EventModel[]
}

function ApproveEvent(props:Props) {
    return (
        <div>
            <h1>APPROVE EVENTS VIEW</h1>
            <h2>only editors and administrators can see this</h2>
        </div>
    );
}

export default ApproveEvent;