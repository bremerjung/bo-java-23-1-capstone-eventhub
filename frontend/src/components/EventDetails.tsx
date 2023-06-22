import React from 'react';
import {EventModel} from "../model/EventModel";
import {useNavigate, useParams} from "react-router-dom";
import './EventDetails.css';

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
            <h1>Details von: {foundEvent?.title}</h1>
            <h2>Id: {foundEvent?.id}</h2>
            <h2>Description: {foundEvent?.description}</h2>
            <h2>Start: {foundEvent?.start.toString()}</h2>
            <h2>Start Date: {foundEvent?.startDate}</h2>
            <h2>Start Time: {foundEvent?.startTime}</h2>
            <h2>End: {foundEvent?.end.toString()}</h2>
            <h2>Location: {foundEvent?.location}</h2>
            <h2>Category: {foundEvent?.category}</h2>
            <h2>Creator: {foundEvent?.creator}</h2>
            <h2>Status: {foundEvent?.status}</h2>
            <h2>Source: {foundEvent?.source}</h2>
            <img src={foundEvent?.imageUrl} alt={foundEvent?.title}/>
            <button onClick={onCancelHandler}>Cancel</button>
        </div>
    );
}

export default EventDetails;