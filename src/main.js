import Vue from 'vue'
import axios from 'axios'
import VueLazyLoad from 'vue-lazyload'
import VueCookie from 'vue-cookie'
import router from './router/router'
import App from './App.vue'
import { Message, Form, FormItem, Button, Input } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store/index'

axios.defaults.baseURL = '/api'
axios.defaults.timeout = 8000

axios.interceptors.response.use(function(response) {
    let res = response.data
    if(res.status == 0) {
        if(res.data) {
            return res.data
        } else {
            return res.msg
        }      
    } else if(res.status == 10) {
        window.location.href = '/#/login'
        return //Promise.reject(res)
    } else {
        Message.warning(res.msg)
        return //Promise.reject(res);
    }
}, (error) => {
    let res = error.response
    Message.error(res.data.message)
    Promise.reject(error)
})

Vue.prototype.axios = axios
Vue.prototype.$message = Message
Vue.config.productionTip = false
Vue.use(VueLazyLoad, {
    loading: '/imgs/loading-svg/loading-bars.svg'
})
Vue.use(VueCookie)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Button)
Vue.use(Input)

new Vue({
    store,
    router: router,
    render: h => h(App)
}).$mount('#app')