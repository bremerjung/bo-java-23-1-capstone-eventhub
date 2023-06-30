import React from 'react';
import {User} from "../model/User";
import {EventModel} from "../model/EventModel";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import {Container} from "react-bootstrap";
import EventGallery from "./EventGallery";
import EventCarousel from "./EventCarousel";

type Props = {
    user: User | undefined,
    events: EventModel[],
    getAllEvents: () => void,
    getEventsByCategory: (categories: string[]) => void
}

function EventViewSelection(props: Props) {
    return (
        <div>
            <Tabs
                defaultActiveKey="Cards"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                <Tab eventKey="Cards" title="Cards">
                    <Container>
                        <EventGallery user={props.user} events={props.events} getAllEvents={props.getAllEvents}
                                      getEventsByCategory={props.getEventsByCategory}/>
                    </Container>
                </Tab>

                <Tab eventKey="Carousel" title="Carousel">
                    <EventCarousel user={props.user} events={props.events} getAllEvents={props.getAllEvents}
                                   getEventsByCategory={props.getEventsByCategory}/>
                </Tab>

                <Tab eventKey="Map" title="Map">
                    Map View
                </Tab>
            </Tabs>
        </div>
    );
}

export default EventViewSelection;