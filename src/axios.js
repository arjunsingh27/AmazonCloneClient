import axios from "axios";

const instance = axios.create({
    baseURL:'https://amazoncloneserver-g8i7.onrender.com'
});

export default instance;
//http://localhost:5002