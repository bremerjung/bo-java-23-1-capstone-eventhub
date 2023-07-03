import React from 'react';
import {EventModel} from "../model/EventModel";
import EventCard from "./EventCard";
import './EventGallery.css';
import EventFilter from "./EventFilter";

type Props = {
    events: EventModel[],
    onAllEventsClickHandler: () => void,
    onMyEventsClickHandler: () => void,
    activeEventFilter: string,
    setActiveEventFilter: (filter: string) => void
}

function EventGallery(props: Props) {
    return (
        <div>
            <EventFilter onAllEventsClickHandler={props.onAllEventsClickHandler}
                         onMyEventsClickHandler={props.onMyEventsClickHandler}
                         activeEventFilter={props.activeEventFilter} setActiveEventFilter={props.setActiveEventFilter}/>
            <div className="event-gallery">
                {props.events.map((currentEvent: EventModel) => {
                    return <EventCard key={currentEvent.id} event={currentEvent}></EventCard>
                })
                }
            </div>
        </div>
    );
}

export default EventGallery;