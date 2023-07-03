import React from 'react';
import {Button, Container} from "react-bootstrap";

type Props = {
    onAllEventsClickHandler: () => void,
    onMyEventsClickHandler: () => void,
    activeEventFilter: string,
    setActiveEventFilter: (filter: string) => void
}

function EventFilter(props: Props) {
    return (
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
    );
}

export default EventFilter;