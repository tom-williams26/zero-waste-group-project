<template>
    <b-card class="mt-3">
        <star-rating
            class="star_rating"
            :rating="review.rating"
            read-only
            :star-size="30"
            text-class="rating_text"
        />
        <hr />
        <p>
            {{ review.comment }}
        </p>
        <p class="reviewUser">- {{ review.user.username }}</p>
    </b-card>
</template>

<script>
import StarRating from 'vue-star-rating'
export default {
    components: { StarRating },
    props: {
        review: {
            type: Object,
            required: true,
        },
    },
}
</script>

<style>
.reviewUser {
    color: #d4d4d4;
    font-style: italic;
}
</style>
