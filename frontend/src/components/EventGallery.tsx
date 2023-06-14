import React from 'react';
import {EventModel} from "../model/EventModel";
import EventCard from "./EventCard";
import './EventGallery.css';

type Props ={
    events:EventModel[]
}

function EventGallery(props:Props) {

    return (
        <div className="event-gallery">
            {props.events.map((currentEvent:EventModel)=>{
                return <EventCard key={currentEvent.id} event={currentEvent}></EventCard>
            })
            }
        </div>
    );
}

export default EventGallery;