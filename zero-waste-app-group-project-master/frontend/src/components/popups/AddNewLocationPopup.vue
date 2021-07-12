<template>
    <b-modal
        id="add-new-location-modal"
        title="Add New Zero Waste Business"
        hide-footer
    >
        <!-- Turn off the built in validation with html5 as we are using vuelidate and prevent the reload of the page -->
        <b-form @submit.prevent="saveNewLocation" novalidate>
            <b-form-group>
                <b-form-input
                    id="business-name-input"
                    type="text"
                    :class="{
                        'is-invalid':
                            this.attemptedSubmit && $v.businessName.$invalid,
                    }"
                    v-model.trim="businessName"
                    placeholder="Enter Business Name"
                />
                <div class="invalid-feedback" v-if="!$v.businessName.minLength">
                    User name must be at least 5 characters long
                </div>
                <div class="invalid-feedback" v-if="!$v.businessName.required">
                    You must enter a name for the business.
                </div>
            </b-form-group>
            <b-form-group>
                <b-form-input
                    id="business-website-input"
                    type="text"
                    :class="{
                        'is-invalid':
                            this.attemptedSubmit && $v.businessURL.$invalid,
                    }"
                    v-model.trim="businessURL"
                    placeholder="Enter Website URL"
                />
                <div class="invalid-feedback" v-if="!$v.businessURL.url">
                    Input should only be a url.
                </div>
                <div class="invalid-feedback" v-if="!$v.businessURL.required">
                    You must enter a url for the business.
                </div>
            </b-form-group>

            <b-form-group>
                <Autocomplete
                    id="business-location"
                    :class="{
                        location_search_bar: this.styleSearchBar,
                        invalid_search_bar:
                            this.attemptedSubmit && this.errorInAutocomplete,
                    }"
                    placeholder="Enter Business Location..."
                    @place_changed="placeChanged"
                    selectFirstOnEnter
                />
                <div
                    class="invalid-feedback-no-bootstrap"
                    v-if="this.errorInAutocomplete && this.attemptedSubmit"
                >
                    You must select a location for the business.
                </div>
            </b-form-group>

            <b-form-group>
                <!-- The user is not expected to upload an image so there is no validation for it here -->
                <b-form-file
                    class="image_selector"
                    v-model="images"
                    placeholder="Select images of the business to upload..."
                    multiple
                    drop-placeholder="Drop file here..."
                    accept="image/*"
                >
                </b-form-file>
            </b-form-group>

            <!-- Opening Times Selector: cannot be within it's own component as the v-model directive would not work -->
            <b-card class="mb-3" bg-variant="light">
                <h5 class="mb-3">Opening Times</h5>
                <b-form-group
                    label="Monday"
                    label-cols-sm="3"
                    label-cols-lg="3"
                >
                    <b-form-row>
                        <!-- Monday Time Picker -->
                        <b-col>
                            <b-form-timepicker
                                v-model="monday_start"
                                placeholder="Opens at..."
                                locale="en"
                                :class="{
                                    'is-invalid':
                                        this.attemptedSubmit &&
                                        ($v.monday_start.$invalid ||
                                            !isValidOpeningTime(
                                                monday_start,
                                                monday_end,
                                            )),
                                }"
                            />
                            <div
                                class="invalid-feedback"
                                v-if="!$v.monday_start.required"
                            >
                                Enter a time...
                            </div>
                        </b-col>
                        <b-col>
                            <b-form-timepicker
                                v-model="monday_end"
                                placeholder="Closes at..."
                                locale="en"
                                :class="{
                                    'is-invalid':
                                        attemptedSubmit &&
                                        ($v.monday_end.$invalid ||
                                            !isValidOpeningTime(
                                                monday_start,
                                                monday_end,
                                            )),
                                }"
                            />
                            <div
                                class="invalid-feedback"
                                v-if="!$v.monday_end.required"
                            >
                                Enter a time...
                            </div>
                        </b-col>
                        <div
                            class="invalid-feedback-no-bootstrap"
                            v-if="
                                this.attemptedSubmit &&
                                    !isValidOpeningTime(
                                        monday_start,
                                        monday_end,
                                    )
                            "
                        >
                            Start time cannot be before the end time.
                        </div>
                    </b-form-row>
                </b-form-group>
                <b-form-group
                    label="Tuesday"
                    label-cols-sm="3"
                    label-cols-lg="3"
                >
                    <b-form-row>
                        <!-- tuesday Time Picker -->
                        <b-col>
                            <b-form-timepicker
                                v-model="tuesday_start"
                                placeholder="Opens at..."
                                locale="en"
                                :class="{
                                    'is-invalid':
                                        this.attemptedSubmit &&
                                        ($v.tuesday_start.$invalid ||
                                            !isValidOpeningTime(
                                                tuesday_start,
                                                tuesday_end,
                                            )),
                                }"
                            />
                            <div
                                class="invalid-feedback"
                                v-if="!$v.tuesday_start.required"
                            >
                                Enter a time...
                            </div>
                        </b-col>
                        <b-col>
                            <b-form-timepicker
                                v-model="tuesday_end"
                                placeholder="Closes at..."
                                locale="en"
                                :class="{
                                    'is-invalid':
                                        attemptedSubmit &&
                                        ($v.tuesday_end.$invalid ||
                                            !isValidOpeningTime(
                                                tuesday_start,
                                                tuesday_end,
                                            )),
                                }"
                            />
                            <div
                                class="invalid-feedback"
                                v-if="!$v.tuesday_end.required"
                            >
                                Enter a time...
                            </div>
                        </b-col>
                        <div
                            class="invalid-feedback-no-bootstrap"
                            v-if="
                                this.attemptedSubmit &&
                                    !isValidOpeningTime(
                                        tuesday_start,
                                        tuesday_end,
                                    )
                            "
                        >
                            Start time cannot be before the end time.
                        </div>
                    </b-form-row>
                </b-form-group>
                <b-form-group
                    label="wednesday"
                    label-cols-sm="3"
                    label-cols-lg="3"
                >
                    <b-form-row>
                        <!-- wednesday Time Picker -->
                        <b-col>
                            <b-form-timepicker
                                v-model="wednesday_start"
                                placeholder="Opens at..."
                                locale="en"
                                :class="{
                                    'is-invalid':
                                        this.attemptedSubmit &&
                                        ($v.wednesday_start.$invalid ||
                                            !isValidOpeningTime(
                                                wednesday_start,
                                                wednesday_end,
                                            )),
                                }"
                            />
                            <div
                                class="invalid-feedback"
                                v-if="!$v.wednesday_start.required"
                            >
                                Enter a time...
                            </div>
                        </b-col>
                        <b-col>
                            <b-form-timepicker
                                v-model="wednesday_end"
                                placeholder="Closes at..."
                                locale="en"
                                :class="{
                                    'is-invalid':
                                        attemptedSubmit &&
                                        ($v.wednesday_end.$invalid ||
                                            !isValidOpeningTime(
                                                wednesday_start,
                                                wednesday_end,
                                            )),
                                }"
                            />
                            <div
                                class="invalid-feedback"
                                v-if="!$v.wednesday_end.required"
                            >
                                Enter a time...
                            </div>
                        </b-col>
                        <div
                            class="invalid-feedback-no-bootstrap"
                            v-if="
                                this.attemptedSubmit &&
                                    !isValidOpeningTime(
                                        wednesday_start,
                                        wednesday_end,
                                    )
                            "
                        >
                            Start time cannot be before the end time.
                        </div>
                    </b-form-row>
                </b-form-group>
                <b-form-group
                    label="thursday"
                    label-cols-sm="3"
                    label-cols-lg="3"
                >
                    <b-form-row>
                        <!-- thursday Time Picker -->
                        <b-col>
                            <b-form-timepicker
                                v-model="thursday_start"
                                placeholder="Opens at..."
                                locale="en"
                                :class="{
                                    'is-invalid':
                                        this.attemptedSubmit &&
                                        ($v.thursday_start.$invalid ||
                                            !isValidOpeningTime(
                                                thursday_start,
                                                thursday_end,
                                            )),
                                }"
                            />
                            <div
                                class="invalid-feedback"
                                v-if="!$v.thursday_start.required"
                            >
                                Enter a time...
                            </div>
                        </b-col>
                        <b-col>
                            <b-form-timepicker
                                v-model="thursday_end"
                                placeholder="Closes at..."
                                locale="en"
                                :class="{
                                    'is-invalid':
                                        attemptedSubmit &&
                                        ($v.thursday_end.$invalid ||
                                            !isValidOpeningTime(
                                                thursday_start,
                                                thursday_end,
                                            )),
                                }"
                            />
                            <div
                                class="invalid-feedback"
                                v-if="!$v.thursday_end.required"
                            >
                                Enter a time...
                            </div>
                        </b-col>
                        <div
                            class="invalid-feedback-no-bootstrap"
                            v-if="
                                this.attemptedSubmit &&
                                    !isValidOpeningTime(
                                        thursday_start,
                                        thursday_end,
                                    )
                            "
                        >
                            Start time cannot be before the end time.
                        </div>
                    </b-form-row>
                </b-form-group>
                <b-form-group
                    label="friday"
                    label-cols-sm="3"
                    label-cols-lg="3"
                >
                    <b-form-row>
                        <!-- friday Time Picker -->
                        <b-col>
                            <b-form-timepicker
                                v-model="friday_start"
                                placeholder="Opens at..."
                                locale="en"
                                :class="{
                                    'is-invalid':
                                        this.attemptedSubmit &&
                                        ($v.friday_start.$invalid ||
                                            !isValidOpeningTime(
                                                friday_start,
                                                friday_end,
                                            )),
                                }"
                            />
                            <div
                                class="invalid-feedback"
                                v-if="!$v.friday_start.required"
                            >
                                Enter a time...
                            </div>
                        </b-col>
                        <b-col>
                            <b-form-timepicker
                                v-model="friday_end"
                                placeholder="Closes at..."
                                locale="en"
                                :class="{
                                    'is-invalid':
                                        attemptedSubmit &&
                                        ($v.friday_end.$invalid ||
                                            !isValidOpeningTime(
                                                friday_start,
                                                friday_end,
                                            )),
                                }"
                            />
                            <div
                                class="invalid-feedback"
                                v-if="!$v.friday_end.required"
                            >
                                Enter a time...
                            </div>
                        </b-col>
                        <div
                            class="invalid-feedback-no-bootstrap"
                            v-if="
                                this.attemptedSubmit &&
                                    !isValidOpeningTime(
                                        friday_start,
                                        friday_end,
                                    )
                            "
                        >
                            Start time cannot be before the end time.
                        </div>
                    </b-form-row>
                </b-form-group>
                <b-form-group
                    label="saturday"
                    label-cols-sm="3"
                    label-cols-lg="3"
                >
                    <b-form-row>
                        <!-- saturday Time Picker -->
                        <b-col>
                            <b-form-timepicker
                                v-model="saturday_start"
                                placeholder="Opens at..."
                                locale="en"
                                :class="{
                                    'is-invalid':
                                        this.attemptedSubmit &&
                                        ($v.saturday_start.$invalid ||
                                            !isValidOpeningTime(
                                                saturday_start,
                                                saturday_end,
                                            )),
                                }"
                            />
                            <div
                                class="invalid-feedback"
                                v-if="!$v.saturday_start.required"
                            >
                                Enter a time...
                            </div>
                        </b-col>
                        <b-col>
                            <b-form-timepicker
                                v-model="saturday_end"
                                placeholder="Closes at..."
                                locale="en"
                                :class="{
                                    'is-invalid':
                                        attemptedSubmit &&
                                        ($v.saturday_end.$invalid ||
                                            !isValidOpeningTime(
                                                saturday_start,
                                                saturday_end,
                                            )),
                                }"
                            />
                            <div
                                class="invalid-feedback"
                                v-if="!$v.saturday_end.required"
                            >
                                Enter a time...
                            </div>
                        </b-col>
                        <div
                            class="invalid-feedback-no-bootstrap"
                            v-if="
                                this.attemptedSubmit &&
                                    !isValidOpeningTime(
                                        saturday_start,
                                        saturday_end,
                                    )
                            "
                        >
                            Start time cannot be before the end time.
                        </div>
                    </b-form-row>
                </b-form-group>
                <b-form-group
                    label="sunday"
                    label-cols-sm="3"
                    label-cols-lg="3"
                >
                    <b-form-row>
                        <!-- sunday Time Picker -->
                        <b-col>
                            <b-form-timepicker
                                v-model="sunday_start"
                                placeholder="Opens at..."
                                locale="en"
                                :class="{
                                    'is-invalid':
                                        this.attemptedSubmit &&
                                        ($v.sunday_start.$invalid ||
                                            !isValidOpeningTime(
                                                sunday_start,
                                                sunday_end,
                                            )),
                                }"
                            />
                            <div
                                class="invalid-feedback"
                                v-if="!$v.sunday_start.required"
                            >
                                Enter a time...
                            </div>
                        </b-col>
                        <b-col>
                            <b-form-timepicker
                                v-model="sunday_end"
                                placeholder="Closes at..."
                                locale="en"
                                :class="{
                                    'is-invalid':
                                        attemptedSubmit &&
                                        ($v.sunday_end.$invalid ||
                                            !isValidOpeningTime(
                                                sunday_start,
                                                sunday_end,
                                            )),
                                }"
                            />
                            <div
                                class="invalid-feedback"
                                v-if="!$v.sunday_end.required"
                            >
                                Enter a time...
                            </div>
                        </b-col>
                        <div
                            class="invalid-feedback-no-bootstrap"
                            v-if="
                                this.attemptedSubmit &&
                                    !isValidOpeningTime(
                                        sunday_start,
                                        sunday_end,
                                    )
                            "
                        >
                            Start time cannot be before the end time.
                        </div>
                    </b-form-row>
                </b-form-group>
            </b-card>

            <!-- Buttons at the bottom of the form -->
            <div>
                <b-row>
                    <b-col>
                        <b-button type="submit" class="w-100" variant="success">
                            Save
                        </b-button>
                    </b-col>
                    <b-col>
                        <b-button
                            @click="clearFields"
                            type="reset"
                            class="w-100"
                            variant="secondary"
                        >
                            Clear
                        </b-button>
                    </b-col>
                </b-row>
            </div>
        </b-form>
    </b-modal>
