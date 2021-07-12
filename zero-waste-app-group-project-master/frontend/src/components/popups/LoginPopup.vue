<template>
    <b-modal id="login-modal" title="Enter Login Credentials" hide-footer>
        <b-form @submit.prevent="login" novalidate>
            <b-form-group>
                <b-form-input
                    id="username-input"
                    type="text"
                    :class="{
                        'is-invalid':
                            this.attemptedSubmit && $v.username.$invalid,
                    }"
                    v-model.trim="username"
                    placeholder="Enter Username"
                />
                <div class="invalid-feedback" v-if="!$v.username.required">
                    Username is required.
                </div>
            </b-form-group>
            <b-form-group>
                <b-form-input
                    id="password-input"
                    type="password"
                    :class="{
                        'is-invalid':
                            this.attemptedSubmit && $v.password.$invalid,
                    }"
                    v-model.trim="password"
                    placeholder="Enter Password"
                />
                <div class="invalid-feedback" v-if="!$v.password.required">
                    Password is required.
                </div>
            </b-form-group>
            <div class="container">
                <b-button type="submit" class="mr-2" variant="success"
                    >Login</b-button
                >
                <b-button
                    type="reset"
                    @click="clearFields"
                    class="ml-2"
                    variant="secondary"
                    >Clear</b-button
                >
            </div>
        </b-form>
    </b-modal>
</template>

<script>
import AuthenticationService from '../../services/AuthenticationService'
import { required } from 'vuelidate/lib/validators'

export default {
    data: () => {
        return {
            username: '',
            password: '',

            error: null,

            attemptedSubmit: false,
            errorInAutocomplete: false,
        }
    },
    validations: {
        username: {
            required,
        },
        password: {
            required,
        },
    },
    methods: {
        async login() {
            this.attemptedSubmit = true

            const loginFormData = {
                username: this.username,
                password: this.password,
            }
            try {
                if (!(this.$v.$invalid || this.errorInAutocomplete)) {
                    const response = await AuthenticationService.login(
                        loginFormData,
                    )
                    if (response.status == 202) {
                        this.clearFields()
                        alert(`Successfully logged in.`)
                        // hide the login form
                        this.$bvModal.hide('login-modal')

                        // set the logged in user and update the UI
                        this.$store.dispatch(
                            'changeLoggedInUser',
                            response.data.userID,
                        )
                        this.$store.dispatch('changeLoginStatus')
                    } else {
                        alert(
                            `Error retrieving data from database, code recieved from database is ${response.status}`,
                        )
                    }
                }
            } catch (err) {
                console.log(err)
            }
        },

        clearFields() {
            this.attemptedSubmit = false

            this.username = ''
            this.password = ''

            this.$v.$reset()
        },
    },
}
</script>

<style>
/* This class is needed to display the signup and clear buttons next to each */
.container {
    display: grid;
    grid-template-columns: 50% 50%;
}
</style>
