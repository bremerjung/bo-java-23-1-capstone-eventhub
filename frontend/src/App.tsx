import React, {useEffect} from 'react';
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

function App() {

    const {login, register, logout, user} = useUser();
    const {getAllEvents, events} = useEvent();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {getAllEvents()}, [])

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
                <h1>Event Hub - Die digitale Litfaßsäule</h1>
                {user !== undefined ? <button id="logout-button" onClick={logout}>Logout</button> : <></>}
                <div id="nav-links">
                    <div className="nav-link">{user !== undefined ? <Link to="/administration">Admin Area</Link> : <></>}</div>
                    <div className="nav-link">{user !== undefined ? <Link to="/add">Organizer Area</Link> : <></>}</div>
                    <div className="nav-link">{user !== undefined ? <Link to="/approve">Editor Area</Link> : <></>}</div>
                </div>
            </header>
            <main className="App-main">
                <Routes>
                    <Route path={"/"} element={<Home login={login} register={register}/>}/>

                    <Route element={<ProtectedRoutesUser user={user}/>}>
                        <Route path="/gallery" element={<EventGallery events={events}/>}/>
                    </Route>

                    <Route element={<ProtectedRoutesAdminOnly user={user}/>}>
                        <Route path="/administration" element={<Administration events={events}/>}/>
                    </Route>

                    <Route element={<ProtectedRoutesAdminAndOrganizer user={user}/>}>
                        <Route path="/add" element={<AddEvent events={events}/>}/>
                    </Route>

                    <Route element={<ProtectedRoutesAdminAndEditor user={user}/>}>
                        <Route path="/approve" element={<ApproveEvent events={events}/>}/>
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
