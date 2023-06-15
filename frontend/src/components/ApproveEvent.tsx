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
            {props.events.map((currentEvent:EventModel) => {return <li>{currentEvent.title}</li>})}
        </div>
    );
}

export default ApproveEvent;