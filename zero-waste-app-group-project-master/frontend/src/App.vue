<template>
    <div id="app">
        <NavBar />
        <MapView />
    </div>
</template>

<script>
import NavBar from './components/navbar/NavBar'
import MapView from './components/MapView'
export default {
    name: 'app',
    components: {
        NavBar,
        MapView,
    },
}
</script>

<style lang="scss">
// the lang - "scss" tells vue that scss is to be used in this component
@import './assets/styles';

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    // setting the default font-size: this is explained in the variables.scss file
    font-size: $default-font-size;
}
</style>
