import axios from "axios";
import {useState} from "react";
import {EventModel} from "../model/EventModel";

export default function useEvent() {

    const [events, setEvents] = useState<EventModel[]>([])

    function getAllEvents() {
        return axios.get("/api/event")
            .then(response => setEvents(response.data))
            .catch(error => console.log(error.message))
    }

    return {getAllEvents, events}
}