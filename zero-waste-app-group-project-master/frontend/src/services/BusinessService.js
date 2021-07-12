import Api from '@/services/Api'

export default {
    saveNewBusiness(business) {
        return Api().post('businesses', business)
    },
    getBusinessById(id) {
        return Api().get(`businesses/${id}`)
    },
    saveNewReview(review) {
        return Api().post(`reviews`, review)
    },
}
