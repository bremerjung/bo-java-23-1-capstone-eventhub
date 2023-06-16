import React from 'react';
import {EventModel} from "../model/EventModel";

type Props = {
    events:EventModel[]
}

function AddEvent(props:Props) {
    return (
        <div>
            <h1>ADD EVENTS VIEW</h1>
            <h2>only organizers and administrators can see this</h2>
            {props.events.map((currentEvent:EventModel) => {return <li key={currentEvent.id}>{currentEvent.title}</li>})}
        </div>
    );
}

export default AddEvent;