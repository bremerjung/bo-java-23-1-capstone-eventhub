import React from 'react';
import {Button, Container} from "react-bootstrap";

type Props = {
    sortMode: 'date' | 'distance',
    setSortMode: (sortMode: 'date' | 'distance') => void
}

function EventSort(props: Props) {

    function onSortByDistanceClickHandler() {
        props.setSortMode('distance')
    }

    function onSortByDateClickHandler() {
        props.setSortMode('date')
    }

    return (
        <Container>
            {props.sortMode === "date" ? (
                <Button className="button m-1 active" onClick={onSortByDateClickHandler}>Sort by date</Button>
            ) : (
                <Button className="button m-1" onClick={onSortByDateClickHandler}>Sort by date</Button>
            )}
            {props.sortMode === "distance" ? (
                <Button className="button m-1 active" onClick={onSortByDistanceClickHandler}>Sort by distance</Button>
            ) : (
                <Button className="button m-1" onClick={onSortByDistanceClickHandler}>Sort by distance</Button>
            )}
        </Container>
    );
}

export default EventSort;