<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  // import storage from './storage/log';
  export default {
    name: 'app',
    data() {
      return {

      }
    },
    mounted() {
      // storage.setItem('b', 2, 'user')
    }
  }
</script>

<style lang="scss">
@import '@/assets/scss/reset.scss';
@import '@/assets/scss/config.scss';
@import '@/assets/scss/base.scss';
@import '@/assets/scss/main.scss';
</style>