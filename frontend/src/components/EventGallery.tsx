import React from 'react';
import {EventModel} from "../model/EventModel";
import EventCard from "./EventCard";
import './EventGallery.css';
import {User} from "../model/User";
import {Button, Container} from "react-bootstrap";

type Props = {
    user: User | undefined,
    events: EventModel[],
    onAllEventsClickHandler: () => void,
    onMyEventsClickHandler: () => void,
    activeEventFilter: string,
    setActiveEventFilter: (filter: string) => void
}

function EventGallery(props: Props) {
    return (
        <div>
            <Container>
                {props.activeEventFilter === "all" ? (
                    <Button className="button m-1 active" onClick={props.onAllEventsClickHandler}>All events</Button>
                ) : (
                    <Button className="button m-1" onClick={props.onAllEventsClickHandler}>All events</Button>
                )}
                {props.activeEventFilter === "my" ? (
                    <Button className="button m-1 active" onClick={props.onMyEventsClickHandler}>My events</Button>
                ) : (
                    <Button className="button m-1" onClick={props.onMyEventsClickHandler}>My events</Button>
                )}
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