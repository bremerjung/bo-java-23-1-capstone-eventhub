import React, {useEffect, useState} from 'react';
import './App.css';
import useEvent from "./hooks/useEvent";
import {Link, Route, Routes} from "react-router-dom";
import EventGallery from "./components/EventGallery";
import Home from "./components/Home";
import useUser from "./hooks/useUser";
import ApproveEvent from "./components/ApproveEvent";
import AddEvent from "./components/AddEvent";
import Administration from "./components/Administration";
import ProtectedRoutesUser from "./components/ProtectedRoutesUser";
import ProtectedRoutesAdminOnly from "./components/ProtectedRoutesAdminOnly";
import ProtectedRoutesAdminAndOrganizer from "./components/ProtectedRoutesAdminAndOrganizer";
import ProtectedRoutesAdminAndEditor from "./components/ProtectedRoutesAdminAndEditor";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import PreferredEventCategorySelection from "./components/PreferredEventCategorySelection";
import EventDetails from "./components/EventDetails";
import {Container, Nav, Navbar} from "react-bootstrap";

function App() {

    const [areNavLinksVisible, setAreNavLinksVisible] = useState(false);
    const {user, register, login, logout, updateUserPreferredCategories} = useUser();
    const {
        events,
        getAllEvents,
        getEventsByCategory,
        getEventsByCreator,
        getEventsByStatus,
        saveEvent,
        updateEvent,
        deleteEvent,
        categories,
        getAllCategories
    } = useEvent();

    useEffect(() => {
        if (user) {
            getAllEvents()
                .catch((error) => {
                    console.log(error);
                });
            getAllCategories()
                .catch((error) => {
                    console.log(error);
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    useEffect(() => {
        if (user !== undefined) {
            setAreNavLinksVisible(true);
        }
    }, [user]);

    return (
        <div className="App">
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <header className="App-header">
                <h3>Event Hub - Die digitale Litfaßsäule</h3>
                {user !== undefined ? <button id="logout-button" onClick={logout}>Logout</button> : <></>}
                {areNavLinksVisible && (
                    <Navbar bg="dark" variant="dark" expand="sm" collapseOnSelect>
                        <Container>
                            <Navbar.Toggle/>
                            <Navbar.Collapse>
                                <Nav>
                                    <Nav.Link as={Link} className="menuLink" to="/gallery">Gallery</Nav.Link>
                                    <Nav.Link as={Link} className="menuLink" to="/administration">Admin Area</Nav.Link>
                                    <Nav.Link as={Link} className="menuLink" to="/add">Organizer Area</Nav.Link>
                                    <Nav.Link as={Link} className="menuLink" to="/approve">Editor Area</Nav.Link>
                                    <Nav.Link as={Link} className="menuLink" to="/categorySelection">Category
                                        Selection</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                )}
            </header>
            <main className="App-main">
                <Routes>
                    <Route path={"/"} element={<Home login={login} register={register}/>}/>

                    <Route element={<ProtectedRoutesUser user={user}/>}>
                        <Route path="/gallery"
                               element={<EventGallery user={user} events={events} getAllEvents={getAllEvents}
                                                      getEventsByCategory={getEventsByCategory}/>}/>
                        <Route path="/events/:id" element={<EventDetails events={events}/>}/>
                        <Route path="/categorySelection"
                               element={<PreferredEventCategorySelection user={user} categories={categories}
                                                                         updateUserPreferredCategories={updateUserPreferredCategories}/>}/>
                    </Route>

                    <Route element={<ProtectedRoutesAdminOnly user={user}/>}>
                        <Route path="/administration" element={<Administration events={events}/>}/>
                    </Route>

                    <Route element={<ProtectedRoutesAdminAndOrganizer user={user}/>}>
                        <Route path="/add" element={<AddEvent user={user} events={events}
                                                              getEventsByCreator={getEventsByCreator}
                                                              saveEvent={saveEvent} updateEvent={updateEvent}
                                                              deleteEvent={deleteEvent}/>}/>
                    </Route>

                    <Route element={<ProtectedRoutesAdminAndEditor user={user}/>}>
                        <Route path="/approve" element={<ApproveEvent user={user} events={events}
                                                                      getEventsByStatus={getEventsByStatus}
                                                                      saveEvent={saveEvent}
                                                                      updateEvent={updateEvent}/>}/>
                    </Route>
                </Routes>
            </main>
            <footer className="App-footer">
                <p>&copy; 2023 Event Hub</p>
            </footer>
        </div>
    );
}

export default App;
