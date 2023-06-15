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
            {props.events.map((currentEvent:EventModel) => {return <li>{currentEvent.title}</li>})}
        </div>
    );
}

export default Administration;