import axios from "axios";
import {useState} from "react";
import {EventModel} from "../model/EventModel";

export default function useEvent() {

    const [events, setEvents] = useState<EventModel[]>([])
    const [categories, setCategories] = useState<string[]>([])

    function getAllEvents() {
        return axios.get("/api/event")
            .then(response => setEvents(response.data))
            .catch(error => console.log(error.message))
    }

    function getEventsByStatus(status: string = "NEW") {
        axios.get(`/api/event/status/${status}`)
            .then(response => setEvents(response.data))
            .catch(error => {
                console.log(error.message);
            })
    }

    function getEventsByCategory(categories: string[]) {
        const queryParams = categories.join(',');
        return axios
            .get("/api/event/byCategories", { params: { categories: queryParams } })
            .then((response) => setEvents(response.data))
            .catch((error) => {
                console.log(error.message);
            });
    }

    function getEventsByCreator(creator: string) {
        axios.get(`/api/event/creator/${creator}`)
            .then(response => setEvents(response.data))
            .catch(error => {
                console.log(error.message);
            })
    }

    function saveEvent(event: EventModel) {
        return axios.post("/api/event", event)
            .then(response => setEvents([...events, response.data]))
            .catch(error => console.log(error.message))
    }

    function updateEvent(id: string, event: EventModel) {
        return axios.put(`/api/event/${id}`, event)
            .then(() => getEventsByStatus())
            .catch(error => console.log(error.message))
    }

    function deleteEvent(event: EventModel, callback?: () => void) {
        return axios
            .delete(`/api/event/${event.id}`)
            .then(() => {
                if (callback) {
                    callback();
                } else {
                    getAllEvents()
                        .catch((error) => console.log(error.message));
                }
            })
            .catch((error) => console.log(error.message));
    }

    function getAllCategories() {
        return axios.get("/api/event/categories")
            .then(response => setCategories(response.data))
            .catch(error => console.log(error.message))
    }

    return {events, setEvents, getAllEvents, getEventsByStatus, getEventsByCategory, getEventsByCreator, saveEvent, updateEvent, deleteEvent,
        categories, getAllCategories}

}