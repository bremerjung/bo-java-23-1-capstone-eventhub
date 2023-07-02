import React from 'react';
import {EventModel} from "../model/EventModel";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import EventTable from "./EventTable";
import UserList from "./UserList";
import {User} from "../model/User";

type Props = {
    user: User | undefined,
    getAllEvents: () => Promise<EventModel[]>
}

function Administration(props: Props) {

    return (
        <div>
            <h6>Logged in user: {props.user?.username}</h6>
            <h1>Event Hub Administration</h1>
            <Tabs
                defaultActiveKey="Events"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                <Tab eventKey="Events" title="Events">
                    <EventTable getAllEvents={props.getAllEvents}/>
                </Tab>

                <Tab eventKey="Users" title="Users">
                    <UserList/>
                </Tab>

                <Tab eventKey="General" title="General">
                    <h4>General information</h4>
                    <h5>Event Hub</h5>
                    <p>Version: 0.9</p>
                </Tab>
            </Tabs>
        </div>
    );
}

export default Administration;