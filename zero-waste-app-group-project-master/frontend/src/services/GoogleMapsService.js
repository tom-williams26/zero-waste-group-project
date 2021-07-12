import axios from 'axios'
let API_KEY = 'AIzaSyAVH1rbi9P1z16KpXGURlQFhSBHwhSa1CI'

export default {
    getAddress(lat, lng) {
        return axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`,
        )
    },
}