</template>

<script>
import { required, minLength, url } from 'vuelidate/lib/validators'
import { Autocomplete } from 'vue2-google-maps'
import BusinessService from '../../services/BusinessService'

export default {
    components: {
        Autocomplete,
    },
    data: () => {
        return {
            // v-model creates a two way connection between data here and the form inputs that edit the values.
            businessName: '',
            businessURL: '',
            images: [],
            location: {
                lat: '',
                lng: '',
            },
            monday_start: '',
            monday_end: '',
            tuesday_start: '',
            tuesday_end: '',
            wednesday_start: '',
            wednesday_end: '',
            thursday_start: '',
            thursday_end: '',
            friday_start: '',
            friday_end: '',
            saturday_start: '',
            saturday_end: '',
            sunday_start: '',
            sunday_end: '',

            monday_invalid: false,
            tuesday_invalid: false,
            wednesday_invalid: false,
            thursday_invalid: false,
            friday_invalid: false,
            saturday_invalid: false,
            sunday_invalid: false,

            errorWithFormInputs: false,
            attemptedSubmit: false,
            styleSearchBar: true,
            errorInAutocomplete: false,
        }
    },
    validations: {
        businessName: {
            required,
            minLength: minLength(5),
        },
        businessURL: {
            required,
            url,
        },
        monday_start: {
            required,
        },
        monday_end: {
            required,
        },
        tuesday_start: {
            required,
        },
        tuesday_end: {
            required,
        },
        wednesday_start: {
            required,
        },
        wednesday_end: {
            required,
        },
        thursday_start: {
            required,
        },
        thursday_end: {
            required,
        },
        friday_start: {
            required,
        },
        friday_end: {
            required,
        },
        saturday_start: {
            required,
        },
        saturday_end: {
            required,
        },
        sunday_start: {
            required,
        },
        sunday_end: {
            required,
        },
    },
    watch: {
        location: function() {
            this.checkLocation()
        },
    },
    created() {
        //* used to fill the form for testing
        this.fillForm()
    },
    methods: {
        isValidOpeningTime(startTime, endTime) {
            // if the user has entered a start and end time then do the comparisons
            if (startTime !== '' && endTime !== '') {
                // if the start time is greater than the end time then return false
                if (startTime > endTime) {
                    return false
                }
            }
            return true
        },
        async convertImages(images) {
            let c_images = []
            for (let image of images) {
                const c_image = await this.convertImageFileToBase64(image)
                c_images.push(c_image)
            }
            return c_images
        },
        convertImageFileToBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = () => resolve(reader.result)
                reader.onerror = error => reject(error)
            })
        },
        async saveNewLocation() {
            this.attemptedSubmit = true
            this.checkLocation()

            const convertedImages = await this.convertImages(this.images)

            const businessFormData = {
                name: this.businessName,
                url: this.businessURL,
                location: this.location,
                images: convertedImages,
                monday: {
                    start: this.monday_start,
                    end: this.monday_end,
                },
                tuesday: {
                    start: this.tuesday_start,
                    end: this.tuesday_end,
                },
                wednesday: {
                    start: this.wednesday_start,
                    end: this.wednesday_end,
                },
                thursday: {
                    start: this.thursday_start,
                    end: this.thursday_end,
                },
                friday: {
                    start: this.friday_start,
                    end: this.friday_end,
                },
                saturday: {
                    start: this.saturday_start,
                    end: this.saturday_end,
                },
                sunday: {
                    start: this.sunday_start,
                    end: this.sunday_end,
                },
            }

            // custom autocomplete in the autocomplete component so need to check for that as well
            if (!(this.$v.$invalid || this.errorInAutocomplete)) {
                const response = await BusinessService.saveNewBusiness(
                    businessFormData,
                )
                if (response.status == 201) {
                    alert('Successfully saved the business to the database!')
                    this.clearFields()
                    this.$store.dispatch('fetchLocationMarkers')
                } else {
                    alert(
                        `Error saving data to database, code recieved from database is ${response.status}`,
                    )
                }
            }
        },
        //manually check the Autocomplete elements as the vue2-google-maps component cannot be validated using vuelidate
        checkLocation() {
            if (this.location.lat == '' && this.location.lng == '') {
                // alert('Show the errors')
                this.errorInAutocomplete = true
            } else {
                // alert('Hide the errors')
                this.errorInAutocomplete = false
            }
        },

        clearFields() {
            this.attemptedSubmit = false
            this.businessName = ''
            this.businessURL = ''
            let autocompleteSearch = document.getElementById(
                'business-location',
            )
            autocompleteSearch.value = ''
            this.location.lat = ''
            this.location.lng = ''
            this.images = []
            this.monday_start = ''
            this.monday_end = ''
            this.tuesday_start = ''
            this.tuesday_end = ''
            this.wednesday_start = ''
            this.wednesday_end = ''
            this.thursday_start = ''
            this.thursday_end = ''
            this.friday_start = ''
            this.friday_end = ''
            this.saturday_start = ''
            this.saturday_end = ''
            this.sunday_start = ''
            this.sunday_end = ''
        },
        placeChanged(place) {
            // save the new data into the location object:
            this.location = place.geometry.location
        },

        //* DEVELOPER HELPER METHODS METHODS:
        fillForm() {
            this.businessName = 'Example Food Store'
            this.businessURL =
                'https://www.google.com/search?client=firefox-b-d&q=food'
            this.location.lat = '-8'
            this.location.lng = '8'
            this.images = []
            this.monday_end = '09:00:00'
            this.monday_start = '09:00:00'
            this.tuesday_start = '09:00:00'
            this.tuesday_end = '09:00:00'
            this.wednesday_start = '09:00:00'
            this.wednesday_end = '09:00:00'
            this.thursday_start = '09:00:00'
            this.thursday_end = '09:00:00'
            this.friday_start = '09:00:00'
            this.friday_end = '09:00:00'
            this.saturday_start = '09:00:00'
            this.saturday_end = '09:00:00'
            this.sunday_start = '09:00:00'
            this.sunday_end = '09:00:00'
        },
    },
}
</script>

<style>
.location_search_bar {
    color: #495057;
    font-size: 1rem;
    font-weight: 400;
    width: 100%;
    padding: 0.375rem 0.75rem;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
}
.invalid_search_bar {
    border-color: #dc3545;
}
.location_search_bar::placeholder {
    color: #495057 !important;
    opacity: 0.8;
}
.image_selector::placeholder {
    color: red !important;
    /* opacity: 0.8; */
}
.invalid-feedback-no-bootstrap {
    font-size: 0.8rem;
    color: #dc3545;
}
</style>
