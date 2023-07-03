import React, {useEffect, useState} from 'react';
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
    getEventsByStatus: (status: string) => void,
    getEventsByCategory: (categories: string[]) => void
}

function EventViewSelection(props: Props) {
    const [activeEventFilter, setActiveEventFilter] = useState<string>("all");

    useEffect(() => {
        props.getEventsByStatus("APPROVED");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function onAllEventsClickHandler() {
        props.getEventsByStatus("APPROVED");
        setActiveEventFilter("all");
    }

    function onMyEventsClickHandler() {
        if (props.user?.preferredCategories) {
            props.getEventsByCategory(props.user.preferredCategories);
            setActiveEventFilter("my");
        }
    }

    return (
        <div>
            <Tabs
                defaultActiveKey="Cards"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                <Tab eventKey="Cards" title="Cards">
                    <Container>
                        <EventGallery events={props.events}
                                      onAllEventsClickHandler={onAllEventsClickHandler}
                                      onMyEventsClickHandler={onMyEventsClickHandler}
                                      activeEventFilter={activeEventFilter}
                                      setActiveEventFilter={setActiveEventFilter}/>
                    </Container>
                </Tab>

                <Tab eventKey="Carousel" title="Carousel">
                    <EventCarousel events={props.events}
                                   onAllEventsClickHandler={onAllEventsClickHandler}
                                   onMyEventsClickHandler={onMyEventsClickHandler} activeEventFilter={activeEventFilter}
                                   setActiveEventFilter={setActiveEventFilter}/>
                </Tab>

                <Tab eventKey="Map" title="Map">
                    Map View
                </Tab>
            </Tabs>
        </div>
    );
}

export default EventViewSelection;