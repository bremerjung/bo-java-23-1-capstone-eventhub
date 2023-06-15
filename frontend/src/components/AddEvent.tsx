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
        </div>
    );
}

export default AddEvent;