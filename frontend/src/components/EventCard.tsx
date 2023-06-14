import React from 'react';
import {EventModel} from "../model/EventModel";
import './EventCard.css';
import moment from "moment";

type Props={
    event:EventModel
}
function EventCard(props:Props) {
    return (
        <div className="event-card">
            <img src={props.event.imageUrl}  alt={props.event.title}/>
            <h4>{props.event.title}</h4>
            <h5>{moment(props.event.start).format('DD.MM.YYYY HH:mm:ss [Uhr]')}</h5>
            <h5><a href={props.event.source}>{props.event.location}</a></h5>
        </div>
    );
}

export default EventCard;