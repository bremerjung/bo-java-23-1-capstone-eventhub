import React from 'react';
import {EventModel} from '../model/EventModel';
import {MapContainer, Marker, TileLayer} from 'react-leaflet';
import L, {Icon} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import EventMapDetailsPopup from "./EventMapDetailsPopup";

type Props = {
    events: EventModel[],
    onAllEventsClickHandler: () => void,
    onMyEventsClickHandler: () => void,
    activeEventFilter: string,
    setActiveEventFilter: (filter: string) => void
};

function EventMap(props: Props) {
    const defaultCoordinates: L.LatLngLiteral = {lat: 53.0758155, lng: 8.8071646};
    const customIcon = new Icon({
        iconUrl: require('../images/marker.png'),
        iconSize: [38, 38],
    });

    return (
        <div style={{height: '60vh'}}>
            <MapContainer
                center={defaultCoordinates}
                zoom={10}
                style={{height: '100%', width: '100%'}}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {props.events.map((currentEvent, index) => {
                    return (
                        <Marker
                            key={index}
                            position={{
                                lat: currentEvent.locationLatitude,
                                lng: currentEvent.locationLongitude
                            }}
                            icon={customIcon}>
                            <EventMapDetailsPopup event={currentEvent}/>
                        </Marker>
                    );
                })}
            </MapContainer>
        </div>
    );
}

export default EventMap;
