import React from 'react';
import {Button, Carousel, Container} from "react-bootstrap";
import {User} from "../model/User";
import {EventModel} from "../model/EventModel";
import "./EventCarousel.css";

type Props = {
    user: User | undefined,
    events: EventModel[],
    onAllEventsClickHandler: () => void,
    onMyEventsClickHandler: () => void,
    activeEventFilter: string,
    setActiveEventFilter: (filter: string) => void
}

function EventCarousel(props: Props) {
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