import React from 'react';
import {Button, Col, Container, Nav, Navbar, OverlayTrigger, Tooltip} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendar, faCheckCircle, faCog, faImages, faList, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import {User} from "../model/User";

type Props = {
    user: User | undefined,
    logout: () => Promise<void>,
    areNavLinksVisible: boolean
}

function Header(props: Props) {
    return (
        <header className="App-header">
            <h3>Event Hub <FontAwesomeIcon icon={faCalendar} size="sm"/> Die digitale Litfaßsäule</h3>
            {props.areNavLinksVisible && (
                <Navbar variant="dark" collapseOnSelect>
                    <Container>
                        <Col>
                            <Navbar.Toggle/>
                            <Navbar.Collapse>

                                <Nav>
                                    <OverlayTrigger
                                        placement="bottom"
                                        overlay={<Tooltip id="gallery-tooltip">Event Gallery</Tooltip>}
                                    >
                                        <Nav.Link as={Link} className="menuLink" to="/eventViewSelection">
                                            <FontAwesomeIcon icon={faImages} size="lg"/>
                                        </Nav.Link>
                                    </OverlayTrigger>

                                    <OverlayTrigger
                                        placement="bottom"
                                        overlay={<Tooltip id="administration-tooltip">Administration</Tooltip>}
                                    >
                                        <Nav.Link as={Link} className="menuLink" to="/administration">
                                            <FontAwesomeIcon icon={faCog} size="lg"/>
                                        </Nav.Link>
                                    </OverlayTrigger>

                                    <OverlayTrigger
                                        placement="bottom"
                                        overlay={<Tooltip id="add-tooltip">Event Management</Tooltip>}
                                    >
                                        <Nav.Link as={Link} className="menuLink" to="/add">
                                            <FontAwesomeIcon icon={faCalendar} size="lg"/>
                                        </Nav.Link>
                                    </OverlayTrigger>

                                    <OverlayTrigger
                                        placement="bottom"
                                        overlay={<Tooltip id="approve-tooltip">Editor Area</Tooltip>}
                                    >
                                        <Nav.Link as={Link} className="menuLink" to="/approve">
                                            <FontAwesomeIcon icon={faCheckCircle} size="lg"/>
                                        </Nav.Link>
                                    </OverlayTrigger>

                                    <OverlayTrigger
                                        placement="bottom"
                                        overlay={<Tooltip id="category-selection-tooltip">Category Selection</Tooltip>}
                                    >
                                        <Nav.Link as={Link} className="menuLink" to="/categorySelection">
                                            <FontAwesomeIcon icon={faList} size="lg"/>
                                        </Nav.Link>
                                    </OverlayTrigger>
                                </Nav>
                            </Navbar.Collapse>
                        </Col>
                        <Col>
                            {props.user !== undefined ?
                                <Button className="button mx-2" onClick={props.logout}><FontAwesomeIcon
                                    icon={faSignOutAlt} size="lg"/></Button> : <></>}
                        </Col>
                    </Container>
                </Navbar>
            )}
        </header>
    );
}

export default Header;