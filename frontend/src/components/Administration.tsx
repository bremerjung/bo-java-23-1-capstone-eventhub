import React, {ChangeEvent, useState} from 'react';
import {EventModel} from "../model/EventModel";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Table from 'react-bootstrap/Table';
import {Col, Container, Row} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

type Props = {
    events: EventModel[];
};

function Administration(props: Props) {
    const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [searchText, setSearchText] = useState('');

    const filterEventsByStatus = (events: EventModel[]) => {
        if (selectedStatus.length === 0) {
            return events;
        } else {
            return events.filter(event => selectedStatus.includes(event.status));
        }
    };

    const filterEventsByCategory = (events: EventModel[]) => {
        if (selectedCategories.length === 0) {
            return events;
        } else {
            return events.filter(event => selectedCategories.includes(event.category));
        }
    };

    const filterEventsBySearch = (events: EventModel[]) => {
        if (searchText === '') {
            return events;
        } else {
            const lowerCaseSearchText = searchText.toLowerCase();
            return events.filter(
                event =>
                    event.title.toLowerCase().includes(lowerCaseSearchText) ||
                    event.description.toLowerCase().includes(lowerCaseSearchText) ||
                    event.location.toLowerCase().includes(lowerCaseSearchText)
            );
        }
    };

    const handleStatusChange = (status: string) => {
        if (selectedStatus.includes(status)) {
            setSelectedStatus(selectedStatus.filter(s => s !== status));
        } else {
            setSelectedStatus([...selectedStatus, status]);
        }
    };

    const handleCategoryChange = (category: string) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter(c => c !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    return (
        <div>
            <h1>Event Hub Administration</h1>
            <Tabs
                defaultActiveKey="Events"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                <Tab eventKey="Events" title="Events">
                    <Container>
                        <Row>
                            <Col>
                                <Form.Select>
                                    <option>Filter for category</option>
                                    <option value="ALL">ALL</option>
                                    <option value="NEW">NEW</option>
                                    <option value="APPROVED">APPROVED</option>
                                    <option value="DECLINED">DECLINED</option>
                                </Form.Select>
                            </Col>
                            <Col>
                                <Form.Select>
                                    <option>Filter for status</option>
                                    <option value="ALL">ALL</option>
                                    <option value="NEW">NEW</option>
                                    <option value="APPROVED">APPROVED</option>
                                    <option value="DECLINED">DECLINED</option>
                                </Form.Select>
                            </Col>
                            <Col>
                                <Form.Select>
                                    <option>Filter for date</option>
                                    <option value="ALL">ALL</option>
                                    <option value="NEW">NEW</option>
                                    <option value="APPROVED">APPROVED</option>
                                    <option value="DECLINED">DECLINED</option>
                                </Form.Select>
                            </Col>
                        </Row>
                    </Container>

                    <Container>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>Date</th>
                                <th>Title</th>
                                <th>Location</th>
                                <th>Category</th>
                                <th>Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {props.events.map((event: EventModel) => (
                                <tr key={event.id}>
                                    <td>{event.start.toString()}</td>
                                    <td>{event.title}</td>
                                    <td>{event.location}</td>
                                    <td>{event.category}</td>
                                    <td>{event.status}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </Container>
                </Tab>

                <Tab eventKey="Users" title="Users">
                    Tab content for Users
                </Tab>

                <Tab eventKey="General" title="General">
                    General information
                </Tab>
            </Tabs>
        </div>
    );
}

export default Administration;