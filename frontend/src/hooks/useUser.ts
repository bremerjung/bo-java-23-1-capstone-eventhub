import axios from "axios";
import {useState} from "react";
import {User} from "../model/User";
import {toast} from 'react-toastify';
import {useNavigate} from "react-router-dom";

export default function useUser() {

    const [user, setUser] = useState<User | undefined>(undefined);
    const navigate = useNavigate();

    function register(username: string, password: string) {
        return axios.post("/api/user/register", {username, password})
            .then((response) => {
                setUser(response.data)
                toast.success("Registration successful");
            })
            .catch((error) => {
                const message =
                    error?.response?.data || "Registration failed";
                toast.error(message);
            });
    }

    function login(username: string, password: string) {
        return axios.post("/api/user/login", undefined, {auth: {username, password}})
            .then((response) => {
                setUser(response.data)
                toast.success("Login successful");
            })
            .catch((error) => {
                const message =
                    error?.response?.data?.message;
                toast.error(`Login failed: ${message}`);
            });
    }

    function logout() {
        return axios.post("/api/user/logout")
            .then(() => {
                setUser(undefined)
                toast.success("Logout successful");
                navigate("/");
            })
            .catch((error) => {
                const message =
                    error?.response?.data?.message;
                toast.error(`Logout failed: ${message}`);
            });
    }

    function updateUserPreferredCategories(selectedCategories: string[]) {
        return axios.put("/api/user/update-preferred-categories", {username: user?.username, categories: selectedCategories})
            .then((response) => {
                setUser(response.data)
                toast.success("Preferred categories updated");
            })
            .catch((error) => {
                const message =
                    error?.response?.data?.message;
                toast.error(`Update failed: ${message}`);
            });

    }

    return {user, register, login, logout, updateUserPreferredCategories};

}