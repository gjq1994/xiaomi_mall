import Vue from 'vue'
import VueX from 'vuex'

Vue.use(VueX)

export default new VueX.Store({
    state: {
        username: '123',
        email: '',
        phone: '',
        num: '0'
    },
    getters: {
        hitState(state) {
            return `花Q ${state.username}`
        }
    },
    mutations: {
        setNumber(state, n) {
            state.num = n
        }
    },
    actions: {
        setNum(content) {
            return new Promise(resolve => {
                setTimeout(() => {
                    content.commit('setNumber', Math.random())
                    resolve()
                }, 1000)
            })
        } 
    }
})