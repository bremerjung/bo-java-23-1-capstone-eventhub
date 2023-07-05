import React from 'react';
import {Popup} from "react-leaflet";
import {EventModel} from "../model/EventModel";

type Props = {
    event: EventModel
}

function EventMapDetailsPopup(props: Props) {
    return (
        <div>
            <Popup>
                <h5>{new Date(props.event.start).toLocaleDateString(undefined, {
                    month: 'numeric',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric'
                })}</h5>
                <h3 className="title">{props.event.title}</h3>
                <h6 className="location">{props.event.location}</h6>
            </Popup>
        </div>
    );
}

export default EventMapDetailsPopup;