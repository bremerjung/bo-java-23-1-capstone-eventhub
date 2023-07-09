import React, {useEffect, useState} from 'react';
import {EventModel} from "../model/EventModel";
import EventCard from "./EventCard";
import './EventGallery.css';
import EventFilter from "./EventFilter";
import {UserLocation} from "../model/UserLocation";
import {getDistance} from 'geolib';
import EventSort from "./EventSort";

type Props = {
    events: EventModel[],
    setEvents: (events: EventModel[]) => void,
    userLocation: UserLocation | undefined,
    onAllEventsClickHandler: () => void,
    onMyEventsClickHandler: () => void,
    activeEventFilter: string,
    setActiveEventFilter: (filter: string) => void
}

function EventGallery(props: Props) {
    const [sortMode, setSortMode] = useState<'date' | 'distance'>('date');

    useEffect(() => {
        const sortedEvents = sortEvents(props.events, sortMode, props.userLocation);
        props.setEvents(sortedEvents);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortMode]);

    function calculateDistance(userLocation: UserLocation, eventLocation: UserLocation): number {
        const distanceInMeters = getDistance(userLocation, eventLocation) || 0;
        const distanceInKilometers = distanceInMeters / 1000;
        return parseFloat(distanceInKilometers.toFixed(2));
    }

    function sortEvents(events: EventModel[], sortMode: 'date' | 'distance', userLocation?: UserLocation): EventModel[] {
        return events.slice().sort((eventA, eventB) => {
            if (sortMode === 'date') {
                return new Date(eventA.start).getTime() - new Date(eventB.start).getTime();
            } else if (sortMode === 'distance' && userLocation) {
                const distanceA = calculateDistance(userLocation, {
                    lat: eventA.locationLatitude,
                    lng: eventA.locationLongitude
                });
                const distanceB = calculateDistance(userLocation, {
                    lat: eventB.locationLatitude,
                    lng: eventB.locationLongitude
                });
                return distanceA - distanceB;
            }
            return 0;
        });
    }


    return (
        <div>
            <EventSort sortMode={sortMode} setSortMode={setSortMode}/>
            <EventFilter onAllEventsClickHandler={props.onAllEventsClickHandler}
                         onMyEventsClickHandler={props.onMyEventsClickHandler}
                         activeEventFilter={props.activeEventFilter} setActiveEventFilter={props.setActiveEventFilter}/>
            <div>{props.events.length} events found</div>
            <div className="event-gallery">
                {props.events.map((currentEvent: EventModel) => {
                    const distance = props.userLocation ? calculateDistance(props.userLocation, {
                        lat: currentEvent.locationLatitude,
                        lng: currentEvent.locationLongitude
                    }) : undefined;

                    return <EventCard key={currentEvent.id} event={currentEvent} distance={distance}></EventCard>
                })
                }
            </div>
        </div>
    );
}

export default EventGallery;