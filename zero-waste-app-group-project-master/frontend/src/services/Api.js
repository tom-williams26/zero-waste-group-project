import axios from 'axios'

// Setting up the connector
// Gives back a connector
// Helps for hitting different endpoints.
export default () => {
    // points to the backend URL.
    return axios.create({
        baseURL: 'http://localhost:3000/',
    })
}
