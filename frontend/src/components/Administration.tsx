import React from 'react';
import {EventModel} from "../model/EventModel";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import EventTable from "./EventTable";
import UserList from "./UserList";

type Props = {
    getAllEvents: () => Promise<EventModel[]>
}

function Administration(props: Props) {

    return (
        <div>
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
                    General information
                </Tab>
            </Tabs>
        </div>
    );
}

export default Administration;