import React, {ChangeEvent, FormEvent, useState} from 'react';
import {useNavigate} from "react-router-dom";
import './Home.css';
import {toast} from "react-toastify";
import {Button, Container, Form, Row} from "react-bootstrap";

type Props = {
    login: (username: string, password: string) => Promise<void>,
    register: (username: string, password: string) => Promise<void>
}

enum ButtonType {
    Login,
    Register
}

function Home(props: Props) {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [buttonType, setButtonType] = useState<ButtonType | undefined>(undefined)
    const navigate = useNavigate();

    function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (buttonType === ButtonType.Login) {
            props.login(username, password)
                .then(() => {
                    navigate("/eventViewSelection");
                }).catch((error) => {
                toast.error(error.message || "Login failed");
            });
        } else if (buttonType === ButtonType.Register) {
            props.register(username, password)
                .then(() => {
                    navigate("/");
                }).catch((error) => {
                toast.error(error.message || "Registration failed");
            });
        }
    }

    function onChangeHandlerUsername(e: ChangeEvent<HTMLInputElement>) {
        setUsername(e.target.value)
    }

    function onChangeHandlerPassword(e: ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value)
    }

    function onClickLogin() {
        setButtonType(ButtonType.Login);
    }

    function onClickRegister() {
        setButtonType(ButtonType.Register);
    }

    return (
        <Container>
            <Row>
                <h1>Login & Registration</h1>
            </Row>
            <Row>
                <p>Please fill out the form below to register for an account!</p>
            </Row>
            <Form onSubmit={onSubmit}>
                <Form.Control className="m-1"
                              required
                              type="email"
                              placeholder="Email"
                              value={username}
                              onChange={onChangeHandlerUsername}
                />
                <Form.Control className="m-1"
                              required
                              type="password"
                              placeholder="Password"
                              value={password}
                              onChange={onChangeHandlerPassword}
                />
                <Row className="text-center m-2">
                    <Button type="submit" className="button m-1" onClick={onClickLogin}>Login</Button>
                    <Button type="submit" className="button m-1" onClick={onClickRegister}>Register</Button>
                </Row>
            </Form>
        </Container>
    );
}

export default Home;