import React from 'react';
import {Carousel} from "react-bootstrap";
import {User} from "../model/User";
import {EventModel} from "../model/EventModel";

type Props = {
    user: User | undefined,
    events: EventModel[],
    getEventsByStatus: (status: string) => void,
    getEventsByCategory: (categories: string[]) => void
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
        <Carousel>
            {props.events.map((currentEvent) => (
                <Carousel.Item key={currentEvent.id}>
                    {renderEventImage(currentEvent)}
                    <Carousel.Caption>
                        <h3>{currentEvent.title}</h3>
                        <p>{currentEvent.description}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default EventCarousel;