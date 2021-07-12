<template>
    <div>
        <!--  Logged Out Buttons  -->
        <b-navbar-nav v-if="!this.$store.getters.getLoggedInStatus">
            <b-row>
                <b-button-group class="ml-2 mr-4">
                    <b-button
                        class="my-auto mr-sm-2 ml-sm-2"
                        variant="success"
                        @click="$bvModal.show('login-modal')"
                        >Login</b-button
                    >
                    <LoginPopup />
                    <b-button
                        class="my-auto mr-sm-4 ml-sm-2"
                        variant="success"
                        @click="$bvModal.show('signup-modal')"
                        >Sign Up</b-button
                    >
                    <SignupPopup />
                </b-button-group>
            </b-row>
        </b-navbar-nav>
        <!-- Logged In Buttons -->
        <b-navbar-nav v-if="this.$store.getters.getLoggedInStatus">
            <b-row>
                <b-button-group class="ml-2 mb-2 mr-4">
                    <b-button
                        v-b-modal.add-new-location-modal
                        class="my-auto mr-sm-2 ml-sm-2"
                        variant="success"
                    >
                        + Add Location
                    </b-button>
                    <AddNewLocationPopup />

                    <b-button
                        class="my-auto mr-sm-4 ml-sm-2"
                        variant="success"
                        @click="updateUIForLoggedOutView"
                    >
                        Logout
                    </b-button>
                </b-button-group>
            </b-row>
        </b-navbar-nav>
    </div>
</template>

<script>
import LoginPopup from '../popups/LoginPopup.vue'
import SignupPopup from '../popups/SignupPopup.vue'
import AddNewLocationPopup from '../popups/AddNewLocationPopup'
const NO_USER = -1

export default {
    components: {
        LoginPopup,
        SignupPopup,
        AddNewLocationPopup,
    },
    methods: {
        updateUIForLoggedOutView() {
            console.log('Logout')
            this.$store.dispatch('changeLoggedInUser', NO_USER)
            this.$store.dispatch('changeLoginStatus')
        },
    },
}
</script>
