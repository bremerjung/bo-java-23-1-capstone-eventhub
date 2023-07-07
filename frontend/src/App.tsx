import React, {useEffect, useState} from 'react';
import './App.css';
import useEvent from "./hooks/useEvent";
import {Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import useUser from "./hooks/useUser";
import ApproveEvent from "./components/ApproveEvent";
import EventManagement from "./components/EventManagement";
import Administration from "./components/Administration";
import ProtectedRoutesUser from "./components/ProtectedRoutesUser";
import ProtectedRoutesAdminOnly from "./components/ProtectedRoutesAdminOnly";
import ProtectedRoutesAdminAndOrganizer from "./components/ProtectedRoutesAdminAndOrganizer";
import ProtectedRoutesAdminAndEditor from "./components/ProtectedRoutesAdminAndEditor";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import PreferredEventCategorySelection from "./components/PreferredEventCategorySelection";
import EventDetails from "./components/EventDetails";
import EventForm from "./components/EventForm";
import Header from "./components/Header";
import EventViewSelection from "./components/EventViewSelection";

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
        setAreNavLinksVisible(user !== undefined);
    }, [user]);

    return (
        <div className="App">
            <ToastContainer
                position="top-center"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <Header user={user} logout={logout} areNavLinksVisible={areNavLinksVisible}/>
            <main className="App-main">
                <Routes>
                    <Route path={"/"} element={<Home login={login} register={register}/>}/>

                    <Route element={<ProtectedRoutesUser/>}>
                        <Route path="/eventViewSelection"
                               element={<EventViewSelection user={user} events={events}
                                                            getEventsByStatus={getEventsByStatus}
                                                            getEventsByCategory={getEventsByCategory}/>}/>
                        <Route path="/events/:id" element={<EventDetails events={events}/>}/>
                        <Route path="/categorySelection"
                               element={<PreferredEventCategorySelection user={user} categories={categories}
                                                                         updateUserPreferredCategories={updateUserPreferredCategories}/>}/>
                    </Route>

                    <Route element={<ProtectedRoutesAdminOnly/>}>
                        <Route path="/administration"
                               element={<Administration user={user} getAllEvents={getAllEvents}/>}/>
                    </Route>

                    <Route element={<ProtectedRoutesAdminAndOrganizer/>}>
                        <Route path="/add" element={<EventManagement user={user} events={events}
                                                                     getEventsByCreator={getEventsByCreator}
                                                                     saveEvent={saveEvent} updateEvent={updateEvent}
                                                                     deleteEvent={deleteEvent}/>}/>
                        <Route path="/newEvent" element={<EventForm user={user} events={events}
                                                                    getEventsByCreator={getEventsByCreator}
                                                                    saveEvent={saveEvent} updateEvent={updateEvent}/>}/>
                        <Route path="/editEvent/:id" element={<EventForm user={user} events={events}
                                                                         getEventsByCreator={getEventsByCreator}
                                                                         saveEvent={saveEvent}
                                                                         updateEvent={updateEvent}/>}/>

                    </Route>

                    <Route element={<ProtectedRoutesAdminAndEditor/>}>
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
