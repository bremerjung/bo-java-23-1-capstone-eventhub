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
    getEventsByCategory: (categories: string[]) => void,
    activeEventFilter: string,
    setActiveEventFilter: (filter: string) => void
}

function EventGallery(props: Props) {
    useEffect(() => {
        props.getEventsByStatus("APPROVED");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function onAllEventsClickHandler() {
        props.getEventsByStatus("APPROVED");
        props.setActiveEventFilter("all");
    }

    function onMyEventsClickHandler() {
        if (props.user?.preferredCategories) {
            props.getEventsByCategory(props.user.preferredCategories);
            props.setActiveEventFilter("my");
        }
    }

    return (
        <div>
            <Container>
                {props.activeEventFilter === "all" ? (
                    <Button className="button m-1 active" onClick={onAllEventsClickHandler}>All events</Button>
                ) : (
                    <Button className="button m-1" onClick={onAllEventsClickHandler}>All events</Button>
                )}
                {props.activeEventFilter === "my" ? (
                    <Button className="button m-1 active" onClick={onMyEventsClickHandler}>My events</Button>
                ) : (
                    <Button className="button m-1" onClick={onMyEventsClickHandler}>My events</Button>
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