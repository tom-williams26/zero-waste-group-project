import Vue from 'vue'
import Vuex from 'vuex'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import { BootstrapVue, FormTimepickerPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import LocationMarkerService from './services/LocationMarkerService'
import BusinessService from './services/BusinessService'
import GoogleMapsService from './services/GoogleMapsService'

Vue.use(BootstrapVue)
Vue.use(FormTimepickerPlugin)
Vue.use(Vuelidate)
Vue.use(Vuex)

// centralised data store for the entire application
const store = new Vuex.Store({
    state: {
        isUserLoggedIn: false,
        loggedInUser: -1,
        locationMarkers: [],
        currentDisplayedBusiness: {
            id: -1,
            name: 'Default Name',
            url: 'https://www.example.com',
            openingTimes: {
                id: -1,
                monStartTime: '00:00:00',
                monEndTime: '00:00:00',
                tueStartTime: '00:00:00',
                tueEndTime: '00:00:00',
                wedStartTime: '00:00:00',
                wedEndTime: '00:00:00',
                thursStartTime: '00:00:00',
                thursEndTime: '00:00:00',
                friStartTime: '00:00:00',
                friEndTime: '00:00:00',
                satStartTime: '00:00:00',
                satEndTime: '00:00:00',
                sunStartTime: '00:00:00',
                sunEndTime: '00:00:00',
            },
            locationMarker: {
                id: -1,
                longitude: 0,
                latitude: 0,
            },
            reviews: [],
            images: [],
        },
        formattedAddressOfCurrentDisplayedBusiness: 'Example Address',
    },
    getters: {
        getLoggedInStatus(state) {
            return state.isUserLoggedIn
        },
        getLoggedInUser(state) {
            return state.loggedInUser
        },
        getCurrentDisplayedBusiness(state) {
            return state.currentDisplayedBusiness
        },
        getLocationMarkers(state) {
            return state.locationMarkers
        },
        getFormattedAddressOfCurrentDisplayedBusiness(state) {
            return state.formattedAddressOfCurrentDisplayedBusiness
        },
    },
    mutations: {
        mutateLoginStatus(state) {
            state.isUserLoggedIn = !state.isUserLoggedIn
        },
        mutateLoggedInUser(state, user) {
            state.loggedInUser = user
        },
        mutateCurrentDisplayedBusiness(state, business) {
            state.currentDisplayedBusiness = business
        },
        updateLocationMarkers(state, locationMarkers) {
            state.locationMarkers = locationMarkers
        },
        updateFormattedAddressOfCurrentDisplayedBusiness(
            state,
            formattedAddress,
        ) {
            state.formattedAddressOfCurrentDisplayedBusiness = formattedAddress
        },
    },
    actions: {
        changeLoginStatus(state) {
            state.commit('mutateLoginStatus')
        },
        changeLoggedInUser(state, user) {
            state.commit('mutateLoggedInUser', user)
        },
        async fetchBusinessFromDatabase(state, businessId) {
            // get business from the database and update the store
            let response = await BusinessService.getBusinessById(businessId)
            state.commit('mutateCurrentDisplayedBusiness', response.data)
        },
        async fetchFormattedAddress(state, position) {
            // get the formattted address from reverese geocoding api and update the store
            let geocodingResponse = await GoogleMapsService.getAddress(
                position.lat,
                position.lng,
            )
            state.commit(
                'updateFormattedAddressOfCurrentDisplayedBusiness',
                geocodingResponse.data.results[0].formatted_address,
            )
        },
        async fetchLocationMarkers(state) {
            // get the markers from the database
            let response = await LocationMarkerService.getAllMarkers()
            state.commit('updateLocationMarkers', response.data)
        },
    },
})

Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyAVH1rbi9P1z16KpXGURlQFhSBHwhSa1CI',
        libraries: 'places', // This is required if you use the Autocomplete plugin
        // v: '3.38',
    },
})
Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    store: store,
}).$mount('#app')
