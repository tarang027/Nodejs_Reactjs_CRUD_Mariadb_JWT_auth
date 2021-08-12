import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:5000/",
    headers: {
        authorization: `Bearer ${localStorage.getItem("jwt_access_token")}`,
    },
});