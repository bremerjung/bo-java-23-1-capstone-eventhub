import axios from "axios";
import {useState} from "react";
import {User} from "../model/User";

export default function useUser() {

    const [user, setUser] = useState<User>()

    function register(username: string, password: string) {
        return axios.post("/api/user/register", { username, password })
            .then((response) => setUser(response.data));
    }

    function login(username: string, password: string) {
        return axios.post("/api/user/login", undefined, {auth: {username, password}})
            .then((response) => setUser(response.data))
    }

    function logout() {
        return axios.post("/api/user/logout")
            .then(() => setUser(undefined));
    }

    return {register,login, logout, user};

}