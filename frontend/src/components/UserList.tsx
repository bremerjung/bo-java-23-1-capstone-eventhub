import React, {useEffect} from 'react';
import {Button, Container, ListGroup, OverlayTrigger, Tooltip} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBriefcase, faCheck, faUser, faUserShield} from "@fortawesome/free-solid-svg-icons";
import {User} from "../model/User";
import useUser from "../hooks/useUser";

type Props = {
    users: User[]
}

function UserList() {

    const {users, getAllUsers, updateUserRole} = useUser();

    useEffect(() => {
        getAllUsers()
            .catch((error) => {
                console.log(error);
            });
    }, []);

    function onSetUserRoleHandler(user: User, role: string) {
        updateUserRole(user.username, role)
            .catch((error) => {
                console.log(error);
            });
    }

    function getUsernameBeforeAt(email: string) {
        const username = email.split('@')[0];
        return username;
    }

    return (
        <div>
            <Container>
                <ListGroup style={{width: '100%'}}>
                    {users.map((currentUser, index) => (
                        <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                            <div style={{
                                flex: 1,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                            }}>{getUsernameBeforeAt(currentUser.username)}</div>
                            <div className="buttons">
                                <OverlayTrigger placement="top" overlay={<Tooltip>Set role User</Tooltip>}>
                                    <Button size="sm" className="button"
                                            onClick={() => onSetUserRoleHandler(currentUser, 'user')}>
                                        <FontAwesomeIcon icon={faUser}/>
                                    </Button>
                                </OverlayTrigger>
                                <OverlayTrigger placement="top" overlay={<Tooltip>Set role Editor</Tooltip>}>
                                    <Button size="sm" className="button"
                                            onClick={() => onSetUserRoleHandler(currentUser, 'editor')}>
                                        <FontAwesomeIcon icon={faCheck}/>
                                    </Button>
                                </OverlayTrigger>
                                <OverlayTrigger placement="top" overlay={<Tooltip>Set role Organizer</Tooltip>}>
                                    <Button
                                        size="sm"
                                        className="button"
                                        onClick={() => onSetUserRoleHandler(currentUser, 'organizer')}
                                    >
                                        <FontAwesomeIcon icon={faBriefcase}/>
                                    </Button>
                                </OverlayTrigger>
                                <OverlayTrigger placement="top" overlay={<Tooltip>Set role Administrator</Tooltip>}>
                                    <Button size="sm" className="button"
                                            onClick={() => onSetUserRoleHandler(currentUser, 'admin')}>
                                        <FontAwesomeIcon icon={faUserShield}/>
                                    </Button>
                                </OverlayTrigger>
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Container>
        </div>
    );
}

export default UserList;