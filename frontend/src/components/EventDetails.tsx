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
        navigate(-1)
    }

    return (
        <div className="event-details">
            <Container>
                <Row>
                    <Col>
                        <h3>Details of:</h3>
                        <h1>{foundEvent?.title}</h1>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Button className="button" onClick={onCancelHandler}>Back</Button>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Event Information</Card.Title>
                                <Card.Text>
                                    <div>Id: {foundEvent?.id}</div>
                                    <div>Category: {foundEvent?.category}</div>
                                    <div>Description: {foundEvent?.description}</div>
                                    <div>Start: {foundEvent?.start?.toString()}</div>
                                    <div>Start Date: {foundEvent?.start}</div>
                                    <div>End: {foundEvent?.end?.toString()}</div>
                                    <div>Location: {foundEvent?.location}</div>
                                    <div>Location latitude: {foundEvent?.locationLatitude}</div>
                                    <div>Location longitude: {foundEvent?.locationLongitude}</div>
                                    <div>Creator: {foundEvent?.creator}</div>
                                    <div>Status: {foundEvent?.status}</div>
                                    <div>Source: {foundEvent?.source}</div>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={6}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Event Image</Card.Title>
                                {foundEvent?.image ?
                                    <Card.Img variant="top" src={`data:image/jpeg;base64,${foundEvent?.image}`}
                                              alt={foundEvent?.title}/> :
                                    <Card.Img variant="top" src={foundEvent?.imageUrl} alt={foundEvent?.title}/>}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default EventDetails;