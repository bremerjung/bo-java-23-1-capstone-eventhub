import React from 'react';
import {EventModel} from "../model/EventModel";
import {useNavigate, useParams} from "react-router-dom";
import {Button, Card, Col, Container, Row} from "react-bootstrap";

type Props = {
    events: EventModel[]
}

function EventDetails(props: Props) {

    const params = useParams();
    const eventId: string | undefined = params.id;
    const foundEvent: EventModel | undefined = props.events.find((currentEvent: EventModel) => currentEvent.id === eventId);

    const navigate = useNavigate();

    function onCancelHandler() {
        navigate("/approve")
    }

    return (
        <div className="event-details">
            <Container>
                <Row>
                    <Col>
                        <h1>Details von: {foundEvent?.title}</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button variant="danger" onClick={onCancelHandler}>Back</Button>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Event Information</Card.Title>
                                <Card.Text>
                                    <p>Id: {foundEvent?.id}</p>
                                    <p>Category: {foundEvent?.category}</p>
                                    <p>Description: {foundEvent?.description}</p>
                                    <p>Start: {foundEvent?.start.toString()}</p>
                                    <p>Start Date: {foundEvent?.startDate}</p>
                                    <p>Start Time: {foundEvent?.startTime}</p>
                                    <p>End: {foundEvent?.end.toString()}</p>
                                    <p>Location: {foundEvent?.location}</p>
                                    <p>Creator: {foundEvent?.creator}</p>
                                    <p>Status: {foundEvent?.status}</p>
                                    <p>Source: {foundEvent?.source}</p>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={6}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Event Image</Card.Title>
                                <Card.Img variant="top" src={foundEvent?.imageUrl} alt={foundEvent?.title}/>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default EventDetails;