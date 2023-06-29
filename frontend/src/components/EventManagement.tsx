import React, {useEffect} from 'react';
import {EventModel} from "../model/EventModel";
import {User} from "../model/User";
import './EventManagement.css';
import {Button, Container, ListGroup} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faTrash} from "@fortawesome/free-solid-svg-icons";

type Props = {
    user: User | undefined,
    events: EventModel[],
    getEventsByCreator: (creator: string) => void,
    saveEvent: (event: EventModel) => void,
    updateEvent: (id: string, event: EventModel) => void,
    deleteEvent: (event: EventModel, callback?: () => void) => void
}

function EventManagement(props: Props) {

    const navigate = useNavigate();

    useEffect(() => {
        if (props.user) {
            props.getEventsByCreator(props.user.username);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.user?.username]);

    function onNewEventHandler() {
        navigate("/newEvent")
    }

    function onEditHandler(event: EventModel) {
        navigate("/editEvent/" + event.id)
    }

    function onDeleteHandler(event: EventModel) {
        props.deleteEvent(event, () => {
            if (props.user) {
                props.getEventsByCreator(props.user.username);
            }
        });
    }

    return (
        <Container>
            <h6>Logged in user: {props.user?.username}</h6>
            <h1>My events</h1>
            <Container className="d-flex pb-4 justify-content-center mt-4">
                <Button className="button" onClick={onNewEventHandler}>Create new event</Button>
            </Container>
            <ListGroup style={{width: '100%'}}>
                {props.events.map((currentEvent) => (
                    <ListGroup.Item key={currentEvent.id} className="d-flex justify-content-between align-items-center">
                        <div style={{
                            flex: 1,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        }}>{currentEvent.title}</div>
                        <div className="buttons">
                            <Button size="sm" className="button" onClick={() => onEditHandler(currentEvent)}>
                                <FontAwesomeIcon icon={faPen}/>
                            </Button>
                            <Button size="sm" className="button mx-2" onClick={() => onDeleteHandler(currentEvent)}>
                                <FontAwesomeIcon icon={faTrash}/>
                            </Button>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
}

export default EventManagement;