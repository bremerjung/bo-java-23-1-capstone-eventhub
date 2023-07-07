import React from 'react';
import {EventModel} from "../model/EventModel";
import {useNavigate, useParams} from "react-router-dom";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import DateComponent from "./DateComponent";

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
                <Row className="mb-3">
                    <Col>
                        <Button className="button" onClick={onCancelHandler}>Back</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h1>{foundEvent?.title}</h1>
                        <DateComponent date={foundEvent?.start ?? ""}/>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6} className="mt-3 mb-3">
                        <Card>
                            <Card.Body>
                                {foundEvent?.image ?
                                    <Card.Img variant="top" src={`data:image/jpeg;base64,${foundEvent?.image}`}
                                              alt={foundEvent?.title}/> :
                                    <Card.Img variant="top" src={foundEvent?.imageUrl} alt={foundEvent?.title}/>}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={6}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Event Details</Card.Title>
                                <Card.Text style={{textAlign: 'left'}}>
                                    <div className="mb-2">
                                        <strong>Category:</strong> {foundEvent?.category}
                                    </div>
                                    <div className="mb-2">
                                        <strong>Description:</strong> {foundEvent?.description}
                                    </div>
                                    <div className="mb-2">
                                        <strong>Location:</strong> {foundEvent?.location}
                                    </div>
                                    <div className="mb-2">
                                        <strong>Location latitude:</strong> {foundEvent?.locationLatitude}
                                    </div>
                                    <div className="mb-2">
                                        <strong>Location longitude:</strong> {foundEvent?.locationLongitude}
                                    </div>
                                    <div className="mb-2">
                                        <strong>Creator:</strong> {foundEvent?.creator}
                                    </div>
                                    <div className="mb-2">
                                        <strong>Status:</strong> {foundEvent?.status}
                                    </div>
                                    <div className="mb-2">
                                        <strong>Source:</strong>{' '}
                                        <a
                                            href={foundEvent?.source}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                display: 'block',
                                                overflow: 'hidden',
                                                whiteSpace: 'nowrap',
                                                textOverflow: 'ellipsis',
                                            }}
                                        >
                                            {foundEvent?.source}
                                        </a>
                                    </div>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default EventDetails;