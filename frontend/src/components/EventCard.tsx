import React from 'react';
import {Card, ListGroup} from "react-bootstrap";
import {EventModel} from "../model/EventModel";
import DateComponent from "./DateComponent";
import CategoryIcon from "./CategoryIcon";
import "./EventCard.css"
import {Link} from "react-router-dom";

type Props = {
    event: EventModel,
    distance?: number
}

function EventCard(props: Props) {

    function renderEventImage(event: EventModel) {
        if (event.image) {
            return `data:image/jpeg;base64,${event.image}`;
        } else {
            return event.imageUrl;
        }
    }

    return (
        <Card style={{width: '18rem'}} bg="light">
            <Card.Header className="d-flex align-items-center justify-content-center text-center">
                <CategoryIcon category={props.event.category}/>&nbsp;<DateComponent date={props.event.start}/>
            </Card.Header>
            <Card.Img variant="top" src={renderEventImage(props.event)} className="card-img-top"/>
            <Card.Body>
                <Card.Title><Link to={`/events/${props.event.id}`}>{props.event.title}</Link></Card.Title>
                <Card.Subtitle className="text-truncate">{props.event.location}</Card.Subtitle>
                <Card.Text className="text-truncate">
                    {props.event.description}
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                {props.distance && (
                    <ListGroup.Item>
                        Distance: {props.distance} km
                    </ListGroup.Item>
                )}
            </ListGroup>
            <Card.Body>
                <Card.Link href={props.event.source} target="_blank">Source Link</Card.Link>
            </Card.Body>
            <Card.Footer className="text-muted">{props.event.creator}</Card.Footer>
        </Card>
    );
}

export default EventCard;