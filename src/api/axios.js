import axios from "axios";

// Set the base URL for all requests to the Laravel API
axios.defaults.baseURL = "http://localhost:8000/api";  // Update with the correct URL

export default axios;