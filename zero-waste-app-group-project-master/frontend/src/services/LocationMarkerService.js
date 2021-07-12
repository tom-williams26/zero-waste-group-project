import Api from '@/services/Api'

export default {
    getAllMarkers() {
        return Api().get('locationMarkers')
    },
}
