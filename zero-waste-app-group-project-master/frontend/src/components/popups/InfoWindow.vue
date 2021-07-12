<template>
    <div>
        <b-card tag="article" class="info-window">
            <b-card-text>
                <!-- <div :v-if="displayImage">
                    <img
                        :src="
                            this.$store.getters.getCurrentDisplayedBusiness
                                .image
                        "
                        alt="Image of the business"
                    />
                </div> -->
                <h4 class="mt-1">
                    {{ this.$store.getters.getCurrentDisplayedBusiness.name }}
                </h4>
                <hr />
                <star-rating
                    class="star_rating"
                    :rating="
                        this.$store.getters.getCurrentDisplayedBusiness
                            .averageRating
                    "
                    read-only
                    :star-size="30"
                    text-class="rating_text"
                    :round-start-rating="false"
                    :increment="0.1"
                ></star-rating>
            </b-card-text>

            <b-button v-b-modal.detailed-location-modal class="w-100"
                >Show More</b-button
            >
            <DetailedLocationView />
        </b-card>
    </div>
</template>

<script>
import DetailedLocationView from './detailed-location-view-components/DetailedLocationView'
import StarRating from 'vue-star-rating'

export default {
    components: {
        StarRating,
        DetailedLocationView,
    },
    computed: {
        displayImage() {
            if (this.image == '') {
                return false
            } else {
                return true
            }
        },
    },
}
</script>

<style>
.info-window {
    max-width: 15rem;
    margin: 0px;
}
.star_rating {
    /* margin: 5px; */
}
.rating_text {
    font-size: 1.5em;
    font-weight: bold;
}
</style>
