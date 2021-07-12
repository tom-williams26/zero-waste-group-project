<template>
    <div>
        <b-modal id="detailed-location-modal" hide-footer hide-header>
            <!-- <div>
                <b-carousel
                    id="carousel-1"
                    :interval="4000"
                    controls
                    indicators
                    background="#ababab"
                    img-width="1024"
                    img-height="480"
                    @sliding-start="onSlideStart"
                    @sliding-end="onSlideEnd"
                >
                    <b-carousel-slide
                        v-for="img in this.$store.getters
                            .getCurrentDisplayedBusiness.images"
                        :key="img.id"
                        :img-src="img.image"
                    >
                    </b-carousel-slide>
                </b-carousel>
            </div> -->
            <h4 class="mt-4">
                {{ this.$store.getters.getCurrentDisplayedBusiness.name }}
            </h4>
            <hr />
            <star-rating
                :rating="
                    this.$store.getters.getCurrentDisplayedBusiness
                        .averageRating
                "
                read-only
                :star-size="30"
                text-class="rating_text"
                :round-start-rating="false"
                :increment="0.1"
            />
            <hr />
            <p>
                <b>Address: </b
                >{{
                    this.$store.getters
                        .getFormattedAddressOfCurrentDisplayedBusiness
                }}
            </p>
            <p>
                <b>Website: </b>
                <a
                    :href="this.$store.getters.getCurrentDisplayedBusiness.url"
                    >{{
                        this.$store.getters.getCurrentDisplayedBusiness.url
                    }}</a
                >
            </p>
            <!-- <b-list-group>
                <b-list-group-item> <h5>Opening Times:</h5> </b-list-group-item>
                <b-list-group-item>
                    <b>Monday: </b>
                    {{
                        this.$store.getters.getCurrentDisplayedBusiness
                            .openingTimes.monStartTime
                    }}
                    to
                    {{
                        this.$store.getters.getCurrentDisplayedBusiness
                            .openingTimes.monEndTime
                    }}
                </b-list-group-item>
                <b-list-group-item>
                    <b>Tuesday: </b>
                    {{
                        this.$store.getters.getCurrentDisplayedBusiness
                            .openingTimes.tueStartTime
                    }}
                    to
                    {{
                        this.$store.getters.getCurrentDisplayedBusiness
                            .openingTimes.tueEndTime
                    }}
                </b-list-group-item>
                <b-list-group-item>
                    <b>Wednesday: </b>
                    {{
                        this.$store.getters.getCurrentDisplayedBusiness
                            .openingTimes.wedStartTime
                    }}
                    to
                    {{
                        this.$store.getters.getCurrentDisplayedBusiness
                            .openingTimes.wedEndTime
                    }}
                </b-list-group-item>
                <b-list-group-item>
                    <b>Thursday: </b>
                    {{
                        this.$store.getters.getCurrentDisplayedBusiness
                            .openingTimes.thursStartTime
                    }}
                    to
                    {{
                        this.$store.getters.getCurrentDisplayedBusiness
                            .openingTimes.thursEndTime
                    }}
                </b-list-group-item>
                <b-list-group-item>
                    <b>Friday: </b>
                    {{
                        this.$store.getters.getCurrentDisplayedBusiness
                            .openingTimes.friStartTime
                    }}
                    to
                    {{
                        this.$store.getters.getCurrentDisplayedBusiness
                            .openingTimes.friEndTime
                    }}
                </b-list-group-item>
                <b-list-group-item>
                    <b>Saturday: </b>
                    {{
                        this.$store.getters.getCurrentDisplayedBusiness
                            .openingTimes.satStartTime
                    }}
                    to
                    {{
                        this.$store.getters.getCurrentDisplayedBusiness
                            .openingTimes.satEndTime
                    }}
                </b-list-group-item>
                <b-list-group-item>
                    <b>Sunday: </b>
                    {{
                        this.$store.getters.getCurrentDisplayedBusiness
                            .openingTimes.sunStartTime
                    }}
                    to
                    {{
                        this.$store.getters.getCurrentDisplayedBusiness
                            .openingTimes.sunEndTime
                    }}
                </b-list-group-item>
            </b-list-group> -->
            <hr />
            <div v-if="this.$store.getters.getLoggedInStatus">
                <b-card class="mb-2">
                    <h5>Why not leave a review?</h5>
                    <star-rating
                        class="star_rating"
                        v-model="reviewRating"
                        :star-size="30"
                        text-class="rating_text"
                    />
                    <b-form-textarea
                        id="review_text"
                        v-model="reviewComment"
                        placeholder="Comment on your visit..."
                        rows="3"
                        max-rows="3"
                    />
                    <b-button
                        class="mt-2 w-100"
                        variant="success"
                        @click="saveReview"
                        >Save Review</b-button
                    >
                </b-card>
            </div>
            <div
                v-if="
                    this.$store.getters.getCurrentDisplayedBusiness.reviews
                        .length > 0
                "
                class="mb-4"
            >
                <h5>Reviews:</h5>
                <hr />
                <Review
                    v-for="review in this.$store.getters
                        .getCurrentDisplayedBusiness.reviews"
                    :key="review.id"
                    :review="review"
                />
            </div>
        </b-modal>
    </div>
</template>

<script>
import Review from './Review'
import StarRating from 'vue-star-rating'
import BusinessService from '../../../services/BusinessService'

export default {
    components: { StarRating, Review },
    data() {
        return {
            reviewRating: 0,
            reviewComment: '',
            slider: 0,
            sliding: null,
            rating: 3,
            images: [
                {
                    id: 0,
                    image: 'https://picsum.photos/1024/480/?image=52',
                },
                {
                    id: 1,
                    image: 'https://picsum.photos/1024/480/?image=54',
                },
                {
                    id: 2,
                    image: 'https://picsum.photos/1024/480/?image=58',
                },
                {
                    id: 3,
                    image: 'https://picsum.photos/1024/480/?image=55',
                },
            ],
        }
    },
    methods: {
        async saveReview() {
            let reqBody = {
                userId: this.$store.getters.getLoggedInUser,
                businessId: this.$store.getters.getCurrentDisplayedBusiness.id,
                rating: this.reviewRating,
                comment: this.reviewComment,
            }
            let response = await BusinessService.saveNewReview(reqBody)

            if (response.status == 201) {
                alert(response.data)
                // refresh the store with the new review left by the user.
                this.$store.dispatch(
                    'fetchBusinessFromDatabase',
                    this.$store.getters.getCurrentDisplayedBusiness.id,
                )
                // clear the fields
                this.reviewRating = 0
                this.reviewComment = ''
            } else {
                // error occured while saving the review to the database.
                alert(
                    'An error occured when attempting to save the review to the database.',
                )
            }
        },
        onSlideStart(slider) {
            this.sliding = true
        },
        onSlideEnd(slider) {
            this.sliding = false
        },
    },
}
</script>

<style>
.star_rating {
    margin: 0px;
}
.rating_text {
    font-size: 1.5em;
    font-weight: bold;
    margin-left: 5px;
    padding: 5px;
}
</style>
