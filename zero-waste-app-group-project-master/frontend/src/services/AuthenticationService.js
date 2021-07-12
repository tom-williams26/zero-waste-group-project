import Api from '@/services/Api'

export default {
    async signup(signupCredentials) {
        return Api().post('signup', signupCredentials)
    },

    async login(loginCredentials) {
        return Api().post('login', loginCredentials)
    },
}
