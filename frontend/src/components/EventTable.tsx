import React, {ChangeEvent, useEffect, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import {EventModel} from "../model/EventModel";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCheck,
    faEllipsisH,
    faExclamation,
    faFutbol,
    faGraduationCap,
    faLaugh,
    faMusic,
    faPalette,
    faTheaterMasks,
    faTimes
} from "@fortawesome/free-solid-svg-icons";
import "./EventTable.css";
import {Link} from "react-router-dom";

type Props = {
    getAllEvents: () => Promise<EventModel[]>
}

function EventTable(props: Props) {
    const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
    const [selectedCategories, setSelectedCategories] = useState<string>("ALL");
    const [searchText, setSearchText] = useState('');
    const [filteredEvents, setFilteredEvents] = useState<EventModel[]>([]);

    useEffect(() => {
        props.getAllEvents().then((events) => {
            const filtered = filterEvents(events);
            setFilteredEvents(filtered);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedStatus, selectedCategories, searchText]);

    const filterEvents = (events: EventModel[]) => {
        return events.filter((event) => {
            const matchStatus =
                selectedStatus.length === 0 ||
                selectedStatus.includes('ALL') ||
                selectedStatus.includes(event.status);
            const matchCategory =
                selectedCategories.length === 0 ||
                selectedCategories.includes('ALL') ||
                selectedCategories.includes(event.category);
            const matchSearch =
                searchText === '' ||
                event.title.toLowerCase().includes(searchText.toLowerCase()) ||
                event.description.toLowerCase().includes(searchText.toLowerCase()) ||
                event.location.toLowerCase().includes(searchText.toLowerCase());
            return matchStatus && matchCategory && matchSearch;
        });
    };

    const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedStatus(e.target.value);
    };

    const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategories(e.target.value);
    };

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    const desktopColumnHeader = (
        <React.Fragment>
            <th className="small-device-font">Date</th>
            <th className="small-device-font">Title</th>
            <th className="small-device-font">Location</th>
            <th className="category-column small-device-font">Category</th>
            <th className="status-column small-device-font">Status</th>
        </React.Fragment>
    );

    const mobileColumnHeader = (
        <React.Fragment>
            <th className="small-device-font">Date</th>
            <th className="small-device-font">Title</th>
            <th className="small-device-font">Location</th>
            <th className="category-column small-device-font">Cat</th>
            <th className="status-column small-device-font">Stat</th>
        </React.Fragment>
    );

    const isMobileView = window.innerWidth <= 767;

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <Form.Select
                            onChange={handleCategoryChange}
                        >
                            <option>Category</option>
                            <option value="ALL">ALL</option>
                            <option value="MUSIC">MUSIC</option>
                            <option value="ARTS">ARTS</option>
                            <option value="THEATRE">THEATRE</option>
                            <option value="COMEDY">COMEDY</option>
                            <option value="SPORTS">SPORTS</option>
                            <option value="EDUCATION">EDUCATION</option>
                            <option value="OTHER">OTHER</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Select
                            onChange={handleStatusChange}
                        >
                            <option>Status</option>
                            <option value="ALL">ALL</option>
                            <option value="NEW">NEW</option>
                            <option value="APPROVED">APPROVED</option>
                            <option value="DECLINED">DECLINED</option>
                        </Form.Select>
                    </Col>
                </Row>
            </Container>

            <Container>
                <Row className="mt-3 mb-3">
                    <Form>
                        <Form.Group controlId="searchText">
                            <Form.Control
                                type="text"
                                placeholder="Search"
                                value={searchText}
                                onChange={handleSearchChange}
                            />
                        </Form.Group>
                    </Form>
                </Row>
                <Row>
                    <p>{filteredEvents.length} events found.</p>
                </Row>

                <Row>
                    <Table striped bordered hover size="sm" className="w-100">
                        <thead>
                        <tr>
                            {isMobileView ? mobileColumnHeader : desktopColumnHeader}
                        </tr>
                        </thead>
                        <tbody>
                        {filteredEvents.map((event: EventModel) => (

                            <tr key={event.id}>
                                <td className="small-device-font">{new Date(event.start).toLocaleDateString(undefined, {
                                    month: 'numeric',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric'
                                })}</td>
                                <td className="small-device-font"><Link to={`/events/${event.id}`}>{event.title}</Link>
                                </td>
                                <td className="small-device-font">{event.location}</td>
                                <td>
                                    {event.category === 'MUSIC' &&
                                        <FontAwesomeIcon icon={faMusic} className="small-icon"/>}
                                    {event.category === 'ARTS' &&
                                        <FontAwesomeIcon icon={faPalette} className="small-icon"/>}
                                    {event.category === 'THEATRE' &&
                                        <FontAwesomeIcon icon={faTheaterMasks} className="small-icon"/>}
                                    {event.category === 'COMEDY' &&
                                        <FontAwesomeIcon icon={faLaugh} className="small-icon"/>}
                                    {event.category === 'SPORTS' &&
                                        <FontAwesomeIcon icon={faFutbol} className="small-icon"/>}
                                    {event.category === 'EDUCATION' &&
                                        <FontAwesomeIcon icon={faGraduationCap} className="small-icon"/>}
                                    {event.category === 'OTHER' &&
                                        <FontAwesomeIcon icon={faEllipsisH} className="small-icon"/>}
                                </td>
                                <td>
                                    {event.status === 'APPROVED' &&
                                        <FontAwesomeIcon icon={faCheck} className="small-icon"/>}
                                    {event.status === 'DECLINED' &&
                                        <FontAwesomeIcon icon={faTimes} className="small-icon"/>}
                                    {event.status === 'NEW' && <FontAwesomeIcon icon={faExclamation}/>}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Row>
            </Container>
        </div>
    );
}

export default EventTable;