import React, {useEffect} from 'react';
import {Button, Container, ListGroup, OverlayTrigger, Tooltip} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBriefcase, faCheck, faUser, faUserShield} from "@fortawesome/free-solid-svg-icons";
import {User} from "../model/User";
import useUser from "../hooks/useUser";
import {toast} from "react-toastify";

function UserList() {

    const {users, getAllUsers, updateUserRole} = useUser();

    useEffect(() => {
        getAllUsers()
            .catch((error) => {
                console.log(error);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function onSetUserRoleHandler(user: User, role: string) {
        updateUserRole(user.username, role)
            .then(() => toast.success(`Changed role of ${user.username} to ${role}`))
            .catch((error) => {
                console.log(error);
            });
    }

    function getUsernameBeforeAt(email: string) {
        return email.split('@')[0];
    }

    return (
        <div>
            <Container>
                <ListGroup style={{width: '100%'}}>
                    {users.map((currentUser) => (
                        <ListGroup.Item key={getUsernameBeforeAt(currentUser.username)}
                                        className="d-flex justify-content-between align-items-center">
                            <div className="small-device-font" style={{
                                flex: 1,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                            }}>{getUsernameBeforeAt(currentUser.username)}{' ('}{currentUser.roles[0]}{')'}</div>
                            <div className="buttons">
                                <OverlayTrigger placement="top" overlay={<Tooltip>Set role User</Tooltip>}>
                                    <Button size="sm" className="button m-1"
                                            onClick={() => onSetUserRoleHandler(currentUser, 'user')}>
                                        <FontAwesomeIcon className="small-icon" icon={faUser}/>
                                    </Button>
                                </OverlayTrigger>
                                <OverlayTrigger placement="top" overlay={<Tooltip>Set role Editor</Tooltip>}>
                                    <Button size="sm" className="button m-1"
                                            onClick={() => onSetUserRoleHandler(currentUser, 'editor')}>
                                        <FontAwesomeIcon className="small-icon" icon={faCheck}/>
                                    </Button>
                                </OverlayTrigger>
                                <OverlayTrigger placement="top" overlay={<Tooltip>Set role Organizer</Tooltip>}>
                                    <Button
                                        size="sm"
                                        className="button m-1"
                                        onClick={() => onSetUserRoleHandler(currentUser, 'organizer')}
                                    >
                                        <FontAwesomeIcon className="small-icon" icon={faBriefcase}/>
                                    </Button>
                                </OverlayTrigger>
                                <OverlayTrigger placement="top" overlay={<Tooltip>Set role Administrator</Tooltip>}>
                                    <Button size="sm" className="button"
                                            onClick={() => onSetUserRoleHandler(currentUser, 'admin')}>
                                        <FontAwesomeIcon className="small-icon" icon={faUserShield}/>
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