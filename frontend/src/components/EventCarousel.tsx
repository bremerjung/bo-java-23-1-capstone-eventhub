import React, {useEffect} from 'react';
import {Button, Carousel, Container} from "react-bootstrap";
import {User} from "../model/User";
import {EventModel} from "../model/EventModel";
import "./EventCarousel.css";

type Props = {
    user: User | undefined,
    events: EventModel[],
    getEventsByStatus: (status: string) => void,
    getEventsByCategory: (categories: string[]) => void,
    activeEventFilter: string,
    setActiveEventFilter: (filter: string) => void
}

function EventCarousel(props: Props) {
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

    function renderEventImage(event: EventModel) {
        if (event.image) {
            return <img className="d-block w-100" src={`data:image/jpeg;base64,${event.image}`} alt={event.title}/>;
        } else {
            return <img className="d-block w-100" src={event.imageUrl} alt={event.title}/>;
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
            <Carousel>
                {props.events.map((currentEvent) => (
                    <Carousel.Item key={currentEvent.id}>
                        {renderEventImage(currentEvent)}
                        <Carousel.Caption className="carousel-caption">
                            <h5>{new Date(currentEvent.start).toLocaleDateString(undefined, {
                                month: 'numeric',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric'
                            })}</h5>
                            <h3 className="title">{currentEvent.title}</h3>
                            <p className="location">{currentEvent.location}</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
}

export default EventCarousel;