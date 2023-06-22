import React, {useEffect, useState} from 'react';
import {EventModel} from "../model/EventModel";
import {User} from "../model/User";
import './AddEvent.css';
import EventForm from "./EventForm";

type Props = {
    user: User | undefined,
    events: EventModel[],
    getEventsByCreator: (creator: string) => void,
    saveEvent: (event: EventModel) => void,
    updateEvent: (id: string, event: EventModel) => void,
    deleteEvent: (event: EventModel, callback?: () => void) => void
}

function AddEvent(props: Props) {

    const [isFormVisible, setIsFormVisible] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<EventModel | undefined>(undefined);

    useEffect(() => {
        if (props.user) {
            props.getEventsByCreator(props.user.username);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.user?.username]);

    function onDeleteHandler(event: EventModel) {
        props.deleteEvent(event, () => {
            if (props.user) {
                props.getEventsByCreator(props.user.username);
            }
        });
    }

    function onEditHandler(event: EventModel) {
        setSelectedEvent(event);
        setIsFormVisible(true);
    }

    function onSaveHandler(event: EventModel) {
        if (selectedEvent) {
            props.updateEvent(selectedEvent.id, event);
        } else {
            props.saveEvent(event);
        }
        setIsFormVisible(false);
    }

    function onCloseHandler() {
        setSelectedEvent(undefined);
        setIsFormVisible(false);
    }

    return (
        <div>
            <h1>My events</h1>
            <h2>Logged in user: {props.user?.username}</h2>
            <h4>(only organizers and administrators can see this)</h4>
            {selectedEvent && (
                <EventForm
                    user={props.user}
                    event={selectedEvent}
                    isFormVisible={isFormVisible}
                    onSave={onSaveHandler}
                    onClose={onCloseHandler}
                />
            )}
            <ul>
                {props.events.map((currentEvent: EventModel) => (
                    <li className="list-item" key={currentEvent.id}>
                        {currentEvent.title}
                        <div className="buttons">
                            <button className="button" onClick={() => onEditHandler(currentEvent)}>
                                Edit
                            </button>
                            <button className="button" onClick={() => onDeleteHandler(currentEvent)}>
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AddEvent;