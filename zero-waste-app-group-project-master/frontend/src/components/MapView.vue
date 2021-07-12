<template>
    <div class="map-wrapper">
        <GmapMap class="g-map" :center="center" :zoom="3">
            <GmapMarker
                id="marker"
                :key="index"
                v-for="(marker, index) in this.$store.getters
                    .getLocationMarkers"
                :position="{
                    lat: parseFloat(marker.latitude),
                    lng: parseFloat(marker.longitude),
                }"
                :clickable="true"
                :draggable="true"
                :visible="true"
                @click="toggleInfoWindow(marker)"
            />
            <GmapInfoWindow
                v-if="infoWindowOpen"
                :position="this.infoWindowPosition"
                :options="infoWindowOptions"
                @closeclick="closeInfoWindow()"
            >
                <InfoWindow />
            </GmapInfoWindow>
        </GmapMap>
    </div>
</template>

<script>
import InfoWindow from './popups/InfoWindow'
// import GoogleMapsService from '../services/GoogleMapsService'

export default {
    data() {
        return {
            center: { lat: 51.589357, lng: -3.330733 },
            infoWindowOpen: false,
            infoWindowPosition: { lat: 51.589357, lng: -3.330733 },
            // By default the info Window is positioned directly above the marker so we offset it to look better.
            infoWindowOptions: { pixelOffset: { width: 0, height: -41 } },
        }
    },
    components: {
        InfoWindow,
    },
    async mounted() {
        this.geoLocate()
        // get all of the markers from the database
        this.$store.dispatch('fetchLocationMarkers')
    },
    methods: {
        geoLocate() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    this.center = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    }
                })
            } else {
                alert('Geolocation is not supported by this browser.')
            }
        },
        async toggleInfoWindow(marker) {
            if (
                this.$store.getters.getCurrentDisplayedBusiness ===
                { lat: marker.latitude, lng: marker.longitude }
            ) {
                // if the user selected the same marker then toggle whether it is visible or not.
                this.infoWindowOpen = !this.infoWindowOpen
            } else {
                // update the store of the current displayed business:
                this.$store.dispatch(
                    'fetchBusinessFromDatabase',
                    marker.business.id,
                )

                this.$store.dispatch('fetchFormattedAddress', {
                    lat: marker.latitude,
                    lng: marker.longitude,
                })

                this.infoWindowPosition = {
                    lat: parseFloat(marker.latitude),
                    lng: parseFloat(marker.longitude),
                }

                this.infoWindowOpen = true
            }
        },
        closeInfoWindow() {
            this.infoWindowOpen = false
        },
    },
}
</script>

<style lang="scss">
@import '../assets/styles.scss';

.g-map {
    position: relative;
    height: 100%;
    width: 100%;
}

.map-wrapper {
    position: fixed;
    width: 100vw;
    height: 100vh;
    padding: 0;
    margin: 0;
}
</style>
