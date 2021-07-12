<template>
    <b-modal id="signup-modal" title="Sign Up" hide-footer>
        <!-- This prevents the page reload with the form submission -->
        <b-form @submit.prevent="signup" novalidate>
            <b-form-group>
                <b-form-input
                    id="first-name-input"
                    type="text"
                    :class="{
                        'is-invalid':
                            this.attemptedSubmit && $v.firstName.$invalid,
                        'is-valid':
                            this.attemptedSubmit && !$v.firstName.$invalid,
                    }"
                    v-model.trim="firstName"
                    placeholder="Enter First Name"
                />
                <div class="valid-feedback">First name is valid.</div>
                <div class="invalid-feedback">
                    <span v-if="!$v.firstName.required"
                        >Please enter a first name for the registration.</span
                    >
                    <span v-if="!$v.firstName.minLength"
                        >First name must be at least 3 characters long.</span
                    >
                </div>
            </b-form-group>
            <b-form-group>
                <b-form-input
                    id="last-name-input"
                    type="text"
                    :class="{
                        'is-invalid':
                            this.attemptedSubmit && $v.lastName.$invalid,
                        'is-valid':
                            this.attemptedSubmit && !$v.lastName.$invalid,
                    }"
                    v-model.trim="lastName"
                    placeholder="Enter Last Name"
                />
                <div class="valid-feedback">
                    Last name is valid.
                </div>
                <div class="invalid-feedback">
                    <span v-if="!$v.lastName.required"
                        >Please enter a last name for the registration.</span
                    >
                    <span v-if="!$v.lastName.minLength"
                        >Last name must be at least 3 characters long.</span
                    >
                </div>
            </b-form-group>
            <b-form-group>
                <b-form-input
                    id="username-input"
                    type="text"
                    :class="{
                        'is-invalid':
                            this.attemptedSubmit && $v.username.$invalid,
                        'is-valid':
                            this.attemptedSubmit && !$v.username.$invalid,
                    }"
                    v-model.trim="username"
                    placeholder="Enter Username"
                />
                <div class="valid-feedback">Username is available.</div>
                <div class="invalid-feedback">
                    <span v-if="!$v.username.required"
                        >Please enter a username for the registration.</span
                    >
                    <!-- <span v-if="!$v.username.isUnique"
                        >The username is already registered.</span
                    > -->
                    <span v-if="!$v.username.minLength"
                        >Username must be 5 characters or more</span
                    >
                </div>
            </b-form-group>
            <b-form-group>
                <b-form-input
                    id="email-address-input"
                    type="email"
                    :class="{
                        'is-invalid':
                            this.attemptedSubmit && $v.emailAddress.$invalid,
                        'is-valid':
                            this.attemptedSubmit && !$v.emailAddress.$invalid,
                    }"
                    v-model.trim="emailAddress"
                    placeholder="Enter Email Address"
                />
                <div class="valid-feedback">Email address is valid.</div>
                <div class="invalid-feedback">
                    <span v-if="!$v.emailAddress.required"
                        >Please enter a Email address for the
                        registration.</span
                    >
                    <span v-if="!$v.emailAddress.isUnique"
                        >Please enter a valid email address.</span
                    >
                </div>
            </b-form-group>
            <b-form-group>
                <b-form-input
                    id="password"
                    type="password"
                    :class="{
                        'is-invalid':
                            this.attemptedSubmit && $v.password.$invalid,
                        'is-valid':
                            this.attemptedSubmit && !$v.password.$invalid,
                    }"
                    v-model.trim="password"
                    placeholder="Enter Password"
                />
                <div class="valid-feedback">Password is suitable.</div>
                <div class="invalid-feedback">
                    <span v-if="!$v.password.required"
                        >Please enter a password for the registration.
                    </span>
                    <span v-if="!$v.password.strongPassword"
                        >Password needs to be 8 charcters or more (Must contain
                        at least a number, letter and a special
                        character).</span
                    >
                </div>
            </b-form-group>
            <b-form-group>
                <b-form-input
                    id="confirm-password-input"
                    type="password"
                    :class="{
                        'is-invalid':
                            this.attemptedSubmit && $v.confirmPassword.$invalid,
                        'is-valid':
                            this.attemptedSubmit && password != ''
                                ? !$v.confirmPassword.$invalid
                                : '',
                    }"
                    v-model.trim="confirmPassword"
                    placeholder="Confirm Password"
                />
                <div class="valid-feedback">Passwords match!</div>
                <div
                    class="invalid-feedback"
                    v-if="!$v.confirmPassword.sameAsPassword"
                >
                    Passwords do not match.
                </div>
            </b-form-group>
            <div class="container">
                <b-button type="submit" class="mr-2" variant="success"
                    >Sign Up</b-button
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
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'
export default {
    data: () => {
        return {
            firstName: '',
            lastName: '',
            username: '',
            emailAddress: '',
            password: '',
            confirmPassword: '',

            showPassword: false,
            errorWithFormInputs: false,
            attemptedSubmit: false,
            errorInAutocomplete: false,
        }
    },
    validations: {
        firstName: {
            required,
            minLength: minLength(3),
        },
        lastName: {
            required,
            minLength: minLength(3),
        },
        username: {
            required,
            minLength: minLength(5),
            isUnique(value) {
                if (value === '') return true
                return new Promise(resolve => {
                    setTimeout(() => {
                        resolve(
                            typeof value === 'string' && value.length % 2 !== 0,
                        )
                    }, 350 + Math.random() * 300)
                })
            },
        },
        emailAddress: {
            required,
            email,
            isUnique(value) {
                if (value === '') return true

                // eslint-disable-next-line
                var email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return new Promise(resolve => {
                    setTimeout(() => {
                        resolve(email_regex.test(value))
                    }, 350 + Math.random() * 300)
                })
            },
        },
        password: {
            required,
            strongPassword(password) {
                return (
                    /[A-Z]/.test(password) && // Must contain at least one upper case character.
                    /[a-z]/.test(password) && // Must contain at least one lower case character.
                    /[0-9]/.test(password) && // Must contain at least one numerical value.
                    /\W|_/.test(password) && // Must contain at least one special character.
                    password.length >= 8 // Password must me eight or more characters.
                )
            },
        },
        confirmPassword: {
            required,
            sameAsPassword: sameAs('password'),
        },
    },
    created() {
        // fill the form
        this.firstName = ''
        this.lastName = ''
        this.username = ''
        this.emailAddress = ''
        this.password = ''
        this.confirmPassword = ''
    },
    methods: {
        async signup() {
            this.attemptedSubmit = true

            const signupFormData = {
                firstName: this.firstName,
                lastName: this.lastName,
                username: this.username,
                emailAddress: this.emailAddress,
                password: this.password,
                confirmPassword: this.confirmPassword,
            }
            try {
                if (!(this.$v.$invalid || this.errorInAutocomplete)) {
                    const response = await AuthenticationService.signup(
                        signupFormData,
                    )

                    if (response.status == 202) {
                        alert('Successfully signed up!')
                        this.clearFields()

                        // hide the signup popup
                        this.$bvModal.hide('signup-modal')
                        // update the UI so the user is logged in
                        this.$store.dispatch(
                            'changeLoggedInUser',
                            response.data.userID,
                        )
                        this.$store.dispatch('changeLoginStatus')
                    } else {
                        alert(
                            `Error saving data to database, code recieved from database is ${response.status}`,
                        )
                        console.log(response.data)
                    }
                }
            } catch (err) {
                console.log(err)
            }
        },

        clearFields() {
            this.attemptedSubmit = false

            this.firstName = ''
            this.lastName = ''
            this.username = ''
            this.emailAddress = ''
            this.password = ''
            this.confirmPassword = ''
            //this.profileImage = ''

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
