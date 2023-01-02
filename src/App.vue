<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
  // import storage from './storage/log';
  export default {
    name: 'app',
    data() {
      return {

      }
    },
    mounted() {
      // storage.setItem('b', 2, 'user')
      if(this.$cookie.get('userId')) {
        this.getUser()
        this.getCartCount()
      }
    },
    computed: {
      ...mapState(['data'])
    },
    methods: {
      ...mapActions(['setUserName', 'setList', 'setData']),
      getUser() {
        this.axios.get('/user').then((res) => {
          this.setUserName(res.username)
          this.setList(res)
        }).catch((e) => {
          console.log('退出登录,无法读取1')
        })
      },
      getCartCount() {
        this.axios.get('/carts/products/sum').then((res) => {
          this.setData(res)
        }).catch((e) => {
          console.log('退出登录,无法读取2')
        })
      }
    }
  }
</script>

<style lang="scss">
@import '@/assets/scss/reset.scss';
@import '@/assets/scss/config.scss';
@import '@/assets/scss/base.scss';
@import '@/assets/scss/main.scss';
@import '@/assets/scss/modal.scss';

// 去除了网页可视窗口的滚动条
// ::-webkit-scrollbar {
//      width: 0 !important;
//    }
//    ::-webkit-scrollbar {
//      width: 0 !important; height: 0;
//    }
</style>