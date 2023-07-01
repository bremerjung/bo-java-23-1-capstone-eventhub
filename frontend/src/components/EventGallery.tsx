import React, {useEffect} from 'react';
import {EventModel} from "../model/EventModel";
import EventCard from "./EventCard";
import './EventGallery.css';
import {User} from "../model/User";
import {Button, Container} from "react-bootstrap";

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
            <Container>
                <Button className="button m-1" onClick={onAllEventsClickHandler}>All events</Button>
                <Button className="button m-1" onClick={onMyEventsClickHandler}>My events</Button>
            </Container>
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