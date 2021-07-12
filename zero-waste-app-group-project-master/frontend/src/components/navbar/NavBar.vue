<template>
    <b-navbar
        toggleable="lg"
        type="dark"
        variant="success"
        id="collapseExample"
    >
        <b-navbar-brand class="ml-sm-2 font-weight-bold" href="#"
            >Zero Waste</b-navbar-brand
        >

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <!-- Center aligned nav items -->

            <b-navbar-nav class="mx-auto">
                <!--  Search form  -->
                <b-nav-form class="pb-sm-2 mt-sm-2">
                    <b-form-input
                        class="mr-2"
                        placeholder="Search"
                    ></b-form-input>
                    <b-button class="mr-sm-2" type="submit" variant="success"
                        >Search</b-button
                    >
                </b-nav-form>
            </b-navbar-nav>
            <!-- Right aligned nav items -->
            <NavBarItems />
        </b-collapse>
    </b-navbar>
</template>

<script>
import NavBarItems from './NavBarItems.vue'
export default {
    components: {
        NavBarItems,
    },
}
</script>

<style lang="scss">
@import '../../assets/styles.scss';
#collapseExample {
    position: absolute;
    width: 100%;
    z-index: 500;
}
</style>
