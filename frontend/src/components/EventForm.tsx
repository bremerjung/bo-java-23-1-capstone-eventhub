import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import {EventModel} from "../model/EventModel";
import {User} from "../model/User";
import axios from "axios";

type Props = {
    user: User | undefined,
    events: EventModel[],
    getEventsByCreator: (creator: string) => void,
    saveEvent: (event: EventModel) => Promise<void>
    updateEvent: (id: string, event: EventModel) => Promise<void>
}

enum FormMode {
    ADD,
    EDIT
}

function EventForm(props: Props) {

    const params = useParams();
    const eventId: string | undefined = params.id;
    const foundEvent: EventModel | undefined = props.events.find((currentEvent: EventModel) => currentEvent.id === eventId);

    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');
    const [source, setSource] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [formMode, setFormMode] = useState(FormMode.ADD);

    useEffect(() => {
        if (foundEvent) {
            setFormMode(FormMode.EDIT);
            setTitle(foundEvent.title);
            setDescription(foundEvent.description);
            setStartDate(foundEvent.start.slice(0, 16));
            setLocation(foundEvent.location);
            setCategory(foundEvent.category);
            setSource(foundEvent.source);
        } else {
            setFormMode(FormMode.ADD);
        }
    }, [foundEvent]);

    function onSubmitHandler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const event: EventModel = {
            id: foundEvent?.id ?? '',
            title: title,
            description: description,
            start: `${startDate}:00.000+00:00`,
            location: location,
            category: category,
            creator: props.user?.username ?? '',
            status: 'NEW',
            source: source,
            imageUrl: ''
        };

        if (formMode === FormMode.ADD) {
            props.saveEvent(event)
                .then(() => handleImageUpload(event.id))
                .catch(error => console.log(error.message));
        } else if (formMode === FormMode.EDIT) {
            props.updateEvent(event.id, event)
                .then(() => handleImageUpload(event.id))
                .catch(error => console.log(error.message));
        }
    }

    function handleImageUpload(eventId: string) {
        if (image) {
            const formData = new FormData();
            formData.append('image', image);

            axios.post(`/api/event/${eventId}/image`, formData)
                .then(() => {
                    props.getEventsByCreator(props.user?.username ?? "");
                    navigate("/add");
                })
                .catch(error => console.log(error.message));
        } else {
            navigate('/add');
        }
    }

    function onChangeHandlerImage(e: ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            setImage(file);
        }
    }

    function onCloseHandler() {
        navigate("/add")
    }

    return (
        <Container>
            <Row>
                <Col>
                    <h1>{formMode === FormMode.ADD ? 'Add event' : 'Update event'}</h1>
                    <Form onSubmit={onSubmitHandler}>
                        <Form.Group className="mb-3" controlId="formTitle">
                            <Form.Label>Titel</Form.Label>
                            <Form.Control
                                required
                                placeholder="Enter event title"
                                value={title}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formDescription">
                            <Form.Label>Beschreibung</Form.Label>
                            <Form.Control
                                required
                                placeholder="Enter event description"
                                as="textarea"
                                rows={2}
                                value={description}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formStartDate">
                            <Form.Label>Date and time</Form.Label>
                            <Form.Control
                                required
                                type="datetime-local"
                                value={startDate}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setStartDate(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formLocation">
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                required
                                placeholder="Enter event location"
                                value={location}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formCategory">
                            <Form.Label>Category</Form.Label>
                            <Form.Select
                                required
                                value={category}
                                defaultValue="Select event category"
                                onChange={(e: ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value)}>
                                <option value="">Select event category</option>
                                <option value="OTHER">Other</option>
                                <option value="MUSIC">Music</option>
                                <option value="ARTS">Arts</option>
                                <option value="THEATRE">Theatre</option>
                                <option value="COMEDY">Comedy</option>
                                <option value="SPORTS">Sports</option>
                                <option value="EDUCATION">Education</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formSource">
                            <Form.Label>Source</Form.Label>
                            <Form.Control
                                required
                                placeholder="Enter source for further information"
                                value={source}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setSource(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Event poster upload</Form.Label>
                            <Form.Control required type="file" placeholder="Enter event location"
                                          onChange={onChangeHandlerImage}/>
                        </Form.Group>
                        <Row className="mt-3">
                            <Col>
                                <Button className="button" onClick={onCloseHandler}>Cancel</Button>
                            </Col>
                            <Col>
                                <Button className="button" type="submit">
                                    {formMode === FormMode.ADD ? 'Add event' : 'Update event'}
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default EventForm;