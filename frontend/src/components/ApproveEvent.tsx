import React, {useEffect} from 'react';
import {EventModel} from "../model/EventModel";
import {User} from "../model/User";
import './EventManagement.css';
import {useNavigate} from "react-router-dom";
import {Button, Container, ListGroup} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faInfoCircle, faTimes} from "@fortawesome/free-solid-svg-icons";

type Props = {
    user: User | undefined,
    events: EventModel[],
    getEventsByStatus: () => void,
    saveEvent: (event: EventModel) => void
    updateEvent: (id: string, event: EventModel) => void
}

function ApproveEvent(props: Props) {
    const navigate = useNavigate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(props.getEventsByStatus, []);

    const onApproveHandler = (event: EventModel, status: string) => {
        const approvedEvent: EventModel = {
            ...event,
            status: status
        };
        props.updateEvent(event.id, approvedEvent);
    };

    function onDetailsHandler(event: EventModel) {
        navigate("/events/" + event.id)
    }

    return (
        <Container>
            <h6>Logged in user: {props.user?.username}</h6>
            <h1>New events</h1>
            {props.events.length === 0 ? (
                <p>Currently no events are available for approval.</p>
            ) : (
                <ListGroup style={{width: '100%'}}>
                    {props.events.map((currentEvent) => (
                        <ListGroup.Item key={currentEvent.id}
                                        className="d-flex justify-content-between align-items-center">
                            <div style={{
                                flex: 1,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                            }}>{currentEvent.title}</div>
                            <div className="buttons">
                                <Button size="sm" className="button" onClick={() => onDetailsHandler(currentEvent)}>
                                    <FontAwesomeIcon icon={faInfoCircle}/>
                                </Button>
                                <Button size="sm" className="button mx-2"
                                        onClick={() => onApproveHandler(currentEvent, "APPROVED")}>
                                    <FontAwesomeIcon icon={faCheck}/>
                                </Button>
                                <Button size="sm" className="button mx-2"
                                        onClick={() => onApproveHandler(currentEvent, "DECLINED")}>
                                    <FontAwesomeIcon icon={faTimes}/>
                                </Button>
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>)}
        </Container>
    );
}

export default ApproveEvent;