import secureLocalStorage from "react-secure-storage";

function getStoredUser() {
    const storedUserString = secureLocalStorage.getItem("user");
    return typeof storedUserString === "string" ? JSON.parse(storedUserString) : undefined;
}

export default getStoredUser;