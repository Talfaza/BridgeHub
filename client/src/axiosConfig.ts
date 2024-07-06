import axios from 'axios';

// Set default base URL
axios.defaults.baseURL = 'http://localhost:3000';

// Enable sending cookies with every request
axios.defaults.withCredentials = true;

export default axios;
