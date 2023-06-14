import React, {useEffect} from 'react';
import './App.css';
import useEvent from "./hooks/useEvent";
import {Link, Route, Routes} from "react-router-dom";
import EventGallery from "./components/EventGallery";

function App() {

    const {getAllEvents, events} = useEvent();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {getAllEvents()}, [])

    return (
        <div className="App">
            <header className="App-header">
                <h1>Event Hub - Die digitale Litfaßsäule</h1>
            </header>
            <main>
                <Link to={'/gallery'}>Zu den Events</Link>
            </main>
            <Routes>
                <Route path="/gallery" element={<EventGallery events={events}/>}/>
            </Routes>
        </div>
    );
}

export default App;
