import axios from "axios";

export default axios.create({
    baseURL: 'http://price-tracker-backend.onrender.com'
});