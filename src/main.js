import Vue from 'vue'
import axios from 'axios'
import VueLazyLoad from 'vue-lazyload'
import router from './router/router'
import App from './App.vue'

axios.defaults.baseURL = '/api'
axios.defaults.timeout = 8000

axios.interceptors.response.use(function(response) {
    let res = response.data
    if(res.status == 0) {
        return res.data
    }else if(res.status == 10) {
        alert(res.msg)
        window.location.href = '/#/login'
    }else {
        alert(res.msg)
    }
}, () => {})

Vue.prototype.axios = axios
Vue.config.productionTip = false
Vue.use(VueLazyLoad, {
    loading: '/imgs/loading-svg/loading-bars.svg'
})

new Vue({
    router: router,
    render: h => h(App)
}).$mount('#app')