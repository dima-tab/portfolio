<template>
<!--  <img alt="Vue logo" src="./assets/logo.png">-->
  <MainComponent msg="MSG"/>
</template>

<script>
import MainComponent from './components/MainComponent.vue'

export default {
  name: 'App',
  components: {
    MainComponent
  }
}
</script>

<style>
#app {
  height: 100%;
}
</style>
