import React, {useEffect} from 'react';
import {EventModel} from "../model/EventModel";
import {User} from "../model/User";
import './EventManagement.css';
import {useNavigate} from "react-router-dom";

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

    const onApproveHandler = (event: EventModel) => {
        const approvedEvent: EventModel = {
            ...event,
            status: 'APPROVED'
        };
        props.updateEvent(event.id, approvedEvent);
    };

    function onDetailsHandler(event: EventModel) {
        navigate("/events/" + event.id)
    }

    return (
        <div>
            <h1>New events</h1>
            <h2>Logged in user: {props.user?.username}</h2>
            <h4>(only editors and administrators can see this)</h4>
            <ul>
                {props.events.map((currentEvent: EventModel) => (
                    <li className="list-item" key={currentEvent.id}>
                        {currentEvent.title}
                        <div className="buttons">
                            <button className="button" onClick={() => onDetailsHandler(currentEvent)}>Details</button>
                            <button className="button" onClick={() => onApproveHandler(currentEvent)}>Approve</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ApproveEvent;