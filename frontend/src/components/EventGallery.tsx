import React, {useEffect} from 'react';
import {EventModel} from "../model/EventModel";
import EventCard from "./EventCard";
import './EventGallery.css';
import {User} from "../model/User";

type Props = {
    user: User | undefined,
    events: EventModel[],
    getEventsByStatus: (status: string) => void,
    getEventsByCategory: (categories: string[]) => void
}

function EventGallery(props: Props) {

    useEffect(() => {
        props.getEventsByStatus("APPROVED");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function onAllEventsClickHandler() {
        props.getEventsByStatus("APPROVED");
    }

    function onMyEventsClickHandler() {
        if (props.user?.preferredCategories) {
            props.getEventsByCategory(props.user.preferredCategories);
        }
    }

    return (
        <div>
            <div>
                <button onClick={onAllEventsClickHandler}>All events</button>
                <button onClick={onMyEventsClickHandler}>My events</button>
            </div>
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